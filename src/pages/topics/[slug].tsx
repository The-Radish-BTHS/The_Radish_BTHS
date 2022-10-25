import { TopicPageType } from "@/types/topic";
import { Flex, Heading, Text } from "@chakra-ui/react";
import Articard from "@components/cards/articard";
import TopicsSection from "@components/Latest/topics-section";
import Layout from "@components/layout/layout";
import MasonryLayout from "@components/shared/masonry/masonry-layout";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import prisma from "lib/prisma.server";
import { getTopic } from "lib/getters/unique-getters.server";
import { getTopics } from "lib/getters/many-getters.server";
import { slugsToPaths } from "lib/helpers.server";

const Topic: NextPage<TopicPageType> = ({
  name,
  description,
  articles,
  topics,
}) => {
  return (
    <Layout alignItems="center" gap="0.5rem">
      <Heading color="#bb3300" fontWeight="600">
        #{name}
      </Heading>
      <Text fontSize="1.05rem" mb="2rem">
        {description}
      </Text>
      <MasonryLayout numItems={articles.length}>
        {articles?.map((article, i) => (
          <Articard
            {...article}
            key={i}
            styles={{ h: "fit-content", my: "1rem" }}
          />
        ))}
      </MasonryLayout>
      <Flex mt="4rem">
        <TopicsSection title="More Topics" topics={topics} />
      </Flex>
    </Layout>
  );
};

export default Topic;

export const getStaticProps: GetStaticProps = async (context) => {
  const topic = await getTopic(String(context.params?.slug));
  const topics = await getTopics();

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
