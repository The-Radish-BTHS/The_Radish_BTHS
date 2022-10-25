import { PersonCardType } from "@/types/person";
import { Flex, Heading, Text } from "@chakra-ui/react";
import PersonCard from "@components/cards/person-card";
import Button from "@components/shared/button";
import Link from "@components/shared/link";
import MasonryLayout from "@components/shared/masonry/masonry-layout";
import { AiOutlineArrowRight } from "react-icons/ai";

const OtherPeople: React.FC<{ people: PersonCardType[] }> = ({ people }) => {
  return (
    <Flex flexDirection="column" alignItems="center" w="100%">
      <Heading fontSize="2rem" textAlign="center" mb="1rem">
        More People:{" "}
        <span style={{ fontWeight: "normal" }}>
          Compliments to the not chefs!
        </span>
      </Heading>
      <MasonryLayout>
        {people.slice(0, 3).map((person, i) => (
          <PersonCard
            {...person}
            styles={{ mt: "1rem", display: "inline-block" }}
            key={i}
          />
        ))}
      </MasonryLayout>
      <Link as={Button} href="/people" mt="2.5rem">
        <Text mr="0.5rem">Everyone!</Text> <AiOutlineArrowRight />
      </Link>
    </Flex>
  );
};

export default OtherPeople;
