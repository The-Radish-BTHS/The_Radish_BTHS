import { PersonCardType } from "@/types/person";
import PersonCard from "@components/cards/person-card";
import Layout from "@components/layout/layout";
import MasonryLayout from "@components/shared/masonry/masonry-layout";
import { GetStaticProps, NextPage } from "next";

const People: NextPage<{ people: PersonCardType[] }> = ({ people }) => {
  return (
    <Layout pageIndex={2} alignItems="center">
      <MasonryLayout>
        {people.map((person, i) => (
          <PersonCard {...person} key={i} styles={{ mb: "2rem" }} />
        ))}
      </MasonryLayout>
    </Layout>
  );
};

export default People;

export const getStaticProps: GetStaticProps = async (context) => {
  const sample = {
    name: "Aramie R. Ewen",
    title: "President",
    isExec: false,
    description: "just a corny guy in a cheesy world",
    image: "/images/aramie.webp",
    id: "slay",
  };

  const people = new Array(20).fill(sample);

  return {
    props: { people },
  };
};
