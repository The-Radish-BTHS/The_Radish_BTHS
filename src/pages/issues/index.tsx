import { Heading, Text } from "@chakra-ui/react";
import IssueCard from "@components/cards/issue-card";
import Layout from "@components/layout/layout";
import MasonryLayout from "@components/masonry/masonry-layout";
import { GetStaticProps, NextPage } from "next";
import { trpc } from "@lib/trpc";
import { OnBottom } from "@components/on-bottom";
import { getSsgCaller } from "@lib/ssg-helper";

const Issues: NextPage = () => {
  const issuesQuery = trpc.issue.getInfinite.useInfiniteQuery(
    {},
    {
      getNextPageParam: (current) => current.nextCursor,
    }
  );

  const issues = issuesQuery.data?.pages.map((page) => page.issues).flat();

  return (
    <Layout pageIndex={1} textAlign="center" alignItems="center">
      <Heading>We&apos;ve got issues</Heading>
      <Text mb="3rem">Now you&apos;ve got &apos;em too</Text>

      <OnBottom
        onBottom={() => {
          issuesQuery.fetchNextPage();
        }}>
        <MasonryLayout numItems={issues?.length}>
          {issues?.map((issue, i) => (
            <IssueCard {...issue} key={i} styles={{ mb: "2rem" }} />
          ))}
        </MasonryLayout>
      </OnBottom>

      {issuesQuery.hasNextPage ? <Text>Loading more issues...</Text> : <></>}
    </Layout>
  );
};

export default Issues;

export const getStaticProps: GetStaticProps = async () => {
  const ssg = await getSsgCaller();

  await ssg.issue.getInfinite.prefetchInfinite({});

  return {
    props: { trpcState: ssg.dehydrate() },
    revalidate: 60,
  };
};
