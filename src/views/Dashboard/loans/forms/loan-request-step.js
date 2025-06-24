"use client";

import { Input, Textarea, FormLabel, Select } from "@chakra-ui/react";
import { Box, Flex, Text } from "@chakra-ui/react";

export default function LoanRequestStep({ formData, updateFormData }) {
  return (
    <Box className="space-y-6">
      <Box textAlign="center" mb={6}>
        <Text fontSize="2xl" fontWeight="bold" color="gray.900">
          Loan Request
        </Text>
        <Text color="gray.600">Tell us about the loan you want</Text>
      </Box>

      <Box className="space-y-4">
        {/* Loan Amount Input */}
        <Box className="space-y-2">
          <FormLabel htmlFor="loanAmount">Loan amount you currently want to borrow</FormLabel>
          <Input
            id="loanAmount"
            value={formData.loanAmount}
            onChange={(e) => updateFormData({ loanAmount: e.target.value })}
            placeholder="Enter loan amount"
            type="number"
            isRequired
          />
        </Box>

        {/* Purpose of Funds */}
        <Box className="space-y-2">
          <FormLabel htmlFor="loanPurpose">Purpose of funds</FormLabel>
          <Textarea
            id="loanPurpose"
            value={formData.loanPurpose}
            onChange={(e) => updateFormData({ loanPurpose: e.target.value })}
            placeholder="Describe the purpose of the loan"
            rows={3}
            isRequired
          />
        </Box>

        {/* Loan Period Selection */}
        <Box className="space-y-2">
          <FormLabel htmlFor="loanPeriod">Loan period (months)</FormLabel>
          <Select
            id="loanPeriod"
            placeholder="Select loan period"
            value={formData.loanPeriod}
            onChange={(e) => updateFormData({ loanPeriod: e.target.value })}
          >
            <option value="3">3 months</option>
            <option value="6">6 months</option>
            <option value="12">12 months</option>
            <option value="24">24 months</option>
            <option value="36">36 months</option>
            <option value="48">48 months</option>
            <option value="60">60 months</option>
          </Select>
        </Box>

        {/* Security/Collateral */}
        <Box className="space-y-2">
          <FormLabel htmlFor="collateral">Security/Collateral</FormLabel>
          <Textarea
            id="collateral"
            value={formData.collateral}
            onChange={(e) => updateFormData({ collateral: e.target.value })}
            placeholder="Describe any security or collateral for the loan"
            rows={3}
          />
        </Box>
      </Box>
    </Box>
  );
}