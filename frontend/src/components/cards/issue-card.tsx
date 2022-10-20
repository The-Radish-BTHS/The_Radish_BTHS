import { FlexProps, Text } from "@chakra-ui/react";
import Card from "./card";

interface IssueCardProps extends FlexProps {
  cover: string;
  description: string;
  issueTime: string;
  id: string;
  outerStyles?: FlexProps;
}

const IssueCard: React.FC<IssueCardProps> = ({
  cover,
  description,
  issueTime,
  id,
  outerStyles,
  ...rest
}) => {
  const widths = { base: "94vw", sm: "70vw", md: "40vw", lg: "33vw" };
  return (
    <Card
      link={`/issues/${id}`}
      header={issueTime}
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
