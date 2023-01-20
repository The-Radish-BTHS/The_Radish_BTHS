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
          bg: "#ebeae5", //"#333333",
          color: "#141414", //"black", //white,
        },
      },
    },
  },
  withDefaultColorScheme({ colorScheme: "gray" }),
  withDefaultVariant({ variant: "filled", components: ["Input", "Textarea"] })
);
