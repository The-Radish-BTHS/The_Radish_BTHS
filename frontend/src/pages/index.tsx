import LatestArticles from "@components/Latest/latest-articles";
import LatestSection from "@components/Latest/latest-section";
import Layout from "@components/layout/layout";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <Layout alignItems="center" gap="2.5rem">
      <LatestSection
        issueTime="June 2022"
        description="Hey gays! Read this! lorem ipsum dolor sit amet"
        cover="/images/june-2022.webp"
      />
      <LatestArticles />
    </Layout>
  );
};

export default Home;
