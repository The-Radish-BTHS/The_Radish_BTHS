import { Divider, Flex, Heading, Text } from "@chakra-ui/react";
import Articard from "@components/cards/articard";
import Layout from "@components/layout/layout";
import MasonryLayout from "@components/masonry/masonry-layout";
import { trpc } from "@lib/trpc";
import { UserPermission } from "@prisma/client";
import { NextPage } from "next";
import { useSession } from "next-auth/react";

const Eggsex: NextPage = () => {
  const { data: sessionData } = useSession();
  const editedQuery = trpc.article.getEdited.useQuery();
  const editedArticles = editedQuery.data;

  return (
    <Layout title="Eggsex">
      {sessionData?.user?.permission !== UserPermission.EXEC ? (
        <Flex
          alignItems="center"
          justifyContent="center"
          flexDir="column"
          height="100%">
          <Heading>Shoo Normie!!</Heading>
          <Text>Submit articles please</Text>
        </Flex>
      ) : (
        <>
          <Heading fontWeight={700} textDecor="underline">
            Welcome, my chosen ones.
          </Heading>

          <Flex mt="2rem" flexDir="column">
            <Heading fontWeight={600}>Edited articles</Heading>
            <Text>They&apos;ve been edited. What now?</Text>
            <Divider borderColor="black" my="1rem" />
            <MasonryLayout>
              {editedArticles?.map((article, i) => (
                <Articard {...article} key={i} mb="1.5rem" />
              ))}
            </MasonryLayout>
          </Flex>
        </>
      )}
    </Layout>
  );
};

export default Eggsex;
