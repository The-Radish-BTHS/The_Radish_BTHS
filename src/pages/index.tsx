import LatestArticles from "@components/Latest/latest-articles";
import LatestSection from "@components/Latest/latest-section";
import TopicsSection from "@components/Latest/topics-section";
import Layout from "@components/layout/layout";
import type { GetStaticProps, NextPage } from "next";
import { TopicCardType } from "@/types/topic";
import { ArticardType } from "@/types/article";
import { getArticles, getTopics } from "lib/many-getters.server";

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
  const topics = await getTopics();
  const articles = await (await getArticles()).slice(0, 6);

  return {
    props: { topics, articles },
  };
};
