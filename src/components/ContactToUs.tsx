import { MessageCircle } from "lucide-react";

export const ContactToUs = () => {
  return (
    <section id="contacto" className="py-20 bg-neutral-900">
      <div className="max-w-4xl mx-auto px-4 text-center">

        <h2 className="text-3xl font-bold text-white mb-6">
          ¿Listo para hacer un detalle especial?
        </h2>

        <p className="text-lg text-rose-50 mb-8">
          Contacta con nosotros por WhatsApp y personaliza tu detalle ideal
        </p>

        <a
          href="https://wa.me/56982823533?text=Hola,%20me%20interesa%20reservar%20un%20detalle"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contactar por WhatsApp"
          className="
    inline-flex items-center justify-center gap-2
    bg-white text-neutral-900
    font-medium
    hover:bg-neutral-900 hover:text-white
    border-neutral-500
    border-2 hover:border-white
    px-6 py-3 text-sm rounded-full
    transition-all duration-300
    whitespace-nowrap
    shadow-md hover:shadow-xl
    active:scale-95
  "
        >
          <MessageCircle className="w-5 h-5" />
          Iniciar Conversación
        </a>

      </div>
    </section>
  );
};