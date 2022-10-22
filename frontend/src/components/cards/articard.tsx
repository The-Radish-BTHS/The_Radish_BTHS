import { Articard } from "@/types/article";
import { Flex, Heading, Text } from "@chakra-ui/react";
import Link from "@components/shared/link";
import Card from "./card";

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
    <Card
      link=""
      tags={tags}
      outerStyles={{ ...outerStyles, justifyContent: "flex-start" }}
      justifyContent="flex-start"
      {...rest}>
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
    </Card>
  );
};

export default Articard;
