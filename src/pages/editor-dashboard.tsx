import { Flex, Heading, Text } from "@chakra-ui/react";
import Layout from "@components/layout/layout";
import { UserPermission } from "@prisma/client";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";

const EditorDashboard: NextPage = () => {
  const { data: sessionData } = useSession();
  return (
    <Layout title="Editor Dashboard">
      {sessionData && sessionData.user?.permission !== UserPermission.NORMIE ? (
        <Heading>Hi</Heading>
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
