import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import DefaultLayout from "@/layouts/default";
import FooterSantaRosa from "@/components/footerSantaRosa";
import BackgroundSantaRosa from "@/components/backgroundSantaRosa";
import HeaderSantaRosa from "@/components/headerSantaRosa";
import SvgStar from "@/components/svgStar";

function SantaRosaResponde() {
  const router = useRouter();

  const getButtonStyle = (isHovered: boolean) => ({
    background: isHovered ? "rgb(255, 219, 88)" : "rgb(255, 218, 220)",
  });

  interface ButtonProps {
    text: string;
    isHovered: boolean;
    setHovered: (isHovered: boolean) => void;
    onClick: () => void;
  }

  const Button: React.FC<ButtonProps> = ({
    text,
    isHovered,
    setHovered,
    onClick,
  }) => (
    <button
      className="button-style"
      style={getButtonStyle(isHovered)}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {text}
    </button>
  );

  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

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
                  <div>Envía tu carta a</div>
                  <div className="text-red-500 text-xl">Santa Rosa</div>
                  <div>y lee su respuesta!</div>
                </div>
                <SvgStar />
              </div>
              {/* eslint-disable jsx-a11y/media-has-caption */}
              <video
                autoPlay={false}
                loop={true}
                muted={false}
                controls={true}
                src="/videos/santarosa.mp4"
                poster="/images/santarosa_video.png"
                className="w-full max-w-xs sm:max-w-sm md:max-w-md rounded-xl border-3 border-black"
              />
              {/* eslint-enable jsx-a11y/media-has-caption */}
              <div className="w-fit text-justify px-5">
                Bienvenido a este portal dedicado a Santa Rosa de Lima, una
                plataforma especial creada para quienes desean comunicarse con
                Santa Rosa, ya sea para pedirle un favor, agradecerle por sus
                bendiciones o compartir sus deseos más sinceros.
              </div>
              <div className="w-fit text-justify px-5">
                Entendemos que a veces puede ser complicado o no posible
                entregar una carta de manera tradicional, por eso hemos creado
                este refugio espiritual en línea.
              </div>
              <div className="w-fit text-justify px-5">
                A través de nuestra innovadora tecnología de inteligencia
                artificial, tus cartas serán respondidas como si fueran
                redactadas por Santa Rosa de Lima, brindándote respuestas y
                palabras llenas de esperanza y aliento.
              </div>
              <div className="w-fit text-justify px-5">
                Nuestra misión es ofrecerte un medio donde puedas conectar con
                la espiritualidad de Santa Rosa, sin importar la distancia o las
                circunstancias.
              </div>
              <div className="w-fit text-justify px-5">
                Ya sea para pedir un favor, expresar tu gratitud o compartir tus
                deseos, estamos aquí para ayudarte a encontrar una respuesta que
                refleje la sabiduría y la bondad de Santa Rosa.
              </div>
            </div>
            <div className="w-full flex flex-col gap-4 items-center">
              <div className="w-fit">
                <div className="mt-4 title-style">
                  Santa Rosa
                  <br />
                  Responde
                </div>
              </div>
              <div className="w-fit text-justify px-5">
                A través de la tecnología, hemos podido consolidar en un modelo
                de Inteligencia Artificial la información conocida acerca de
                quien en vida fue Santa Rosa de Lima, lo que permite generar las
                respuestas que daría Santa Rosa de Lima a las cartas que recibe.
              </div>
              <div className="w-fit text-justify px-5">
                Puedes enviar tu carta mediante un formulario online haciendo
                click en el siguiente botón:
              </div>

              <Button
                text="Llena tu Carta en Línea"
                isHovered={hoveredButton === "write"}
                setHovered={(isHovered) =>
                  setHoveredButton(isHovered ? "write" : null)
                }
                onClick={() => router.push("/")}
              />

              <div className="w-fit text-justify px-5">
                O también tomar una foto a tu carta incluso escrita a mano y
                enviarla. Nuestra plataforma puede reconocer tu escritura o
                carta impresa. Asegúrate que sea una foto lo más nítida posible!
              </div>

              <Button
                text="Envía la foto de tu carta"
                isHovered={hoveredButton === "picture"}
                setHovered={(isHovered) =>
                  setHoveredButton(isHovered ? "picture" : null)
                }
                onClick={() => router.push("./tomale-foto-a-tu-carta")}
              />

              <div className="w-fit text-justify px-5 font-bold">
                ¡Tu apoyo es importante!
              </div>
              <div className="w-fit text-justify px-5">
                Si este servicio ha sido de ayuda para ti o si aprecias el valor
                de lo que estamos ofreciendo, te invitamos a hacer una donación,
                con la cual podremos seguir mejorando y asegurando que más
                personas puedan conectarse espiritualmente a través de la
                tecnología.
              </div>
              <div className="w-fit text-justify px-5">
                Cada aporte, por pequeño que sea, es un paso más para mantener
                viva la conexión con Santa Rosa de Lima.&nbsp;
                <Link
                  className="bg-red-500 hover:bg-red-600 text-white font-bold px-2 py-1 rounded-md text-nowrap"
                  href="/donaciones"
                >
                  Dona Aquí
                </Link>
              </div>
            </div>
          </div>
          <FooterSantaRosa />
        </div>
      </div>
    </DefaultLayout>
  );
}

export default SantaRosaResponde;
