import IssueType, { IssuePage } from "@/types/issue";
import { Flex, Heading, Text } from "@chakra-ui/react";
import Articard from "@components/cards/articard";
import LatestIssues from "@components/Latest/latest-issues";
import Layout from "@components/layout/layout";
import Link from "@components/shared/link";
import MasonryLayout from "@components/shared/masonry/masonry-layout";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";

const Id: NextPage<IssuePage> = ({ time, description, pdf, articles }) => {
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

export default Id;

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id;

  const time = "June 2022";
  const cover = "/images/june-2022.webp";
  const description = "Gay gay gay";
  const pdf =
    "https://drive.google.com/file/d/1r4fDEbkSGUwHUBqgCv8q8UONo_vKio3A/view?usp=sharing";

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
      time,
      cover,
      description,
      pdf,
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
