import { Box, Flex, Heading, Image, SimpleGrid, Text } from "@chakra-ui/react";
import Articard from "@components/cards/articard";
import Button from "@components/shared/button";
import Link from "@components/shared/link";
import MasonryLayout from "@components/shared/masonry/masonry-layout";
import { AiOutlineArrowRight } from "react-icons/ai";

const Item: React.FC<{ big?: boolean }> = ({ big }) => (
  <Articard
    title="Lead Poisoning"
    content={
      big
        ? "I think you should do it I think you should do it I think you should do it I think you should do it I think you should do it"
        : "heyooooo"
    }
    topics={[
      { name: "Satire", id: "wee" },
      { name: "Satire", id: "wee" },
      { name: "Satire", id: "wee" },
      { name: "Satire", id: "wee" },
      { name: "Satire", id: "wee" },
      { name: "Satire", id: "wee" },
      { name: "Satire", id: "wee" },
      { name: "Satire", id: "wee" },
    ]}
    issue={{
      time: "June 2022",
      id: "abcd",
    }}
    authors={[
      {
        name: "Dommy",
        id: "abcd",
      },
    ]}
    id="abcd"
    styles={{ h: "fit-content", my: "1rem", display: "inline-block" }}
  />
);

const LatestArticles: React.FC<{ title?: string }> = ({
  title = "New Articles",
}) => {
  return (
    <Flex flexDirection="column" alignItems="center">
      <Heading fontSize="2rem" textAlign="center" mb="1rem">
        {title}: <span style={{ fontWeight: "normal" }}>Feast on these!</span>
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