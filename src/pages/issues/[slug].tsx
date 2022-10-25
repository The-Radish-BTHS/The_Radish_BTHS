import IssueType, { IssuePageType } from "@/types/issue";
import { Flex, Heading, Text } from "@chakra-ui/react";
import Articard from "@components/cards/articard";
import LatestIssues from "@components/Latest/latest-issues";
import Layout from "@components/layout/layout";
import Link from "@components/shared/link";
import MasonryLayout from "@components/shared/masonry/masonry-layout";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import prisma from "lib/prisma.server";
import { getIssue } from "lib/unique-getters.server";
import { slugsToPaths } from "lib/helpers.server";

const Issue: NextPage<IssuePageType> = ({
  time,
  description,
  pdf,
  articles,
}) => {
  return (
    <Layout alignItems="center">
      <Heading>{time}</Heading>
      <Text mb="3rem">{description}</Text>

      <Link
        external
        href={pdf ?? ""}
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

      <MasonryLayout>
        {articles?.map((article, i) => (
          <Articard
            {...article}
            key={i}
            styles={{ h: "fit-content", my: "1rem" }}
          />
        ))}
      </MasonryLayout>

      <Flex mt="4rem" w="60vw">
        <LatestIssues />
      </Flex>
    </Layout>
  );
};

export default Issue;

export const getStaticProps: GetStaticProps = async (context) => {
  const issue = await getIssue(String(context.params?.slug));

  return {
    props: { ...issue },
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
