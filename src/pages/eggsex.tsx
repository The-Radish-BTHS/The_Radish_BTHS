import { Text } from "@chakra-ui/react";
import Layout from "@components/layout/layout";
import { UserPermission } from "@prisma/client";
import { NextPage } from "next";
import { useSession } from "next-auth/react";

const Eggsex: NextPage = () => {
  const { data: sessionData } = useSession();
  return (
    <Layout title="Eggsex">
      {sessionData?.user?.permission !== UserPermission.EXEC ? (
        <Text>Shoo normie!!</Text>
      ) : (
        <Text>Hey there!</Text>
      )}
    </Layout>
  );
};

export default Eggsex;
