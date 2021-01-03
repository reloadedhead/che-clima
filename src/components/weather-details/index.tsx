import React from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  useTheme,
} from "@material-ui/core";
import { useWeather } from "../../contexts/weather";
import {
  WiBarometer,
  WiHumidity,
  WiDust,
  WiSunrise,
  WiSunset,
} from "weather-icons-react";

interface WeatherDetail {
  label: string;
  value: string;
  icon: JSX.Element;
}

const WeatherDetailItem = (detail: WeatherDetail) => (
  <ListItem>
    <ListItemIcon>{detail.icon}</ListItemIcon>
    <ListItemText primary={detail.label} />
    <ListItemSecondaryAction>
      <span>{detail.value}</span>
    </ListItemSecondaryAction>
  </ListItem>
);

const WeatherDetails = () => {
  const { currentWeather, sunReport } = useWeather();
  const theme = useTheme();

  const details: WeatherDetail[] = [
    {
      label: "Humedad",
      value: `${currentWeather?.humidity}%`,
      icon: <WiHumidity size={36} color={theme.palette.text.primary} />,
    },
    {
      label: "Presión atmosférica",
      value: `${currentWeather?.pressure} HPa`,
      icon: <WiBarometer size={36} color={theme.palette.text.primary} />,
    },
    {
      label: "Visibilidad",
      value: `${currentWeather?.visibility} Km`,
      icon: <WiDust size={36} color={theme.palette.text.primary} />,
    },
    {
      label: "Amanecer",
      value: `${sunReport?.sun.sunrise}`,
      icon: <WiSunrise size={36} color={theme.palette.text.primary} />,
    },
    {
      label: "Atardecer",
      value: `${sunReport?.sun.sunset}`,
      icon: <WiSunset size={36} color={theme.palette.text.primary} />,
    },
  ];

  return (
    <List>
      {details.map(detail => <WeatherDetailItem key={detail.label} {...detail} />)}
    </List>
  );
};

export default WeatherDetails;
