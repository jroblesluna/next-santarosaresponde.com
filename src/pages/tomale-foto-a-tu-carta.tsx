import React, { useState } from "react";
import { useRouter } from "next/router";
import DefaultLayout from "@/layouts/default";
import HeaderSantaRosa from "@/components/headerSantaRosa";
import FooterSantaRosa from "@/components/footerSantaRosa";
import BackgroundSantaRosa from "@/components/backgroundSantaRosa";
import { useRespuesta } from "@/context/RespuestaContext";
import { Button } from "@nextui-org/react";
import { Image } from "@nextui-org/react";


const TomaleFotoATuCarta: React.FC = () => {
  const router = useRouter();
  const { setRespuesta, setCarta, setFotoCarta } = useRespuesta();
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDragActive, setIsDragActive] = useState(false);

  const handleFileChange = (file: File) => {
    if (file && file.size <= 20 * 1024 * 1024) {
      setPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setError("El archivo debe ser una imagen y no debe exceder los 20MB.");
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(false);
    const file = e.dataTransfer.files[0];
    handleFileChange(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileChange(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(false);
  };

  const removePhoto = () => {
    setPhoto(null);
    setPreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !photo) {
      setError("Por favor, completa todos los campos y sube una foto.");
      return;
    }

    setIsLoading(true);

    try {
      const imageBase64 = await convertToBase64(photo);

      const response = await fetch("/php/enviar-carta-con-foto.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, imageBase64: imageBase64.split(",")[1] }),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccess("¡Tu carta ha sido enviada correctamente!");

        setFotoCarta(preview); // Almacenar la imagen en el contexto
        setRespuesta(data.result);
        setCarta(null); // No almacenar texto de carta en este caso

        router.replace("/ver-respuesta");

        setName("");
        setPhoto(null);
        setPreview(null);
      } else {
        setError("Hubo un problema al enviar tu carta. Por favor, inténtalo de nuevo.");
      }
    } catch {
      setError("Hubo un problema al enviar tu carta. Por favor, inténtalo de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  return (
    <DefaultLayout>
      <div className="relative items-center justify-center text-center w-full">
        <BackgroundSantaRosa />
        <div className="absolute top-0 left-0 z-50 w-full">
          <HeaderSantaRosa />
          <div className="w-full flex flex-col items-center mt-8 px-5">
            <h1 className="text-3xl font-bold mb-6">
              Tómale una Foto a tu Carta para Santa Rosa
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
                  className="input-style"
                />
              </div>

              {!preview && (
                <div
                  role="button"
                  tabIndex={0}
                  className={`mb-6 border-2 border-dashed ${isDragActive ? "border-blue-500 bg-blue-100" : "border-gray-300 bg-white"} p-6 rounded-lg cursor-pointer text-gray-600`}
                  onClick={() => document.getElementById("photoInput")?.click()}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onDragLeave={handleDragLeave}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      document.getElementById("photoInput")?.click();
                    }
                  }}
                  aria-label="Arrastra y suelta tu imagen aquí, o haz clic para seleccionarla"
                >
                  <input
                    id="photoInput"
                    type="file"
                    accept="image/*"
                    onChange={handleFileInputChange}
                    className="hidden"
                  />
                  <p>
                    Arrastra y suelta tu imagen aquí, o haz clic para
                    seleccionarla
                  </p>
                </div>
              )}

              {preview && (
                <div className="relative mb-6">
                  <Image
                    src={preview}
                    alt="Previsualización"
                    className="h-20 object-cover mr-4"
                  />

                  <button
                    type="button"
                    className="absolute top-2 right-2 bg-red-600 text-white rounded-md p-2"
                    onClick={removePhoto}
                  >
                    Eliminar
                  </button>
                  <p className="text-gray-600 mt-2">{photo?.name}</p>
                </div>
              )}

              <Button
                type="submit"
                isLoading={isLoading} // Mostrar indicador de carga
                disabled={isLoading} // Deshabilitar el botón si está en carga
                className="w-3/4 bg-success p-2 rounded-md text-white font-bold"
              >
                {isLoading ? "Enviando..." : "Enviar Carta"}{" "}
                {/* Cambiar el texto del botón */}
              </Button>
            </form>
          </div>
          <FooterSantaRosa />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default TomaleFotoATuCarta;
