import { Divider, Flex, Heading, Text } from "@chakra-ui/react";
import Articard from "@components/cards/articard";
import Layout from "@components/layout/layout";
import MasonryLayout from "@components/masonry/masonry-layout";
import { useCanAccess } from "@hooks/useCanAccess";
import { trpc } from "@lib/trpc";
import { NextPage } from "next";

const Eggsex: NextPage = () => {
  const editedQuery = trpc.article.getEdited.useQuery();
  const editedArticles = editedQuery.data;
  const { canAccess } = useCanAccess();

  return (
    <Layout title="Eggsex">
      {canAccess("exec") ? (
        <>
          <Flex flexDir="column">
            <Heading fontWeight={600}>Edited articles</Heading>
            <Text>They&apos;ve been edited. What now?</Text>
            <Divider borderColor="black" my="1rem" />
            <MasonryLayout staticCols>
              {editedArticles?.map((article, i) => (
                <Articard {...article} key={i} mb="1.5rem" w="100%" />
              ))}
            </MasonryLayout>
          </Flex>
        </>
      ) : (
        <Flex
          alignItems="center"
          justifyContent="center"
          flexDir="column"
          height="100%">
          <Heading>Shoo Normie!!</Heading>
          <Text>Submit articles please</Text>
        </Flex>
      )}
    </Layout>
  );
};

export default Eggsex;
