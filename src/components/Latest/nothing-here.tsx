import { Flex, FlexProps, Text } from "@chakra-ui/react";

const NothingHere: React.FC<FlexProps> = ({ ...rest }) => {
  return (
    <Flex
      w="80vw"
      h="75vh"
      border="1px dashed black"
      borderRadius="1.5rem"
      alignItems="center"
      justifyContent="center"
      mt="2rem"
      {...rest}>
      <Text fontWeight="600" fontSize="2rem">
        Nothing here yet!
      </Text>
    </Flex>
  );
};

export default NothingHere;
