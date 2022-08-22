import NextLink from "next/link";
import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from "@chakra-ui/react";

interface LinkProps extends ChakraLinkProps {
  href: string;
}

const Link: React.FC<React.PropsWithChildren<LinkProps>> = ({
  href,
  children,
  ...rest
}) => (
  <NextLink href={href} passHref>
    <ChakraLink {...rest}>{children}</ChakraLink>
  </NextLink>
);

export default Link;
