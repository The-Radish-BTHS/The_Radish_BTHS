import { Flex } from "@chakra-ui/react";
import Layout from "@components/layout/layout";
import { NextPage } from "next";

const Index: NextPage = () => {
  return (
    <Layout pageIndex={0}>
      <Flex background="red" w="10vw" h="10vw" />
    </Layout>
  );
};

export default Index;
