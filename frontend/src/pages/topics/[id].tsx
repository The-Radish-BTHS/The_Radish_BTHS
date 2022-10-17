import TopicType from "@/types/topic";
import { Heading, Text } from "@chakra-ui/react";
import ArticleCard from "@components/cards/article-card";
import Layout from "@components/layout/layout";
import MasonryLayout from "@components/shared/masonry/masonry-layout";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Masonry from "react-masonry-css";

const Id: NextPage<TopicType> = ({ name, description, id, articles }) => {
  return (
    <Layout alignItems="center" gap="0.5rem">
      <Heading color="#bb3300" fontWeight="600">
        #{name}
      </Heading>
      <Text fontSize="1.05rem" mb="2rem">
        {description}
      </Text>
      <MasonryLayout>
        {articles.map((article, i) => (
          <ArticleCard {...article} key={i} />
        ))}
      </MasonryLayout>
    </Layout>
  );
};

export default Id;

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id;
  const name = "slay";
  const description = "Yass queen";

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

  const articles = [
    {
      title: "Be Gay do Slay",
      content:
        "I think you should do it I think you should do it I think you should do it I think you should do it I think you should do it",

      id: "slay",
      authors,
      issue,
      tags,
    },
    {
      title: "Be Gay do Slay",
      content: "I think it",

      id: "slay",
      authors,
      issue,
      tags,
    },
    {
      title: "Be Gay do Slay",
      content:
        "I think you should do it I think you should do it I think you should do it I think you should do it I think you should do it",

      id: "slay",
      authors,
      issue,
      tags,
    },
  ];

  return {
    props: {
      id,
      name,
      description,
      articles,
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
