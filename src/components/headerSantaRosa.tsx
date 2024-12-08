import { Image, Link } from "@nextui-org/react";
import React from "react";

function HeaderSantaRosa() {
  return (
    <div className="px-5">
      <div className="md:my-8 flex flex-row w-full header-style gap-2">
        <div className="w-fit flex flex-col items-center justify-center">
          <Link
            color="foreground"
            className="w-fit md:w-full md:justify-center"
            href="/como-funciona"
            target="_self"
          >
            <Image className="max-w-[75px]" src="/images/santarosa.png" />
          </Link>
        </div>
        <div className="w-full flex flex-col md:flex-row text-left md:items-center md:gap-2">
          <Link
            color="foreground"
            className="w-fit md:w-full md:justify-center"
            href="/"
            target="_self"
          >
            Llena tu Carta
          </Link>
          <Link
            color="foreground"
            className="w-fit md:w-full md:justify-center"
            href="/tomale-foto-a-tu-carta"
            target="_self"
          >
            Tómale foto a tu carta
          </Link>
          <Link
            color="foreground"
            className="w-fit md:w-full md:justify-center"
            href="/como-funciona"
            target="_self"
          >
            Cómo funciona
          </Link>
          <Link
            color="foreground"
            className="w-fit md:w-full md:justify-center"
            href="/donaciones"
            target="_self"
          >
            Donaciones
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HeaderSantaRosa;
