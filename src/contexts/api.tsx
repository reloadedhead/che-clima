import React, { createContext, ReactNode, useContext } from "react";
import axios, { AxiosPromise } from "axios";
import { ForecastReport, SunReport, WeatherReport } from "../types";
import { useAuth } from "./auth";

interface ApiContext {
  fetchWeatherForCity: (cityCode: number) => AxiosPromise<WeatherReport>;
  fetchShortTermWarningForCity: (cityCode: number) => AxiosPromise<any>;
  fetchSunInformationForCity: (cityCode: number) => AxiosPromise<SunReport>;
  fetchForecastForCity: (cityCode: number) => AxiosPromise<ForecastReport>;
}

const initialState: ApiContext = {
  fetchWeatherForCity: (_cityCode: number) => new Promise(() => {}),
  fetchForecastForCity: (_cityCode: number) => new Promise(() => {}),
  fetchShortTermWarningForCity: (_cityCode: number) => new Promise(() => {}),
  fetchSunInformationForCity: (_cityCode: number) => new Promise(() => {}),
};

const ApiContext = createContext(initialState);

export const ApiProvider = ({ children }: { children: ReactNode }) => {
  const { getToken } = useAuth();
  const smnApi = axios.create({
    baseURL: "https://ws1.smn.gob.ar/v1/",
  });
  smnApi.interceptors.request.use(async (request) => {
    request.headers = {
      Authorization: `JWT ${await getToken()}`,
    };
    return request;
  });

  const fetchWeatherForCity = (cityCode: number) =>
    smnApi.get(`weather/location/${cityCode}`);

  const fetchForecastForCity = (cityCode: number) =>
    smnApi.get(`forecast/location/${cityCode}`);

  const fetchShortTermWarningForCity = (cityCode: number) =>
    smnApi.get(`warning/shortterm/location/${cityCode}`);

  const fetchSunInformationForCity = (cityCode: number) =>
    smnApi.get(`sun/location/${cityCode}`);

  return (
    <ApiContext.Provider
      value={{
        fetchWeatherForCity,
        fetchForecastForCity,
        fetchShortTermWarningForCity,
        fetchSunInformationForCity,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => useContext(ApiContext);
