import { PersonCardType } from "@/types/person";
import PersonCard from "@components/cards/person-card";
import Layout from "@components/layout/layout";
import MasonryLayout from "@components/shared/masonry/masonry-layout";
import { GetStaticProps, NextPage } from "next";

const Execs: NextPage<{ execs: PersonCardType[] }> = ({ execs }) => {
  return (
    <Layout pageIndex={3} alignItems="center">
      <MasonryLayout>
        {execs.map((exec, i) => (
          <PersonCard {...exec} key={i} styles={{ mb: "2rem" }} />
        ))}
      </MasonryLayout>
    </Layout>
  );
};

export default Execs;

export const getStaticProps: GetStaticProps = async (context) => {
  const sample = {
    name: "Santiago M. Vira",
    title: "Website Manager",
    isExec: true,
    description: "just a cheesy guy in a corny world",
    image: "/images/aramie.webp",
    id: "slay",
  };

  const execs = new Array(20).fill(sample);

  return {
    props: { execs },
  };
};
