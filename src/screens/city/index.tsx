import { createStyles, Grid, makeStyles, Theme } from "@material-ui/core";
import React, { useEffect } from "react";
import WeatherCard from "../../components/weather-card";
import { useWeather } from "../../contexts/weather";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      [theme.breakpoints.up("md")]: {
        marginRight: "20%",
        marginLeft: "20%",
      },
    },
  })
);

const CityWeather = () => {
  const { getCurrentWeather } = useWeather();
  const styles = useStyles();
  useEffect(() => {
    (async () => await getCurrentWeather())();
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} className={styles.card}>
        <WeatherCard />
      </Grid>
    </Grid>
  );
};

export default CityWeather;
