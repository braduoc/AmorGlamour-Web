import { useMemo, useState } from "react";
import type { Arreglo } from "../types/Arreglo";

export const useFiltrosArreglos = (arreglos: Arreglo[]) => {
  const [categoria, setCategoria] = useState("todas");

  // 🔥 categorías únicas
  const categorias = useMemo(() => {
    const cats = arreglos.map((a) => a.categoria).filter(Boolean);

    return ["todas", ...Array.from(new Set(cats))];
  }, [arreglos]);

  // 🔥 filtrado
  const arreglosFiltrados = useMemo(() => {
    if (categoria === "todas") return arreglos;

    return arreglos.filter(
      (a) => a.categoria === categoria
    );
  }, [arreglos, categoria]);

  return {
    categoria,
    setCategoria,
    categorias,
    arreglosFiltrados,
  };
};