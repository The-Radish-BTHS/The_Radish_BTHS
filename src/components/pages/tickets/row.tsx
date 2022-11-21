import { Td, Tr } from "@chakra-ui/react";

const Row: React.FC<{ text: string; description?: string; number: number }> = ({
  text,
  description = "",
  number,
}) => {
  return (
    <Tr>
      <Td>
        {text}
        <br />
        <span style={{ fontSize: "0.8rem" }}>{description}</span>
      </Td>
      <Td isNumeric>{number ? `${number} tickets` : "Varies"}</Td>
    </Tr>
  );
};

export default Row;
