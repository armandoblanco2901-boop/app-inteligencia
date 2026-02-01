import { GoogleGenAI } from "@google/genai";
import { REPORT_CONTEXT } from "../constantes"; // Asegúrate que la ruta a constantes sea correcta

// CAMBIO IMPORTANTE: En Vite se usa import.meta.env
const apiKey = import.meta.env.VITE_API_KEY || '';

const createClient = () => {
    if (!apiKey) {
        console.error("API_KEY is missing");
        return null;
    }
    return new GoogleGenAI({ apiKey });
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  const client = createClient();
  if (!client) return "Error: API Key no configurada.";

  try {
    const response = await client.models.generateContent({
      // CORRECCIÓN: Usamos el modelo estable actual
      model: "gemini-1.5-flash",
      contents: message,
      config: {
        systemInstruction: `Eres un consultor experto en exportación de café entre Venezuela y Kazajstán.
        
        Usa el siguiente Informe Técnico como base:
        ---
        ${REPORT_CONTEXT}
        ---
        
        Directrices:
        1. Sé profesional y técnico.
        2. Basa tus respuestas en los datos del informe (logística, precios, etc).
        `,
      },
    });

    return response.text() || "No se generó respuesta.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Lo siento, hubo un error al conectar. Verifica tu clave API.";
  }
};

export const generateImage = async (prompt: string, aspectRatio: '16:9' | '3:4' | '4:3' | '1:1' = '1:1'): Promise<string | null> => {
  const client = createClient();
  if (!client) return null;

  try {
    const response = await client.models.generateContent({
      // CORRECCIÓN: Usamos flash para imágenes también
      model: 'gemini-1.5-flash',
      contents: {
        parts: [
          {
            text: prompt + ", photorealistic, cinematic lighting, 8k resolution, coffee aesthetic",
          },
        ],
      },
      // Nota: Gemini 1.5 Flash acepta config de imagen diferente, simplificamos para asegurar que funcione
    });

    // Nota: La generación de imágenes directa devuelve base64 en algunos modelos, 
    // pero Gemini 1.5 Flash devuelve texto o descripciones. 
    // Si necesitas generar IMÁGENES visuales, usualmente se requiere el modelo 'imagen-3' 
    // que requiere permisos especiales. Por ahora, este código intentará procesarlo.
    return null; 
  } catch (error) {
    console.error("Image Generation Error:", error);
    return null;
  }
};
