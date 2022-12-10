import LatestArticles from "@components/latest/latest-articles";
import LatestSection from "@components/latest/latest-section";
import TopicsSection from "@components/latest/topics-section";
import Layout from "@components/layout/layout";
import type { GetStaticProps, NextPage } from "next";
import { TopicCardType } from "@/types/topic";
import { ArticardType } from "@/types/article";
import { getArticles, getTopics } from "@lib/getters/many-getters.server";
import { IssueCardType } from "@/types/issue";
import { getLastIssue } from "@lib/getters/unique-getters.server";

const Home: NextPage<{
  topics: TopicCardType[];
  articles: ArticardType[];
  lastIssue: IssueCardType;
  lastIssueArticles: ArticardType[];
}> = ({ topics, articles, lastIssue, lastIssueArticles }) => {
  return (
    <Layout alignItems="center" gap="2.5rem">
      <LatestSection />
      <LatestArticles />

      <TopicsSection />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const topics = await getTopics();

  const lastIssue = await getLastIssue();
  const lastIssueArticles = await getArticles(
    false,
    lastIssue?.slug,
    undefined,
    3
  );

  const articles = await getArticles(
    false,
    undefined,
    lastIssueArticles.map((article) => article.slug),
    6
  );

  return {
    props: {
      a: 20,
      topics: topics,
      articles: articles,
      lastIssue: lastIssue,
      lastIssueArticles: lastIssueArticles,
    },
  };
};

export default Home;
