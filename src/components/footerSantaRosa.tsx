import Link from "next/link";
import React from "react";

function FooterSantaRosa() {
  return (
    <>
      <div className="w-full flex flex-col items-center mt-8 mb-20 gap-4 px-5">
        <div className="flex flex-col gap-8 items-center max-w-2xl">
          <div className="w-fit text-justify px-5 font-bold">
            Tu familia, amigos y conocidos también pueden enviar sus cartas!
          </div>
          <div className="w-fit text-justify px-5">
            Comparte tu experiencia en este sitio Web, cuéntale a tus contactos
            y ayúdanos a llegar a más personas para que también puedan enviar
            sus cartas y recibir respuesta.
          </div>
          <div className="font-bold">Compártenos en</div>
          <div className="flex  gap-4 font-bold">
            <a
              href="https://www.facebook.com/sharer/sharer.php?u=https://www.santarosaresponde.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 w-fit whitespace-nowrap"
            >
              Facebook
            </a>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                "Envía tu carta a Santa Rosa y recibe una respuesta especial: https://www.santarosaresponde.com"
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-900 w-fit whitespace-nowrap"
            >
              X / Twitter
            </a>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(
                "Envía tu carta a Santa Rosa y recibe una respuesta especial: https://www.santarosaresponde.com"
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 w-fit whitespace-nowrap"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-row w-full footer-style">
        <div className="w-full flex flex-col md:flex-row items-center gap-2">
          <div className="px-4 w-full flex flex-row items-center justify-center gap-2">
            <div className="w-full text-gray-500">
              &copy; SantaRosaResponde.com - Informes:&nbsp;
              <Link
                color="foreground"
                className="w-fit md:w-full md:justify-center"
                href="mailto:info@santarosaresponde.com"
                target="_blank"
              >
                info@santarosaresponde.com
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FooterSantaRosa;
