import {
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import Layout from "@components/layout/layout";
import {
  getArticles,
  getPeople,
  getPeopleWithArticles,
} from "lib/getters/many-getters.server";
import { GetStaticProps } from "next";

interface Stats {
  name: string;
  isExec: boolean;
  articles: number;
  issuesIn: number;
  topicsUsed: number;
}

const Row: React.FC<{ stats: Stats }> = ({ stats }) => {
  return (
    <Tr fontWeight={stats.isExec ? "bold" : "normal"}>
      <Td>{stats.name}</Td>
      <Td isNumeric>{stats.articles}</Td>
      <Td isNumeric>{stats.issuesIn}</Td>
      <Td isNumeric>{stats.topicsUsed}</Td>
    </Tr>
  );
};

const Rankings: React.FC<{ authorStats: Stats[] }> = ({ authorStats }) => {
  return (
    <Layout title="Rankings" alignItems="center">
      <Image src="/images/aramabel.png" alt="aramabel" w="60vw" mb="4rem" />
      <TableContainer
        mb="3rem"
        border="1px solid"
        borderRadius="0.5rem"
        width="90vw"
        minW="fit-content"
        overflowY="visible"
        overflowX="visible">
        <Table variant="simple" colorScheme="grey">
          <Thead>
            <Tr>
              <Th fontWeight="bold" color="black">
                Name
              </Th>
              <Th fontWeight="bold" color="black" isNumeric>
                Articles
              </Th>
              <Th fontWeight="bold" color="black" isNumeric>
                Issues In
              </Th>
              <Th fontWeight="bold" color="black" isNumeric>
                Topics Used
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {authorStats.map((stats, i) => (
              <Row stats={stats} key={i} />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Layout>
  );
};

export default Rankings;

export const getStaticProps: GetStaticProps = async (context) => {
  const people = await getPeopleWithArticles();

  const authorStats = people.map((person: any) => {
    const issues = person.articles.map((article: any) => article.issueSlug);
    const topics = person.articles
      .map((article: any) => article.topics.map((topic: any) => topic.slug))
      .flat();

    console.log(topics);
    const issuesIn = issues.filter(function (item: any, pos: number) {
      return issues.indexOf(item) == pos;
    }).length;
    const topicsUsed = topics.filter(function (item: any, pos: number) {
      return topics.indexOf(item) == pos;
    }).length;

    return {
      name: person.name,
      isExec: person.isExec,
      articles: person.articles.length,
      issuesIn,
      topicsUsed,
    };
  });

  console.log(authorStats);

  return {
    props: {
      authorStats,
    },
  };
};
