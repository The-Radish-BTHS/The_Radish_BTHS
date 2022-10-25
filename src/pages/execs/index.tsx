import { PersonCardType } from "@/types/person";
import { Heading, Text } from "@chakra-ui/react";
import PersonCard from "@components/cards/person-card";
import Layout from "@components/layout/layout";
import Link from "@components/shared/link";
import MasonryLayout from "@components/shared/masonry/masonry-layout";
import { GetStaticProps, NextPage } from "next";
import { getPeople } from "lib/getters/many-getters.server";

const Execs: NextPage<{ execs: PersonCardType[] }> = ({ execs }) => {
  return (
    <Layout pageIndex={3} alignItems="center">
      <Heading>Hall of Execs</Heading>
      <Text mb="3rem">
        Holier than{" "}
        <Link href="/people" textDecor="underline">
          thou
        </Link>
      </Text>
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
  const execs = await getPeople(true);

  return {
    props: { execs },
  };
};
