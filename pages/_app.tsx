import type { AppProps } from "next/app";
import "../styles/globals.css";
import { AppContextProvider } from "../src/context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppContextProvider>
      <Component {...pageProps} />
    </AppContextProvider>
  );
}

export default MyApp;
