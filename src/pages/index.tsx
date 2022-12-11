import LatestArticles from "@components/latest/latest-articles";
import LatestSection from "@components/latest/latest-section";
import TopicsSection from "@components/latest/topics-section";
import Layout from "@components/layout/layout";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <Layout alignItems="center" gap="2.5rem">
      <LatestSection />
      <LatestArticles />

      <TopicsSection />
    </Layout>
  );
};

export default Home;
