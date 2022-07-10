import {
  extendTheme,
  withDefaultColorScheme,
  withDefaultVariant,
} from "@chakra-ui/react";
import { colors } from "./colors";

export const theme = extendTheme(
  {
    colors,
    components: {},
    styles: {
      global: {
        body: {
          bg: "bg.900",
          color: "white",
        },
        pre: {
          bg: "red",
        },
      },
    },
  },
  withDefaultColorScheme({ colorScheme: "pink" }),
  withDefaultVariant({ variant: "filled", components: ["Input", "Textarea"] })
);
