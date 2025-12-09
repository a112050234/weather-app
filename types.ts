export interface City {
  name: string;
  lat: number;
  lng: number;
  imageUrl: string;
  country: string;
}

export interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  precipitationProb: number;
  isDay: number;
  weatherCode: number;
  sunset: string;
}

export interface WeatherResponse {
  current_weather: {
    temperature: number;
    windspeed: number;
    weathercode: number;
    is_day: number;
    time: string;
  };
  hourly: {
    relativehumidity_2m: number[];
    precipitation_probability: number[];
    time: string[];
  };
  daily: {
    sunset: string[];
    time: string[];
  };
}