import { Flex, Heading, Image, SimpleGrid, Text } from "@chakra-ui/react";
import ArticleCard from "@components/cards/article-card";
import IssueCard from "@components/cards/issue-card";
import Button from "@components/shared/button";
import Link from "@components/shared/link";
import { AiOutlineArrowRight } from "react-icons/ai";

interface ILatestProps {
  issueTime: string;
  description: string;
  cover: string;
}

const LatestSection: React.FC<ILatestProps> = ({
  issueTime,
  description,
  cover,
}) => {
  return (
    <Flex flexDirection="column" alignItems="center">
      <Heading fontSize="2rem" textAlign="center">
        Latest & Greatest:{" "}
        <span style={{ fontWeight: "normal" }}>
          Our newest issue is ready for consumption!
        </span>
      </Heading>

      <Flex
        gap="1rem"
        mt="2rem"
        flexDir={{ base: "column", md: "row" }}
        alignItems="center">
        <IssueCard
          cover={cover}
          description={description}
          issueTime={issueTime}
          id="abcd"
        />
        <SimpleGrid
          templateColumns="auto"
          templateRows="repeat(3, auto)"
          autoFlow="row"
          gap="2rem"
          pl={{ base: "0", md: "1rem" }}
          h="100%">
          <ArticleCard
            title="Lead Poisoning"
            description="I think you should do it"
            issueTime="June 2022"
            author="Dommy"
            id="abcd"
            flex={1}
          />
          <ArticleCard
            title="Lead Poisoning"
            description="I think you should do it"
            issueTime="June 2022"
            author="Dommy"
            id="abcd"
            flex={1}
          />
          <ArticleCard
            title="Lead Poisoning"
            description="I think you should do it"
            issueTime="June 2022"
            author="Dommy"
            id="abcd"
            flex={1}
          />
        </SimpleGrid>
      </Flex>
      <Link as={Button} href="/issues" mt="2.5rem">
        <Text mr="0.5rem">All Issues!</Text> <AiOutlineArrowRight />
      </Link>
    </Flex>
  );
};

export default LatestSection;
