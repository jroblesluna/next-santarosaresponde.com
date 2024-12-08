import React, { createContext, useContext, useState, ReactNode } from "react";

interface RespuestaContextType {
  carta: string | null;
  respuesta: string;
  setCarta: (carta: string | null) => void;
  setRespuesta: (respuesta: string) => void;
  fotoCarta: string | null;
  setFotoCarta: (foto: string | null) => void;
}

const RespuestaContext = createContext<RespuestaContextType | undefined>(undefined);

export const RespuestaProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [carta, setCarta] = useState<string | null>(null);
  const [respuesta, setRespuesta] = useState("");
  const [fotoCarta, setFotoCarta] = useState<string | null>(null);

  return (
    <RespuestaContext.Provider value={{ carta, respuesta, setCarta, setRespuesta, fotoCarta, setFotoCarta }}>
      {children}
    </RespuestaContext.Provider>
  );
};

export const useRespuesta = () => {
  const context = useContext(RespuestaContext);
  if (!context) {
    throw new Error("useRespuesta debe usarse dentro de un RespuestaProvider");
  }
  return context;
};
