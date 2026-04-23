import { useMemo } from "react";
import { ProductCard } from "../components/ProductCard";
import type { Arreglo } from "../types/Arreglo";

interface Props {
  arreglos: Arreglo[];
  currentId?: string;
}

// 🔥 Shuffle simple y seguro
function shuffle(array: Arreglo[]) {
  const arr = [...array];

  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
}

export function RelatedCarousel({ arreglos, currentId }: Props) {

  const related = useMemo(() => {
    const filtered = currentId
      ? arreglos.filter((a) => a.id !== currentId)
      : arreglos;

    return shuffle(filtered).slice(0, 6);
  }, [arreglos, currentId]);

  return (
    <div className="mt-20 pl-8 bg-white py-10 shadow ">
      
      <h2 className="text-2xl font-extrabold mb-6">
        Los Más Vendidos
      </h2>

      <div className="flex gap-2 overflow-x-auto overflow-y-hidden pb-4 scroll-smooth">
        {related.map((item) => (
          <div key={item.id} className="min-w-[330px]">
            <ProductCard product={item} />
          </div>
        ))}
      </div>

    </div>
  );
}