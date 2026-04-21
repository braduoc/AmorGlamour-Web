import { motion } from "motion/react";
import { ArrowRight,} from "lucide-react";
import type { Arreglo } from "../types/Arreglo";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";

interface CategoriesProps {
  arreglos?: Arreglo[];
}



const orderPriority = ["Desayunos", "Flores", "Boxes"];

export function Categories({ arreglos = [] }: CategoriesProps) {
  const navigate = useNavigate();

  const categorias = useMemo(() => {
    const unique = Array.from(
      new Set(
        arreglos
          .map((a) => a.categoria)
          .filter((c): c is string => Boolean(c))
      )
    );

    return unique.sort((a, b) => {
      const indexA = orderPriority.indexOf(a);
      const indexB = orderPriority.indexOf(b);

      const aIn = indexA !== -1;
      const bIn = indexB !== -1;

      // ambos en prioridad
      if (aIn && bIn) return indexA - indexB;

      // solo A en prioridad
      if (aIn) return -1;

      // solo B en prioridad
      if (bIn) return 1;

      // resto en orden alfabético
      return a.localeCompare(b);
    });
  }, [arreglos]);

  const imagesByCategory = useMemo(() => {
    const map: Record<string, string> = {};

    categorias.forEach((cat) => {
      const items = arreglos.filter((a) => a.categoria === cat);

      map[cat] =
        items.length > 0
          ? items[0].imagenUrl ?? "/placeholder.jpg"
          : "/placeholder.jpg";
    });

    return map;
  }, [arreglos, categorias]);

  return (
    <section className="py-20 bg-neutral-100">
      <div className="container mx-auto px-6 max-w-6xl">

        {/* HEADER */}
        <motion.div
          id="categoria"
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            Nuestras Categorías
          </h2>

          <p className="text-base md:text-lg text-neutral-600 max-w-2xl mx-auto">
            Encuentra el detalle perfecto para cada ocasión especial
          </p>
        </motion.div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">

          {categorias.map((cat, index) => {

            return (
              <motion.button
                key={cat}
                onClick={() => navigate(`/categoria/${cat}`)}
                className="relative overflow-hidden rounded-3xl shadow-lg text-left group cursor-pointer"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* IMAGE */}
                <img
                  src={imagesByCategory[cat] ?? "/placeholder.jpg"}
                  alt={cat}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-72 md:h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-black/40 group-active:bg-black/60 md:group-hover:bg-black/60 transition-colors duration-300" />

                {/* CONTENT */}
                <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6 text-white">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">

                    {/* TOP ROW */}
                    <div className="flex items-end justify-end mb-2">
                      <ArrowRight className="w-5 h-5 opacity-90" />
                    </div>

                    {/* TITLE */}
                    <h3 className="text-xl md:text-2xl font-bold">
                      {cat}
                    </h3>

                    {/* DESCRIPTION */}
                    <p className="text-sm opacity-80">
                      Explorar detalles de {cat.toLowerCase()}
                    </p>

                  </div>
                </div>

              </motion.button>
            );
          })}

        </div>
      </div>
    </section>
  );
}