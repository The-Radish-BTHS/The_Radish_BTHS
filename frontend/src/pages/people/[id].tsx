import { PersonPage } from "@/types/person";
import { Flex, Heading, Text } from "@chakra-ui/react";
import Articard from "@components/cards/articard";
import OtherPeople from "@components/Latest/other-people";
import Layout from "@components/layout/layout";
import MasonryLayout from "@components/shared/masonry/masonry-layout";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";

const Id: NextPage<PersonPage> = ({
  name,
  title,
  isExec,
  gradYear,
  description,
  articles,
}) => {
  const today = new Date();
  const grad = today.getMonth() > 6 && today.getFullYear() >= gradYear;

  return (
    <Layout alignItems="center">
      <Heading>{name}</Heading>
      <Flex mb="0.75rem" mt="0.25rem">
        <Text>
          {grad ? "Former " : ""} {title}
        </Text>
        <Text fontWeight="bold" mx="0.2rem">
          {" "}
          ∙{" "}
        </Text>
        <Text>
          Graduat{grad ? "ed" : "ing"} {gradYear}
        </Text>
      </Flex>

      <Text mb="3rem">{description}</Text>

      <MasonryLayout>
        {articles?.map((article, i) => (
          <Articard
            {...article}
            key={i}
            styles={{ h: "fit-content", my: "1rem" }}
          />
        ))}
      </MasonryLayout>
      <Flex mt="4rem">
        <OtherPeople />
      </Flex>
    </Layout>
  );
};

export default Id;

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id;
  const name = "Dommy";
  const description = "Yass queen";
  const title = "writer";
  const gradYear = 2020;

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
      title,
      gradYear,
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
