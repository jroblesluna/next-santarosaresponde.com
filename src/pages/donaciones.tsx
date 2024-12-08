import React, { useState } from "react";
import Link from "next/link";

import { Image } from "@nextui-org/react";
import DefaultLayout from "@/layouts/default";
import HeaderSantaRosa from "@/components/headerSantaRosa";
import FooterSantaRosa from "@/components/footerSantaRosa";
import BackgroundSantaRosa from "@/components/backgroundSantaRosa";
import SvgStar from "@/components/svgStar";
import IconCopy from "@/components/iconCopy";

const Donaciones: React.FC = () => {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopiedText(text);
        setTimeout(() => setCopiedText(null), 2000); // Ocultar mensaje después de 2 segundos
      })
      .catch((err) => {
        console.error("Error al copiar al portapapeles: ", err);
      });
  };

  return (
    <DefaultLayout>
      <div className="relative items-center justify-center text-center w-full">
        <BackgroundSantaRosa />
        <div className="absolute top-0 left-0 z-50 w-full">
          <HeaderSantaRosa />
          <div className="w-full flex flex-col md:flex-row mt-8 items-center md:items-start justify-start gap-10 px-5">
            <div className="w-full flex flex-col gap-4 items-center">
              <div className="box-style">
                <SvgStar />
                <div className="flex flex-col">
                  <div>Tu Apoyo</div>
                  <div className="text-red-500 text-xl">Es Valioso</div>
                  <div>Para Nosotros</div>
                </div>
                <SvgStar />
              </div>
              <div className="w-fit text-justify px-5">
                Agradecemos tu interés en apoyar nuestro proyecto. Este servicio
                es posible gracias al esfuerzo conjunto de un equipo
                comprometido con la espiritualidad y la tecnología.
              </div>
              <div className="w-fit text-justify px-5">
                Cualquier contribución que puedas hacer ayudará a mejorar y
                mantener esta plataforma para que más personas puedan conectarse
                con Santa Rosa de Lima.
              </div>
              <div className="w-fit text-justify px-5">
                Tu donación no solo nos permite seguir adelante con este
                proyecto, sino que también nos ayuda a mejorar y ampliar nuestro
                servicio para que más personas puedan recibir la guía y el apoyo
                espiritual que necesitan.
              </div>
              <div className="w-fit text-justify px-5">
                ¡Gracias por ser parte de esta misión y por contribuir a
                mantener vivo el legado de Santa Rosa de Lima!
              </div>
            </div>
            <div className="w-full flex flex-col gap-4 items-center">
              <div className="w-fit text-justify px-5 font-bold">
                Puedes realizar tu donación a través de los siguientes métodos:
              </div>
              <div className="w-full flex flex-col gap-2 bg-white p-4 rounded-lg shadow-lg text-left text-xs sm:text-sm">
                <div className="font-bold">Yape o Plin:</div>
                <div className="flex flex-row items-center gap-2 border-1 rounded-xl hover:bg-blue-50 hover:border-blue-900">
                  <Image
                    className="max-h-[48px]"
                    src="/images/yape.png"
                    alt="Yape"
                  />
                  <Image
                    className="max-h-[48px]"
                    src="/images/plin.png"
                    alt="Plin"
                  />
                  <div className="flex flex-col">
                    <div className="text-nowrap">
                      <div className="flex flex-row gap-2">
                        <div>Número Telefónico: 998308759</div>
                        <button
                          className="relative cursor-pointer text-gray-300 hover:text-blue-600"
                          onClick={() => copyToClipboard("998308759")}
                        >
                          <IconCopy />
                          {copiedText === "998308759" && (
                            <span className="absolute top-0 -right-18 bg-gray-800 text-white text-xs rounded py-1 px-2 transition-opacity duration-500 opacity-100">
                              Copiado!
                            </span>
                          )}
                        </button>
                      </div>
                    </div>
                    <div className=" text-nowrap">Titular: Antonio Robles</div>
                  </div>
                </div>
                <div className="font-bold">Transferencia Bancaria:</div>
                <div className="flex flex-row items-center gap-2 border-1 rounded-xl hover:bg-blue-100 hover:border-blue-900">
                  <Link
                    href="https://bcpzonasegura.viabcp.com/"
                    target="_blank"
                  >
                    <Image
                      className="max-h-[48px]"
                      src="/images/bcp.png"
                      alt="BCP"
                    />
                  </Link>
                  <div className="flex flex-col">
                    <div className="flex flex-row gap-2">
                      <div className="text-nowrap">
                        BCP Soles 193-70066087-0-23
                      </div>
                      <button
                        className="relative cursor-pointer text-gray-300 hover:text-blue-600"
                        onClick={() => copyToClipboard("19370066087023")}
                      >
                        <IconCopy />
                        {copiedText === "19370066087023" && (
                          <span className="absolute top-0 -right-18 bg-gray-800 text-white text-xs rounded py-1 px-2 transition-opacity duration-500 opacity-100">
                            Copiado!
                          </span>
                        )}
                      </button>
                    </div>
                    <div className="flex flex-row gap-2">
                      <div className="text-nowrap">
                        CCI 00219317006608702313
                      </div>
                      <button
                        className="relative cursor-pointer text-gray-300 hover:text-blue-600"
                        onClick={() => copyToClipboard("00219317006608702313")}
                      >
                        <IconCopy />
                        {copiedText === "00219317006608702313" && (
                          <span className="absolute top-0 -right-18 bg-gray-800 text-white text-xs rounded py-1 px-2 transition-opacity duration-500 opacity-100">
                            Copiado!
                          </span>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row items-center gap-2 border-1 rounded-xl hover:bg-blue-100 hover:border-blue-900">
                  <Link href="https://bbva.pe/" target="_blank">
                    <Image
                      className="max-h-[48px]"
                      src="/images/bbva.png"
                      alt="BBVA"
                    />
                  </Link>
                  <div className="flex flex-col">
                    <div className="flex flex-row gap-2">
                      <div className="text-nowrap">
                        BBVA Soles 0011-0814-0257819383
                      </div>
                      <button
                        className="relative cursor-pointer text-gray-300 hover:text-blue-600"
                        onClick={() => copyToClipboard("001108140257819383")}
                      >
                        <IconCopy />
                        {copiedText === "001108140257819383" && (
                          <span className="absolute top-0 -right-18 bg-gray-800 text-white text-xs rounded py-1 px-2 transition-opacity duration-500 opacity-100">
                            Copiado!
                          </span>
                        )}
                      </button>
                    </div>
                    <div className="flex flex-row gap-2">
                      <div className="text-nowrap">
                        CCI 01181400025781938317
                      </div>
                      <button
                        className="relative cursor-pointer text-gray-300 hover:text-blue-600"
                        onClick={() => copyToClipboard("01181400025781938317")}
                      >
                        <IconCopy />
                        {copiedText === "01181400025781938317" && (
                          <span className="absolute top-0 -right-18 bg-gray-800 text-white text-xs rounded py-1 px-2 transition-opacity duration-500 opacity-100">
                            Copiado!
                          </span>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row items-center gap-2 border-1 rounded-xl hover:bg-blue-100 hover:border-blue-900">
                  <Link
                    href="https://bancaporinternet.interbank.pe/"
                    target="_blank"
                  >
                    <Image
                      className="max-h-[48px]"
                      src="/images/interbank.png"
                      alt="Interbank"
                    />
                  </Link>
                  <div className="flex flex-col">
                    <div className="flex flex-row gap-2">
                      <div className=" text-nowrap">
                        Interbank Soles 898-3379207083
                      </div>
                      <button
                        className="relative cursor-pointer text-gray-300 hover:text-blue-600"
                        onClick={() => copyToClipboard("8983379207083")}
                      >
                        <IconCopy />
                        {copiedText === "8983379207083" && (
                          <span className="absolute top-0 -right-18 bg-gray-800 text-white text-xs rounded py-1 px-2 transition-opacity duration-500 opacity-100">
                            Copiado!
                          </span>
                        )}
                      </button>
                    </div>
                    <div className="flex flex-row gap-2">
                      <div className="text-nowrap">
                        CCI 00389801337920708340
                      </div>
                      <button
                        className="relative cursor-pointer text-gray-300 hover:text-blue-600"
                        onClick={() => copyToClipboard("00389801337920708340")}
                      >
                        <IconCopy />
                        {copiedText === "00389801337920708340" && (
                          <span className="absolute top-0 -right-18 bg-gray-800 text-white text-xs rounded py-1 px-2 transition-opacity duration-500 opacity-100">
                            Copiado!
                          </span>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="font-bold">Paypal o Tarjetas de Crédito:</div>
                <Link
                  href="https://www.paypal.com/ncp/payment/VND25BM3TWPX4"
                  target="_blank"
                >
                  <div className="flex flex-row items-center gap-2 border-1 rounded-xl hover:bg-blue-100 hover:border-blue-900">
                    <Image
                      className="max-h-[48px]"
                      src="/images/paypal_cc.png"
                      alt="Paypal"
                    />
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <FooterSantaRosa />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Donaciones;
