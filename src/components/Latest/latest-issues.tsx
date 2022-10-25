import { IssueCardType } from "@/types/issue";
import { Flex, Heading, Text, useBreakpointValue } from "@chakra-ui/react";
import IssueCard from "@components/cards/issue-card";
import Button from "@components/shared/button";
import Link from "@components/shared/link";
import { AiOutlineArrowRight } from "react-icons/ai";

const LatestIssues: React.FC<{ issues: IssueCardType[] }> = ({ issues }) => {
  const numIssues = useBreakpointValue({ base: 1, md: 2, xl: 3 });

  return (
    <Flex flexDirection="column" alignItems="center" maxW="100%">
      <Heading fontSize="2rem" textAlign="center" mb="1rem">
        More Issues:{" "}
        <span style={{ fontWeight: "normal" }}>Ingest them fast!</span>
      </Heading>
      <Flex w="100%" gap="2rem" justifyContent="center" margin="auto">
        {issues?.slice(0, numIssues).map((issue, i) => (
          <IssueCard {...issue} styles={{ flex: 1 }} key={i} />
        ))}
      </Flex>
      <Link as={Button} href="/issues" mt="2.5rem">
        <Text mr="0.5rem">All Issues!</Text> <AiOutlineArrowRight />
      </Link>
    </Flex>
  );
};

export default LatestIssues;
