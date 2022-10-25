import { ArticardType } from "@/types/article";
import { IssueCardType } from "@/types/issue";
import {
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import Articard from "@components/cards/articard";
import IssueCard from "@components/cards/issue-card";
import Button from "@components/shared/button";
import Link from "@components/shared/link";
import { AiOutlineArrowRight } from "react-icons/ai";

interface ILatestProps {
  issue: IssueCardType;
  articles: ArticardType[];
}

const Item: React.FC = () => (
  <Articard
    title="Lead Poisoning"
    content="I think you should do it. I think that you should do the thing you have been watiting your whole life to do. Do it! Now! Or else! Grrrrrrrr. ANyway I think I'm just stretching this whole thing out weewoo"
    topics={[
      { name: "Satire", slug: "wee" },
      { name: "Satire", slug: "wee" },
    ]}
    issue={{
      time: "June 2022",
      slug: "abcd",
    }}
    authors={[
      {
        name: "Dommy",
        slug: "abcd",
      },
    ]}
    slug="abcd"
    styles={{ flex: 1 }}
  />
);

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
          {articles.map((article, i) => (
            <Articard {...article} styles={{ flex: 1 }} key={i} />
          ))}
        </SimpleGrid>
      </Flex>
      <Link as={Button} href="/issues" mt="2.5rem">
        <Text mr="0.5rem">All Issues!</Text> <AiOutlineArrowRight />
      </Link>
    </Flex>
  );
};

export default LatestSection;
