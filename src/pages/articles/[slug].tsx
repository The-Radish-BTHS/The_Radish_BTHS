import { ArticlePageType } from "@/types/article";
import { Flex, Heading, Text } from "@chakra-ui/react";
import TopicCard from "@components/cards/topic-card";
import Layout from "@components/layout/layout";
import Link from "@components/shared/link";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import LatestArticles from "@components/Latest/latest-articles";

const Article: NextPage<ArticlePageType> = ({
  title,
  content,
  authors,
  issue,
  topics,
  latest,
}) => {
  return (
    <Layout alignItems="center">
      <Heading textAlign="center" maxW="85vw">
        {title}
      </Heading>
      <Flex fontSize="1.05rem" w="90vw" mt="0.5rem" justifyContent="center">
        {authors?.map((author, i) => (
          <Link key={i} href={`/people/${author.id}`} mr="0.2rem">
            {author.name}
          </Link>
        ))}

        <Text fontWeight="bold" mx="0.2rem">
          {" "}
          ∙{" "}
        </Text>
        <Link href={`/issues/${issue?.id}`}>{issue?.time}</Link>
      </Flex>
      <Flex
        mt="0.4rem"
        flexWrap="wrap"
        maxW="85vw"
        fontSize="1.2rem"
        fontWeight="medium">
        {topics?.map((topic, i) => (
          <TopicCard name={topic.name} id={topic.id} key={i} />
        ))}
      </Flex>
      <Text
        textAlign="justify"
        fontSize="clamp(16px,12px + .5vw,1.25rem)"
        maxW={{ base: "95vw", md: "70vw", lg: "65vw" }}
        mt="2rem">
        {content?.split("\n").map((text, i) => (
          <span key={i}>
            {text}
            <br />
          </span>
        ))}
      </Text>

      <Flex mt="4rem">
        <LatestArticles title="More Articles" />
      </Flex>
    </Layout>
  );
};

export default Article;

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params?.slug;
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
      gradYear: 2024,
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
  const topics = [
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
      topics,
    },
    {
      title: "Be Gay do Slay",
      content: "I think it",

      id: "slay",
      authors,
      issue,
      topics,
    },
    {
      title: "Be Gay do Slay",
      content:
        "I think you should do it I think you should do it I think you should do it I think you should do it I think you should do it",

      id: "slay",
      authors,
      issue,
      topics,
    },
  ];

  return {
    props: {
      title,
      content,
      authors,
      issue,

      topics,
      latest,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  // const data = await getData();
  // const pathsWithParams = data.stars.map((star: starInterface) => ({ params: { id: "abcd"}}))

  return {
    paths: [{ params: { slug: "wee" } }, { params: { slug: "slay" } }],
    fallback: true,
  };
};
