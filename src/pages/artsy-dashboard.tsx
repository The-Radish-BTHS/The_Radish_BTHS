import { Accordion, Divider, Flex, Heading, Text } from "@chakra-ui/react";
import GraphicsCard from "@components/cards/graphics-card";
import Collapse from "@components/collapse";
import Layout from "@components/layout/layout";
import MasonryLayout from "@components/masonry/masonry-layout";
import { useCanAccess } from "@hooks/useCanAccess";
import { trpc } from "@lib/trpc";
import { NextPage } from "next";
import Link from "next/link";

const ArtsyDashboard: NextPage = () => {
  const submissionsQuery = trpc.submission.getGraphicsRequests.useQuery();
  const completedQuery =
    trpc.submission.getCompletedGraphicsRequests.useQuery();
  const submissions = submissionsQuery.data;
  const completed = completedQuery.data;
  const { canAccess } = useCanAccess();

  return (
    <Layout title="Artsy Dashboard">
      {canAccess("artist") ? (
        <>
          <Flex flexDir="column">
            <Heading textAlign="center">Hey artists!!!!!</Heading>
            <Text textAlign="center" mb="2rem">
              Thanks for being better than the editors :)
            </Text>
            <Accordion defaultIndex={[0]} allowMultiple>
              <Collapse title="Incomplete!!" empty={submissions?.length === 0}>
                <MasonryLayout>
                  {submissions?.map((article, i) => (
                    <GraphicsCard
                      title={article.title}
                      link={article.link}
                      request={article.graphicsRequest}
                      submissionId={article.id}
                      key={i}
                    />
                  ))}
                </MasonryLayout>
              </Collapse>
              <Collapse title="All Good" empty={completed?.length === 0}>
                <MasonryLayout>
                  {completed?.map((article, i) => (
                    <GraphicsCard
                      title={article.title}
                      link={article.link}
                      request={article.graphicsRequest}
                      submissionId={article.id}
                      key={i}
                    />
                  ))}
                </MasonryLayout>
              </Collapse>
            </Accordion>
          </Flex>
        </>
      ) : (
        <Flex
          h="100%"
          flexDir="column"
          alignItems="center"
          justifyContent="center">
          <Heading>Ur not an artist fam...</Heading>
          <Link href="/about">Apply to join the graphics team!</Link>
        </Flex>
      )}
    </Layout>
  );
};

export default ArtsyDashboard;
