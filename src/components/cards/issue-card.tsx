import { IssueCardType } from "@/types/issue";
import { Center, Heading, Image, Text } from "@chakra-ui/react";
import Link from "@components/shared/link";
import CardWrapper from "./card-wrapper";

const IssueCard: React.FC<IssueCardType> = ({
  cover,
  description,
  time,
  id,
  styles,
}) => {
  const widths = { base: "94vw", sm: "70vw", md: "40vw", lg: "33vw" };
  return (
    <CardWrapper maxW={widths} {...styles}>
      <Link href={`/issues/${id}`}>
        <Image
          src={cover}
          alt="cover"
          w="100%"
          borderBottom="1px solid"
          borderTopRadius="0.5rem"
        />
        <Center
          p="0.75rem"
          flexDir="column"
          maxW={widths}
          w={{ base: "94vw", md: "40vw", lg: "25vw" }}>
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

export default IssueCard;
