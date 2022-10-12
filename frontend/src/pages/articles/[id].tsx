import ArticleType from "@/types/article";
import { Flex, Heading, Text } from "@chakra-ui/react";
import ArticleCard from "@components/cards/article-card";
import CardTag from "@components/cards/card-tag";
import Layout from "@components/layout/layout";
import Link from "@components/shared/link";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { AiOutlineArrowRight } from "react-icons/ai";
import Button from "@components/shared/button";

interface ArticlePageProps extends ArticleType {
  latest: ArticleType[];
}

const Article: NextPage<ArticlePageProps> = ({
  title,
  content,
  authors,
  issue,
  tags,
  latest,
}) => {
  return (
    <Layout alignItems="center">
      <Heading textAlign="center" maxW="85vw">
        {title}
      </Heading>
      <Flex fontSize="1.05rem" w="90vw" mt="0.5rem" justifyContent="center">
        {authors.map((author, i) => (
          <Link
            key={i}
            href={`/${author.isExec ? "execs" : "people"}/${author.id}`}
            mr="0.2rem">
            {author.name}
          </Link>
        ))}

        <Text fontWeight="bold" mx="0.2rem">
          {" "}
          ∙{" "}
        </Text>
        <Link href={`/issues/${issue.id}`}>{issue.time}</Link>
      </Flex>
      <Flex
        mt="0.4rem"
        flexWrap="wrap"
        maxW="85vw"
        fontSize="1.2rem"
        fontWeight="medium">
        {tags.map((tag, i) => (
          <CardTag {...tag} key={i} />
        ))}
      </Flex>
      <Text
        textAlign="justify"
        fontSize="clamp(16px,12px + .5vw,1.25rem)"
        maxW={{ base: "95vw", md: "70vw", lg: "65vw" }}
        mt="2rem">
        {content.split("\n").map((text, i) => (
          <span key={i}>
            {text}
            <br />
          </span>
        ))}
      </Text>
      <Heading fontSize="2rem" textAlign="center" mt="4rem">
        Read more great articles!
      </Heading>
      <Flex
        gap="1.5rem"
        mt="2rem"
        flexDir={{ base: "column", lg: "row" }}
        w="95%">
        {latest.map((article, i) => (
          <ArticleCard {...article} outerStyles={{ w: "100%" }} key={i} />
        ))}
      </Flex>
      <Link as={Button} href="/articles" mt="2.5rem">
        <Text mr="0.5rem">All Articles!</Text> <AiOutlineArrowRight />
      </Link>
    </Layout>
  );
};

export default Article;

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id;
  const title = "10 instances of phenomenal reporting by the survey";
  const content = `You wake up, you eat your bagel with toast, and you pat your ferret three times before hopping onto a crowded subway car. You cram your body into it at the last minute because you’re just that eager to learn. 

    The train groans merrily along. Then, you stop. It's the third to last stop and this person with a green North Face puffer is getting on. Their coat is North face because they're basic—but green because they’re not that basic. Their bright yellow Fjallraven kanken backpack is way too brightly colored and definitely too small to fit all their necessities (notebooks, rocks, organs, etc.) The train is cramped and they have to stand. They don’t deserve a seat though. They would probably put their blinding, stupid backpack on their lap if they had a chance instead of the floor where it belongs.
    
    This person is here every day. It’s like they are following you. Maybe they are just also “going to school,” but almost everyone has an ulterior motive these days and people with white Converse are never to be trusted. 
    
    The train lurches and so does your mysterious stalker. 
    
    You check your watch, a knockoff fit bit because who has the money for those things, and see that you indeed have 3 minutes until school starts.`;

  const authors = [
    {
      name: "Dommy",
      title: "author",
      isExec: false,
      id: "abcd",
      articles: [],
    },
  ];
  const issue = {
    time: "June 2022",
    cover: "/images/june-2022.webp",
    description: "Gay gay gay",
    id: "abcd",
    articles: [],
  };
  const tags = [
    {
      name: "queer",
      description: "yass",
      id: "slay",
      articles: [],
    },
    {
      name: "slay",
      description: "yass",
      id: "slay",
      articles: [],
    },
    {
      name: "yass",
      description: "yass",
      id: "slay",
      articles: [],
    },
  ];

  const latest = [
    {
      title: "Be Gay do Slay",
      content:
        "I think you should do it I think you should do it I think you should do it I think you should do it I think you should do it",

      id: "slay",
      authors,
      issue,
      tags,
    },
    {
      title: "Be Gay do Slay",
      content: "I think it",

      id: "slay",
      authors,
      issue,
      tags,
    },
    {
      title: "Be Gay do Slay",
      content:
        "I think you should do it I think you should do it I think you should do it I think you should do it I think you should do it",

      id: "slay",
      authors,
      issue,
      tags,
    },
  ];

  return {
    props: {
      title,
      content,
      id,
      authors,
      issue,
      tags,
      latest,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  // const data = await getData();
  // const pathsWithParams = data.stars.map((star: starInterface) => ({ params: { id: "abcd"}}))

  return {
    paths: [{ params: { id: "abcd" } }],
    fallback: true,
  };
};
