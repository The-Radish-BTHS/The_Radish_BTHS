import { Box, Flex, Image, SimpleGrid } from "@chakra-ui/react";
import ArticleCard from "@components/cards/article-card";
import MasonryLayout from "@components/shared/masonry/masonry-layout";

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
    <MasonryLayout>
      {[0, 0, 0, 0, 0, 0].map((src, i) => (
        <Item big={i % 2 == 0} key={i} />
      ))}
    </MasonryLayout>
  );
};

export default LatestArticles;
