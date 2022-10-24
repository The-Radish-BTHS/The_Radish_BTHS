import { PersonPageType } from "@/types/person";
import { Flex, Heading, Text } from "@chakra-ui/react";
import Articard from "@components/cards/articard";
import OtherPeople from "@components/Latest/other-people";
import Layout from "@components/layout/layout";
import MasonryLayout from "@components/shared/masonry/masonry-layout";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import prisma from "lib/prisma.server";

const Person: NextPage<PersonPageType> = ({
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

export default Person;

export const getStaticProps: GetStaticProps = async (context) => {
  const person = await prisma.person.findUnique({
    where: {
      slug: String(context.params?.slug),
    },
    include: {
      articles: {
        include: {
          authors: { select: { name: true, slug: true } },
          issue: { select: { time: true, slug: true } },
          topics: { select: { name: true, slug: true } },
        },
      },
    },
  });

  return {
    props: { ...person },
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
