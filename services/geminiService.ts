import { GoogleGenAI } from "@google/genai";
import { REPORT_CONTEXT } from "../constants";

const apiKey = process.env.API_KEY || '';
// Initialize safe client creation
const createClient = () => {
    if (!apiKey) {
        console.error("API_KEY is missing");
        return null;
    }
    return new GoogleGenAI({ apiKey });
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  const client = createClient();
  if (!client) return "Error: API Key not configured. Please check your environment variables.";

  try {
    const response = await client.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: message,
      config: {
        systemInstruction: `You are an expert Coffee Export Consultant specializing in trade between Venezuela and Kazakhstan. 
        
        Use the following Technical Report as your primary knowledge base to answer questions:
        ---
        ${REPORT_CONTEXT}
        ---
        
        Guidelines:
        1. Be professional, technical, yet accessible.
        2. If the user asks about logistics, pricing, or quality, refer specifically to the data in the report (e.g., using Ecotact bags, CIP Incoterm, Middle Corridor route).
        3. Format your answers with clear headings or bullet points where appropriate.
        4. If the answer is not in the context, use your general knowledge but mention that it falls outside the specific report scope.
        `,
      },
    });

    return response.text || "No response generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Lo siento, hubo un error al conectar con el asistente de IA. Por favor verifica tu conexión o clave API.";
  }
};

export const generateImage = async (prompt: string, aspectRatio: '16:9' | '3:4' | '4:3' | '1:1' = '1:1'): Promise<string | null> => {
  const client = createClient();
  if (!client) return null;

  try {
    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: prompt + ", photorealistic, cinematic lighting, 8k resolution, highly detailed, professional photography style, dark roast coffee aesthetic",
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: aspectRatio,
        },
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        const base64EncodeString = part.inlineData.data;
        return `data:image/png;base64,${base64EncodeString}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Image Generation Error:", error);
    return null;
  }
};