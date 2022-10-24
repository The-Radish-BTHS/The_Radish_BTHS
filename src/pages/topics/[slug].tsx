import { TopicPageType } from "@/types/topic";
import { Flex, Heading, Text } from "@chakra-ui/react";
import Articard from "@components/cards/articard";
import TopicsSection from "@components/Latest/topics-section";
import Layout from "@components/layout/layout";
import MasonryLayout from "@components/shared/masonry/masonry-layout";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import prisma from "lib/prisma.server";

const Topic: NextPage<TopicPageType> = ({ name, description, articles }) => {
  return (
    <Layout alignItems="center" gap="0.5rem">
      <Heading color="#bb3300" fontWeight="600">
        #{name}
      </Heading>
      <Text fontSize="1.05rem" mb="2rem">
        {description}
      </Text>
      <MasonryLayout>
        {articles?.map((article, i) => (
          <Articard
            {...article}
            key={i}
            styles={{ h: "fit-content", my: "1rem" }}
          />
        ))}
      </MasonryLayout>
      <Flex mt="4rem">
        <TopicsSection title="More Topics" />
      </Flex>
    </Layout>
  );
};

export default Topic;

export const getStaticProps: GetStaticProps = async (context) => {
  const topic = await prisma.topic.findUnique({
    where: {
      slug: String(context.params?.slug),
    },
    include: {
      articles: {
        include: {
          authors: { select: { name: true, slug: true } },
          issue: { select: { time: true, slug: true } },
          topics: { select: { name: true, slug: true } },
        },
      },
    },
  });

  const noDateTopic = {
    ...topic,
    articles: topic?.articles.map((i) => ({
      ...i,
      publishedOn: i.publishedOn.getTime(),
    })),
  };

  return {
    props: { ...noDateTopic },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const topics = await prisma.topic.findMany({
    select: { slug: true },
  });

  const paths = topics.map((topic) => {
    return { params: topic };
  });

  return {
    paths,
    fallback: true,
  };
};
