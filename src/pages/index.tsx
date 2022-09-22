import { Flex, Heading, Image, Text } from "@chakra-ui/react";
import LatestSection from "@components/Home/latest-section";
import Layout from "@components/layout/layout";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <Layout>
      <Flex flexDirection="column">
        <LatestSection
          issueTime="June 2022"
          description="Hey gays! Read this!"
          cover="/images/june-2022.webp"
        />
      </Flex>
    </Layout>
  );
};

export default Home;
