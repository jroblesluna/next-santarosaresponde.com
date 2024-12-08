import type { AppProps } from "next/app";

import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useRouter } from "next/router";

import { RespuestaProvider } from "@/context/RespuestaContext";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <NextUIProvider navigate={router.push}>
      <NextThemesProvider>
        <RespuestaProvider>
          <Component {...pageProps} />
        </RespuestaProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
