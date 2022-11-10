import { ArticardType } from "@/types/article";
import { Center, Divider, Flex, Heading, Image, Text } from "@chakra-ui/react";
import Link from "@components/shared/link";
import CardWrapper from "./card-wrapper";
import TopicCard from "./topic-card";
import markdownToTxt from "markdown-to-txt";

const prune = (text: string, n: number = 90) =>
  text[n] == " " || text.length < n
    ? text.slice(0, n)
    : text.slice(0, n).slice(0, text.slice(0, n).lastIndexOf(" "));

const Articard: React.FC<ArticardType> = ({
  title,
  excerpt,
  issue,
  authors,
  slug,
  styles,
  topics = [],
}) => {
  return (
    <CardWrapper w={{ base: "94vw", md: "40vw", lg: "30vw" }} {...styles}>
      <Center flexDir="column" w="100%" p="0.75rem">
        <Link href={`/articles/${slug}`} w="100%">
          <Heading maxW="100%" fontSize="1.5rem" mb="0.5rem">
            {title}
          </Heading>
          <Text
            fontSize="1.1rem"
            wordBreak="break-word"
            textAlign="left"
            w="75%"
            ml="2.5%">
            {excerpt}...
          </Text>
        </Link>
        <Flex fontSize="0.9rem" w="100%" mt="0.5rem">
          <Link
            href={`/people/${authors[0] ? authors[0].slug : ""}`}
            mr="0.2rem">
            {authors[0] ? authors[0].name : ""}
          </Link>
          {authors?.length > 1 && `, ${authors.length - 1} more`}

          <Text fontWeight="bold" mx="0.2rem">
            {" "}
            ∙{" "}
          </Text>
          <Link href={`/issues/${issue?.slug}`}>{issue?.title}</Link>
        </Flex>
      </Center>
      {topics && topics.length > 0 && (
        <Flex flexDir="column">
          <Flex px="0.75rem">
            <Divider borderColor="black" />
          </Flex>
          <Flex
            p="0.75rem"
            flexWrap="wrap"
            maxW={{ base: "94vw", md: "40vw", lg: "25vw" }}>
            {topics?.map((topic, i) => (
              <TopicCard {...topic} key={i} />
            ))}
          </Flex>
        </Flex>
      )}
    </CardWrapper>
  );
};

export default Articard;
