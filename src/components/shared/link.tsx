import NextLink from "next/link";
import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from "@chakra-ui/react";

interface LinkProps extends ChakraLinkProps {
  href: string;
  external?: boolean;
}

const Link: React.FC<React.PropsWithChildren<LinkProps>> = ({
  href,
  children,
  external,
  ...rest
}) => (
  <ChakraLink
    as={NextLink}
    {...rest}
    href={href}
    target={external ? "_blank" : ""}>
    {children}
  </ChakraLink>
);

export default Link;
