"use client";

import { Input } from "@chakra-ui/react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { Upload } from "lucide-react";

export default function DocumentUploadStep({ formData, updateFormData }) {
  const handleFileChange = (documentType, file) => {
    updateFormData({
      documents: {
        ...formData.documents,
        [documentType]: file,
      },
    });
  };

  return (
    <Box className="space-y-6">
      <Box textAlign="center" mb={6}>
        <Text fontSize="2xl" fontWeight="bold" color="gray.900">
          Required Documents
        </Text>
        <Text color="gray.600">Please upload the following documents</Text>
      </Box>

      <Flex gap={4} flexWrap="wrap">
        <DocumentUploadCard
          title="National ID"
          description="Copy of National ID (front and back)"
          onChange={(file) => handleFileChange("nationalId", file)}
        />

        <DocumentUploadCard
          title="KRA PIN"
          description="Copy of KRA PIN certificate"
          onChange={(file) => handleFileChange("kraPin", file)}
        />

        <DocumentUploadCard
          title="M-Pesa Statements"
          description="6 months M-Pesa statements (personal & business)"
          onChange={(file) => handleFileChange("mpesaStatements", file)}
        />

        <DocumentUploadCard
          title="Bank Statements"
          description="6 months certified bank statements"
          onChange={(file) => handleFileChange("bankStatements", file)}
        />

        <DocumentUploadCard
          title="Payslips"
          description="3 months stamped payslips (if employed)"
          onChange={(file) => handleFileChange("payslips", file)}
        />
      </Flex>
    </Box>
  );
}

function DocumentUploadCard({ title, description, onChange }) {
  return (
    <Box
      border="2px"
      borderColor="gray.300"
      borderRadius="lg"
      p={6}
      textAlign="center"
      cursor="pointer"
      transition="background-color 0.2s"
      _hover={{ bg: "gray.50" }}
    >
      <Flex flexDirection="column" alignItems="center" justifyContent="center" h="full">
        <Upload className="w-8 h-8 mb-3 text-gray-500" />
        <Text fontWeight="semibold" fontSize="sm" color="gray.700">
          {title}
        </Text>
        <Text fontSize="xs" color="gray.500">
          {description}
        </Text>
        <Text mt={2} fontSize="xs" color="gray.500">
          PDF, JPG or PNG (max. 5MB)
        </Text>
      </Flex>
      <Input
        type="file"
        display="none"
        accept=".pdf,.jpg,.jpeg,.png"
        onChange={(e) => {
          const file = e.target.files?.[0] || null;
          onChange(file);
        }}
      />
    </Box>
  );
}