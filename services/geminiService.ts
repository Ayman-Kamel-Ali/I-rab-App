
import { GoogleGenAI, Type } from "@google/genai";
import { SentenceAnalysisResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const ANALYSIS_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    fullSentence: { type: Type.STRING },
    overallStructure: { type: Type.STRING, description: "General description of the sentence type (Nominal or Verbal)" },
    words: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          word: { type: Type.STRING },
          partOfSpeech: { type: Type.STRING, description: "Part of speech in Arabic" },
          grammaticalCase: { type: Type.STRING, description: "The I'rab state (Marfu, Mansub, etc.)" },
          inflectionSign: { type: Type.STRING, description: "The sign of I'rab (Damma, Fatha, etc.)" },
          reason: { type: Type.STRING, description: "Why this word has this specific case" },
          notes: { type: Type.STRING, description: "Optional extra grammatical context" }
        },
        required: ["word", "partOfSpeech", "grammaticalCase", "inflectionSign", "reason"]
      }
    }
  },
  required: ["fullSentence", "overallStructure", "words"]
};

export const analyzeArabicSentence = async (sentence: string): Promise<SentenceAnalysisResponse> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `Perform a detailed grammatical analysis (I'rab الإعراب) of the following Arabic sentence: "${sentence}". 
      Break it down word by word. For each word, provide:
      1. The word itself.
      2. Part of speech (فعل، اسم، حرف، إلخ).
      3. Grammatical case (مرفوع، منصوب، مجرور، مجزوم) or if it is 'Mabni' (مبني).
      4. The inflection sign (علامة الإعراب).
      5. The reason/position (e.g., fāʿil, mafʿūl bihi, etc.).
      
      Respond only in Arabic for the content values.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: ANALYSIS_SCHEMA,
        temperature: 0.1, // Low temperature for accuracy in grammar
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as SentenceAnalysisResponse;
  } catch (error) {
    console.error("Error analyzing sentence:", error);
    throw error;
  }
};
