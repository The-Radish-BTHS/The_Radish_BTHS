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
  <NextLink href={href} passHref target={external ? "_blank" : ""}>
    <ChakraLink {...rest} target={external ? "_blank" : ""}>
      {children}
    </ChakraLink>
  </NextLink>
);

export default Link;
