import { IssuePageType } from "@/types/issue";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import Articard from "@components/cards/articard";
import LatestIssues from "@components/latest/latest-issues";
import Layout from "@components/layout/layout";
import Link from "@components/link";
import MasonryLayout from "@components/masonry/masonry-layout";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import prisma from "@lib/prisma.server";
import { getIssue } from "@lib/getters/unique-getters.server";
import { slugsToPaths } from "@lib/helpers.server";
import { getIssues } from "@lib/getters/many-getters.server";
import NothingHereWrapper from "@components/latest/nothing-here-wrapper";
import { useRouter } from "next/router";

const Issue: NextPage<IssuePageType> = ({
  title,
  description,
  pdf,
  articles,
  latest,
}) => {
  const router = useRouter();
  const slug = router.query.slug?.toString() ?? "";
  return (
    <Layout title={title} alignItems="center">
      <Heading>{title}</Heading>
      <Text mb="3rem" textAlign="center">
        {description}
      </Text>

      {pdf && (
        <Link
          external
          href={pdf}
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

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = String(context.params?.slug);
  const issue = await getIssue(slug);
  const latest = await getIssues(false, [slug]);

  return {
    props: { ...issue, latest },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const issues = await prisma.issue.findMany({
    where: { published: true },
    select: { slug: true },
  });

  const paths = await slugsToPaths(issues);

  return {
    paths,
    fallback: true,
  };
};
