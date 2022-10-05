import { useBreakpointValue } from "@chakra-ui/react";

export const useIsMobile = (bp: "md" | "lg" | "xl" | "2xl" = "md") => {
  const isMobile = useBreakpointValue({ base: true, [bp]: false });
  return isMobile;
};
