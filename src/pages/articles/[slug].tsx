import { Flex, Heading, Text } from "@chakra-ui/react";
import TopicCard from "@components/cards/topic-card";
import Layout from "@components/layout/layout";
import Link from "@components/link";
import LatestArticles from "@components/latest/latest-articles";

import Markdown from "@components/markdown";

import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ArticlePageType } from "@/types/article";

import prisma from "@lib/prisma.server";
import { getArticle } from "@lib/getters/unique-getters.server";
import { getArticles } from "@lib/getters/many-getters.server";
import { slugsToPaths } from "@lib/helpers.server";

const Article: NextPage<ArticlePageType> = ({
  title,
  content,
  authors,
  issue,
  topics,
  latest,
  publishedOn,
}) => {
  const pubString = Intl.DateTimeFormat("en-us", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(publishedOn);

  return (
    <Layout title={title} alignItems="center">
      <Heading textAlign="center" maxW="85vw">
        {title}
      </Heading>
      <Flex fontSize="1.05rem" w="90vw" mt="0.5rem" justifyContent="center">
        {authors?.map((author, i) => (
          <Link key={i} href={`/people/${author.slug}`} mr="0.2rem">
            {author.name}
          </Link>
        ))}
        <Text fontWeight="bold" mx="0.2rem">
          {" "}
          ∙{" "}
        </Text>
        <Text>{pubString}</Text>

        {issue && (
          <>
            <Text fontWeight="bold" mx="0.2rem">
              {" "}
              ∙{" "}
            </Text>
            <Link href={`/issues/${issue?.slug}`}>{issue?.title}</Link>
          </>
        )}
      </Flex>
      <Flex
        mt="0.4rem"
        mb="1rem"
        flexWrap="wrap"
        maxW="85vw"
        fontSize="1.2rem"
        fontWeight="medium"
      >
        {topics?.map((topic, i) => (
          <TopicCard name={topic.name} slug={topic.slug} key={i} />
        ))}
      </Flex>
      {/* <Flex
        flexDir="column"
        w="90vw"
        wordBreak="break-word"
        dangerouslySetInnerHTML={{ __html: content }}
      /> */}
      <Flex px="12vw" flexDir="column">
        <Markdown content={content} />
      </Flex>

      <Flex mt="4rem" maxW={{ base: "95vw", md: "70vw", lg: "65vw" }}>
        <LatestArticles title="More Articles" articles={latest} />
      </Flex>
    </Layout>
  );
};

export default Article;

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = String(context.params?.slug);
  const article = await getArticle(slug);
  const latest = await getArticles(false, undefined, [slug], 6);

  return {
    props: {
      ...article,
      latest,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const articles = await prisma.article.findMany({
    where: { published: true },
    select: { slug: true },
  });

  const paths = slugsToPaths(articles);

  return {
    paths,
    fallback: true,
  };
};
