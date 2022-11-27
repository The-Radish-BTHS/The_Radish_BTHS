import { Divider, Flex, Heading, Text } from "@chakra-ui/react";
import Articard from "@components/cards/articard";
import Layout from "@components/layout/layout";
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
          <Heading fontSize="2.3rem">Eggsex</Heading>
          <Text fontSize="1.2rem">Welcome, my chosen ones.</Text>

          <Flex mt="8rem" flexDir="column">
            <Heading>Edited articles</Heading>
            <Text>They&apos;ve been edited. What now?</Text>
            <Divider borderColor="black" my="1rem" />
            {editedArticles?.map((article, i) => (
              <Articard {...article} key={i} />
            ))}
          </Flex>
        </>
      )}
    </Layout>
  );
};

export default Eggsex;
