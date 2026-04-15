import { useArreglos } from '../hooks/useArreglos';
import { CarruselFeature } from '../components/CarruselFeature';
import { Categories } from '../components/Categories';
import { Cover } from '../components/Cover';
import { ContactToUs } from '../components/ContactToUs';
import { RelatedCarousel } from '../components/RelatedCarousel';

export function Home() {
  const { arreglos } = useArreglos();

  return (
    <div className="min-h-screen bg-neutral-100">

      <Cover />
      <CarruselFeature />

      <Categories arreglos={arreglos} />

      <RelatedCarousel arreglos={arreglos} />

      <ContactToUs />

    </div>
  );
}