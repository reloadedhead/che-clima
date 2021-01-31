interface WindReport {
  direction: string;
  deg: number;
  speed?: number;
  speed_range?: number[]
}

/**
 * ¿Por qué devolverían semejante guarangada?
 */
export type LocationSearchItem = (string | number)[];

export interface Location {
  id: number;
  name: string;
  department: string;
  province: string;
  type: string;
  coord: {
    lon: number;
    lat: number;
  };
  distance: number;
}

export interface WeatherReport {
  date: string;
  humidity: number;
  pressure: number;
  feels_like: number | null;
  temperature: number;
  visibility: number;
  weather: {
    description: string;
    id: number;
  };
  wind: WindReport;
  station_id: number;
  location: Location;
}

export interface SunReport {
  location: number;
  date: string;
  sun: {
    sunrise: string;
    sunset: string;
  };
}

interface RangedForecast {
  humidity: number;
  rain_prob_range: number[];
  gust_range: number[] | null;
  temperature: number;
  visibility: string;
  weather: {
    description: string;
    id: number;
  };
  wind: WindReport;
  river: string | null;
  border: string | null;
}

export interface Forecast {
  date: string;
  temp_min: number;
  temp_max: number;
  humidity_min: number;
  humidity_max: number;
  early_morning: RangedForecast | null;
  morning: RangedForecast | null;
  afternoon: RangedForecast | null;
  night: RangedForecast | null;
}

export interface ForecastReport {
  updated: string;
  location: Location;
  forecast: Forecast[];
}
