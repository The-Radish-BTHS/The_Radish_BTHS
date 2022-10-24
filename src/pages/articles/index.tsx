import { ArticardType } from "@/types/article";
import { Flex, Heading, Text } from "@chakra-ui/react";
import Articard from "@components/cards/articard";
import Layout from "@components/layout/layout";
import MasonryLayout from "@components/shared/masonry/masonry-layout";
import { GetStaticProps, NextPage } from "next";
import prisma from "lib/prisma.server";

const Articles: NextPage<{ articles: ArticardType[] }> = ({ articles }) => {
  return (
    <Layout pageIndex={0} alignItems="center">
      <Heading>Allticles!</Heading>
      <Text mb="3rem">All the articles!!</Text>
      <MasonryLayout>
        {articles.map((article, i) => (
          <Articard {...article} key={i} styles={{ mb: "2rem" }} />
        ))}
      </MasonryLayout>
    </Layout>
  );
};

export default Articles;

export const getStaticProps: GetStaticProps = async (context) => {
  const articles = await prisma.article.findMany({
    where: { published: true },
    include: {
      issue: {
        select: { time: true, slug: true },
      },
      authors: {
        select: { name: true, slug: true },
      },
      topics: {
        select: { name: true, slug: true },
      },
    },
  });

  const noDateArticles = articles.map((i) => ({
    ...i,
    publishedOn: i.publishedOn.getTime(),
  }));

  return {
    props: { articles: noDateArticles },
  };
};
