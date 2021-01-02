import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "./contexts/auth";
import { ApiProvider } from "./contexts/api";
import AppShell from "./components/app-shell";
<<<<<<< HEAD
=======
import { useMediaQuery, createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import { WeatherProvider } from "./contexts/weather";

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
            main: "#FFB719"
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
  )
};
>>>>>>> 6968c90... add: weather context

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <ApiProvider>
<<<<<<< HEAD
        <AppShell />
=======
        <WeatherProvider>
          <ThemedApp />
        </WeatherProvider>
>>>>>>> 6968c90... add: weather context
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
