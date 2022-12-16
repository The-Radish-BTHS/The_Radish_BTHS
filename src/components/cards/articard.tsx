import { ArticardType } from "@/types/article";
import { Center, Divider, Flex, Heading, Image, Text } from "@chakra-ui/react";
import Link from "@components/link";
import CardWrapper from "./card-wrapper";
import TopicCard from "./topic-card";

const Articard: React.FC<ArticardType> = ({
  title,
  excerpt,
  issue,
  authors,
  slug,
  styles,
  topics = [],
  ...rest
}) => {
  return (
    <CardWrapper
      w={{ base: "90vw", md: "40vw", lg: "30vw" }}
      {...styles}
      {...rest}>
      <Center flexDir="column" w="100%" p="0.75rem">
        <Link
          href={`/articles/${slug}`}
          w="100%"
          _hover={{ textDecoration: "none" }}>
          <Heading
            maxW="100%"
            fontSize="1.5rem"
            mb="0.5rem"
            _hover={{ textDecoration: "underline" }}>
            {title}
          </Heading>
          {excerpt && (
            <Text
              fontSize="1.1rem"
              wordBreak="break-word"
              textAlign="left"
              w="75%">
              {excerpt}...
            </Text>
          )}
        </Link>
        <Flex fontSize="0.9rem" w="100%" mt="0.5rem">
          <Link href={`/people/${authors[0] ? authors[0].slug : ""}`}>
            {authors[0] ? authors[0].name : ""}
          </Link>
          {authors?.length > 1 && `, ${authors.length - 1} more`}

          {issue && (
            <>
              {authors?.length ? (
                <Text fontWeight="bold" mx="0.2rem">
                  {" "}
                  ∙{" "}
                </Text>
              ) : (
                <></>
              )}
              <Link href={`/issues/${issue?.slug}`}>{issue?.title}</Link>
            </>
          )}
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
