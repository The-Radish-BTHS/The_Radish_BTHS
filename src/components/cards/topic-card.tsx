import { TopicCardType } from "@/types/topic";
import { Flex, Text } from "@chakra-ui/react";
import Link from "@components/shared/link";

const TopicCard: React.FC<TopicCardType> = ({ name, slug }) => {
  return (
    <Link href={`/topics/${slug}`} color="#bb3300">
      <Flex p="0.23rem">
        <Text>#{name}</Text>
      </Flex>
    </Link>
  );
};

export default TopicCard;
