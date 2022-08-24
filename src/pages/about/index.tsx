import {
  Button,
  Divider,
  Heading,
  Image,
  Link,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import Layout from "@components/layout/layout";
import { NextPage } from "next";

const Index: NextPage = () => {
  return (
    <Layout pageIndex={4} header={"/images/about_header.jpeg"}>
      <Heading fontWeight={800}>We are The Radish.</Heading>
      <Text fontWeight={600} color="radamir.red">
        Bum-Ba-Dum Bum-Bum-Bum-Bum
      </Text>
      <Text my="1.5rem">
        We are Brooklyn Technical High School&apos;s first, worst, and only
        satirical newspaper. We probably started around the 1980s—definitely
        before The Onion, our fierce rival. <br />
        <br />
        Interested in joining us? Once school is in session we will be meeting
        in-person! Find us Wednesdays in room 2N3 after 10th period. Also join
        our email list for updates.
      </Text>
      <Button
        as={Link}
        href="https://forms.gle/A9TJPy9a5ZXz4AzFA"
        target="_blank"
        colorScheme="gray"
        p="0.6rem">
        Sign Up Now!
      </Button>
      <Divider my="1.5rem" />
      <Heading fontWeight={800}>Feed Us.</Heading>
      <Text fontWeight={600} color="radamir.red">
        You don&apos;t wanna see us when we&apos;re hungry.
      </Text>
      <Text my="1.5rem">
        Every month we throw articles into the world like a mama bird trying to
        kill her children. This makes the big radish in the sky very happy. It
        eats them. Please give us articles to throw. We are begging. <br />
        <br />
        If you&apos;re as hungry as the sky radish, there are also plans for a
        huge wheel of cheese to feed writers. Write an article, get a nibble,
        that&apos;s our motto.
      </Text>
      <Button
        as={Link}
        href="https://forms.gle/34NWUt4XUdzP2mjAA"
        target="_blank"
        p="0.6rem"
        colorScheme="gray">
        Submit Here
      </Button>
      <Divider my="1.5rem" />
      <Heading fontWeight={800}>Feed us... without writing</Heading>
      <Text fontWeight={600} color="radamir.red">
        Now we&apos;re hungry. Look what you&apos;ve done. You proud?
      </Text>
      <Text my="1.5rem">
        Wanna help us throw the articles? We have teams for preparing them! Be
        sure to keep an eye out for when applications for our teams open up. 👀
      </Text>
      <Heading fontSize="1.5rem">Graphics Team</Heading>
      <Text mb="1.25rem">
        The graphics team is the artists. The storytellers. The people who spent
        too much time in the arts and crafts sections of anywhere they went.
        They are in charge of designing the covers, page layouts, and article
        graphics of each issue. Someone needs a minion riding a llama through
        ancient Greece. They&apos;ll be there. Your article doesnt make sense
        without a picture of a sentient mushroom eating the Joker? No problem.
        The graphics team is in charge of making each issue pop off the page
        (and making propoganda). Sound interesting? Of course it does. See you
        there.
      </Text>
      <Heading fontSize="1.5rem">Editing Team </Heading>
      <Text>
        The editing team edits. They take your random piles of b*llshit and turn
        them into prettier piles of b*llshit, while still letting your
        unmistakable stench through. The editing staff knows grammar, how
        english works, and of course makes them jokes good. They&apos;re the
        people that force the reader to have a good time and they always most of
        the time succeed. Did your fifth grade english teacher always tell you
        that you were their favorite? Then this is the team for you.
      </Text>
      <Divider my="1.5rem" />
      <Heading fontWeight={800}>Contribution Requirements</Heading>
      <Text fontWeight={600} color="radamir.red">
        Also known as Article Rules, Way Words Can Be, Acceptable Language
        Chunks, etc.
      </Text>
      <Text my="1.5rem">
        We like well communicated piles of b*llshit here. Feel free to take a
        look at the many articles we have here on our website for reference.
        However, mostly keep in mind the following:
      </Text>
      <Heading fontSize="1.5rem">Required:</Heading>
      <UnorderedList mb="1.25rem">
        <ListItem fontSize="1.1rem" my="0.25rem">
          Article is 0.5 page to 2 pages, flexible if the article is good
        </ListItem>
        <ListItem fontSize="1.1rem" my="0.25rem">
          You&apos;re a BTHS student, flexible if the article is good
        </ListItem>
        <ListItem fontSize="1.1rem" my="0.25rem">
          You&apos;re willing to work with an editor, even if the article is
          good
        </ListItem>
      </UnorderedList>
      <Heading fontSize="1.5rem">Consider Before Submitting:</Heading>
      <UnorderedList mb="1.25rem">
        <ListItem fontSize="1.1rem" my="0.25rem">
          Do you get to the point?
        </ListItem>
        <ListItem fontSize="1.1rem" my="0.25rem">
          Is the article&apos;s premise funny on its own and an original take on
          the concept?
        </ListItem>
        <ListItem fontSize="1.1rem" my="0.25rem">
          Did you have fun writing the article?
        </ListItem>
      </UnorderedList>
      <Divider my="1.5rem" />
      <Heading fontWeight={800}>Website info</Heading>
      <Text fontWeight={600} color="radamir.red">
        Made by the real heroes here.
      </Text>
      <Text my="1.5rem">
        Radish Website designed by Santiago Vira with help from the rest of the
        Radish Team. Content on this site is licensed under a{" "}
        <Link
          textDecor="underline"
          target="_blank"
          href="http://creativecommons.org/licenses/by-nc-sa/4.0/">
          Creative Commons Attribution-NonCommercial-ShareAlike 4.0
          International License
        </Link>
        .
      </Text>
    </Layout>
  );
};

export default Index;
