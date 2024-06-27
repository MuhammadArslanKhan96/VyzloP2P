import AppContextProvider from "@/context/AppContext";
import { TelegramProvider } from "@/context/TelegramProvider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <TelegramProvider>
        <AppContextProvider>
          <Component {...pageProps} />
        </AppContextProvider>
      </TelegramProvider>
    </>
  );
}
