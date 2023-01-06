import { Flex, Heading, Text } from "@chakra-ui/react";
import Articard from "@components/cards/articard";
import OtherPeople from "@components/latest/other-people";
import Layout from "@components/layout/layout";
import MasonryLayout from "@components/masonry/masonry-layout";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import ExecStamp from "@components/exec-stamp";
import NothingHereWrapper from "@components/latest/nothing-here-wrapper";
import { useRouter } from "next/router";
import { trpc } from "@lib/trpc";
import RequiredUserWrapper from "@components/required-user-wrapper";
import { getSsgCaller } from "@lib/ssg-helper";
import { createPublicCaller } from "@server/trpc";
import { OnBottom } from "@components/on-bottom";
import { useIsFormer } from "@hooks/useIsFormer";

const Person: NextPage = () => {
  const router = useRouter();
  const { isFormer } = useIsFormer();

  const personQuery = trpc.person.getBySlug.useQuery({
    slug: router.query.slug as string,
  });
  const person = personQuery.data;

  const articlesQuery = trpc.article.getInfinite.useInfiniteQuery(
    {
      withAuthor: router.query.slug as string,
    },
    {
      getNextPageParam: (current) => current.nextCursor,
    }
  );
  const articles = articlesQuery.data?.pages
    .map((page) => page.articles)
    .flat();

  const former = isFormer(person?.gradYear);

  return (
    <Layout title={person?.name} alignItems="center">
      <Flex gap="0.5rem" alignItems="flex-start" ml="40px">
        <Heading>{person?.name}</Heading>
        {person?.isExec && <ExecStamp id={person?.name} size={40} />}
      </Flex>
      <Text mb="0.75rem" mt="0.25rem" textAlign="center">
        {former ? "Former " : ""} {person?.position}
        <span style={{ fontWeight: "bold" }}>{" ∙ "}</span>
        Graduat{former ? "ed" : "ing"} {person?.gradYear}
      </Text>

      {person?.description && (
        <Text
          w={{ base: "90vw", md: "40vw" }}
          textAlign="center"
          fontStyle="italic"
          mb="3rem"
          fontWeight="medium">
          &quot;{person?.description}&quot;
        </Text>
      )}
      <NothingHereWrapper valid={(articles?.length ?? 0) > 0} py="20vh">
        <OnBottom onBottom={() => articlesQuery.fetchNextPage()}>
          <MasonryLayout numItems={articles?.length}>
            {articles?.map((article, i) => (
              <Articard
                {...article}
                key={i}
                styles={{ h: "fit-content", my: "1rem" }}
              />
            ))}
          </MasonryLayout>
        </OnBottom>

        {articlesQuery.hasNextPage ? (
          <Text>Loading more articles...</Text>
        ) : (
          <Text>You reached the end.</Text>
        )}
      </NothingHereWrapper>
      <Flex mt="4rem" w="100%">
        <OtherPeople exclude={[router.query.slug as string]} />
      </Flex>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const ssg = await getSsgCaller();

  await ssg.person.getBySlug.prefetch({
    slug: ctx.params?.slug as string,
  });

  await ssg.article.getInfinite.prefetchInfinite({
    withAuthor: ctx.params?.slug as string,
  });

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const trpc = createPublicCaller();

  return {
    paths: (await trpc.person.getAllSlugs()).map((slug) => `/people/${slug}`),
    fallback: "blocking",
  };
};

export default Person;
