import { PersonPageType } from "@/types/person";
import { Flex, Heading, Text } from "@chakra-ui/react";
import Articard from "@components/cards/articard";
import OtherPeople from "@components/latest/other-people";
import Layout from "@components/layout/layout";
import MasonryLayout from "@components/masonry/masonry-layout";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import prisma from "@lib/prisma.server";
import { getPerson } from "@lib/getters/unique-getters.server";
import { slugsToPaths } from "@lib/helpers.server";
import { getPeople } from "@lib/getters/many-getters.server";
import ExecStamp from "@components/exec-stamp";
import NothingHereWrapper from "@components/latest/nothing-here-wrapper";
import { useRouter } from "next/router";
import { trpc } from "@lib/trpc";

const Person: NextPage<PersonPageType> = ({}) => {
  const router = useRouter();
  const slug = router.query.slug?.toString() ?? "";

  const today = new Date();

  const personQuery = trpc.person.getBySlug.useQuery({ slug });
  const person = personQuery.data;

  const former =
    person && today.getMonth() > 6 && today.getFullYear() >= person.gradYear;

  return (
    <Layout title={person?.name} alignItems="center">
      <Flex gap="0.5rem" alignItems="flex-start" ml="40px">
        <Heading>{person?.name}</Heading>
        {person?.isExec && <ExecStamp id={person?.name} size={40} />}
      </Flex>
      <Text mb="0.75rem" mt="0.25rem" textAlign="center">
        {former ? "Former " : ""} {person?.position}
        <span style={{ fontWeight: "bold" }}>{" ∙ "}</span>
        Graduat{former ? "ed" : "ing"} {person?.gradYear}
      </Text>

      {person?.description && (
        <Text
          w={{ base: "90vw", md: "40vw" }}
          textAlign="center"
          fontStyle="italic"
          mb="3rem"
          fontWeight="medium">
          &quot;{person?.description}&quot;
        </Text>
      )}
      <NothingHereWrapper valid={(person?.articles?.length ?? 0) > 0} py="20vh">
        <MasonryLayout numItems={person?.articles?.length}>
          {person?.articles?.map((article, i) => (
            <Articard
              {...article}
              key={i}
              styles={{ h: "fit-content", my: "1rem" }}
            />
          ))}
        </MasonryLayout>
      </NothingHereWrapper>
      <Flex mt="4rem" w="100%">
        <OtherPeople exclude={[slug]} />
      </Flex>
    </Layout>
  );
};

export default Person;

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = String(context.params?.slug);
  const person = await getPerson(slug);
  const people = await getPeople(undefined, [slug], 6);

  return {
    props: { ...person, people },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const people = await prisma.person.findMany({
    select: { slug: true },
  });

  const paths = await slugsToPaths(people);

  return {
    paths,
    fallback: true,
  };
};
