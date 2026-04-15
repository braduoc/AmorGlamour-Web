import { useArreglos } from '../hooks/useArreglos';
import { useFiltrosArreglos } from '../hooks/useFiltrosArreglos';
import { useEffect, useRef } from "react";
import { CarruselFeature } from '../components/CarruselFeature';
import { Categories } from '../components/Categories';
import { Cover } from '../components/Cover';
import { ContactToUs } from '../components/ContactToUs';
import { RelatedCarousel } from '../components/RelatedCarousel';

export function Home() {

  // 🔥 FIREBASE
  const { arreglos, loading, error } = useArreglos();

  // 🔥 FILTROS
  const {
    categoria,
    setCategoria,
    arreglosFiltrados,
  } = useFiltrosArreglos(arreglos);

  

  // scroll (si lo usas)
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const speed = 1;

    const interval = setInterval(() => {
      container.scrollLeft += speed;

      if (container.scrollLeft >= container.scrollWidth / 2) {
        container.scrollLeft -= container.scrollWidth / 2;
      }
    }, 16);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-neutral-100">

      <Cover />
      <CarruselFeature />

      {/* 🔥 CATEGORIES CONECTADO */}
      <Categories
        arreglos={arreglos}
      />

     <RelatedCarousel
               arreglos={arreglos}
             />

      <ContactToUs />

    </div>
  );
}