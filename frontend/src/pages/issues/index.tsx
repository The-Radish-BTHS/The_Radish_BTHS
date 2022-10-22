import Layout from "@components/layout/layout";
import { GetStaticProps, NextPage } from "next";

const Index: NextPage = () => {
  return <Layout pageIndex={1}></Layout>;
};

export default Index;

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {},
  };
};
