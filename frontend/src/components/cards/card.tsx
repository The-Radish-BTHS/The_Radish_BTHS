import {
  Center,
  Divider,
  Flex,
  FlexProps,
  LinkProps,
  Heading,
  Image,
} from "@chakra-ui/react";
import Link from "@components/shared/link";
import React from "react";
import CardTag from "./card-tag";

interface SometimesLinkProps extends LinkProps {
  exists: boolean;
  href: string;
}

const SometimesLink: React.FC<React.PropsWithChildren<SometimesLinkProps>> = ({
  href,
  exists,
  children,
  ...rest
}) => {
  return exists ? (
    <Link href={href} {...rest}>
      {children}
    </Link>
  ) : (
    <>{children}</>
  );
};

interface CardProps extends FlexProps {
  link: string;
  header?: string;
  image?: string;
  tags?: { name: string; id: string }[];
  outerStyles?: FlexProps;
}

const Card: React.FC<React.PropsWithChildren<CardProps>> = ({
  link,
  header,
  image,
  tags,
  children,
  outerStyles,
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
      {...outerStyles}>
      <SometimesLink href={link} exists={link !== ""}>
        {image && (
          <Image
            src={image}
            alt="cover"
            w="100%"
            borderBottom="1px solid"
            borderTopRadius="0.5rem"
          />
        )}
        <Center
          p="0.75rem"
          flexDir="column"
          w={{ base: "94vw", md: "40vw", lg: "25vw" }}
          {...rest}>
          {header && (
            <Heading w="100%" fontSize="1.5rem" mb="0.5rem">
              {header}
            </Heading>
          )}
          {children}
        </Center>
      </SometimesLink>
      {tags && tags.length > 0 && (
        <Flex flexDir="column">
          <Flex px="0.75rem">
            <Divider borderColor="black" />
          </Flex>
          <Flex
            p="0.75rem"
            flexWrap="wrap"
            maxW={{ base: "94vw", md: "40vw", lg: "25vw" }}>
            {tags.map((tag, i) => (
              <CardTag {...tag} key={i} />
            ))}
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};

export default Card;
