import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import { CircularProgress, Tooltip, Typography } from "@material-ui/core";
import { useWeather } from "../../contexts/weather";
import { WiDaySunny } from "weather-icons-react";

const useStyles = makeStyles(({ palette }) => ({
  card: {
    borderRadius: 12,
    minWidth: 256,
    textAlign: "center",
  },
  weather: {
    fontSize: "3rem",
    fontWeight: "bold",
    fontFamily: "Roboto Slab",
    letterSpacing: "0.5px",
    marginTop: 8,
    marginBottom: 0,
  },
  locationSubheader: {
    fontSize: "2rem",
    fontFamily: "Yellowtail",
    letterSpacing: "0.5px",
    color: palette.grey[500],
    marginBottom: "0.875em",
  },
  statLabel: {
    fontSize: 16,
    color: palette.grey[500],
    fontWeight: 500,
    fontFamily: "Roboto",
    margin: 0,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Roboto Slab",
    marginBottom: 4,
    letterSpacing: "1px",
  },
  progress: {
    marginTop: 30,
    marginBottom: 30,
  },
  currentWeather: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export const WeatherCard = () => {
  const styles = useStyles();
  const { currentWeather, location, loading } = useWeather();
  const showIcon = Boolean(currentWeather && !loading);
  const [showDetails, setShowDetails] = useState(false);
  const theme = useTheme();
  return (
    <Card className={styles.card}>
      <CardContent className={styles.currentWeather}>
        {showIcon ? (
          <Tooltip title={currentWeather?.sky || ""}>
            <WiDaySunny size={120} color={theme.palette.secondary.main} />
          </Tooltip>
        ) : (
          <CircularProgress className={styles.progress} size={60} />
        )}
        <Typography variant="h1" className={styles.weather}>
          {(currentWeather && `${currentWeather.temperature.toFixed(1)}°C`) ||
            ""}
        </Typography>
      </CardContent>
      <Typography
        className={styles.locationSubheader}
      >{`en ${location.name}`}</Typography>
      <Divider light />
      <Box display={"flex"}>
        <Box p={2} flex={"auto"}>
          <p className={styles.statLabel}>Viento</p>
          <p className={styles.statValue}>
            {(currentWeather && `${currentWeather.wind?.speed} KM/h`) || ""}
          </p>
        </Box>
        <Box p={2} flex={"auto"}>
          <p className={styles.statLabel}>Sensación Térmica</p>
          <p className={styles.statValue}>
            {currentWeather?.feels_like
              ? `${currentWeather?.feels_like}°C`
              : "No hay datos"}
          </p>
        </Box>
      </Box>
    </Card>
  );
};

export default WeatherCard;
