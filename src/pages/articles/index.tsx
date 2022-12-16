import { Heading, Text } from "@chakra-ui/react";
import Articard from "@components/cards/articard";
import Layout from "@components/layout/layout";
import MasonryLayout from "@components/masonry/masonry-layout";
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { getSsgCaller } from "@lib/ssg-helper";
import { trpc } from "@lib/trpc";

const Articles: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = () => {
  const articles = trpc.article.getMany.useQuery({ sortOrder: "desc" });
  const articleData = articles.data!;

  return (
    <Layout pageIndex={0} alignItems="center">
      <Heading>Allticles!</Heading>
      <Text mb="3rem">All the articles!!</Text>
      <MasonryLayout numItems={articleData?.length}>
        {articleData?.map((article, i) => (
          <Articard {...(article as any)} key={i} styles={{ mb: "2rem" }} />
        ))}
      </MasonryLayout>
    </Layout>
  );
};

export default Articles;

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = await getSsgCaller();

  await ssg.article.getMany.prefetch({ sortOrder: "desc" });

  return {
    props: { trpcState: ssg.dehydrate() },
  };
};
