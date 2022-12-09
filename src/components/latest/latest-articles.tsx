import { ArticardType } from "@/types/article";
import { Flex, Heading, Text } from "@chakra-ui/react";
import Articard from "@components/cards/articard";
import LinkButton from "@components/link-button";
import MasonryLayout from "@components/masonry/masonry-layout";
import { useIsMobile } from "@hooks/useIsMobile";
import { AiOutlineArrowRight } from "react-icons/ai";
import NothingHereWrapper from "./nothing-here-wrapper";

const LatestArticles: React.FC<{
  title?: string;
  articles: ArticardType[];
}> = ({ title = "New Articles", articles }) => {
  const isMobile = useIsMobile();
  const numItems = Math.min(articles?.length, isMobile ? 3 : 6);
  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      width={{ base: "90vw", md: "70vw" }}>
      <Heading fontSize="2rem" textAlign="center" mb="1rem">
        {title}: <span style={{ fontWeight: "normal" }}>Feast on these!</span>
      </Heading>
      <NothingHereWrapper valid={articles?.length > 0} h="45vh">
        <MasonryLayout
          numItems={numItems}
          breakpoints={{ default: 3, 1200: 2, 850: 1 }}
          staticCols>
          {articles?.slice(0, numItems).map((article, i) => (
            <Articard
              {...article}
              styles={{
                h: "fit-content",
                my: "1rem",
                display: "inline-block",
                w: "100%",
              }}
              key={i}
            />
          ))}
        </MasonryLayout>
        <LinkButton href="/articles" mt="2.5rem">
          <Text mr="0.5rem">All Articles!</Text> <AiOutlineArrowRight />
        </LinkButton>
      </NothingHereWrapper>
    </Flex>
  );
};

export default LatestArticles;
