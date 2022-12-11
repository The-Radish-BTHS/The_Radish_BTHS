import { TopicPageType } from "@/types/topic";
import { Flex, Heading, Text } from "@chakra-ui/react";
import Articard from "@components/cards/articard";
import TopicsSection from "@components/latest/topics-section";
import Layout from "@components/layout/layout";
import MasonryLayout from "@components/masonry/masonry-layout";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import prisma from "@lib/prisma.server";
import { getTopic } from "@lib/getters/unique-getters.server";
import { getTopics } from "@lib/getters/many-getters.server";
import { slugsToPaths } from "@lib/helpers.server";
import NothingHereWrapper from "@components/latest/nothing-here-wrapper";
import { useRouter } from "next/router";
import { trpc } from "@lib/trpc";

const Topic: NextPage = () => {
  const router = useRouter();
  const slug = router.query.slug;

  const topicQuery = trpc.topic.getBySlug.useQuery({
    slug: slug?.toString() ?? "",
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
      <NothingHereWrapper valid={(topic?.articles?.length ?? 0) > 0} py="20vh">
        <MasonryLayout numItems={topic?.articles?.length}>
          {topic?.articles?.map((article, i) => (
            <Articard
              {...article}
              key={i}
              styles={{ h: "fit-content", my: "1rem" }}
            />
          ))}
        </MasonryLayout>
      </NothingHereWrapper>
      <Flex mt="4rem">
        <TopicsSection title="More Topics" />
      </Flex>
    </Layout>
  );
};

export default Topic;
