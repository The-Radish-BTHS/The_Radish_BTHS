import { Divider, Flex, Heading, Text } from "@chakra-ui/react";
import SubmissionCard from "@components/cards/submission-card";
import Layout from "@components/layout/layout";
import MasonryLayout from "@components/masonry/masonry-layout";
import { useCanAccess } from "@hooks/useCanAccess";
import { trpc } from "@lib/trpc";
import { NextPage } from "next";
import Link from "next/link";

const EditorDashboard: NextPage = () => {
  const submissionsQuery = trpc.submission.getAll.useQuery();
  const submissions = submissionsQuery.data;
  const { canAccess } = useCanAccess();

  return (
    <Layout title="Editor Dashboard">
      {canAccess("editor") ? (
        <>
          <Flex flexDir="column">
            <Flex mb="1rem">
              <Heading borderBottom="4px dotted red" w="fit-content">
                Hay their editers!
              </Heading>
              <Heading ml="0.5rem">Submitteded art tickles</Heading>
            </Flex>
            <Text>Thyme two edit them ardiculs!!!</Text>
            <Divider borderColor="black" my="1rem" />
            <MasonryLayout>
              {submissions?.map((article, i) => (
                <SubmissionCard {...article} key={i} />
              ))}
            </MasonryLayout>
          </Flex>
        </>
      ) : (
        <Flex
          h="100%"
          flexDir="column"
          alignItems="center"
          justifyContent="center">
          <Heading>Ur not an editor fam...</Heading>
          <Link href="/about">Apply to join the editing team!</Link>
        </Flex>
      )}
    </Layout>
  );
};

export default EditorDashboard;
