import { Flex, Text } from "@chakra-ui/react";
import Link from "@components/shared/link";

const CardTag: React.FC<{ name: string; id: string }> = ({ name, id }) => {
  console.log(id);
  return (
    <Link href={`/topics/${id}`} color="#bb3300">
      <Flex p="0.23rem">
        <Text>#{name}</Text>
      </Flex>
    </Link>
  );
};

export default CardTag;
