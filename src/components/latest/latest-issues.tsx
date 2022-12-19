import { IssueCardType } from "@/types/issue";
import { Flex, Heading, Text, useBreakpointValue } from "@chakra-ui/react";
import IssueCard from "@components/cards/issue-card";
import LinkButton from "@components/link-button";
import { trpc } from "@lib/trpc";
import { AiOutlineArrowRight } from "react-icons/ai";
import NothingHereWrapper from "./nothing-here-wrapper";

const LatestIssues: React.FC<{ exclude: string[] }> = ({ exclude }) => {
  const numIssues = useBreakpointValue({ base: 1, md: 2, xl: 3 });
  const issuesQuery = trpc.issue.getAll.useQuery({
    take: numIssues,
    exclude: exclude,
  });
  const issues = issuesQuery.data || [];

  return (
    <Flex flexDirection="column" alignItems="center" w="100%">
      <Heading fontSize="2rem" textAlign="center" mb="1rem">
        More Issues:{" "}
        <span style={{ fontWeight: "normal" }}>Ingest them fast!</span>
      </Heading>
      <NothingHereWrapper valid={issues?.length > 0} height="40vh">
        <Flex w="100%" gap="2rem" justifyContent="center" margin="auto">
          {issues?.slice(0, numIssues).map((issue, i) => (
            <IssueCard {...issue} styles={{ flex: 1 }} key={i} />
          ))}
        </Flex>
        <LinkButton href="/issues" mt="2.5rem">
          <Text mr="0.5rem">All Issues!</Text> <AiOutlineArrowRight />
        </LinkButton>
      </NothingHereWrapper>
    </Flex>
  );
};

export default LatestIssues;
