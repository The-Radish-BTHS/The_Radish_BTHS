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
  HStack,
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

const Article: NextPage = () => {
  const router = useRouter();
  const slug = router.query.slug?.toString() ?? "";

  const article = trpc.article.get.useQuery({ slug });
  // non null since the data is fetched during SSG
  const articleData = article.data!;

  const { isOpen, onClose, onOpen } = useDisclosure();

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

  const unEditArticle = trpc.article.unEdit.useMutation({
    onError(err) {
      toast({
        title: `Article UnEdit Error ${err.data?.httpStatus}: ${err.message}`,
        status: "error",
        duration: 4000,
        position: "bottom-right",
        isClosable: true,
      });
    },
    onSuccess() {
      toast({
        title: "Article UnEdited Successfully!",
        status: "success",
        duration: 4000,
        position: "bottom-right",
        isClosable: true,
      });
    },
  });
  const unpublishArticle = trpc.article.unpublish.useMutation({
    onError(err) {
      toast({
        title: `Article Unpublish Error ${err.data?.httpStatus}: ${err.message}`,
        status: "error",
        duration: 4000,
        position: "bottom-right",
        isClosable: true,
      });
    },
    onSuccess() {
      toast({
        title: "Article Unpublished Successfully!",
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
            isCentered
          >
            <ModalOverlay />
            <ModalContent
              bg="#ebeae5"
              borderRadius={{ base: 0, sm: "0.75rem" }}
            >
              <ModalHeader>Are you sure?</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text>
                  Are you sure you want to actually{" "}
                  {!articleData.published ? "publish" : "unpublish"} this
                  article?
                </Text>
              </ModalBody>

              <ModalFooter>
                <Button
                  onClick={async () => {
                    if (articleData.published) {
                      // UNpublishing
                      await unpublishArticle
                        .mutateAsync({
                          slug: articleData.slug,
                        })
                        .then(() => {
                          onClose();
                          router.push("/eggsex");
                        });
                    } else {
                      // Publishing
                      await publishArticle
                        .mutateAsync({
                          slug: articleData.slug,
                        })
                        .then(() => {
                          onClose();
                          router.push("/eggsex");
                        });
                    }
                  }}
                >
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
              borderY="1px solid black"
            >
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
            flex={1}
          >
            {canAccess("exec") && (
              <HStack w="100%">
                <Button onClick={onOpen} ml="auto !important">
                  {!articleData.published ? "Publish" : "Unpublish"}
                </Button>

                {!articleData.published && (
                  <Button
                    onClick={async () => {
                      await unEditArticle
                        .mutateAsync({
                          articleId: articleData.id,
                        })
                        .catch(() => 0)
                        .then(() => {
                          router.push("/editor-dashboard");
                        });
                    }}
                  >
                    Send back to editor
                  </Button>
                )}
              </HStack>
            )}
            <Heading textAlign="center" w="100%">
              {articleData.title}
            </Heading>
            <Text fontSize="1.05rem" mt="0.5rem" w="100%" textAlign="center">
              {articleData.authors?.map((author, i) => (
                <Link key={i} href={`/people/${author.slug}`} mr="0.2rem">
                  {author.name}
                  {i < articleData.authors.length - 1 && ", "}
                </Link>
              ))}
              {articleData.authors.length ? (
                <span style={{ fontWeight: "bold" }}>{" ∙ "}</span>
              ) : (
                <></>
              )}
              {pubString}
              {articleData.issue && (
                <>
                  <span style={{ fontWeight: "bold" }}>{" ∙ "}</span>
                  <Link href={`/issues/${articleData.issue.slug}`}>
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
            fontSize="1.2rem"
            fontWeight="medium"
          >
            {articleData.topics.map((topic, i) => (
              <TopicCard name={topic.name} slug={topic.slug} key={i} />
            ))}
          </Flex>
          <Flex
            w="100%"
            flexDir="column"
            mb="4rem"
            fontSize="clamp(16px,12px + .5vw,1.25rem)"
          >
            <Markdown content={articleData.content} />
          </Flex>

          {/* TODO: Fix the type resolving properly...what is an Articard and why is it different from Articles */}
          <LatestArticles title="More Articles" exclude={[slug]} />
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
  await ssg.article.getAll.prefetch({
    sortOrder: "desc",
    exclude: [slug],
    take: 6,
  });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      slug,
    },
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const articles = await prisma.article.findMany({
    where: {
      published: true,
    },
    select: { slug: true },
  });

  return {
    paths: articles.map(({ slug }) => `/articles/${slug}`),
    fallback: "blocking",
  };
};
