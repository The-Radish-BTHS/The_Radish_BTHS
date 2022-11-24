import LatestArticles from "@components/latest/latest-articles";
import LatestSection from "@components/latest/latest-section";
import TopicsSection from "@components/latest/topics-section";
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
import { Button, Flex, Text } from "@chakra-ui/react";

import { signIn, useSession } from "next-auth/react";
import { getLastIssue } from "@lib/getters/unique-getters.server";
import { trpc } from "@lib/trpc";

const Home: NextPage<{
  topics: TopicCardType[];
  articles: ArticardType[];
  lastIssue: IssueCardType;
  lastIssueArticles: ArticardType[];
}> = ({ topics, articles, lastIssue, lastIssueArticles }) => {
  const session = useSession();
  const testQuery = trpc.test.useQuery();
  console.log(testQuery.data);

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
