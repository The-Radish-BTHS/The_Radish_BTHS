import {
  Center,
  Flex,
  FlexProps,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import Link from "@components/shared/link";

interface CardProps extends FlexProps {
  title: string;
  description: string;
  issueTime: string;
  author: string;
  id: string;
  expand?: boolean;
}
const ArticleCard: React.FC<CardProps> = ({
  title,
  description,
  issueTime,
  author,
  id,
  expand,
  ...rest
}) => {
  return (
    <Flex
      flex={expand ? 1 : "none"}
      border="1px solid black"
      borderRadius="0.5rem"
      w="fit-content"
      _hover={{
        boxShadow: "0 12px 16px 0 rgba(0,0,0,0.24)",
        transitionDuration: "0.4s",
      }}
      {...rest}>
      <Link href={`/articles/${id}`}>
        <Center
          p="0.75rem"
          flexDir="column"
          w={{ base: "94vw", md: "40vw", lg: "25vw" }}
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
    </Flex>
  );
};

export default ArticleCard;
