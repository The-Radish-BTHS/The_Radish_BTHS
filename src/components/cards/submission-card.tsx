import {
  Flex,
  Heading,
  List,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import LinkButton from "@components/link-button";
import { useIsMobile } from "@hooks/useIsMobile";
import { Person, Topic, User } from "@prisma/client";
import CardWrapper from "./card-wrapper";
import TopicCard from "./topic-card";
import { FcCheckmark, FcCancel } from "react-icons/fc";
import Link from "next/link";

const SubmissionCard: React.FC<{
  id: string;
  link: string;
  title: string;
  timeFrame: string | null;
  topics: Topic[];
  authors: Person[];
  graphicsRequest: string | null;
  graphicsComplete: boolean;
  imageUrls: string[];
}> = ({
  id,
  link,
  title,
  timeFrame,
  topics,
  authors,
  graphicsRequest,
  graphicsComplete,
  imageUrls,
}) => {
  const isMobile = useIsMobile();
  const linkWords = [
    "Somebody",
    "once",
    "told",
    "me",
    "the",
    "world",
    "is",
    "gonna",
    "roll",
    "me",
  ];
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
      <Text>{timeFrame}</Text>
      {graphicsRequest && (
        <>
          <Text mt="0.25rem">
            <span style={{ fontWeight: "bold" }}>Graphics: </span>
            {graphicsRequest}
          </Text>
          <Flex alignItems="center">
            <Text fontWeight="bold">Completed:</Text>
            {graphicsComplete ? <FcCheckmark /> : <FcCancel />}
          </Flex>
          {graphicsComplete && (
            <UnorderedList>
              {imageUrls.map((url, i) => (
                <ListItem key={i} textDecoration="underline">
                  <Link href={url} target="_blank">
                    {linkWords[i]}
                  </Link>
                </ListItem>
              ))}
            </UnorderedList>
          )}
        </>
      )}

      <Flex gap="1rem" mt="1rem" justifyContent="flex-end">
        <LinkButton href={link} external>
          Read{isMobile ? "" : " Article"}
        </LinkButton>
        <LinkButton href={`/articles/edit?id=${id}`} external>
          Submit{isMobile ? "" : " Edited"}
        </LinkButton>
      </Flex>
    </CardWrapper>
  );
};

export default SubmissionCard;
