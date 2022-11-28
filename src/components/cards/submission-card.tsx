import { Flex, Heading, Text } from "@chakra-ui/react";
import LinkButton from "@components/link-button";
import { Person, Topic, User } from "@prisma/client";
import CardWrapper from "./card-wrapper";
import TopicCard from "./topic-card";

const SubmissionCard: React.FC<{
  id: string;
  link: string;
  title: string;
  topics: Topic[];
  authors: Person[];
}> = ({ id, link, title, topics, authors }) => {
  return (
    <CardWrapper p="1rem" mb="1.5rem" width="100%">
      <Heading fontSize="1.5rem" mb="0.25rem">
        {title}
      </Heading>
      <Flex flexWrap="wrap">
        {authors.map((author, i) => (
          <Text key={i} mr="0.5rem">
            {author.name}
            {i !== authors.length - 1 && ", "}
          </Text>
        ))}
      </Flex>
      <Flex flexWrap="wrap">
        {topics.map((topic, i) => (
          <TopicCard {...topic} key={i} />
        ))}
      </Flex>

      <Flex gap="1rem" mt="1rem">
        <LinkButton href={link} external>
          Read Article
        </LinkButton>
        <LinkButton href={`/articles/edit?id=${id}`} external>
          Submit Edited
        </LinkButton>
      </Flex>
    </CardWrapper>
  );
};

export default SubmissionCard;
