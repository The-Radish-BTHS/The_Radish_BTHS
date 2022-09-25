import { Center, Flex, Heading, Image, Text } from "@chakra-ui/react";

const IssueCard: React.FC<{
  cover: string;
  description: string;
  issueTime: string;
}> = ({ cover, description, issueTime }) => {
  return (
    <Flex
      mt="2rem"
      flexDir="column"
      w={{ base: "94vw", sm: "50vw", md: "40vw", lg: "25vw" }}
      border="1px solid black"
      borderRadius="0.5rem"
      overflow="hidden"
      _hover={{
        boxShadow: "0 12px 16px 0 rgba(0,0,0,0.24)",
        transitionDuration: "0.4s",
      }}>
      <Image src={cover} alt="recent-cover" w="100%" />
      <Center p="0.75rem" borderTop="1px solid black" flexDir="column">
        <Heading w="100%" fontSize="1.5rem" mb="1rem">
          {issueTime}
        </Heading>
        <Text fontSize="1.1rem" wordBreak="break-word" maxW="100%">
          {description}
        </Text>
      </Center>
    </Flex>
  );
};

export default IssueCard;
