import { IssueCardType } from "@/types/issue";
import { Heading, Text } from "@chakra-ui/react";
import IssueCard from "@components/cards/issue-card";
import Layout from "@components/layout/layout";
import MasonryLayout from "@components/masonry/masonry-layout";
import { GetStaticProps, NextPage } from "next";
import { getIssues } from "@lib/getters/many-getters.server";
import { trpc } from "@lib/trpc";

const Issues: NextPage = () => {
  const issueQuery = trpc.issue.getAll.useQuery({});
  const issues = issueQuery.data ?? [];
  return (
    <Layout pageIndex={1} textAlign="center" alignItems="center">
      <Heading>We&apos;ve got issues</Heading>
      <Text mb="3rem">Now you&apos;ve got &apos;em too</Text>
      <MasonryLayout numItems={issues?.length}>
        {issues.map((issue, i) => (
          <IssueCard {...issue} key={i} styles={{ mb: "2rem" }} />
        ))}
      </MasonryLayout>
    </Layout>
  );
};

export default Issues;
