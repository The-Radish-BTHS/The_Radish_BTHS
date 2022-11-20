import { TopicReference } from "@/types/topic";
import { Flex, Heading, Text } from "@chakra-ui/react";
import TopicCard from "@components/cards/topic-card";

import LinkButton from "@components/link-button";
import { AiOutlineArrowRight } from "react-icons/ai";
import NothingHereWrapper from "./nothing-here-wrapper";

const TopicsSection: React.FC<{
  title?: string;
  topics: TopicReference[];
}> = ({ title = "Topics", topics, ...rest }) => {
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
      {/* <LinkButton href="/topics" mt="1.5rem">
        <Text mr="0.5rem">All Topics!</Text> <AiOutlineArrowRight />
      </LinkButton> */}
    </Flex>
  );
};

export default TopicsSection;
