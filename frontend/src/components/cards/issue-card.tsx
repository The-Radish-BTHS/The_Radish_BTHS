import { IssueCard } from "@/types/issue";
import { Text } from "@chakra-ui/react";
import Card from "./card";

const IssueCard: React.FC<IssueCard> = ({
  cover,
  description,
  time,
  id,
  outerStyles,
  ...rest
}) => {
  const widths = { base: "94vw", sm: "70vw", md: "40vw", lg: "33vw" };
  return (
    <Card
      link={`/issues/${id}`}
      header={time}
      image={cover}
      outerStyles={{ ...outerStyles, maxW: widths }}
      maxW={widths}
      {...rest}>
      <Text
        fontSize="1.1rem"
        wordBreak="break-word"
        whiteSpace="pre-wrap"
        w="100%">
        {description}
      </Text>
    </Card>
  );
};

export default IssueCard;
