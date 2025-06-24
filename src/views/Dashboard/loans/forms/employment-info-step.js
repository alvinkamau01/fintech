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

function EmploymentStep({ formData, updateFormData }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  return (
    <VStack spacing={6} align="stretch">
      <Box mb={6}>
        <Heading as="h2" size="md" color="gray.900" _dark={{ color: "white" }}>
          Employment Information
        </Heading>
        <Text fontSize="sm" color="gray.600" _dark={{ color: "gray.400" }}>
          Please provide your employment details.
        </Text>
      </Box>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        <FormControl isRequired>
          <FormLabel htmlFor="employmentStatus">Employment Status</FormLabel>
          <Select
            id="employmentStatus"
            name="employmentStatus"
            value={formData.employmentStatus}
            onChange={handleChange}
            placeholder="Select employment status"
          >
            <option value="fullTime">Full Time</option>
            <option value="partTime">Part Time</option>
            <option value="selfEmployed">Self Employed</option>
            <option value="unemployed">Unemployed</option>
            <option value="retired">Retired</option>
          </Select>
        </FormControl>

        <FormControl isRequired>
          <FormLabel htmlFor="employerName">Employer Name</FormLabel>
          <Input
            id="employerName"
            name="employerName"
            value={formData.employerName}
            onChange={handleChange}
            placeholder="Enter employer name"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel htmlFor="jobTitle">Job Title</FormLabel>
          <Input
            id="jobTitle"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            placeholder="Enter your job title"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel htmlFor="employmentLength">Length of Employment</FormLabel>
          <Select
            id="employmentLength"
            name="employmentLength"
            value={formData.employmentLength}
            onChange={handleChange}
            placeholder="Select length of employment"
          >
            <option value="lessThan1">Less than 1 year</option>
            <option value="1to2">1-2 years</option>
            <option value="2to5">2-5 years</option>
            <option value="5to10">5-10 years</option>
            <option value="moreThan10">More than 10 years</option>
          </Select>
        </FormControl>
      </SimpleGrid>
    </VStack>
  );
}

export default EmploymentStep;
