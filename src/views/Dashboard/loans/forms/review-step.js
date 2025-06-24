import React from "react";
import {
  Box,
  SimpleGrid,
  Heading,
  Text,
  VStack,
  Divider,
} from "@chakra-ui/react";

function ReviewStep({ formData }) {
  const sections = [
    {
      title: "Personal Information",
      fields: [
        { label: "First Name", value: formData.firstName },
        { label: "Last Name", value: formData.lastName },
        { label: "Email", value: formData.email },
        { label: "Phone", value: formData.phone },
        { label: "Date of Birth", value: formData.dateOfBirth },
        { label: "Address", value: formData.address },
        { label: "City", value: formData.city },
        { label: "State", value: formData.state },
        { label: "ZIP Code", value: formData.zipCode },
      ],
    },
    {
      title: "Loan Details",
      fields: [
        { label: "Loan Amount", value: formData.loanAmount ? `$${formData.loanAmount}` : "" },
        { label: "Loan Term", value: formData.loanTerm ? `${formData.loanTerm} months` : "" },
        { label: "Loan Purpose", value: formData.loanPurpose },
      ],
    },
    {
      title: "Financial Information",
      fields: [
        { label: "Annual Income", value: formData.annualIncome ? `$${formData.annualIncome}` : "" },
        { label: "Other Income", value: formData.otherIncome ? `$${formData.otherIncome}` : "" },
        { label: "Monthly Housing Payment", value: formData.housingPayment ? `$${formData.housingPayment}` : "" },
        { label: "Credit Score Range", value: formData.creditScore },
      ],
    },
    {
      title: "Employment Information",
      fields: [
        { label: "Employment Status", value: formData.employmentStatus },
        { label: "Employer Name", value: formData.employerName },
        { label: "Job Title", value: formData.jobTitle },
        { label: "Length of Employment", value: formData.employmentLength },
      ],
    },
  ];

  return (
    <VStack spacing={6} align="stretch">
      <Box mb={6}>
        <Heading as="h2" size="md" color="gray.900" _dark={{ color: "white" }}>
          Review Your Application
        </Heading>
        <Text fontSize="sm" color="gray.600" _dark={{ color: "gray.400" }}>
          Please review your information before submitting.
        </Text>
      </Box>

      {sections.map((section, index) => (
        <Box key={section.title}>
          <Heading as="h3" size="sm" mb={4} color="gray.700" _dark={{ color: "gray.300" }}>
            {section.title}
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
            {section.fields.map((field) => (
              <Box key={field.label}>
                <Text fontSize="sm" color="gray.600" _dark={{ color: "gray.400" }}>
                  {field.label}
                </Text>
                <Text fontSize="md" fontWeight="medium">
                  {field.value || "Not provided"}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
          {index < sections.length - 1 && <Divider my={6} />}
        </Box>
      ))}
    </VStack>
  );
}

export default ReviewStep;
