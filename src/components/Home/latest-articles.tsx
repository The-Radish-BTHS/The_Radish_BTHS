import { Box, Flex, Image, SimpleGrid } from "@chakra-ui/react";
import ArticleCard from "@components/cards/article-card";

const Item: React.FC<{ big?: boolean }> = ({ big }) => (
  <ArticleCard
    title="Lead Poisoning"
    description={
      big
        ? "I think you should do it I think you should do it I think you should do it I think you should do it I think you should do it"
        : "heyooooo"
    }
    issueTime="June 2022"
    author="Dommy"
    id="abcd"
    display="inline-block"
    h="fit-content"
    my="1rem"
  />
);

const LatestArticles: React.FC = () => {
  return (
    <Box padding={4} w="90%" sx={{ columnCount: [1, 2, 3], columnGap: "1rem" }}>
      {[0, 0, 0, 0, 0, 0].map((src, i) => (
        <Item key={i} />
      ))}
    </Box>
  );
};

export default LatestArticles;
