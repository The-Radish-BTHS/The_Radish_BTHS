import { TopicPageType } from "@/types/topic";
import { Flex, Heading, Text } from "@chakra-ui/react";
import Articard from "@components/cards/articard";
import TopicsSection from "@components/latest/topics-section";
import Layout from "@components/layout/layout";
import MasonryLayout from "@components/masonry/masonry-layout";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import NothingHereWrapper from "@components/latest/nothing-here-wrapper";
import { useRouter } from "next/router";
import { trpc } from "@lib/trpc";
import { getSsgCaller } from "@lib/ssg-helper";
import { createPublicCaller } from "@server/trpc";
import { OnBottom } from "@components/on-bottom";

const Topic: NextPage = () => {
  const router = useRouter();
  const articlesQuery = trpc.article.getInfinite.useInfiniteQuery(
    {
      withTopic: router.query.slug as string,
    },
    {
      getNextPageParam: (current) => current.nextCursor,
    }
  );
  const articles = articlesQuery.data?.pages
    .map((page) => page.articles)
    .flat();
  const topicQuery = trpc.topic.getBySlug.useQuery({
    slug: router.query.slug as string,
  });
  const topic = topicQuery.data;

  return (
    <Layout title={topic?.name} alignItems="center" gap="0.5rem">
      <Heading color="#bb3300" fontWeight="600" textAlign="center">
        #{topic?.name}
      </Heading>
      <Text fontSize="1.05rem" mb="2rem">
        {topic?.description}
      </Text>
      <NothingHereWrapper valid={(articles?.length ?? 0) > 0} py="20vh">
        <OnBottom
          onBottom={() => {
            articlesQuery.fetchNextPage();
          }}
        >
          <MasonryLayout numItems={articles?.length}>
            {articles?.map((article, i) => (
              <Articard
                {...article}
                key={i}
                styles={{ h: "fit-content", my: "1rem" }}
              />
            ))}
          </MasonryLayout>
        </OnBottom>
      </NothingHereWrapper>

      {articlesQuery.hasNextPage ? (
        <Text>Loading more articles...</Text>
      ) : (
        <Text>You reached the end.</Text>
      )}

      <Flex mt="4rem">
        <TopicsSection title="More Topics" />
      </Flex>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const ssg = await getSsgCaller();

  await ssg.topic.getBySlug.prefetch({
    slug: ctx.params?.slug as string,
  });

  await ssg.article.getInfinite.prefetchInfinite({
    withTopic: ctx.params?.slug as string,
  });

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const trpc = createPublicCaller();

  return {
    paths: (await trpc.topic.getSlugs()).map((slug) => `/topics/${slug}`),
    fallback: "blocking",
  };
};

export default Topic;
