import ArticleType from "@/types/article";
import { Flex, Heading, Text } from "@chakra-ui/react";
import CardTag from "@components/cards/card-tag";
import Layout from "@components/layout/layout";
import Link from "@components/shared/link";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";

const Article: NextPage<ArticleType> = ({
  title,
  content,
  authors,
  issue,
  tags,
}) => {
  return (
    <Layout alignItems="center">
      <Heading textAlign="center" maxW="85vw">
        {title}
      </Heading>
      <Flex fontSize="1.05rem" w="90vw" mt="0.5rem" justifyContent="center">
        {authors.map((author, i) => (
          <Link
            key={i}
            href={`/${author.isExec ? "execs" : "people"}/${author.id}`}
            mr="0.2rem">
            {author.name}
          </Link>
        ))}

        <Text fontWeight="bold" mx="0.2rem">
          {" "}
          ∙{" "}
        </Text>
        <Link href={`/issues/${issue.id}`}>{issue.time}</Link>
      </Flex>
      <Flex
        mt="0.4rem"
        flexWrap="wrap"
        maxW="85vw"
        fontSize="1.2rem"
        fontWeight="medium">
        {tags.map((tag, i) => (
          <CardTag {...tag} key={i} />
        ))}
      </Flex>
      <Text>{content}</Text>
    </Layout>
  );
};

export default Article;

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id;
  const title = "10 instances of phenomenal reporting by the survey";
  const content =
    "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n";

  const authors = [
    {
      name: "Dommy",
      title: "author",
      isExec: false,
      id: "abcd",
      articles: [],
    },
  ];
  const issue = {
    time: "June 2022",
    cover: "/images/june-2022.webp",
    description: "Gay gay gay",
    id: "abcd",
    articles: [],
  };
  const tags = [
    {
      name: "queer",
      description: "yass",
      id: "slay",
      articles: [],
    },
    {
      name: "slay",
      description: "yass",
      id: "slay",
      articles: [],
    },
    {
      name: "yass",
      description: "yass",
      id: "slay",
      articles: [],
    },
  ];

  return {
    props: {
      title,
      content,
      id,
      authors,
      issue,
      tags,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  // const data = await getData();
  // const pathsWithParams = data.stars.map((star: starInterface) => ({ params: { id: "abcd"}}))

  return {
    paths: [{ params: { id: "abcd" } }],
    fallback: true,
  };
};
