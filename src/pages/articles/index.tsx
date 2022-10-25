import { ArticardType } from "@/types/article";
import { Flex, Heading, Text } from "@chakra-ui/react";
import Articard from "@components/cards/articard";
import Layout from "@components/layout/layout";
import MasonryLayout from "@components/shared/masonry/masonry-layout";
import { GetStaticProps, NextPage } from "next";
import { getArticles } from "lib/getters/many-getters.server";

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
  const articles = await getArticles();

  return {
    props: { articles },
  };
};
