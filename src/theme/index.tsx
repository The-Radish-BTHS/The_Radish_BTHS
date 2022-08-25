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
          bg: "theme.bg",
          color: "theme.color",
        },
      },
    },
  },
  withDefaultColorScheme({ colorScheme: "pink" }),
  withDefaultVariant({ variant: "filled", components: ["Input", "Textarea"] })
);
