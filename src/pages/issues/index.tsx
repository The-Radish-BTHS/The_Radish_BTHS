import { IssueCardType } from "@/types/issue";
import { Heading, Text } from "@chakra-ui/react";
import IssueCard from "@components/cards/issue-card";
import Layout from "@components/layout/layout";
import MasonryLayout from "@components/shared/masonry/masonry-layout";
import { GetStaticProps, NextPage } from "next";
import prisma from "lib/prisma.server";

const Issues: NextPage<{ issues: IssueCardType[] }> = ({ issues }) => {
  return (
    <Layout pageIndex={1} textAlign="center">
      <Heading>We&apos;ve got issues</Heading>
      <Text mb="3rem">Now you&apos;ve got &apos;em too</Text>
      <MasonryLayout>
        {issues.map((issue, i) => (
          <IssueCard {...issue} key={i} styles={{ mb: "2rem" }} />
        ))}
      </MasonryLayout>
    </Layout>
  );
};

export default Issues;

export const getStaticProps: GetStaticProps = async (context) => {
  const issues = await prisma.issue.findMany({
    where: { published: true },
  });

  const noDateIssues = issues.map((i) => ({
    ...i,
    publishedOn: i.publishedOn.getTime(),
  }));

  return {
    props: { issues: noDateIssues },
  };
};
