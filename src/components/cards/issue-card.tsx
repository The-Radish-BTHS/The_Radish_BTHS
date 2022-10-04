import {
  Center,
  Flex,
  FlexProps,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import Link from "@components/shared/link";
import Card from "./card";

interface IssueCardProps extends FlexProps {
  cover: string;
  description: string;
  issueTime: string;
  id: string;
}

const IssueCard: React.FC<IssueCardProps> = ({
  cover,
  description,
  issueTime,
  id,
  ...rest
}) => {
  return (
    <Card
      link={`/issues/${id}`}
      header={issueTime}
      image={cover}
      outerStyles={{ w: { base: "94vw", sm: "70vw", md: "40vw", lg: "25vw" } }}
      w={{ base: "94vw", sm: "70vw", md: "40vw", lg: "25vw" }}
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
