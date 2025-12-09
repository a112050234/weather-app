import { WeatherData, WeatherResponse } from '../types';

export const fetchWeatherData = async (lat: number, lng: number): Promise<WeatherData> => {
  try {
    // Open-Meteo API endpoint
    // We request current weather + hourly for humidity/precip + daily for sunset
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true&hourly=relativehumidity_2m,precipitation_probability&daily=sunset&timezone=auto`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }

    const data: WeatherResponse = await response.json();

    // Map Open-Meteo data structure to our flat WeatherData interface
    // Note: Open-Meteo "current_weather" doesn't have humidity/precip, so we take the current hour from "hourly"
    const currentHourIndex = new Date().getHours();
    
    // Safety check for array bounds
    const safeIndex = Math.min(currentHourIndex, data.hourly.relativehumidity_2m.length - 1);

    const weatherData: WeatherData = {
      temperature: data.current_weather.temperature,
      windSpeed: data.current_weather.windspeed,
      weatherCode: data.current_weather.weathercode,
      isDay: data.current_weather.is_day,
      humidity: data.hourly.relativehumidity_2m[safeIndex] || 0,
      precipitationProb: data.hourly.precipitation_probability[safeIndex] || 0,
      sunset: data.daily.sunset[0] ? data.daily.sunset[0].split('T')[1] : '--:--',
    };

    return weatherData;

  } catch (error) {
    console.error("Error fetching weather:", error);
    throw error;
  }
};

// Helper to get text description from WMO code
export const getWeatherDescription = (code: number): string => {
  const codes: Record<number, string> = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Fog',
    48: 'Depositing rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    71: 'Slight snow',
    73: 'Moderate snow',
    75: 'Heavy snow',
    77: 'Snow grains',
    80: 'Slight rain showers',
    81: 'Moderate rain showers',
    82: 'Violent rain showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with slight hail',
    99: 'Thunderstorm with heavy hail',
  };
  return codes[code] || 'Unknown';
};