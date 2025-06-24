import React from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";

function FinancialInfoStep({ formData, updateFormData }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  return (
    <VStack spacing={6} align="stretch">
      <Box mb={6}>
        <Heading as="h2" size="md" color="gray.900" _dark={{ color: "white" }}>
          Financial Information
        </Heading>
        <Text fontSize="sm" color="gray.600" _dark={{ color: "gray.400" }}>
          Please provide your financial details.
        </Text>
      </Box>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        <FormControl isRequired>
          <FormLabel htmlFor="annual">Annual Income</FormLabel>
          <Input
            id="annual"
            name="annual"
            type="number"
            value={formData.annual || ""}
            onChange={handleChange}
            placeholder="Enter your annual income"
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="other">Other Income (if any)</FormLabel>
          <Input
            id="other"
            name="other"
            type="number"
            value={formData.other || ""}
            onChange={handleChange}
            placeholder="Enter other income"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel htmlFor="housing">Monthly Housing Payment</FormLabel>
          <Input
            id="housing"
            name="housing"
            type="number"
            value={formData.housing || ""}
            onChange={handleChange}
            placeholder="Enter monthly housing payment"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel htmlFor="credit">Credit Score Range</FormLabel>
          <Select
            id="credit"
            name="credit"
            value={formData.credit || ""}
            onChange={handleChange}
            placeholder="Select credit score range"
          >
            <option value="excellent">Excellent (750+)</option>
            <option value="good">Good (700-749)</option>
            <option value="fair">Fair (650-699)</option>
            <option value="poor">Poor (below 650)</option>
          </Select>
        </FormControl>
      </SimpleGrid>
    </VStack>
  );
}

export default FinancialInfoStep;
