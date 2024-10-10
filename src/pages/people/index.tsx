import { Heading, Text } from "@chakra-ui/react";
import PersonCard from "@components/cards/person-card";
import Layout from "@components/layout/layout";
import Link from "@components/link";
import MasonryLayout from "@components/masonry/masonry-layout";
import { GetStaticProps, NextPage } from "next";
import NothingHereWrapper from "@components/latest/nothing-here-wrapper";
import { trpc } from "@lib/trpc";
import { getSsgCaller } from "@lib/ssg-helper";
import { OnBottom } from "@components/on-bottom";

const People: NextPage = () => {
  const peopleQuery = trpc.person.getInfinite.useInfiniteQuery(
    {
      who: "normies",
    },
    {
      getNextPageParam: (current) => current.nextCursor,
    }
  );
  const people = peopleQuery.data?.pages.map((page) => page.people).flat();

  return (
    <Layout pageIndex={2} alignItems="center">
      <Heading>Normal People</Heading>
      <Text mb="3rem">
        Also see{" "}
        <Link href="/execs" textDecor="underline">
          the special ones
        </Link>
      </Text>
      <NothingHereWrapper valid={(people || []).length > 0}>
        <OnBottom onBottom={() => peopleQuery.fetchNextPage()}>
          <MasonryLayout numItems={people?.length}>
            {people?.map((person, i) => (
              <PersonCard {...person} key={i} styles={{ mb: "2rem" }} />
            ))}
          </MasonryLayout>
        </OnBottom>

        {peopleQuery.hasNextPage ? (
          <Text>Loading more articles...</Text>
        ) : (
          <></>
        )}
      </NothingHereWrapper>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const ssg = await getSsgCaller();

  await ssg.person.getInfinite.prefetchInfinite({
    who: "normies",
  });

  return {
    props: { trpcState: ssg.dehydrate() },
    revalidate: 600,
  };
};

export default People;
