import {
  Box,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import IssueCard from "@components/cards/issue-card";
import Button from "@components/shared/button";
import Link from "@components/shared/link";
import MasonryLayout from "@components/shared/masonry/masonry-layout";
import { AiOutlineArrowRight } from "react-icons/ai";

const Item: React.FC = () => (
  <IssueCard
    cover="/images/june-2022.webp"
    description="Hey gays! Read this! lorem ipsum dolor sit amet"
    time="June 2022"
    slug="abcd"
    styles={{ flex: 1 }}
  />
);

const LatestIssues: React.FC = () => {
  const numIssues = useBreakpointValue({ base: 1, md: 2, xl: 3 });

  return (
    <Flex flexDirection="column" alignItems="center" maxW="100%">
      <Heading fontSize="2rem" textAlign="center" mb="1rem">
        More Issues:{" "}
        <span style={{ fontWeight: "normal" }}>Ingest them fast!</span>
      </Heading>
      <Flex w="100%" gap="2rem" justifyContent="center">
        {Array(numIssues)
          .fill(0)
          .map((src, i) => (
            <Item key={i} />
          ))}
      </Flex>
      <Link as={Button} href="/issues" mt="2.5rem">
        <Text mr="0.5rem">All Issues!</Text> <AiOutlineArrowRight />
      </Link>
    </Flex>
  );
};

export default LatestIssues;
