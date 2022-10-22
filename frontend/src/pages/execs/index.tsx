import PersonCard from "@components/cards/person-card";
import Layout from "@components/layout/layout";
import { GetStaticProps, NextPage } from "next";

const Index: NextPage = () => {
  return (
    <Layout pageIndex={3}>
      <PersonCard
        name="Santiago Vira"
        title="artist"
        description='"The Cheese"'
        id="abcd"
        isExec
        image="/images/aramie.webp"
      />
    </Layout>
  );
};

export default Index;

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {},
  };
};
