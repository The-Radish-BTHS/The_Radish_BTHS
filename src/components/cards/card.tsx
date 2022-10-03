import {
  Center,
  Divider,
  Flex,
  FlexProps,
  Heading,
  Image,
} from "@chakra-ui/react";
import Link from "@components/shared/link";
import React from "react";
import CardTag from "./card-tag";

interface CardProps extends FlexProps {
  link: string;
  header?: string;
  image?: string;
  tags?: { name: string; id: string }[];
}

const Card: React.FC<React.PropsWithChildren<CardProps>> = ({
  link,
  header,
  image,
  tags,
  children,
  ...rest
}) => {
  return (
    <Flex
      border="1px solid black"
      borderRadius="0.5rem"
      w="fit-content"
      flexDir="column"
      overflow="hidden"
      _hover={{
        boxShadow: "0 12px 16px 0 rgba(0,0,0,0.24)",
        transitionDuration: "0.4s",
      }}
      {...rest}>
      <Link href={link}>
        {image && (
          <Image src={image} alt="cover" w="100%" borderBottom="1px solid" />
        )}
        <Center
          p="0.75rem"
          flexDir="column"
          w={{ base: "94vw", md: "40vw", lg: "25vw" }}>
          {header && (
            <Heading w="100%" fontSize="1.5rem" mb="0.5rem">
              {header}
            </Heading>
          )}
          {children}
        </Center>
      </Link>
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
              <>
                <CardTag {...tag} key={i} />
                {i + 1 !== tags.length && (
                  <span style={{ fontWeight: "bold" }}> ∙ </span>
                )}
              </>
            ))}
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};

export default Card;
