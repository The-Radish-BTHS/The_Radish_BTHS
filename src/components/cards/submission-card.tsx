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
import Button from "@components/button";
import { trpc } from "@lib/trpc";

const SubmissionCard: React.FC<{
  id: string;
  link: string;
  title: string;
  timeFrame: string | null;
  topics: Topic[];
  authors: Person[];
  graphicsRequest: string | null;
  graphicsComplete: boolean;
  otherTopics: string | null;
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
  otherTopics,
  imageUrls,
}) => {
  const deleteMutation = trpc.submission.delete.useMutation();
  const trpcContext = trpc.useContext();
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
      {graphicsRequest && (
        <>
          <Text mt="0.25rem">
            <span style={{ fontWeight: "bold" }}>Graphics: </span>
            {graphicsRequest}
          </Text>
          <Flex alignItems="center" gap="0.2rem">
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

      {otherTopics && (
        <Text mt="0.25rem">
          <span style={{ fontWeight: "bold" }}>Topics Request: </span>
          {otherTopics}
        </Text>
      )}
      {timeFrame && (
        <Text mt={otherTopics ? 0 : "0.25rem"}>
          <span style={{ fontWeight: "bold" }}>Time Frame: </span>
          {timeFrame}
        </Text>
      )}

      <Flex gap="0.2rem" mt="1rem" justifyContent="center">
        <Button
          onClick={async () => {
            await deleteMutation.mutateAsync({ submissionId: id });
            await trpcContext.invalidate();
          }}
          isLoading={deleteMutation.isLoading}
        >
          Delete
        </Button>
        <LinkButton href={link} flex={1} justifyContent="center" external>
          Read
        </LinkButton>
        <LinkButton
          href={`/articles/edit?id=${id}`}
          flex={1}
          justifyContent="center"
          external
        >
          Submit
        </LinkButton>
      </Flex>
    </CardWrapper>
  );
};

export default SubmissionCard;
