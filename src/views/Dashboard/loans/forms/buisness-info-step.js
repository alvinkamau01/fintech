"use client";

import { Input, Textarea, Radio, RadioGroup, Box, Flex, FormLabel, Heading, Text, Button } from "@chakra-ui/react";

export default function BusinessInfoStep({ formData, updateFormData }) {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      updateFormData({ proofOfAddress: file });
    }
  };

  return (
    <Box spacing={6}>
      <Box textAlign="center" mb={6}>
        <Heading fontSize="2xl" fontWeight="bold" color="gray.900">
          Business Information
        </Heading>
        <Text color="gray.600">Tell us about your business</Text>
      </Box>

      <Box spacing={4}>
        {/* Are you a Business Owner? */}
        <Box mb={4}>
          <FormLabel>Are you a Business Owner?</FormLabel>
          <RadioGroup
            value={formData.isBusinessOwner}
            onChange={(value) => updateFormData({ isBusinessOwner: value })}
          >
            <Flex gap={4}>
              <Flex align="center" gap={2}>
                <Radio value="yes" id="business-yes" />
                <FormLabel htmlFor="business-yes" mb={0}>
                  Yes
                </FormLabel>
              </Flex>
              <Flex align="center" gap={2}>
                <Radio value="no" id="business-no" />
                <FormLabel htmlFor="business-no" mb={0}>
                  No
                </FormLabel>
              </Flex>
            </Flex>
          </RadioGroup>
        </Box>

        {formData.isBusinessOwner === "yes" && (
          <>
            {/* Business Name */}
            <Box mb={4}>
              <FormLabel htmlFor="businessName">If YES, Name of business</FormLabel>
              <Input
                id="businessName"
                value={formData.businessName}
                onChange={(e) => updateFormData({ businessName: e.target.value })}
                placeholder="Enter your business name"
              />
            </Box>

            {/* Business Duration */}
            <Box mb={4}>
              <FormLabel htmlFor="businessDuration">How long has your business been operational?</FormLabel>
              <Input
                id="businessDuration"
                value={formData.businessDuration}
                onChange={(e) => updateFormData({ businessDuration: e.target.value })}
                placeholder="e.g., 2 years, 6 months"
              />
            </Box>

            {/* Business Type */}
            <Box mb={4}>
              <FormLabel htmlFor="businessType">Nature/type of business</FormLabel>
              <Input
                id="businessType"
                value={formData.businessType}
                onChange={(e) => updateFormData({ businessType: e.target.value })}
                placeholder="e.g., Retail, Services, Manufacturing"
              />
            </Box>

            {/* Business Address */}
            <Box mb={4}>
              <FormLabel htmlFor="businessAddress">Physical address of business</FormLabel>
              <Textarea
                id="businessAddress"
                value={formData.businessAddress}
                onChange={(e) => updateFormData({ businessAddress: e.target.value })}
                placeholder="Enter the physical address of your business"
                rows={3}
              />
            </Box>

            {/* Proof of Address */}
            <Box mb={4}>
              <FormLabel htmlFor="proofOfAddress">Proof of Address</FormLabel>
              <Input
                id="proofOfAddress"
                type="file"
                accept="image/*,.pdf"
                onChange={handleFileChange}
                p={1}
                border="1px solid"
                borderColor="gray.200"
                borderRadius="md"
              />
              <Text fontSize="sm" color="gray.500" mt={1}>
                Upload a photo or PDF of your proof of address (utility bill, lease agreement, etc.)
              </Text>
            </Box>

            {/* Business Turnover */}
            <Box mb={4}>
              <FormLabel htmlFor="businessTurnover">Daily Income</FormLabel>
              <Input
                id="businessTurnover"
                value={formData.businessTurnover}
                onChange={(e) => updateFormData({ businessTurnover: e.target.value })}
                placeholder="Enter average daily income"
                type="number"
              />
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}
