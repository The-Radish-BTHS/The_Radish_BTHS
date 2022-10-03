import { Flex, Text } from "@chakra-ui/react";
import Link from "@components/shared/link";

const CardTag: React.FC<{ name: string; id: string }> = ({ name, id }) => {
  return (
    <Link href={`/topics/${id}`}>
      <Flex mx="0.25rem">
        <Text>{name}</Text>
      </Flex>
    </Link>
  );
};

export default CardTag;
