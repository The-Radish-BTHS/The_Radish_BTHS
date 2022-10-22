import { TopicCard } from "@/types/topic";
import { Flex, Text } from "@chakra-ui/react";
import Link from "@components/shared/link";

const CardTag: React.FC<TopicCard> = ({ name, id }) => {
  return (
    <Link href={`/topics/${id}`} color="#bb3300">
      <Flex p="0.23rem">
        <Text>#{name}</Text>
      </Flex>
    </Link>
  );
};

export default CardTag;
