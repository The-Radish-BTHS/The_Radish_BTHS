import { Heading, Input, Text } from "@chakra-ui/react";
import Articard from "@components/cards/articard";
import Layout from "@components/layout/layout";
import MasonryLayout from "@components/masonry/masonry-layout";
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { getSsgCaller } from "@lib/ssg-helper";
import { trpc } from "@lib/trpc";
import { OnBottom } from "@components/on-bottom";
import { useState } from "react";
import { debounce } from "lodash";

const Articles: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = () => {
  const [query, setQuery] = useState("");
  const articlesQuery = trpc.article.getInfinite.useInfiniteQuery(
    {
      query: query === "" ? null : query,
    },
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
      <Text mb="4">All the articles!!</Text>

      <Input
        placeholder="Search.."
        zIndex="99"
        border="solid black 1px"
        background="blackAlpha.100"
        color="black"
        mb="4"
        _placeholder={{
          color: "#333333",
        }}
        _hover={{
          background: "blackAlpha.100",
        }}
        onChange={debounce((e) => setQuery(e.target.value), 500)}
      />

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
          <></>
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
    revalidate: 3600,
  };
};
