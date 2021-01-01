import React, { useEffect } from "react";
import { useApi } from "../../contexts/api";

const CityWeather = () => {
  const { fetchWeatherForCity } = useApi();

  useEffect(() => {
    (async () => console.log((await fetchWeatherForCity(4864)).data))();
  }, [fetchWeatherForCity]);

  return <div>Hello City!</div>;
};

export default CityWeather;
