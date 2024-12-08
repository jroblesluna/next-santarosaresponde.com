import React, { useState } from "react";
import { useRouter } from "next/router";
import { Button } from "@nextui-org/react";
import HeaderSantaRosa from "@/components/headerSantaRosa";
import FooterSantaRosa from "@/components/footerSantaRosa";
import BackgroundSantaRosa from "@/components/backgroundSantaRosa";
import { useRespuesta } from "@/context/RespuestaContext";
import DefaultLayout from "@/layouts/default";

const LlenaTuCarta: React.FC = () => {
  const router = useRouter();
  const { setCarta, setRespuesta } = useRespuesta(); // Agregado setCarta
  const [name, setName] = useState("");
  const [message, setMessage] = useState("Querida Santa Rosa:\n");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [charCount, setCharCount] = useState(message.length); // Estado para el contador de caracteres

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !message) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    if (message.length < 70) {
      setError("La carta debe tener al menos 70 caracteres.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/php/enviar-carta.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, message }),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccess("¡Tu carta ha sido enviada correctamente!");

        setCarta(message); // Guarda la carta original en el contexto
        setRespuesta(data.result); // Guarda la respuesta en el contexto
        router.replace("/ver-respuesta");

        setName("");
        setMessage("");
        setCharCount(0); // Resetear el contador de caracteres
      } else {
        setError(
          "Hubo un problema al enviar tu carta. Por favor, inténtalo de nuevo."
        );
      }
    } catch {
      setError(
        "Hubo un problema al enviar tu carta. Por favor, inténtalo de nuevo."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    setCharCount(e.target.value.length); // Actualizar el contador de caracteres
  };

  const getCharCountColor = () => {
    return charCount < 70 ? "text-red-500" : "text-green-500";
  };

  return (
    <DefaultLayout>
      <div className="relative items-center justify-center text-center w-full">
        <BackgroundSantaRosa />
        <div className="absolute top-0 left-0 z-50 w-full">
          <HeaderSantaRosa />
          <div className="w-full flex flex-col items-center mt-8 px-5">
            <h1 className="text-3xl font-bold mb-6">
              Escribe tu Carta a Santa Rosa
            </h1>
            <form
              onSubmit={handleSubmit}
              className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg"
            >
              {error && <div className="text-red-500 mb-4">{error}</div>}
              {success && <div className="text-green-500 mb-4">{success}</div>}
              <div className="mb-6">
                <label
                  className="block text-left mb-2 font-semibold"
                  htmlFor="name"
                >
                  Nombre:
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-left mb-2 font-semibold"
                  htmlFor="message"
                >
                  Tu Carta (70 - 1000 caracteres):
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={handleMessageChange}
                  className="carta-textarea carta-fondo"
                  rows={6}
                  maxLength={1000}
                />
                <div className={`mt-1 text-right ${getCharCountColor()}`}>
                  {charCount} caracteres (Mínimo 70 / Máximo 1000)
                </div>
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                isLoading={isLoading}
                className="w-3/4 bg-success p-2 rounded-md text-white font-bold"
              >
                {isLoading ? "Enviando..." : "Enviar Carta"}
              </Button>
            </form>
          </div>
          <FooterSantaRosa />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default LlenaTuCarta;
