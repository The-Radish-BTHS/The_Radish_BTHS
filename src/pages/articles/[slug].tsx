import {
  Flex,
  Heading,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
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
import Button from "@components/button";
import { useRouter } from "next/router";
import { useCanAccess } from "@hooks/useCanAccess";

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

  const { isOpen, onClose, onOpen } = useDisclosure();
  const router = useRouter();
  const toast = useToast();
  const { canAccess } = useCanAccess();
  const publishArticle = trpc.article.publish.useMutation({
    onError(err) {
      toast({
        title: `Article Publish Error ${err.data?.httpStatus}: ${err.message}`,
        status: "error",
        duration: 4000,
        position: "bottom-right",
        isClosable: true,
      });
    },
    onSuccess() {
      toast({
        title: "Article Published Successfully!",
        status: "success",
        duration: 4000,
        position: "bottom-right",
        isClosable: true,
      });
    },
  });

  const pubString = Intl.DateTimeFormat("en-us", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(articleData.publishedOn);

  return (
    <Layout title={articleData.title} alignItems="center">
      {articleData.published || canAccess("editor") ? (
        <>
          <Modal
            isOpen={isOpen}
            onClose={onClose}
            size={{ base: "full", md: "md" }}
            isCentered>
            <ModalOverlay />
            <ModalContent
              bg="#ebeae5"
              borderRadius={{ base: 0, sm: "0.75rem" }}>
              <ModalHeader>Are you sure?</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text>
                  Are you sure you want to actually publish this article?
                </Text>
              </ModalBody>

              <ModalFooter>
                <Button
                  onClick={async () => {
                    await publishArticle
                      .mutateAsync({
                        slug: articleData.slug,
                      })
                      .then(() => {
                        onClose();
                        router.push("/eggsex");
                      });
                  }}>
                  Yes, I&apos;m sure!
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          {!articleData.published && (
            <Flex
              justifyContent="center"
              gap="0.75rem"
              w="101vw"
              mb="1rem"
              borderY="1px solid black">
              {[...Array(30)].map((_, i) => (
                <Text key={i}>UNPUBLISHED</Text>
              ))}
            </Flex>
          )}

          <Flex
            w="100%"
            position="relative"
            flexDir="column"
            justifyContent="center"
            alignItems="center"
            flex={1}>
            {!articleData.published && (
              <Button
                w={{ base: "90vw", md: "fit-content" }}
                ml={{ base: 0, md: "auto" }}
                mb={{ base: "2rem", md: 0 }}
                onClick={onOpen}>
                Publish
              </Button>
            )}
            <Heading textAlign="center" maxW="85vw">
              {articleData.title}
            </Heading>
            <Text fontSize="1.05rem" mt="0.5rem" w="100%" textAlign="center">
              {articleData.authors?.map((author, i) => (
                <Link key={i} href={`/people/${author.slug}`} mr="0.2rem">
                  {author.name}
                  {i < articleData.authors.length - 1 && ", "}
                </Link>
              ))}
              <span style={{ fontWeight: "bold" }}>{" ∙ "}</span>
              {pubString}
              {articleData.issue && (
                <>
                  <span style={{ fontWeight: "bold" }}>{" ∙ "}</span>
                  <Link href={`/issues/${articleData.issueSlug}`}>
                    {articleData.issue.title}
                  </Link>
                </>
              )}
            </Text>
          </Flex>

          <Flex
            mt="0.4rem"
            mb="1rem"
            flexWrap="wrap"
            maxW="85vw"
            fontSize="1.2rem"
            fontWeight="medium">
            {articleData.topics.map((topic, i) => (
              <TopicCard name={topic.name} slug={topic.slug} key={i} />
            ))}
          </Flex>
          <Flex px={{ base: "2vw", md: "12vw" }} flexDir="column" mb="4rem">
            <Markdown content={articleData.content} />
          </Flex>

          {/* TODO: Fix the type resolving properly...what is an Articard and why is it different from Articles */}
          <LatestArticles
            title="More Articles"
            articles={latestArticles.data! as any}
          />
        </>
      ) : (
        <>
          <Heading>This isn&apos;t real!</Heading>
          <Text>Yooooou caaaan&apos;t seeeeeee meeeee</Text>
        </>
      )}
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
