import { IssueCard } from "@/types/issue";
import { Center, Heading, Image, Text } from "@chakra-ui/react";
import Link from "@components/shared/link";
import CardWrapper from "./card-wrapper";

const IssueCard: React.FC<IssueCard> = ({
  cover,
  description,
  time,
  id,
  outerStyles,
}) => {
  const widths = { base: "94vw", sm: "70vw", md: "40vw", lg: "33vw" };
  return (
    <CardWrapper maxW={widths} {...outerStyles}>
      <Link href={`/issues/${id}`}>
        <Image
          src={cover}
          alt="cover"
          w="100%"
          borderBottom="1px solid"
          borderTopRadius="0.5rem"
        />
        <Center p="0.75rem" flexDir="column" maxW={widths}>
          <Heading w="100%" fontSize="1.5rem" mb="0.5rem">
            {time}
          </Heading>
          <Text
            fontSize="1.1rem"
            wordBreak="break-word"
            whiteSpace="pre-wrap"
            w="100%">
            {description}
          </Text>
        </Center>
      </Link>
    </CardWrapper>
  );
};

/*<Card
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
    </Card>*/

export default IssueCard;
