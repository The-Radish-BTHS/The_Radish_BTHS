import { IssueCardType } from "@/types/issue";
import { Center, Heading, Image, Text } from "@chakra-ui/react";
import Link from "@components/link";
import CardWrapper from "./card-wrapper";

const IssueCard: React.FC<IssueCardType> = ({
  cover,
  description,
  title,
  slug,
  styles,
}) => {
  const widths = { base: "94vw", sm: "70vw", md: "40vw", lg: "33vw" };

  return (
    <CardWrapper maxW={widths} {...styles}>
      <Link href={`/issues/${slug}`}>
        <Image
          src={`data:image/png;base64,${cover}`}
          alt="cover"
          w="100%"
          borderBottom="1px solid"
          borderTopRadius="0.5rem"
        />
        <Center p="0.75rem" flexDir="column" alignItems="center" w="100%">
          <Heading w="100%" fontSize="1.5rem" mb="0.5rem">
            {title}
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
