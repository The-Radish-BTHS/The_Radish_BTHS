import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Divider,
  Flex,
  Heading,
} from "@chakra-ui/react";
import React from "react";

const Collapse: React.FC<
  React.PropsWithChildren<{
    title: string;
    empty?: boolean;
  }>
> = ({ title, empty, children }) => {
  console.log(children, !!children);
  return (
    <AccordionItem mb="1.5rem">
      <AccordionButton>
        <Heading flex={1} textAlign="left" pl="0.4rem">
          {title}{" "}
        </Heading>
        <AccordionIcon boxSize="1.8rem" />
      </AccordionButton>
      <Divider borderColor="#636363" />
      <AccordionPanel pt="1.5rem">
        {children && !empty ? (
          <Box>{children}</Box>
        ) : (
          <Flex h="20rem" w="100%" justifyContent="center" alignItems="center">
            <Heading>All Clear!</Heading>
          </Flex>
        )}
      </AccordionPanel>
    </AccordionItem>
  );
};

export default Collapse;
