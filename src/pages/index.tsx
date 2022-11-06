import LatestArticles from "@components/Latest/latest-articles";
import LatestSection from "@components/Latest/latest-section";
import TopicsSection from "@components/Latest/topics-section";
import Layout from "@components/layout/layout";
import type { GetStaticProps, NextPage } from "next";
import { TopicCardType } from "@/types/topic";
import { ArticardType } from "@/types/article";
import {
  getArticles,
  getIssues,
  getTopics,
} from "@lib/getters/many-getters.server";
import { IssueCardType } from "@/types/issue";
import { Flex } from "@chakra-ui/react";

const Home: NextPage<{
  topics: TopicCardType[];
  articles: ArticardType[];
  lastIssue: IssueCardType;
  lastIssueArticles: ArticardType[];
}> = ({ topics, articles, lastIssue, lastIssueArticles }) => {
  return (
    <Layout alignItems="center" gap="2.5rem">
      <LatestSection issue={lastIssue} articles={lastIssueArticles} />
      <Flex maxW="80vw">
        <LatestArticles articles={articles} />
      </Flex>

      <TopicsSection topics={topics} />
    </Layout>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async (context) => {
  const topics = await getTopics();

  const lastIssue = await (await getIssues())[0];
  const lastIssueArticles = await await getArticles(
    false,
    lastIssue?.slug,
    undefined,
    3
  );

  const articles = await (
    await getArticles(
      false,
      undefined,
      lastIssueArticles.map((article) => article.slug)
    )
  ).slice(0, 6);

  return {
    props: {
      topics: topics ?? null,
      articles: articles ?? null,
      lastIssue: lastIssue ?? null,
      lastIssueArticles: lastIssueArticles ?? null,
    },
  };
};
