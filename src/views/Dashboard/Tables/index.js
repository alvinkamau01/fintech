// Chakra imports
import { Flex } from "@chakra-ui/react";
import React from "react";
import LoanProcess from "./components/LoanProcess";
import { tablesTableData, dashboardTableData } from "variables/general";

function Tables() {
  return (
    <Flex direction='column' pt={{ base: "120px", md: "75px" }}>
      <LoanProcess
        title='Loan Process'/>
    </Flex>
  );
}

export default Tables;
