import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Divider,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import SubmissionCard from "@components/cards/submission-card";
import Collapse from "@components/collapse";
import Layout from "@components/layout/layout";
import MasonryLayout from "@components/masonry/masonry-layout";
import { useCanAccess } from "@hooks/useCanAccess";
import { trpc } from "@lib/trpc";
import { NextPage } from "next";
import Link from "next/link";

const EditorDashboard: NextPage = () => {
  const uneditedQuery = trpc.submission.getAllWithEdited.useQuery({});
  const uneditedSubmissions = uneditedQuery.data;
  const editedQuery = trpc.submission.getAllWithEdited.useQuery({
    edited: true,
  });
  const editedSubmissions = editedQuery.data;
  const { canAccess } = useCanAccess();

  return (
    <Layout title="Editor Dashboard">
      {canAccess("editor") ? (
        <>
          <Flex flexDir="column">
            <Flex mb="1rem">
              <Heading>
                <span style={{ borderBottom: "4px dotted red" }}>
                  Hay their editers!
                </span>{" "}
                Hear are the submitteded art tickles
              </Heading>
            </Flex>
            <Text>Thyme two edit them ardiculs!!!</Text>
            <Divider borderColor="black" my="1rem" />
            <Accordion defaultIndex={[0]} allowMultiple>
              <Collapse title="Unedited">
                <MasonryLayout staticCols>
                  {uneditedSubmissions?.map((article, i) => (
                    <SubmissionCard {...article} key={i} />
                  ))}
                </MasonryLayout>
              </Collapse>
              <Collapse title="Edited">
                <MasonryLayout staticCols>
                  {editedSubmissions?.map((article, i) => (
                    <SubmissionCard {...article} key={i} />
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
          <Heading>Ur not an editor fam...</Heading>
          <Link href="/about">Apply to join the editing team!</Link>
        </Flex>
      )}
    </Layout>
  );
};

export default EditorDashboard;
