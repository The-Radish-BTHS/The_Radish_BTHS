import { Heading, Text } from "@chakra-ui/react";
import PersonCard from "@components/cards/person-card";
import Layout from "@components/layout/layout";
import Link from "@components/link";
import MasonryLayout from "@components/masonry/masonry-layout";
import { GetStaticProps, NextPage } from "next";
import NothingHereWrapper from "@components/latest/nothing-here-wrapper";
import { trpc } from "@lib/trpc";
import RequiredUserWrapper from "@components/required-user-wrapper";
import { getSsgCaller } from "@lib/ssg-helper";
import { OnBottom } from "@components/on-bottom";

const Execs: NextPage = () => {
  const execsQuery = trpc.person.getInfinite.useInfiniteQuery(
    {
      who: "execs",
    },
    {
      getNextPageParam: (current) => current.nextCursor,
    }
  );
  const execs = execsQuery.data?.pages.map((page) => page.people).flat();

  return (
    <Layout pageIndex={3} alignItems="center">
      <Heading>Hall of Execs</Heading>
      <Text mb="3rem">
        Holier than{" "}
        <Link href="/people" textDecor="underline">
          thou
        </Link>
      </Text>
      <NothingHereWrapper valid={(execs || []).length > 0}>
        <OnBottom onBottom={() => execsQuery.fetchNextPage()}>
          <MasonryLayout numItems={execs?.length}>
            {execs?.map((exec, i) => (
              <PersonCard {...exec} key={i} styles={{ mb: "2rem" }} />
            ))}
          </MasonryLayout>
        </OnBottom>

        {execsQuery.hasNextPage ? (
          <Text>Loading more articles...</Text>
        ) : (
          <Text>You reached the end.</Text>
        )}
      </NothingHereWrapper>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const ssg = await getSsgCaller();

  await ssg.person.getInfinite.prefetchInfinite({
    who: "execs",
  });

  return {
    props: { trpcState: ssg.dehydrate() },
    revalidate: 60,
  };
};

export default Execs;
