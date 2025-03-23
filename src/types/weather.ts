
export interface WeatherData {
  location: string;
  date: string;
  temperature: {
    current: number;
    min: number;
    max: number;
    feelsLike: number;
  };
  humidity: number;
  windSpeed: number;
  conditions: string;
  icon: string;
  forecast: WeatherForecast[];
}

export interface WeatherForecast {
  date: string;
  temperature: {
    min: number;
    max: number;
  };
  conditions: string;
  icon: string;
}

export interface ClothingRecommendation {
  temperature: string;
  recommendations: string[];
  notes: string;
}
