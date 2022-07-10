import { useProgressBar } from "@hooks/useProgressBar";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider as JotaiProvider } from "jotai";
import { theme } from "@theme/index";

function MyApp({ Component, pageProps }: AppProps) {
  useProgressBar();

  return (
    <JotaiProvider>
      <SessionProvider>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </SessionProvider>
    </JotaiProvider>
  );
}

export default MyApp;
