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
import { Button, Flex } from "@chakra-ui/react";

import { signIn, useSession } from "next-auth/react";

const Home: NextPage<{
  topics: TopicCardType[];
  articles: ArticardType[];
  lastIssue: IssueCardType;
  lastIssueArticles: ArticardType[];
}> = ({ topics, articles, lastIssue, lastIssueArticles }) => {
  const session = useSession();
  console.log(session);

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

  const lastIssue = await (await getIssues(false, undefined, 1))[0];
  const lastIssueArticles = await await getArticles(
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
      topics: topics ?? null,
      articles: articles ?? null,
      lastIssue: lastIssue ?? null,
      lastIssueArticles: lastIssueArticles ?? null,
    },
  };
};
