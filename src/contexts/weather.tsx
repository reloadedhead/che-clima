import { createContext, ReactNode, useContext, useState } from "react";
import { ForecastReport, SunReport, WeatherReport, Location } from "../types";
import { useApi } from "./api";

interface WeatherContext {
  location: Location;
  currentWeather?: WeatherReport;
  forecastReport?: ForecastReport;
  sunReport?: SunReport;
  loading: boolean;
  setLocation: (newLocation: Location) => void;
  getCurrentWeather: () => Promise<void>;
  getForecast: () => Promise<void>;
  getSunReport: () => Promise<void>;
}

const initialState: WeatherContext = {
  location: {
    id: 4864,
    name: "Capital Federal",
    department: "Capital Federal",
    province: "Capital Federal",
    type: "Ciudad",
    coord: { lon: -58.4258, lat: -34.6217 },
    distance: 6.38,
  },
  loading: false,
  setLocation: (newLocation: Location) => {},
  getCurrentWeather: () => new Promise(() => {}),
  getForecast: () => new Promise(() => {}),
  getSunReport: () => new Promise(() => {}),
};

const WeatherContext = createContext(initialState);

export const WeatherProvider = ({ children }: { children: ReactNode }) => {
  const [location, setLocation] = useState<Location>(initialState.location);
  const [currentWeather, setCurrentWeather] = useState<WeatherReport>();
  const [forecastReport, setForecastReport] = useState<ForecastReport>();
  const [sunReport, setSunReport] = useState<SunReport>();
  const [loading, setLoading] = useState(false);

  const {
    fetchForecastForCity,
    fetchSunInformationForCity,
    fetchWeatherForCity,
  } = useApi();

  const getCurrentWeather = async () => {
    try {
      setLoading(true);
      setCurrentWeather((await fetchWeatherForCity(location.id)).data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getForecast = async () => {
    try {
      setLoading(true);
      setForecastReport((await fetchForecastForCity(location.id)).data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getSunReport = async () => {
    try {
      setLoading(true);
      setSunReport((await fetchSunInformationForCity(location.id)).data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <WeatherContext.Provider
      value={{
        location,
        currentWeather,
        forecastReport,
        sunReport,
        setLocation,
        getCurrentWeather,
        getForecast,
        getSunReport,
        loading,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => useContext(WeatherContext);
