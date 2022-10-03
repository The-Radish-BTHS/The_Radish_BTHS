import { Flex, FlexProps, Text } from "@chakra-ui/react";
import Card from "./card";
import CardTag from "./card-tag";

interface CardProps extends FlexProps {
  title: string;
  description: string;
  issueTime: string;
  author: string;
  id: string;
  outerStyles?: FlexProps;
  tags?: { name: string; id: string }[];
}

const ArticleCard: React.FC<CardProps> = ({
  title,
  description,
  issueTime,
  author,
  id,
  outerStyles,
  tags = [],
  ...rest
}) => {
  return (
    <Card
      link={`/articles/${id}`}
      header={title}
      tags={tags}
      outerStyles={outerStyles}
      {...rest}>
      <Text
        fontSize="1.1rem"
        wordBreak="break-word"
        textAlign="left"
        w="95%"
        ml="auto">
        {description}
      </Text>
      <Text fontSize="0.9rem" w="100%" mt="0.5rem">
        {author}
        <span style={{ fontWeight: "bold" }}> ∙ </span>
        {issueTime}
      </Text>
    </Card>
  );
};

export default ArticleCard;
