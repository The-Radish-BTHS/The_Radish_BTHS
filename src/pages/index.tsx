import LatestArticles from "@components/Latest/latest-articles";
import LatestSection from "@components/Latest/latest-section";
import TopicsSection from "@components/Latest/topics-section";
import Layout from "@components/layout/layout";
import type { GetStaticProps, NextPage } from "next";
import prisma from "lib/prisma.server";
import { TopicCardType } from "@/types/topic";
import { ArticardType } from "@/types/article";
import { getArticles } from "lib/getters.server";

const Home: NextPage<{ topics: TopicCardType[]; articles: ArticardType[] }> = ({
  topics,
  articles,
}) => {
  return (
    <Layout alignItems="center" gap="2.5rem">
      <LatestSection
        issueTime="June 2022"
        description="Hey gays! Read this! lorem ipsum dolor sit amet"
        cover="/images/june-2022.webp"
      />
      <LatestArticles articles={articles} />
      <TopicsSection topics={topics} />
    </Layout>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async (context) => {
  const topics = await prisma.topic.findMany({
    select: { slug: true, name: true },
  });
  const articles = await getArticles();

  return {
    props: { topics, articles },
  };
};
