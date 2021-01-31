import {
  Card,
  CardContent,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { format, parseISO } from "date-fns";
import es from "date-fns/locale/es";
import React from "react";
import { useWeather } from "../../contexts/weather";
import { Forecast } from "../../types";
import WeatherIcon from "../weather-icon";

const useStyles = makeStyles(({ palette }) => ({
  card: {
    borderRadius: 12,
    minWidth: 256,
    textAlign: "center",
  },
  temperature: {
    fontFamily: "Roboto Slab",
  },
}));

const ForecastItem = (forecast: Forecast) => {
  const classes = useStyles();
  return (
    <ListItem>
      <ListItemAvatar>
        <WeatherIcon size={24} id={forecast.morning?.weather.id || 0} />
      </ListItemAvatar>
      <ListItemText
        primary={format(parseISO(forecast.date), "EEEE", { locale: es })}
        secondary={`${forecast.morning?.weather.description} por la mañana`}
      />
      <ListItemSecondaryAction>
        <Typography className={classes.temperature}>
          {`${forecast.temp_min}°C / ${forecast.temp_max}°C`}
        </Typography>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

const ForecastCard = () => {
  const { forecastReport } = useWeather();
  const classes = useStyles();
  const [, ...days] = forecastReport?.forecast || [];

  return (
    <Card className={classes.card}>
      <CardContent>
        <List subheader={<ListSubheader>Pronóstico</ListSubheader>}>
          {forecastReport ? days.map(day => <ForecastItem key={day.date} {...day} />) : null}
        </List>
      </CardContent>
    </Card>
  );
};

export default ForecastCard;
