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
import Link from "@components/link";
import { useIsMobile } from "@hooks/useIsMobile";
import { getPeopleWithArticles } from "@lib/getters/many-getters.server";
import { GetStaticProps } from "next";

interface Stats {
  name: string;
  slug: string;
  former: boolean;
  isExec: boolean;
  articles: number;
  collabs: number;
  topicsUsed: number;
}

const Row: React.FC<{ stats: Stats; isMobile?: boolean }> = ({
  stats,
  isMobile,
}) => {
  return (
    <Tr
      fontWeight={stats.isExec ? (stats.former ? "medium" : "bold") : "light"}
      color={stats.former ? "black" : "black"}
    >
      <Td>
        <Link href={`/people/${stats.slug}`}>{stats.name}</Link>
      </Td>
      <Td isNumeric>{stats.articles}</Td>
      {!isMobile && (
        <>
          <Td isNumeric>{stats.collabs}</Td>
          <Td isNumeric>{stats.topicsUsed}</Td>
        </>
      )}
    </Tr>
  );
};

const Rankings: React.FC<{ authorStats: Stats[] }> = ({ authorStats }) => {
  authorStats.sort((a, b) =>
    a.articles < b.articles ? 1 : a.articles === b.articles ? 0 : -1
  );
  const isMobile = useIsMobile();

  return (
    <Layout title="Rankings" alignItems="center">
      <Image src="/images/Aramabel.png" alt="aramabel" w="60vw" mb="4rem" />
      <TableContainer
        mb="3rem"
        border="1px solid"
        borderRadius="0.5rem"
        width="90vw"
        minW="fit-content"
        overflowY="visible"
        overflowX="visible"
        whiteSpace="pre-wrap"
      >
        <Table variant="simple" colorScheme="grey">
          <Thead>
            <Tr>
              <Th fontWeight="bold" color="black">
                Name
              </Th>
              <Th fontWeight="bold" color="black" isNumeric>
                Articles
              </Th>
              {!isMobile && (
                <>
                  <Th fontWeight="bold" color="black" isNumeric>
                    Number of Collaborations
                  </Th>
                  <Th fontWeight="bold" color="black" isNumeric>
                    Topics Used
                  </Th>
                </>
              )}
            </Tr>
          </Thead>
          <Tbody>
            {authorStats.map((stats, i) => (
              <Row stats={stats} isMobile={isMobile} key={i} />
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

  const authorStats = people.map((person) => {
    const topics = person.articles
      .map((article) => article.topics.map((topic) => topic.slug))
      .flat();

    const collabs = person.articles.filter(
      (article) => article.authors.length > 1
    ).length;
    const topicsUsed = topics.filter(function (item, pos: number) {
      return topics.indexOf(item) == pos;
    }).length;

    return {
      name: person.name,
      slug: person.slug,
      former: person.former,
      isExec: person.isExec,
      articles: person.articles.length,
      collabs,
      topicsUsed,
    };
  });

  return {
    props: {
      authorStats,
    },
    revalidate: 60,
  };
};
