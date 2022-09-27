import { Flex, Heading, Image, SimpleGrid, Text } from "@chakra-ui/react";
import ArticleCard from "@components/cards/article-card";
import IssueCard from "@components/cards/issue-card";

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
      <Heading fontSize="2rem">
        Latest & Greatest:{" "}
        <span style={{ fontWeight: "normal" }}>
          Our newest issue is ready for consumption!
        </span>
      </Heading>

      <Flex gap="1rem" mt="2rem">
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
          pl="1rem"
          h="100%">
          <ArticleCard
            title="Lead Poisoning"
            description="I think you should do it"
            issueTime="June 2022"
            author="Dommy"
            id="abcd"
            expand
          />
          <ArticleCard
            title="Lead Poisoning"
            description="I think you should do it"
            issueTime="June 2022"
            author="Dommy"
            id="abcd"
            expand
          />
          <ArticleCard
            title="Lead Poisoning"
            description="I think you should do it"
            issueTime="June 2022"
            author="Dommy"
            id="abcd"
            expand
          />
        </SimpleGrid>
      </Flex>
    </Flex>
  );
};

export default LatestSection;
