import { useProgressBar } from "@hooks/useProgressBar";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider as JotaiProvider } from "jotai";
import { theme } from "@theme/index";
import { SessionProvider } from "next-auth/react";

import "./global.css";

function MyApp({ Component, pageProps }: AppProps) {
  useProgressBar();

  return (
    <SessionProvider session={pageProps.session}>
      <JotaiProvider>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </JotaiProvider>
    </SessionProvider>
  );
}

export default MyApp;
