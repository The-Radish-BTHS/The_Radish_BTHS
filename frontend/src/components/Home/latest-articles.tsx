import { Box, Flex, Heading, Image, SimpleGrid, Text } from "@chakra-ui/react";
import ArticleCard from "@components/cards/article-card";
import Button from "@components/shared/button";
import Link from "@components/shared/link";
import MasonryLayout from "@components/shared/masonry/masonry-layout";
import { AiOutlineArrowRight } from "react-icons/ai";

const Item: React.FC<{ big?: boolean }> = ({ big }) => (
  <ArticleCard
    title="Lead Poisoning"
    description={
      big
        ? "I think you should do it I think you should do it I think you should do it I think you should do it I think you should do it"
        : "heyooooo"
    }
    tags={[
      { name: "Satire", id: "wee" },
      { name: "Satire", id: "wee" },
      { name: "Satire", id: "wee" },
      { name: "Satire", id: "wee" },
      { name: "Satire", id: "wee" },
      { name: "Satire", id: "wee" },
      { name: "Satire", id: "wee" },
      { name: "Satire", id: "wee" },
    ]}
    issue={{ time: "June 2022", id: "abcd" }}
    author={{ name: "Dommy", id: "abcd", isExec: false }}
    id="abcd"
    display="inline-block"
    outerStyles={{ h: "fit-content", my: "1rem" }}
  />
);

const LatestArticles: React.FC = () => {
  return (
    <Flex flexDirection="column" alignItems="center">
      <Heading fontSize="2rem" textAlign="center" mb="1rem">
        New Articles:{" "}
        <span style={{ fontWeight: "normal" }}>Feast on these!</span>
      </Heading>
      <MasonryLayout>
        {[0, 0, 0, 0, 0, 0].map((src, i) => (
          <Item big={i % 2 == 0} key={i} />
        ))}
      </MasonryLayout>
      <Link as={Button} href="/articles" mt="2.5rem">
        <Text mr="0.5rem">All Articles!</Text> <AiOutlineArrowRight />
      </Link>
    </Flex>
  );
};

export default LatestArticles;
