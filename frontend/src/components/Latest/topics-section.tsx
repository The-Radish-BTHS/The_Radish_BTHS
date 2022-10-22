import { Flex, Heading, Text } from "@chakra-ui/react";
import CardTag from "@components/cards/card-tag";
import PersonCard from "@components/cards/person-card";
import Button from "@components/shared/button";
import Link from "@components/shared/link";
import MasonryLayout from "@components/shared/masonry/masonry-layout";
import { rest } from "@feathersjs/express";
import { AiOutlineArrowRight } from "react-icons/ai";

const Item: React.FC = () => <CardTag name="Gay Slay" id="abcd" />;

const TopicsSection: React.FC<{ title?: string }> = ({
  title = "Topics",
  ...rest
}) => {
  return (
    <Flex flexDir="column" alignItems="center" {...rest}>
      <Heading fontSize="2rem" textAlign="center" mb="1rem">
        {title}: <span style={{ fontWeight: "normal" }}>What TO PIC(k)?</span>
      </Heading>
      <Flex
        flexWrap="wrap"
        justifyContent="center"
        gap="0.5rem"
        fontWeight="600"
        fontSize="1.2rem">
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <Item key={i} />
          ))}
      </Flex>
      <Link as={Button} href="/topics" mt="1.5rem">
        <Text mr="0.5rem">All Topics!</Text> <AiOutlineArrowRight />
      </Link>
    </Flex>
  );
};

export default TopicsSection;
