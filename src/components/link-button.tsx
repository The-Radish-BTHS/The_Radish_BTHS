import NextLink from "next/link";
import {
  Button,
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from "@chakra-ui/react";

interface LinkProps extends ChakraLinkProps {
  href: string;
  external?: boolean;
}

const LinkButton: React.FC<React.PropsWithChildren<LinkProps>> = ({
  href,
  external,
  children,
  ...rest
}) => {
  return (
    <NextLink href={href} passHref target={external ? "_blank" : ""}>
      <ChakraLink
        {...rest}
        target={external ? "_blank" : ""}
        border="1px solid black"
        p="0.25rem 1rem"
        fontSize="1.25rem"
        fontWeight={600}
        borderRadius="0.5rem"
        _hover={{ background: "rgba(222, 222, 222, 0.8)" }}
        _active={{ background: "transparent" }}
        display="flex"
        alignItems="center">
        {children}
      </ChakraLink>
    </NextLink>
  );
};

export default LinkButton;
