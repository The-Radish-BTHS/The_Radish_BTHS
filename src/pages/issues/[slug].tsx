import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import Articard from "@components/cards/articard";
import LatestIssues from "@components/latest/latest-issues";
import Layout from "@components/layout/layout";
import Link from "@components/link";
import MasonryLayout from "@components/masonry/masonry-layout";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import NothingHereWrapper from "@components/latest/nothing-here-wrapper";
import { useRouter } from "next/router";
import { trpc } from "@lib/trpc";
import { OnBottom } from "@components/on-bottom";
import { getSsgCaller } from "@lib/ssg-helper";
import { createPublicCaller } from "@server/trpc";

const Issue: NextPage = () => {
  const router = useRouter();
  const slug = router.query.slug?.toString() ?? "";

  const articlesQuery = trpc.article.getInfinite.useInfiniteQuery(
    {
      withIssue: slug,
    },
    {
      getNextPageParam: (current) => current.nextCursor,
    }
  );
  const issueQuery = trpc.issue.getBySlug.useQuery({ slug: slug });

  const articles = articlesQuery.data?.pages
    .map((page) => page.articles)
    .flat();
  const issue = issueQuery.data;

  const searchParams = new URLSearchParams();

  searchParams.set("img", issue?.coverUrl ?? "");
  searchParams.set("name", issue?.title ?? "");
  searchParams.set("description", issue?.description ?? "");
  searchParams.set(
    "excerpts",
    JSON.stringify(articles?.map((a) => a.title)) ?? ""
  );

  console.log("/api/og/issue?" + searchParams.toString());

  return (
    <Layout
      title={issue?.title}
      alignItems="center"
      imgUrl={"/api/og/issue?" + searchParams.toString()}
    >
      <Heading mt="1rem">{issue?.title}</Heading>
      <Text
        mb="3rem"
        textAlign="center"
        dangerouslySetInnerHTML={{ __html: issue?.description ?? "" }}
      />

      {issue?.pdf && (
        <Link
          external
          href={issue?.pdf}
          p="0.25rem 1.25rem"
          mb="2rem"
          fontWeight="600"
          fontSize="1.25rem"
          border="1px solid black"
          borderRadius="0.5rem"
          _hover={{ background: "rgba(222, 222, 222, 0.8)" }}
          _active={{ background: "transparent" }}
        >
          Read the PDF
        </Link>
      )}

      <Box mb="4rem">
        <NothingHereWrapper valid={(articles || []).length > 0} py="20vh">
          <OnBottom
            onBottom={() => {
              articlesQuery.fetchNextPage();
            }}
          >
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
      </Box>

      <LatestIssues exclude={[slug]} />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const ssg = await getSsgCaller();

  const slug = ctx.params?.slug as string;

  await ssg.issue.getBySlug.prefetch({ slug });
  await ssg.article.getInfinite.prefetchInfinite({
    withIssue: slug,
  });

  return {
    props: { trpcState: ssg.dehydrate() },
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const trpc = createPublicCaller();

  return {
    paths: (await trpc.issue.getAllSlugs()).map((slug) => `/issues/${slug}`),
    fallback: "blocking",
  };
};

export default Issue;
