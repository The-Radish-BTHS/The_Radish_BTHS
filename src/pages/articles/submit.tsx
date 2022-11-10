import { Heading, Text } from "@chakra-ui/react";
import Layout from "@components/layout/layout";
import { NextPage } from "next";

const Submit: NextPage = () => {
  return (
    <Layout title="Submit an Article!">
      <Heading textAlign="center">So you want to submit an Article?</Heading>
      <Text textAlign="center" fontSize="1.25rem">
        Do it! Submit it! Go!
      </Text>
    </Layout>
  );
};

export default Submit;
