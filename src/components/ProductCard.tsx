import { motion } from "motion/react";
import { Link } from "react-router-dom";
import type { Arreglo } from "../types/Arreglo";
import { ArrowRight } from "lucide-react";

interface ProductCardProps {
  product: Arreglo;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.div
      className="group relative bg-neutral-100 rounded-2xl overflow-hidden border border-neutral-200 hover:shadow-xl transition-all duration-300 "
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Link to={`/producto/${product.id}`}>
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.imagenUrl || "/placeholder.jpg"}
            alt={product.nombre || "Producto"}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {product.esTopEnVenta && (
            <div className="absolute top-4 left-4">
              <span className="px-4 py-2 bg-white text-black text-xs font-bold border-2 border-neutral-900 rounded-full">
                ¡Top Ventas!
              </span>
            </div>
          )}

          {product.esAgotado && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-bold text-lg">
                Agotado
              </span>
            </div>
          )}
        </div>
      </Link>

      <div className="p-6">
        <Link to={`/producto/${product.id}`}>
          <h3 className="text-lg font-semibold text-neutral-900 mb-2">
            {product.nombre || "Sin nombre"}
          </h3>
        </Link>

        <p className="text-sm text-neutral-600 mb-4 line-clamp-2">
          {product.descripcion || "Sin descripción"}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            {product.precioAnterior != null && (
              <span className="text-sm line-through text-neutral-400">
                ${Number(product.precioAnterior).toFixed(0)}
              </span>
            )}

            <span
              className={`text-2xl font-bold ${
                product.precioAnterior != null
                  ? "text-red-600"
                  : "text-neutral-900"
              }`}
            >
              ${Number(product.precio || 0).toFixed(0)}
            </span>
          </div>

          <Link
  to={`/producto/${product.id}`}
  className="
    inline-flex items-center gap-2
    bg-neutral-900 text-white
    px-5 py-2 rounded-full shadow-lg
    hover:bg-neutral-800 transition
    text-sm font-medium
  "
>
  {product.esAgotado ? "No disponible" : "Ver Detalle"}
  <ArrowRight className="w-4 h-4" />
</Link>
        </div>
      </div>
    </motion.div>
  );
}