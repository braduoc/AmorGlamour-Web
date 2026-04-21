import { useParams, Link, useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";
import { useArreglos } from "../hooks/useArreglos";
import { Breadcrumb } from "../components/Breadcrumb";
import { RelatedCarousel } from "../components/RelatedCarousel";
import { useState } from "react";
import { Button } from "../components/ui/button";

export function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [openImage, setOpenImage] = useState(false);

  // FIREBASE DATA
  const { arreglos, loading } = useArreglos();

  // 🔥 FIX: asegurar comparación correcta
  const product = arreglos.find(
    (p) => String(p.id) === String(id)
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Cargando producto...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">
            Producto no encontrado
          </h2>

          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-neutral-200 hover:bg-neutral-300 px-4 py-2 rounded-md"
          >
            Volver al Inicio
          </Link>
        </div>
      </div>
    );
  }

  // 🔥 WhatsApp seguro
  const handleBuyNow = () => {
    const message = `¡Hola! Quiero comprar el detalle ${product.nombre ?? ""}`;
    const whatsappUrl = `https://wa.me/56982823533?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-neutral-100">
      <div className="max-w-7xl p-6">

        {/* BACK */}
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6 bg-neutral-200 hover:bg-neutral-300"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver
        </Button>

        {/* BREADCRUMB */}
        <Breadcrumb
          items={[
            { label: "Inicio", path: "/" },
            {
              label: product.categoria ?? "Categoría",
              path: `/categoria/${product.categoria}`,
            },
            {
              label: product.nombre ?? "Producto",
            },
          ]}
        />

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* IMAGE */}
          <div className="lg:sticky lg:top-24">
            <div className="aspect-square rounded-3xl overflow-hidden bg-neutral-100 relative">

              <img
                src={product.imagenUrl}
                alt={product.nombre}
                loading="lazy"
                decoding="async"
                onClick={() => setOpenImage(true)}
                className="
    w-full h-full object-cover
    cursor-zoom-in
    transition-transform duration-700 hover:scale-105
  "
              />

              {/* TOP BADGE */}
              {product.esTopEnVenta && (
                <div className="absolute top-4 left-4">
                  <span className="px-4 py-2 bg-white text-black text-xs font-bold border-2 border-neutral-900 rounded-full">
                    ¡Top Ventas!
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* INFO */}
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-3 md:mb-4">
              {product.nombre}
            </h1>

            {/* PRICE */}
            <div className="flex items-end gap-2 md:gap-3">
              {product.precioAnterior && (
                <span className="text-sm md:text-lg text-neutral-400 line-through">
                  ${Number(product.precioAnterior).toFixed(0)}
                </span>
              )}

              <span
                className={`text-xl md:text-3xl font-bold ${product.precioAnterior ? "text-red-500" : "text-neutral-900"
                  }`}
              >
                ${Number(product.precio ?? 0).toFixed(0)}
              </span>
            </div>

            {/* DESCRIPTION */}
            <p className="mt-6 text-neutral-600">
              {product.descripcion ?? "Sin descripción"}
            </p>

            {/* BUTTON */}
            <div className="mt-8">
              <Button
                onClick={handleBuyNow}
                disabled={product.esAgotado}
                className={`w-full py-6 text-lg rounded-full transition ${product.esAgotado
                  ? "bg-neutral-400 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600 text-white"
                  }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" className="w-8 h-8 shrink-0" viewBox="0 0 48 48">
                  <path fill="#fff" d="M4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98c-0.001,0,0,0,0,0h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303z"></path><path fill="#fff" d="M4.868,43.803c-0.132,0-0.26-0.052-0.355-0.148c-0.125-0.127-0.174-0.312-0.127-0.483l2.639-9.636c-1.636-2.906-2.499-6.206-2.497-9.556C4.532,13.238,13.273,4.5,24.014,4.5c5.21,0.002,10.105,2.031,13.784,5.713c3.679,3.683,5.704,8.577,5.702,13.781c-0.004,10.741-8.746,19.48-19.486,19.48c-3.189-0.001-6.344-0.788-9.144-2.277l-9.875,2.589C4.953,43.798,4.911,43.803,4.868,43.803z"></path><path fill="#cfd8dc" d="M24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,4C24.014,4,24.014,4,24.014,4C12.998,4,4.032,12.962,4.027,23.979c-0.001,3.367,0.849,6.685,2.461,9.622l-2.585,9.439c-0.094,0.345,0.002,0.713,0.254,0.967c0.19,0.192,0.447,0.297,0.711,0.297c0.085,0,0.17-0.011,0.254-0.033l9.687-2.54c2.828,1.468,5.998,2.243,9.197,2.244c11.024,0,19.99-8.963,19.995-19.98c0.002-5.339-2.075-10.359-5.848-14.135C34.378,6.083,29.357,4.002,24.014,4L24.014,4z"></path><path fill="#40c351" d="M35.176,12.832c-2.98-2.982-6.941-4.625-11.157-4.626c-8.704,0-15.783,7.076-15.787,15.774c-0.001,2.981,0.833,5.883,2.413,8.396l0.376,0.597l-1.595,5.821l5.973-1.566l0.577,0.342c2.422,1.438,5.2,2.198,8.032,2.199h0.006c8.698,0,15.777-7.077,15.78-15.776C39.795,19.778,38.156,15.814,35.176,12.832z"></path><path fill="#fff" fill-rule="evenodd" d="M19.268,16.045c-0.355-0.79-0.729-0.806-1.068-0.82c-0.277-0.012-0.593-0.011-0.909-0.011c-0.316,0-0.83,0.119-1.265,0.594c-0.435,0.475-1.661,1.622-1.661,3.956c0,2.334,1.7,4.59,1.937,4.906c0.237,0.316,3.282,5.259,8.104,7.161c4.007,1.58,4.823,1.266,5.693,1.187c0.87-0.079,2.807-1.147,3.202-2.255c0.395-1.108,0.395-2.057,0.277-2.255c-0.119-0.198-0.435-0.316-0.909-0.554s-2.807-1.385-3.242-1.543c-0.435-0.158-0.751-0.237-1.068,0.238c-0.316,0.474-1.225,1.543-1.502,1.859c-0.277,0.317-0.554,0.357-1.028,0.119c-0.474-0.238-2.002-0.738-3.815-2.354c-1.41-1.257-2.362-2.81-2.639-3.285c-0.277-0.474-0.03-0.731,0.208-0.968c0.213-0.213,0.474-0.554,0.712-0.831c0.237-0.277,0.316-0.475,0.474-0.791c0.158-0.317,0.079-0.594-0.04-0.831C20.612,19.329,19.69,16.983,19.268,16.045z" clip-rule="evenodd"></path>
                </svg>
                {product.esAgotado
                  ? "Agotado"
                  : "Pedir por WhatsApp"}
              </Button>
            </div>

            {/* DETAILS */}
            <div className="mt-10 border-t border-neutral-300 pt-6">
              <h3 className="font-bold text-lg mb-4">
                ¿Qué incluye?
              </h3>

              <div className="text-neutral-600 whitespace-pre-line leading-relaxed">
                {product.incluye ?? "Sin información disponible"}
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* RELATED */}
      <RelatedCarousel
        arreglos={arreglos}
        currentId={product.id}
      />

      {/* IMAGE MODAL */}
      {openImage && (
        <div
          className="
            fixed inset-0 z-50
            bg-black/80 backdrop-blur-sm
            flex items-center justify-center
            p-4
          "
          onClick={() => setOpenImage(false)}
        >
          <button
            className="
              absolute top-6 right-6
              text-white text-2xl
              hover:scale-110 transition
            "
            onClick={() => setOpenImage(false)}
          >
            ✕
          </button>

          <img
            src={product.imagenUrl}
            alt={product.nombre}
            loading="lazy"
            decoding="async"
            className="
    max-h-[90vh] max-w-[90vw]
    object-contain
    rounded-2xl
    shadow-2xl
  "
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}