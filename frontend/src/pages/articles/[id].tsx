import { Flex, Text } from "@chakra-ui/react";
import Layout from "@components/layout/layout";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";

const Article: NextPage<{ id: string }> = ({ id }) => {
  // const router = useRouter();
  // const { id } = router.query;
  console.log(id);

  return (
    <Layout>
      <Flex background="red" w="10vw" h="10vw" />
    </Layout>
  );
};

export default Article;

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id;
  const title = "10 instances of phenomenal reporting by the survey";
  const content = "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n";
  const authorId = "abcd";

  return {
    props: {
      id,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  // const data = await getData();
  // const pathsWithParams = data.stars.map((star: starInterface) => ({ params: { id: "abcd"}}))

  return {
    paths: [{ params: { id: "abcd" } }],
    fallback: true,
  };
};
