import { motion } from "motion/react";
import { Coffee, Flower2, Gift, type LucideIcon } from "lucide-react";
import type { Arreglo } from "../types/Arreglo";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";

interface CategoriesProps {
  arreglos?: Arreglo[];
}

const iconMap: Record<string, LucideIcon> = {
  Desayunos: Coffee,
  Flores: Flower2,
  Boxes: Gift,
};

export function Categories({ arreglos = [] }: CategoriesProps) {
  const navigate = useNavigate();

  // ✅ categorías seguras
  const categorias = useMemo(() => {
    return Array.from(
      new Set(
        arreglos
          .map((a) => a.categoria)
          .filter((c): c is string => Boolean(c))
      )
    );
  }, [arreglos]);

  // ✅ imagen fija segura
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
      <div className="container mx-auto px-8 max-w-6xl">

        {/* HEADER */}
        <motion.div
          id="categoria"
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-extrabold mb-4">
            Nuestras Categorías
          </h2>

          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Encuentra el regalo perfecto para cada ocasión especial
          </p>
        </motion.div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mx-4">

          {categorias.map((cat, index) => {
            const Icon = iconMap[cat] || Gift;

            return (
              <motion.button
                key={cat}
                onClick={() => navigate(`/categoria/${cat}`)}
                className="relative overflow-hidden rounded-3xl shadow-lg text-left group"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <img
                  src={imagesByCategory[cat] ?? "/placeholder.jpg"}
                  alt={cat}
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                />

                <div className="absolute inset-0 bg-black/40" />

                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">

                    <Icon className="w-8 h-8 mb-2" />

                    <h3 className="text-2xl font-bold">{cat}</h3>

                    <p className="text-sm opacity-80">
                      Explora productos de {cat.toLowerCase()}
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