import { Image } from "@nextui-org/react";
import React from "react";

function BackgroundSantaRosa() {
  return (
    <div className="absolute top-0 left-0 z-10">
      <div className="bg-white fixed left-0 top-0 right-0 bottom-0 w-screen h-screen" />
      <Image className="z-10 fixed left-0" src={"/images/pit.png"} alt="Pit" />
      <Image
        className="z-10 fixed right-0"
        src={"/images/background.png"}
        alt="Background"
      />
    </div>
  );
}

export default BackgroundSantaRosa;
