import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import Articard from "@components/cards/articard";
import LatestIssues from "@components/latest/latest-issues";
import Layout from "@components/layout/layout";
import Link from "@components/link";
import MasonryLayout from "@components/masonry/masonry-layout";
import { NextPage } from "next";
import NothingHereWrapper from "@components/latest/nothing-here-wrapper";
import { useRouter } from "next/router";
import { trpc } from "@lib/trpc";

const Issue: NextPage = () => {
  const router = useRouter();
  const slug = router.query.slug?.toString() ?? "";

  const articleQuery = trpc.article.getMany.useQuery({ issueSlug: slug });
  const issueQuery = trpc.issue.getBySlug.useQuery({ slug: slug });
  const articles = articleQuery.data ?? [];
  const issue = issueQuery.data;

  return (
    <Layout title={issue?.title} alignItems="center">
      <Heading>{issue?.title}</Heading>
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
          _active={{ background: "transparent" }}>
          Read the PDF!!
        </Link>
      )}

      <Box mb="4rem">
        <NothingHereWrapper valid={articles?.length > 0} py="20vh">
          <MasonryLayout numItems={articles?.length}>
            {articles?.map((article, i) => (
              <Articard
                {...article}
                key={i}
                styles={{ h: "fit-content", my: "1rem" }}
              />
            ))}
          </MasonryLayout>
        </NothingHereWrapper>
      </Box>

      <LatestIssues exclude={[slug]} />
    </Layout>
  );
};

export default Issue;
