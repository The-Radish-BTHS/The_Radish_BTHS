import { Heading, Text } from "@chakra-ui/react";
import PersonCard from "@components/cards/person-card";
import Layout from "@components/layout/layout";
import Link from "@components/link";
import MasonryLayout from "@components/masonry/masonry-layout";
import { NextPage } from "next";
import NothingHereWrapper from "@components/latest/nothing-here-wrapper";
import { trpc } from "@lib/trpc";

const People: NextPage = () => {
  const peopleQuery = trpc.person.getAll.useQuery({ who: "normies" });
  const people = peopleQuery.data ?? [];
  return (
    <Layout pageIndex={2} alignItems="center">
      <Heading>Normal People</Heading>
      <Text mb="3rem">
        Also see{" "}
        <Link href="/execs" textDecor="underline">
          the special ones
        </Link>
      </Text>
      <NothingHereWrapper valid={people?.length > 0}>
        <MasonryLayout numItems={people?.length}>
          {people.map((person, i) => (
            <PersonCard {...person} key={i} styles={{ mb: "2rem" }} />
          ))}
        </MasonryLayout>
      </NothingHereWrapper>
    </Layout>
  );
};

export default People;
