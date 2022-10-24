import { PersonPageType } from "@/types/person";
import { Flex, Heading, Text } from "@chakra-ui/react";
import Articard from "@components/cards/articard";
import OtherPeople from "@components/Latest/other-people";
import Layout from "@components/layout/layout";
import MasonryLayout from "@components/shared/masonry/masonry-layout";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";

const Id: NextPage<PersonPageType> = ({
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
  const slug = context.params?.slug;
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
      slug: "abcd",
      articles: [],
    },
  ];
  const issue = {
    time: "June 2022",
    cover: "/images/june-2022.webp",
    description: "Gay gay gay",
    slug: "abcd",
    articles: [],
  };
  const tags = [
    {
      name: "queer",
      description: "yass",
      slug: "slay",
      articles: [],
    },
    {
      name: "slay",
      description: "yass",
      slug: "slay",
      articles: [],
    },
    {
      name: "yass",
      description: "yass",
      slug: "slay",
      articles: [],
    },
  ];

  const articles = [
    {
      title: "Be Gay do Slay",
      content:
        "I think you should do it I think you should do it I think you should do it I think you should do it I think you should do it",

      slug: "slay",
      authors,
      issue,
      tags,
    },
    {
      title: "Be Gay do Slay",
      content: "I think it",

      slug: "slay",
      authors,
      issue,
      tags,
    },
    {
      title: "Be Gay do Slay",
      content:
        "I think you should do it I think you should do it I think you should do it I think you should do it I think you should do it",

      slug: "slay",
      authors,
      issue,
      tags,
    },
  ];

  return {
    props: {
      name,
      title,
      description,
      gradYear,
      articles,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  // const data = await getData();
  // const pathsWithParams = data.stars.map((star: starInterface) => ({ params: { id: "abcd"}}))

  return {
    paths: [{ params: { slug: "abcd" } }],
    fallback: true,
  };
};
