import { PersonCardType } from "@/types/person";
import { Flex, Heading, Text } from "@chakra-ui/react";
import PersonCard from "@components/cards/person-card";
import LinkButton from "@components/link-button";
import MasonryLayout from "@components/masonry/masonry-layout";
import { AiOutlineArrowRight } from "react-icons/ai";
import NothingHereWrapper from "./nothing-here-wrapper";

const OtherPeople: React.FC<{ people: PersonCardType[] }> = ({ people }) => {
  return (
    <Flex flexDirection="column" alignItems="center" w="100%">
      <Heading fontSize="2rem" textAlign="center" mb="1rem">
        More People:{" "}
        <span style={{ fontWeight: "normal" }}>
          Compliments to the not chefs!
        </span>
      </Heading>
      <NothingHereWrapper valid={people?.length > 0} height="40vh">
        <MasonryLayout numItems={Math.min(people?.length, 3)}>
          {people?.slice(0, 3).map((person, i) => (
            <PersonCard
              {...person}
              styles={{ mt: "1rem", display: "inline-block" }}
              key={i}
            />
          ))}
        </MasonryLayout>
        <LinkButton href="/people" mt="2.5rem">
          <Text mr="0.5rem">Everyone!</Text> <AiOutlineArrowRight />
        </LinkButton>
      </NothingHereWrapper>
    </Flex>
  );
};

export default OtherPeople;
