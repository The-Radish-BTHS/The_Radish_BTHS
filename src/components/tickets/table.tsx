import { Table, Thead, Tbody, Tr, Th, TableContainer } from "@chakra-ui/react";

const TicketTable: React.FC<
  React.PropsWithChildren<{ textHeader: string; numericHeader: string }>
> = ({ textHeader, numericHeader, children }) => {
  return (
    <TableContainer
      mb="3rem"
      border="1px solid"
      borderRadius="0.5rem"
      width="60vw"
      minW="fit-content"
      overflowY="visible"
      overflowX="visible">
      <Table variant="simple" colorScheme="grey">
        <Thead>
          <Tr>
            <Th>{textHeader}</Th>
            <Th isNumeric>{numericHeader}</Th>
          </Tr>
        </Thead>
        <Tbody>{children}</Tbody>
      </Table>
    </TableContainer>
  );
};

export default TicketTable;
