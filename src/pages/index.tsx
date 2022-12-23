import LatestArticles from "@components/latest/latest-articles";
import LatestSection from "@components/latest/latest-section";
import TopicsSection from "@components/latest/topics-section";
import Layout from "@components/layout/layout";
import { getSsgCaller } from "@lib/ssg-helper";
import type { GetStaticProps, NextPage } from "next";

const Home: NextPage = () => {
  return (
    <Layout alignItems="center" gap="2.5rem">
      <LatestSection />
      <LatestArticles />
      <TopicsSection />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = await getSsgCaller();

  await ssg.issue.getLast.prefetch();
  await ssg.article.getAll.prefetch({
    sortOrder: "desc",
    take: 6,
    exclude: [],
  });
  await ssg.topic.getAll.prefetch();

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
  };
};

export default Home;
