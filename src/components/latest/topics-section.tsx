import { Flex, Heading, Text } from "@chakra-ui/react";
import TopicCard from "@components/cards/topic-card";
import { trpc } from "@lib/trpc";

import NothingHereWrapper from "./nothing-here-wrapper";

const TopicsSection: React.FC<{
  title?: string;
}> = ({ title = "Topics", ...rest }) => {
  const topicQuery = trpc.topic.getAll.useQuery();
  const topics = topicQuery.data || [];
  return (
    <Flex flexDir="column" alignItems="center" {...rest}>
      <Heading fontSize="2rem" textAlign="center" mb="1rem">
        {title}: <span style={{ fontWeight: "normal" }}>What TO PIC(k)?</span>
      </Heading>
      <NothingHereWrapper valid={topics?.length > 0} h="45vh">
        <Flex
          flexWrap="wrap"
          justifyContent="center"
          gap="0.5rem"
          fontWeight="600"
          fontSize="1.2rem">
          {topics?.map((topic, i) => (
            <TopicCard {...topic} key={i} />
          ))}
        </Flex>
      </NothingHereWrapper>
    </Flex>
  );
};

export default TopicsSection;
