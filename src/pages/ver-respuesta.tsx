import { useRespuesta } from "@/context/RespuestaContext"
import DefaultLayout from "@/layouts/default"
import HeaderSantaRosa from "@/components/headerSantaRosa"
import FooterSantaRosa from "@/components/footerSantaRosa"
import BackgroundSantaRosa from "@/components/backgroundSantaRosa"
import jsPDF from "jspdf"
import { useEffect, useState } from "react"
import { Image } from "@nextui-org/react"

const VerRespuesta: React.FC = () => {
  const { carta, respuesta, fotoCarta } = useRespuesta(); // Acceder a la carta, foto y respuesta
  const [imageData, setImageData] = useState<string | null>(null);

  useEffect(() => {
    const loadImage = async () => {
      const response = await fetch("/images/export-pdf.png");
      const blob = await response.blob();
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageData(reader.result as string);
      };
      reader.readAsDataURL(blob);
    };

    loadImage();
  }, []);

  const parseText = (text: string) => {
    return text.split("\n").map((line, index) => (
      <p key={index} className="mb-4 text-left">
        {line}
      </p>
    ));
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(12);
    const maxWidth = 180;

    if (imageData) {
      doc.addImage(imageData, "PNG", 0, 0, 210, 297); // Ajustar a tamaño A4
    }

    doc.text("Tu Carta:", 10, 20);

    if (fotoCarta) {
      doc.addImage(fotoCarta, "JPEG", 10, 30, 180, 180); // Ajustar el tamaño y la posición
    } else if (carta) {
      const cartaLines = doc.splitTextToSize(carta, maxWidth);
      doc.text(cartaLines, 10, 30);
    }

    doc.setFontSize(8);
    const footerText =
      "Las respuestas han sido generadas mediante Inteligencia Artificial, mediante un modelo que consolida la información conocida de quien en vida fue Santa Rosa de Lima y simula las respuestas que ella daría.\nMayores informes: Tel/Whatsapp: +51912072302 - Email: info@santarosaresponde.com - www.santarosaresponde.com";
    const footerLines = doc.splitTextToSize(footerText, maxWidth);
    doc.text(footerLines, 10, 280);

    doc.addPage(); // Nueva página para la respuesta

    if (imageData) {
      doc.addImage(imageData, "PNG", 0, 0, 210, 297);
    }

    doc.setFontSize(12);
    doc.text("Respuesta de Santa Rosa:", 10, 20);
    const respuestaLines = doc.splitTextToSize(respuesta, maxWidth);
    doc.text(respuestaLines, 10, 30);

    doc.setFontSize(8);
    doc.text(footerLines, 10, 280);

    doc.save("SantaRosa_Respuesta.pdf");
  };

  return (
    <DefaultLayout>
      <div className="relative items-center justify-center text-center w-full">
        <BackgroundSantaRosa />
        <div className="absolute top-0 left-0 z-50 w-full">
          <HeaderSantaRosa />
          <div className="w-full flex flex-col items-center mt-8 gap-4 px-5">
            <h1 className="text-3xl font-bold mb-6">Santa Rosa Responde</h1>

            <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg carta-textarea">
              <h2 className="text-2xl font-semibold mb-4">Tu Carta</h2>
              {fotoCarta ? (
                <Image
                  src={fotoCarta}
                  alt="Foto de tu carta"
                  className="w-full mb-4"
                />
              ) : (
                carta && parseText(carta)
              )}
            </div>

            <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg carta-textarea">
              <h2 className="text-2xl font-semibold mb-4 text-red-600">
                Respuesta de Santa Rosa
              </h2>
              {respuesta ? (
                parseText(respuesta)
              ) : (
                <p className="text-red-500 text-center">
                  No se pudo cargar la respuesta. Intenta nuevamente.
                </p>
              )}
            </div>

            <button
              onClick={generatePDF}
              className="mt-6 px-6 py-2 bg-red-600 text-white rounded-md"
            >
              Descargar PDF
            </button>
          </div>
          <FooterSantaRosa />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default VerRespuesta;
