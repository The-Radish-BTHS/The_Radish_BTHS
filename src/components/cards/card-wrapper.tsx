import { Flex, FlexProps } from "@chakra-ui/react";
import React from "react";

const CardWrapper: React.FC<React.PropsWithChildren<FlexProps>> = ({
  children,
  ...rest
}) => {
  return (
    <Flex
      border="1px solid black"
      borderRadius="0.5rem"
      w="fit-content"
      flexDir="column"
      _hover={{
        boxShadow: "0 12px 16px 0 rgba(0,0,0,0.24)",
        transitionDuration: "0.4s",
      }}
      {...rest}>
      {children}
    </Flex>
  );
};

export default CardWrapper;
