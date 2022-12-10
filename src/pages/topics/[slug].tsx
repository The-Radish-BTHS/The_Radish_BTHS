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

const Topic: NextPage<TopicPageType> = ({
  name,
  description,
  articles,
  topics,
}) => {
  const router = useRouter();
  const slug = router.query.slug;

  const topicQuery = trpc.topic.getBySlug.useQuery({
    slug: slug?.toString() ?? "",
  });
  const topic = topicQuery.data;

  return (
    <Layout title={name} alignItems="center" gap="0.5rem">
      <Heading color="#bb3300" fontWeight="600" textAlign="center">
        #{name}
      </Heading>
      <Text fontSize="1.05rem" mb="2rem">
        {description}
      </Text>
      <NothingHereWrapper valid={articles?.length > 0} py="20vh">
        <MasonryLayout numItems={articles?.length}>
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

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = String(context.params?.slug);
  const topic = await getTopic(slug);
  const topics = await getTopics([slug]);

  return {
    props: { ...topic, topics },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const topics = await prisma.topic.findMany({
    select: { slug: true },
  });

  const paths = await slugsToPaths(topics);

  return {
    paths,
    fallback: true,
  };
};
