import { PersonCardType } from "@/types/person";
import { Heading, Text } from "@chakra-ui/react";
import PersonCard from "@components/cards/person-card";
import Layout from "@components/layout/layout";
import Link from "@components/shared/link";
import MasonryLayout from "@components/shared/masonry/masonry-layout";
import { GetStaticProps, NextPage } from "next";
import { getPeople } from "lib/many-getters.server";

const People: NextPage<{ people: PersonCardType[] }> = ({ people }) => {
  return (
    <Layout pageIndex={2} alignItems="center">
      <Heading>Normal People</Heading>
      <Text mb="3rem">
        Also see{" "}
        <Link href="/execs" textDecor="underline">
          the special ones
        </Link>
      </Text>
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
  const people = await getPeople(false);

  return {
    props: { people },
  };
};
