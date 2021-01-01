import React, { createContext, ReactNode, useContext } from "react";
import cheerio from "cheerio";
import { decodeToken } from "../utils/functions";
import { isFuture } from 'date-fns'

interface AuthContext {
  getToken: () => Promise<string>;
}

const initialState: AuthContext = {
  getToken: () => new Promise(() => {}),
};

const AuthContext = createContext(initialState);

export const AuthProvider = ({ children }: { children: ReactNode }) => {

  /**
   * Acá parseamos el sitio del Servicio Metereológico Nacional
   * y buscamos el token que enchufan desde el server.
   * Atentis a ver si cambia (siendo estatal, dudo 😅)
   */
  const scrapeSiteForToken = async () => {
    const htmlResponse = await fetch("https://www.smn.gob.ar");
    const htmlBody = await htmlResponse.text();
    const tokenScriptNode = cheerio
      .load(htmlBody)(
        "div[class='panel-pane pane-block pane-smn-mapas-pimet-smn-mapas-pimet container']"
      )
      .children("div[class=pane-content]")
      .children("script")[0].children[0];
    // @ts-ignore
    const matchedStrings = (tokenScriptNode["data"] as string).match(
      /'(.*?)'/g
    );
    if (matchedStrings !== null && matchedStrings.length > 0) {
      return matchedStrings[1].substr(1, matchedStrings[1].length - 2);
    } else throw new Error();
  };

  /**
   * @param token JWT token scrapeado
   */
  const isValidToken = (token: string) => {
    const decoded = decodeToken(token);
    return isFuture(new Date((decoded['exp'] as number) * 1000))
  };

  /**
   * Guardamos el token en localStorage. Si no existe,
   * o se venció (24hs por ahora) se scrapea uno nuevo.
   */
  const getToken = async () => {
    const savedToken = localStorage.getItem("token");
    if (savedToken && isValidToken(savedToken)) {
      return savedToken;
    } else {
      const token = await scrapeSiteForToken();
      localStorage.setItem('token', token);
      return token;
    }
  };

  return (
    <AuthContext.Provider value={{ getToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
