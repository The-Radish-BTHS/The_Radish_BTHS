import { Divider, Flex, Heading, Text } from "@chakra-ui/react";
import GraphicsCard from "@components/cards/graphics-card";
import SubmissionCard from "@components/cards/submission-card";
import Layout from "@components/layout/layout";
import MasonryLayout from "@components/masonry/masonry-layout";
import { useCanAccess } from "@hooks/useCanAccess";
import { trpc } from "@lib/trpc";
import { NextPage } from "next";
import Link from "next/link";

const ArtsyDashboard: NextPage = () => {
  const submissionsQuery = trpc.submission.getAll.useQuery();
  const submissions = submissionsQuery.data;
  const { canAccess } = useCanAccess();

  return (
    <Layout title="Artsy Dashboard">
      {canAccess("artist") ? (
        <>
          <Flex flexDir="column">
            <Heading>Hey artists!!!!!</Heading>
            <Text>Thanks for being better than the editors :)</Text>
            <Divider borderColor="black" my="1rem" />
            <MasonryLayout staticCols>
              {submissions?.map((article, i) => (
                <GraphicsCard
                  title={article.title}
                  request={article.graphicsRequest}
                  key={i}
                />
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

export default ArtsyDashboard;
