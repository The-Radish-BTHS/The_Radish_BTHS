import { Flex, FlexProps, Heading, Text } from "@chakra-ui/react";
import Link from "@components/shared/link";
import Card from "./card";
import CardTag from "./card-tag";

interface CardProps extends FlexProps {
  title: string;
  description: string;
  issue: { time: string; id: string };
  author: { name: string; id: string; isExec: boolean };
  id: string;
  outerStyles?: FlexProps;
  tags?: { name: string; id: string }[];
}

const ArticleCard: React.FC<CardProps> = ({
  title,
  description,
  issue,
  author,
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
        <Heading w="100%" fontSize="1.5rem" mb="0.5rem">
          {title}
        </Heading>
        <Text
          fontSize="1.1rem"
          wordBreak="break-word"
          textAlign="left"
          w="95%"
          ml="auto">
          {description}
        </Text>
      </Link>
      <Flex fontSize="0.9rem" w="100%" mt="0.5rem">
        <Link href={`/${author.isExec ? "execs" : "people"}/${author.id}`}>
          {author.name}
        </Link>
        <Text fontWeight="bold" mx="0.2rem">
          {" "}
          ∙{" "}
        </Text>
        <Link href={`/issues/${issue.id}`}>{issue.time}</Link>
      </Flex>
    </Card>
  );
};

export default ArticleCard;
