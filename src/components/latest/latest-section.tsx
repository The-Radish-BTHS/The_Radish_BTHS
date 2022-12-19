import {
  Flex,
  Heading,
  SimpleGrid,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import Articard from "@components/cards/articard";
import IssueCard from "@components/cards/issue-card";
import LinkButton from "@components/link-button";
import { trpc } from "@lib/trpc";
import { AiOutlineArrowRight } from "react-icons/ai";

import NothingHereWrapper from "./nothing-here-wrapper";

const LatestSection: React.FC = ({}) => {
  const numArticles = useBreakpointValue({ base: 3, md: 2, xl: 3 });
  const issueQuery = trpc.issue.getAll.useQuery({ take: 1 });
  const issue = issueQuery.data && issueQuery.data[0];
  const articles = issue?.articles;

  return (
    <Flex flexDirection="column" alignItems="center">
      <Heading fontSize="2rem" textAlign="center">
        Latest & Greatest:{" "}
        <span style={{ fontWeight: "normal" }}>
          Our newest issue is ready for consumption!
        </span>
      </Heading>
      <NothingHereWrapper valid={issue !== null}>
        <Flex
          gap="1rem"
          mt="2rem"
          flexDir={{ base: "column", md: "row" }}
          alignItems="center">
          <Flex flexDir="column" h="100%">
            {" "}
            {issue && <IssueCard {...issue} styles={{ flex: 1 }} />}
          </Flex>

          <SimpleGrid
            templateColumns="auto"
            templateRows={`repeat(${numArticles}, auto)`}
            autoFlow="row"
            gap="2rem"
            pl={{ base: "0", md: "1rem" }}
            h="100%"
            w={{ base: "90vw", md: "40vw", lg: "30vw" }}>
            {articles?.slice(0, numArticles).map((article, i) => (
              <Articard {...article} styles={{ flex: 1 }} key={i} />
            ))}
          </SimpleGrid>
        </Flex>
        <LinkButton href="/issues" mt="2.5rem">
          <Text mr="0.5rem">All Issues!</Text> <AiOutlineArrowRight />
        </LinkButton>
      </NothingHereWrapper>
    </Flex>
  );
};

export default LatestSection;
