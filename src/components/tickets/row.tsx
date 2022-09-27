import { Td, Tr } from "@chakra-ui/react";

const Row: React.FC<{ text: string; number: number }> = ({ text, number }) => {
  return (
    <Tr>
      <Td>{text}</Td>
      <Td isNumeric>{number ? `${number} tickets` : "Varies"}</Td>
    </Tr>
  );
};

export default Row;
