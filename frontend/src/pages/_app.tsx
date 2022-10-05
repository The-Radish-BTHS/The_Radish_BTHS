import { useProgressBar } from "@hooks/useProgressBar";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider as JotaiProvider } from "jotai";
import { theme } from "@theme/index";

function MyApp({ Component, pageProps }: AppProps) {
  useProgressBar();

  return (
    <JotaiProvider>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </JotaiProvider>
  );
}

export default MyApp;
