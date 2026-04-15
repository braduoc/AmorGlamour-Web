import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import type { Arreglo } from "../types/Arreglo";

export const useArreglos = () => {
  const [arreglos, setArreglos] = useState<Arreglo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const ref = collection(db, "arreglos");

    const unsubscribe = onSnapshot(
      ref,
      (snapshot) => {
        try {
          const data: Arreglo[] = snapshot.docs.map((doc) => {
            const d = doc.data();

            return {
              __backendId: doc.id,

              // 🔥 campos principales
              id: d.id ?? doc.id,
              nombre: d.nombre ?? "",
              precio: Number(d.precio ?? 0),
              descripcion: d.descripcion ?? "",
              imagenUrl: d.imagenUrl ?? "",
              categoria: d.categoria ?? "",

              // 🔥 campos extra (OBLIGATORIOS por tu interface)
              incluye: d.incluye ?? "",
              rutaAlmacenamiento: d.rutaAlmacenamiento ?? "",

              esTopEnVenta: d.esTopEnVenta ?? false,
              esAgotado: d.esAgotado ?? false,

              precioAnterior: d.precioAnterior
                ? Number(d.precioAnterior)
                : null,

              fechaCreacion: d.fechaCreacion ?? "",
            };
          });

          console.log("🔥 ARREGLOS PROCESADOS:", data);

          setArreglos(data);
          setLoading(false);
          setError(null);
        } catch (err) {
          console.error(err);
          setError("Error procesando datos");
          setLoading(false);
        }
      },
      (err) => {
        console.error(err);
        setError("Error al obtener datos de Firebase");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { arreglos, loading, error };
};