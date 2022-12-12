import { Heading, Text } from "@chakra-ui/react";
import PersonCard from "@components/cards/person-card";
import Layout from "@components/layout/layout";
import Link from "@components/link";
import MasonryLayout from "@components/masonry/masonry-layout";
import { NextPage } from "next";
import NothingHereWrapper from "@components/latest/nothing-here-wrapper";
import { trpc } from "@lib/trpc";
import RequiredUserWrapper from "@components/required-user-wrapper";

const Execs: NextPage = () => {
  const execsQuery = trpc.person.getAll.useQuery({ who: "execs" });
  const execs = execsQuery.data ?? [];
  return (
    <Layout pageIndex={3} alignItems="center">
      <RequiredUserWrapper>
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
      </RequiredUserWrapper>
    </Layout>
  );
};

export default Execs;
