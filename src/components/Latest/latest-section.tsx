import { ArticardType } from "@/types/article";
import { IssueCardType } from "@/types/issue";
import {
  Flex,
  Heading,
  SimpleGrid,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import Articard from "@components/cards/articard";
import IssueCard from "@components/cards/issue-card";
import LinkButton from "@components/link-button";
import { AiOutlineArrowRight } from "react-icons/ai";
import NothingHere from "./nothing-here";

interface ILatestProps {
  issue: IssueCardType;
  articles: ArticardType[];
}

const LatestSection: React.FC<ILatestProps> = ({ issue, articles }) => {
  const numArticles = useBreakpointValue({ base: 3, md: 2, xl: 3 });

  return (
    <Flex flexDirection="column" alignItems="center">
      <Heading fontSize="2rem" textAlign="center">
        Latest & Greatest:{" "}
        <span style={{ fontWeight: "normal" }}>
          Our newest issue is ready for consumption!
        </span>
      </Heading>
      {!issue || articles.length === 0 ? (
        <NothingHere />
      ) : (
        <>
          <Flex
            gap="1rem"
            mt="2rem"
            flexDir={{ base: "column", md: "row" }}
            alignItems="center">
            <Flex flexDir="column" h="100%">
              {" "}
              <IssueCard {...issue} styles={{ flex: 1 }} />
            </Flex>

            <SimpleGrid
              templateColumns="auto"
              templateRows={`repeat(${numArticles}, auto)`}
              autoFlow="row"
              gap="2rem"
              pl={{ base: "0", md: "1rem" }}
              h="100%">
              {articles.slice(0, numArticles).map((article, i) => (
                <Articard {...article} styles={{ flex: 1 }} key={i} />
              ))}
            </SimpleGrid>
          </Flex>
          <LinkButton href="/issues" mt="2.5rem">
            <Text mr="0.5rem">All Issues!</Text> <AiOutlineArrowRight />
          </LinkButton>
        </>
      )}
    </Flex>
  );
};

export default LatestSection;
