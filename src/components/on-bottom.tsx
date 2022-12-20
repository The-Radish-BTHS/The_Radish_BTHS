import { Box } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { useInView } from "react-intersection-observer";

export const OnBottom: React.FC<
  PropsWithChildren<{ onBottom: () => void }>
> = ({ children, onBottom }) => {
  const { ref, inView } = useInView();

  if (inView) onBottom();

  return (
    <Box>
      {children}
      <Box ref={ref} w="1" h="1" />
    </Box>
  );
};
