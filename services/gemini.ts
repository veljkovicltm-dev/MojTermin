import { GoogleGenAI } from "@google/genai";
import { MOCK_BUSINESSES } from "../constants";

export const getAIResponse = async (userInput: string, history: any[] = [], language: string = 'sr'): Promise<string> => {
  // Inicijalizacija klijenta koristeći isključivo process.env.API_KEY sa named parametrom
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const salonsInfo = MOCK_BUSINESSES.map(b => ({
    name: b.name,
    category: b.category,
    city: b.city,
    services: b.services.map(s => s.name).join(', ')
  }));

  const systemInstruction = `
    Vi ste "MojTermin" AI concierge asistent. 
    Vaš zadatak je da pomažete korisnicima da pronađu usluge u kozmetičkim salonima, teretanama i spa centrima.
    Jezik komunikacije: ${language === 'en' ? 'ENGLESKI' : 'SRPSKI'}.
    
    Dostupni podaci o salonima: ${JSON.stringify(salonsInfo)}.
    
    Pravila:
    1. Budite profesionalni i koncizni.
    2. Preporučujte isključivo salone iz baze podataka.
    3. Ako korisnik pita za grad koji nije na listi, reci da trenutno pokrivamo Beograd i Novi Sad.
    4. Fokusirajte se na zakazivanje termina.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [{ role: 'user', parts: [{ text: userInput }] }],
      config: { 
        systemInstruction: systemInstruction,
        temperature: 0.7 
      }
    });

    // .text je getter svojstvo, ne poziva se kao funkcija
    const text = response.text;
    return text || (language === 'sr' ? "Izvini, ne mogu trenutno da odgovorim." : "Sorry, I can't answer right now.");
  } catch (err) {
    console.error('Gemini API error:', err);
    return language === 'sr' ? "Došlo je do greške u komunikaciji sa AI." : "Error communicating with AI assistant.";
  }
};