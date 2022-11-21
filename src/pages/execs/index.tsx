import { PersonCardType } from "@/types/person";
import { Heading, Text } from "@chakra-ui/react";
import PersonCard from "@components/cards/person-card";
import Layout from "@components/layout/layout";
import Link from "@components/link";
import MasonryLayout from "@components/masonry/masonry-layout";
import { GetStaticProps, NextPage } from "next";
import { getPeople } from "@lib/getters/many-getters.server";
import NothingHereWrapper from "@components/latest/nothing-here-wrapper";

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
      <NothingHereWrapper valid={execs?.length > 0}>
        <MasonryLayout numItems={execs?.length}>
          {execs.map((exec, i) => (
            <PersonCard {...exec} key={i} styles={{ mb: "2rem" }} />
          ))}
        </MasonryLayout>
      </NothingHereWrapper>
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
