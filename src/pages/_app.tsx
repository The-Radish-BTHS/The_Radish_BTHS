import { useProgressBar } from "@hooks/useProgressBar";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "@theme/index";
import { SessionProvider } from "next-auth/react";

import "./global.css";
import { trpc } from "@lib/trpc";
import { Analytics } from "@vercel/analytics/react";

const MyApp = ({ Component, pageProps }: AppProps) => {
  useProgressBar();

  return (
    <SessionProvider session={pageProps.session}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
        <Analytics />
      </ChakraProvider>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
