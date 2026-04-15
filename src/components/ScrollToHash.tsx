import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function ScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    // 🔥 Espera a que el DOM esté listo (evita scroll fallido)
    const timeout = setTimeout(() => {
      if (!location.hash) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      const id = location.hash.replace("#", "");
      const el = document.getElementById(id);

      if (el) {
        el.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      } else {
        // fallback si no existe el elemento
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 50);

    return () => clearTimeout(timeout);
  }, [location.pathname, location.hash]);

  return null;
}