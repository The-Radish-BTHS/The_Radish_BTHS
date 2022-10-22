import { IssueCardType } from "@/types/issue";
import { Heading, Text } from "@chakra-ui/react";
import IssueCard from "@components/cards/issue-card";
import Layout from "@components/layout/layout";
import MasonryLayout from "@components/shared/masonry/masonry-layout";
import { GetStaticProps, NextPage } from "next";

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
  const sample = {
    time: "June 2022",
    cover: "/images/june-2022.webp",
    description: "We do gay shit!! It's cool!",
    id: "slay",
  };

  const issues = new Array(20).fill(sample);

  return {
    props: { issues },
  };
};
