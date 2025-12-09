import { GoogleGenAI } from "@google/genai";
import { WeatherData, City } from "../types";
import { getWeatherDescription } from "./weatherService";

// Helper to ensure we have a key
const getApiKey = (): string | undefined => {
  return process.env.API_KEY;
};

export const getOutfitRecommendation = async (city: City, weather: WeatherData): Promise<string> => {
  const apiKey = getApiKey();
  
  if (!apiKey) {
    console.warn("No API Key found for Gemini.");
    return "Please configure your Gemini API Key to receive personalized outfit advice.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    const weatherDesc = getWeatherDescription(weather.weatherCode);
    
    const prompt = `
      You are a high-end fashion stylist.
      The current weather in ${city.name} is:
      - Temperature: ${weather.temperature}°C
      - Condition: ${weatherDesc}
      - Humidity: ${weather.humidity}%
      - Wind Speed: ${weather.windSpeed} km/h
      - Rain Chance: ${weather.precipitationProb}%
      
      Please provide a concise, stylish "Outfit of the Day" recommendation. 
      Focus on materials, layers, and practical yet chic items suitable for this specific weather.
      Keep it under 80 words. Tone: Vogue magazine snippets, helpful but trendy.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Could not generate advice at this time.";

  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Our stylist is currently unavailable (AI Connection Error). Please try again later.";
  }
};