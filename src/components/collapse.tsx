import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Divider,
  Heading,
} from "@chakra-ui/react";
import React from "react";

const Collapse: React.FC<
  React.PropsWithChildren<{
    title: string;
  }>
> = ({ title, children }) => {
  return (
    <AccordionItem mb="1.5rem">
      <AccordionButton>
        <Heading flex={1} textAlign="left" pl="0.4rem">
          {title}{" "}
        </Heading>
        <AccordionIcon boxSize="1.8rem" />
      </AccordionButton>
      <Divider borderColor="#636363" />
      <AccordionPanel pt="1.5rem" px={{ base: "0.5rem", md: "2.5rem" }}>
        <Box>{children}</Box>
      </AccordionPanel>
    </AccordionItem>
  );
};

export default Collapse;
