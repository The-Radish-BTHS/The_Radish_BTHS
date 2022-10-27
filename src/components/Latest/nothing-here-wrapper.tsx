import { Flex, FlexProps, Text } from "@chakra-ui/react";

interface NothingHereWrapperProps extends FlexProps {
  valid: boolean;
}

const NothingHereWrapper: React.FC<
  React.PropsWithChildren<NothingHereWrapperProps>
> = ({ valid, children, ...rest }) => {
  return valid ? (
    <>{children}</>
  ) : (
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

export default NothingHereWrapper;
