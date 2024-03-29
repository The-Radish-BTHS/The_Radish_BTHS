import { ArticardType } from "@/types/article";
import { Flex, Heading, Text } from "@chakra-ui/react";
import Articard from "@components/cards/articard";
import LinkButton from "@components/link-button";
import MasonryLayout from "@components/masonry/masonry-layout";
import { useIsMobile } from "@hooks/useIsMobile";
import { trpc } from "@lib/trpc";
import { AiOutlineArrowRight } from "react-icons/ai";
import NothingHereWrapper from "./nothing-here-wrapper";

const LatestArticles: React.FC<{
  title?: string;
  exclude?: string[];
}> = ({ title = "New Articles", exclude = [] }) => {
  const isMobile = useIsMobile();

  const articlesQuery = trpc.article.getAll.useQuery({
    sortOrder: "desc",
    take: 6,
    exclude: exclude,
  });
  const articles = articlesQuery.data;

  return (
    <Flex flexDirection="column" alignItems="center" width="100%">
      <Heading fontSize="2rem" textAlign="center" mb="1rem">
        {title}: <span style={{ fontWeight: "normal" }}>Feast on these!</span>
      </Heading>
      <NothingHereWrapper valid={!!articles?.length} h="45vh">
        <MasonryLayout
          numItems={4}
          breakpoints={{ default: 3, 1200: 2, 850: 1 }}
        >
          {articles?.slice(0, !isMobile ? 6 : 3).map((article, i) => (
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
