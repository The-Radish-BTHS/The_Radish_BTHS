import { Flex, Heading, Text } from "@chakra-ui/react";
import Articard from "@components/cards/articard";
import OtherPeople from "@components/latest/other-people";
import Layout from "@components/layout/layout";
import MasonryLayout from "@components/masonry/masonry-layout";
import { NextPage } from "next";
import ExecStamp from "@components/exec-stamp";
import NothingHereWrapper from "@components/latest/nothing-here-wrapper";
import { useRouter } from "next/router";
import { trpc } from "@lib/trpc";
import RequiredUserWrapper from "@components/required-user-wrapper";

const Person: NextPage = () => {
  const router = useRouter();
  const slug = router.query.slug?.toString() ?? "";

  const today = new Date();

  const personQuery = trpc.person.getBySlug.useQuery({ slug });
  const person = personQuery.data;

  const former =
    person && today.getMonth() > 6 && today.getFullYear() >= person.gradYear;

  return (
    <Layout title={person?.name} alignItems="center">
      <RequiredUserWrapper>
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
        <NothingHereWrapper
          valid={(person?.articles?.length ?? 0) > 0}
          py="20vh">
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
      </RequiredUserWrapper>
    </Layout>
  );
};

export default Person;
