import { IssueCardType } from "@/types/issue";
import { Heading, Text } from "@chakra-ui/react";
import IssueCard from "@components/cards/issue-card";
import Layout from "@components/layout/layout";
import MasonryLayout from "@components/shared/masonry/masonry-layout";
import { GetStaticProps, NextPage } from "next";
import { getIssues } from "lib/getters/many-getters.server";

const Issues: NextPage<{ issues: IssueCardType[] }> = ({ issues }) => {
  return (
    <Layout pageIndex={1} textAlign="center" alignItems="center">
      <Heading>We&apos;ve got issues</Heading>
      <Text mb="3rem">Now you&apos;ve got &apos;em too</Text>
      <MasonryLayout numItems={issues.length}>
        {issues.map((issue, i) => (
          <IssueCard {...issue} key={i} styles={{ mb: "2rem" }} />
        ))}
      </MasonryLayout>
    </Layout>
  );
};

export default Issues;

export const getStaticProps: GetStaticProps = async (context) => {
  const issues = await getIssues();

  return {
    props: { issues },
  };
};
