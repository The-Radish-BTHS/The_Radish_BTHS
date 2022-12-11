import { Td, Tr } from "@chakra-ui/react";
import { useIsMobile } from "@hooks/useIsMobile";

const Row: React.FC<{ text: string; description?: string; number: number }> = ({
  text,
  description = "",
  number,
}) => {
  const isMobile = useIsMobile();
  return (
    <Tr>
      <Td overflowWrap="break-word">
        {text}
        {!isMobile && (
          <>
            <br />
            <span style={{ fontSize: "0.8rem" }}>{description}</span>
          </>
        )}
      </Td>
      {isMobile ? (
        <Td isNumeric fontWeight={700}>
          {number ? number : "V"}
        </Td>
      ) : (
        <Td isNumeric>{number ? `${number} tickets` : "Varies"}</Td>
      )}
    </Tr>
  );
};

export default Row;
