import React from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
  Heading,
  Text,
  VStack,
  Image,
  Spinner,
} from "@chakra-ui/react";

function PersonalInfoStep({ formData, updateFormData, isUploading }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      updateFormData({ personalPhoto: file });
    }
  };

  return (
    <VStack spacing={6} align="stretch">
      <Box mb={6}>
        <Heading as="h2" size="md" color="gray.900" _dark={{ color: "white" }}>
          Personal Information
        </Heading>
        <Text fontSize="sm" color="gray.600" _dark={{ color: "gray.400" }}>
          Please provide your personal details for the loan application.
        </Text>
      </Box>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        <FormControl isRequired>
          <FormLabel htmlFor="firstName">First Name</FormLabel>
          <Input
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Enter your first name"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel htmlFor="lastName">Last Name</FormLabel>
          <Input
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Enter your last name"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel htmlFor="email">Email Address</FormLabel>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email address"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel htmlFor="phone">Phone Number</FormLabel>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel htmlFor="dateOfBirth">Date of Birth</FormLabel>
          <Input
            id="dateOfBirth"
            name="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel htmlFor="personalPhoto">Personal Photo</FormLabel>
          <Input
            id="personalPhoto"
            name="personalPhoto"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            p={1}
            border="1px solid"
            borderColor="gray.200"
            borderRadius="md"
            disabled={isUploading}
          />
          <Text fontSize="sm" color="gray.500" mt={1}>
            Upload a clear, recent photo of yourself
          </Text>
          {isUploading && (
            <Box mt={2} display="flex" alignItems="center">
              <Spinner size="sm" mr={2} />
              <Text fontSize="sm" color="gray.600">Uploading photo...</Text>
            </Box>
          )}
          {formData.imageUrl && !isUploading && (
            <Box mt={2}>
              <Image
                src={formData.imageUrl}
                alt="Personal photo"
                boxSize="100px"
                objectFit="cover"
                borderRadius="md"
              />
            </Box>
          )}
        </FormControl>

        <FormControl isRequired gridColumn={{ md: "span 2" }}>
          <FormLabel htmlFor="address">Street Address</FormLabel>
          <Input
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter your street address"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel htmlFor="city">City</FormLabel>
          <Input
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Enter your city"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel htmlFor="physicalAddress">Physical Address</FormLabel>
          <Input
            id="physicalAddress"
            name="physicalAddress"
            value={formData.physicalAddress}
            onChange={handleChange}
            placeholder="Enter your Physical Address"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel htmlFor="zipCode">ZIP Code</FormLabel>
          <Input
            id="zipCode"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            placeholder="Enter your ZIP code"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel htmlFor="town">Town</FormLabel>
          <Input
            id="town"
            name="town"
            value={formData.town}
            onChange={handleChange}
            placeholder="Enter your Town"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel htmlFor="estate">Estate</FormLabel>
          <Input
            id="estate"
            name="estate"
            value={formData.estate}
            onChange={handleChange}
            placeholder="Enter your Estate"
          />
        </FormControl>
      </SimpleGrid>
    </VStack>
  );
}

export default PersonalInfoStep;
