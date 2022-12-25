import { Heading, Text } from "@chakra-ui/react";
import Articard from "@components/cards/articard";
import Layout from "@components/layout/layout";
import MasonryLayout from "@components/masonry/masonry-layout";
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { getSsgCaller } from "@lib/ssg-helper";
import { trpc } from "@lib/trpc";
import { OnBottom } from "@components/on-bottom";

const Articles: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = () => {
  const articlesQuery = trpc.article.getInfinite.useInfiniteQuery(
    {},
    {
      getNextPageParam: (current) => current.nextCursor,
    }
  );
  const articles = articlesQuery.data?.pages
    .map((page) => page.articles)
    .flat();

  return (
    <Layout pageIndex={0} alignItems="center">
      <Heading>Allticles!</Heading>
      <Text mb="3rem">All the articles!!</Text>

      <OnBottom
        onBottom={() => {
          articlesQuery.fetchNextPage();
        }}
      >
        <MasonryLayout numItems={articles?.length}>
          {articles?.map((article) => (
            <Articard
              {...article}
              key={article.id}
              styles={{ mb: "2rem", w: "100%" }}
            />
          ))}
        </MasonryLayout>

        {articlesQuery.hasNextPage ? (
          <Text>Loading more articles...</Text>
        ) : (
          <Text>You reached the end.</Text>
        )}
      </OnBottom>
    </Layout>
  );
};

export default Articles;

export const getStaticProps: GetStaticProps = async () => {
  const ssg = await getSsgCaller();

  await ssg.article.getInfinite.prefetchInfinite({});

  return {
    props: { trpcState: ssg.dehydrate() },
  };
};
