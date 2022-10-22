import { Articard } from "@/types/article";
import { Center, Divider, Flex, Heading, Image, Text } from "@chakra-ui/react";
import Link from "@components/shared/link";
import CardWrapper from "./card-wrapper";
import TopicCard from "./topic-card";

const prune = (text: string, n: number = 90) =>
  text[n] == " " || text.length < n
    ? text.slice(0, n)
    : text.slice(0, n).slice(0, text.slice(0, n).lastIndexOf(" "));

const Articard: React.FC<Articard> = ({
  title,
  content,
  issue,
  authors,
  id,
  outerStyles,
  tags = [],
  ...rest
}) => {
  return (
    <CardWrapper w={{ base: "94vw", md: "40vw", lg: "25vw" }} {...outerStyles}>
      <Center flexDir="column" w="100%" p="0.75rem">
        <Link href={`/articles/${id}`} w="100%">
          <Heading maxW="100%" fontSize="1.5rem" mb="0.5rem">
            {title}
          </Heading>
          <Text
            fontSize="1.1rem"
            wordBreak="break-word"
            textAlign="left"
            w="75%"
            ml="2.5%">
            {prune(content)}...
          </Text>
        </Link>
        <Flex fontSize="0.9rem" w="100%" mt="0.5rem">
          {authors?.map((author, i) => (
            <Link key={i} href={`/people/${author.id}`} mr="0.2rem">
              {author.name}
            </Link>
          ))}

          <Text fontWeight="bold" mx="0.2rem">
            {" "}
            ∙{" "}
          </Text>
          <Link href={`/issues/${issue.id}`}>{issue.time}</Link>
        </Flex>
      </Center>
      {tags && tags.length > 0 && (
        <Flex flexDir="column">
          <Flex px="0.75rem">
            <Divider borderColor="black" />
          </Flex>
          <Flex
            p="0.75rem"
            flexWrap="wrap"
            maxW={{ base: "94vw", md: "40vw", lg: "25vw" }}>
            {tags?.map((tag, i) => (
              <TopicCard {...tag} key={i} />
            ))}
          </Flex>
        </Flex>
      )}
    </CardWrapper>
  );
};

export default Articard;
