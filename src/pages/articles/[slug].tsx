import { Flex, Heading, Text } from "@chakra-ui/react";
import TopicCard from "@components/cards/topic-card";
import LatestArticles from "@components/latest/latest-articles";
import Layout from "@components/layout/layout";
import Link from "@components/link";

import Markdown from "@components/markdown";
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import { slugsToPaths } from "@lib/helpers.server";
import prisma from "@lib/prisma.server";
import { getSsgCaller } from "@lib/ssg-helper";
import { trpc } from "@lib/trpc";

const Article: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = (
  props
) => {
  const article = trpc.article.get.useQuery({ slug: props.slug });
  const latestArticles = trpc.article.getMany.useQuery({
    sortOrder: "desc",
    take: 6,
    exclude: [props.slug],
  });

  const articleData = article.data!;

  const pubString = Intl.DateTimeFormat("en-us", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(articleData.publishedOn);

  return (
    <Layout title={articleData.title} alignItems="center">
      <Heading textAlign="center" maxW="85vw">
        {articleData.title}
      </Heading>
      <Flex fontSize="1.05rem" w="90vw" mt="0.5rem" justifyContent="center">
        {articleData.authors?.map((author, i) => (
          <Link key={i} href={`/people/${author.slug}`} mr="0.2rem">
            {author.name}
          </Link>
        ))}
        <Text fontWeight="bold" mx="0.2rem">
          {" "}
          ∙{" "}
        </Text>
        <Text>{pubString}</Text>

        {articleData.issue && (
          <>
            <Text fontWeight="bold" mx="0.2rem">
              {" "}
              ∙{" "}
            </Text>
            <Link href={`/issues/${articleData.issueSlug}`}>
              {articleData.issue.title}
            </Link>
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
        {articleData.topics.map((topic, i) => (
          <TopicCard name={topic.name} slug={topic.slug} key={i} />
        ))}
      </Flex>
      <Flex px="12vw" flexDir="column">
        <Markdown content={articleData.content} />
      </Flex>

      <Flex mt="4rem" maxW={{ base: "95vw", md: "70vw", lg: "65vw" }}>
        {/* TODO: Fix the type resolving properly...what is an Articard and why is it different from Articles */}
        <LatestArticles
          title="More Articles"
          articles={latestArticles.data! as any}
        />
      </Flex>
    </Layout>
  );
};

export default Article;

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params?.slug as string;

  const ssg = await getSsgCaller();

  await ssg.article.get.prefetch({ slug });
  await ssg.article.getMany.prefetch({
    sortOrder: "desc",
    exclude: [slug],
    take: 6,
  });

  console.log(ssg.dehydrate());

  return {
    props: {
      trpcState: ssg.dehydrate(),
      slug,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const articles = await prisma.article.findMany({
    where: {
      published: true,
    },
    select: { slug: true },
  });

  const paths = slugsToPaths(articles);

  return {
    paths,
    fallback: "blocking",
  };
};
