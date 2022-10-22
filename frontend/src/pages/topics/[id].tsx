import { TopicPage } from "@/types/topic";
import { Flex, Heading, Text } from "@chakra-ui/react";
import Articard from "@components/cards/articard";
import TopicsSection from "@components/Latest/topics-section";
import Layout from "@components/layout/layout";
import MasonryLayout from "@components/shared/masonry/masonry-layout";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";

const Id: NextPage<TopicPage> = ({ name, description, articles }) => {
  return (
    <Layout alignItems="center" gap="0.5rem">
      <Heading color="#bb3300" fontWeight="600">
        #{name}
      </Heading>
      <Text fontSize="1.05rem" mb="2rem">
        {description}
      </Text>
      <MasonryLayout>
        {articles?.map((article, i) => (
          <Articard
            {...article}
            key={i}
            outerStyles={{ h: "fit-content", my: "1rem" }}
          />
        ))}
      </MasonryLayout>
      <Flex mt="4rem">
        <TopicsSection title="More Topics" />
      </Flex>
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
      gradYear: 2024,
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
