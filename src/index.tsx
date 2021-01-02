import React, { useMemo } from "react";
import ReactDOM from "react-dom";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "./contexts/auth";
import { ApiProvider } from "./contexts/api";
import AppShell from "./components/app-shell";
import {
  useMediaQuery,
  createMuiTheme,
  MuiThemeProvider,
} from "@material-ui/core";
import { WeatherProvider } from "./contexts/weather";
import { BrowserRouter } from "react-router-dom";

const ThemedApp = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = useMemo(
    () =>
      createMuiTheme({
        palette: {
          primary: {
            main: "#0190D0",
          },
          secondary: {
            main: "#FFB719",
          },
          type: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );
  return (
    <MuiThemeProvider theme={theme}>
      <AppShell />
    </MuiThemeProvider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <ApiProvider>
        <WeatherProvider>
          <BrowserRouter>
            <ThemedApp />
          </BrowserRouter>
        </WeatherProvider>
      </ApiProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
