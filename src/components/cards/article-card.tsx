import { Center, Flex, Heading, Image, Text } from "@chakra-ui/react";
import Link from "@components/shared/link";

const ArticleCard: React.FC<{
  title: string;
  description: string;
  issueTime: string;
  author: string;
  id: string;
  expand?: boolean;
}> = ({ title, description, issueTime, author, id, expand }) => {
  return (
    <Link
      href={`/articles/${id}`}
      w="fit-content"
      flex={expand ? 1 : "none"}
      border="1px solid black"
      borderRadius="0.5rem"
      _hover={{
        boxShadow: "0 12px 16px 0 rgba(0,0,0,0.24)",
        transitionDuration: "0.4s",
      }}>
      <Center
        p="0.75rem"
        flexDir="column"
        w={{ base: "94vw", sm: "50vw", md: "40vw", lg: "25vw" }}
        overflow="hidden">
        <Heading w="100%" fontSize="1.5rem" mb="0.5rem">
          {title}
        </Heading>
        <Text
          fontSize="1.1rem"
          wordBreak="break-word"
          w="100%"
          textAlign="left"
          ml="1.5rem">
          {description}
        </Text>
        <Text fontSize="0.9rem" w="100%" mt="0.5rem">
          {author}
          <span style={{ fontWeight: "bold" }}> ∙ </span>
          {issueTime}
        </Text>
      </Center>
    </Link>
  );
};

export default ArticleCard;
