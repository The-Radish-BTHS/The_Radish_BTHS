import { Button as ChakraButton, ButtonProps } from "@chakra-ui/react";

const Button: React.FC<React.PropsWithChildren<ButtonProps>> = ({
  children,
  ...rest
}) => {
  return (
    <ChakraButton
      colorScheme="black"
      variant="outline"
      padding="1rem"
      fontSize="1.25rem"
      borderRadius="0.5rem"
      _hover={{ background: "rgba(222, 222, 222, 0.8)" }}
      _active={{ background: "transparent" }}
      {...rest}>
      {children}
    </ChakraButton>
  );
};

export default Button;
