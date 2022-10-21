import { Flex, Heading, Text } from "@chakra-ui/react";
import PersonCard from "@components/cards/person-card";
import Button from "@components/shared/button";
import Link from "@components/shared/link";
import MasonryLayout from "@components/shared/masonry/masonry-layout";
import { AiOutlineArrowRight } from "react-icons/ai";

const Item: React.FC = () => (
  <PersonCard
    name="Dommy"
    title="Author"
    description="Just a guy being a dude"
    id="abcd"
    outerStyles={{ mt: "1rem" }}
  />
);

const OtherPeople: React.FC = () => {
  return (
    <Flex flexDirection="column" alignItems="center" maxW="100%">
      <Heading fontSize="2rem" textAlign="center" mb="1rem">
        More People:{" "}
        <span style={{ fontWeight: "normal" }}>
          Compliments to the not chefs!
        </span>
      </Heading>
      <MasonryLayout>
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <Item key={i} />
          ))}
      </MasonryLayout>
      <Link as={Button} href="/people" mt="2.5rem">
        <Text mr="0.5rem">Everyone!</Text> <AiOutlineArrowRight />
      </Link>
    </Flex>
  );
};

export default OtherPeople;
