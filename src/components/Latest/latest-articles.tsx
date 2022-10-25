import { ArticardType } from "@/types/article";
import { Box, Flex, Heading, Image, SimpleGrid, Text } from "@chakra-ui/react";
import Articard from "@components/cards/articard";
import Button from "@components/shared/button";
import Link from "@components/shared/link";
import MasonryLayout from "@components/shared/masonry/masonry-layout";
import { AiOutlineArrowRight } from "react-icons/ai";

const LatestArticles: React.FC<{
  title?: string;
  articles: ArticardType[];
}> = ({ title = "New Articles", articles }) => {
  return (
    <Flex flexDirection="column" alignItems="center">
      <Heading fontSize="2rem" textAlign="center" mb="1rem">
        {title}: <span style={{ fontWeight: "normal" }}>Feast on these!</span>
      </Heading>
      <MasonryLayout numItems={Math.min(articles.length, 6)}>
        {articles.slice(0, 6).map((article, i) => (
          <Articard
            {...article}
            styles={{ h: "fit-content", my: "1rem", display: "inline-block" }}
            key={i}
          />
        ))}
      </MasonryLayout>
      <Link as={Button} href="/articles" mt="2.5rem">
        <Text mr="0.5rem">All Articles!</Text> <AiOutlineArrowRight />
      </Link>
    </Flex>
  );
};

export default LatestArticles;
