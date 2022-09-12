import { Flex, Heading, Text } from "@chakra-ui/react";
import Layout from "@components/layout/layout";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <Layout>
      <Flex flexDirection="column">
        <Heading fontSize="2rem">Latest & Greatest</Heading>
      </Flex>
    </Layout>
  );
};

export default Home;
