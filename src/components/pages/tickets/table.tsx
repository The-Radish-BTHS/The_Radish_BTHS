import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
  Text,
  Box,
} from "@chakra-ui/react";
import { useIsMobile } from "@hooks/useIsMobile";

const TicketTable: React.FC<
  React.PropsWithChildren<{ textHeader: string; numericHeader: string }>
> = ({ textHeader, numericHeader, children }) => {
  const isMobile = useIsMobile();
  return (
    <Box mb="3rem">
      <TableContainer
        border="1px solid"
        borderRadius="0.5rem"
        width={{ base: "90vw", md: "60vw" }}
        overflowY="visible"
        overflowX="visible"
        whiteSpace="pre-wrap">
        <Table variant="simple" colorScheme="grey" maxW="100%">
          <Thead>
            <Tr>
              <Th fontWeight="bold" color="black" w="fit-content">
                {textHeader}
              </Th>
              <Th fontWeight="bold" color="black" w="fit-content" isNumeric>
                {numericHeader}
              </Th>
            </Tr>
          </Thead>
          <Tbody>{children}</Tbody>
        </Table>
      </TableContainer>

      {isMobile && <Text ml="0.25rem">*V = Varies</Text>}
    </Box>
  );
};

export default TicketTable;
