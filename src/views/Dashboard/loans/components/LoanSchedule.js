import React from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Heading,
} from "@chakra-ui/react";

const LoanSchedule = ({ schedule }) => {
  if (!schedule || schedule.length === 0) {
    return (
      <Box p={4} borderWidth="1px" borderRadius="md" mt={6}>
        <Text>No loan schedule available.</Text>
      </Box>
    );
  }

  return (
    <Box p={4} borderWidth="1px" borderRadius="md" mt={6}>
      <Heading size="md" mb={4}>
        Loan Repayment Schedule
      </Heading>
      <Table variant="simple" size="sm">
        <Thead>
          <Tr>
            <Th>Installment #</Th>
            <Th>Due Date</Th>
            <Th>Principal</Th>
            <Th>Interest</Th>
            <Th>Total Payment</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {schedule.map((item, index) => (
            <Tr key={index}>
              <Td>{item.installmentNumber}</Td>
              <Td>{item.dueDate}</Td>
              <Td>{item.principal}</Td>
              <Td>{item.interest}</Td>
              <Td>{item.totalPayment}</Td>
              <Td>{item.status}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default LoanSchedule;
