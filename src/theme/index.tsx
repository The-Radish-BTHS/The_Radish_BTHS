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
          bg: "newGrays.900",
          color: "newGrays.0",
        },
      },
    },
  },
  withDefaultColorScheme({ colorScheme: "pink" }),
  withDefaultVariant({ variant: "filled", components: ["Input", "Textarea"] })
);
