import React, { useState } from 'react';
import {
  Box,
  VStack,
  Text,
  Grid,
  GridItem,
  Heading,
  Divider,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import SignaturePad from './signature-pad-new';

const ReviewStep = ({ formData, updateFormData }) => {
  const textColor = useColorModeValue('gray.700', 'white');
  const labelColor = useColorModeValue('gray.600', 'gray.400');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const previewBgColor = useColorModeValue('gray.50', 'gray.700');

  const toast = useToast();
  const [isSignatureSaved, setIsSignatureSaved] = useState(false);

  const handleSignatureSave = (signatureData) => {
    if (signatureData) {
      updateFormData({ signature: signatureData });
      setIsSignatureSaved(true);
      toast({
        title: "Signature Saved",
        description: "Your signature has been successfully saved.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      setIsSignatureSaved(false);
    }
  };

  const InfoSection = ({ title, data }) => (
    <Box mb={6}>
      <Heading size="sm" mb={4} color={textColor}>
        {title}
      </Heading>
      <Grid templateColumns="repeat(2, 1fr)" gap={4}>
        {Object.entries(data).map(([key, value]) => (
          <GridItem key={key}>
            <Text fontSize="sm" color={labelColor} mb={1}>
              {key.split(/(?=[A-Z])/).join(' ')}
            </Text>
            <Text fontSize="md" color={textColor}>
              {value || '-'}
            </Text>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );

  const sections = {
    'Personal Information': {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      dateOfBirth: formData.dateOfBirth,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      zipCode: formData.zipCode,
    },
    'Loan Details': {
      loanAmount: formData.loanAmount,
      loanPurpose: formData.loanPurpose,
      loanTerm: formData.loanTerm,
    },
    'Financial Information': {
      annualIncome: formData.annualIncome,
      otherIncome: formData.otherIncome,
      housingPayment: formData.housingPayment,
      creditScore: formData.creditScore,
    },
    'Employment Information': {
      employerName: formData.employerName,
      jobTitle: formData.jobTitle,
      employmentLength: formData.employmentLength,
      employmentStatus: formData.employmentStatus,
    },
  };

  return (
    <VStack spacing={6} align="stretch" w="100%">
      <Text fontSize="md" color={labelColor} mb={4}>
        Please review your application details and provide your signature below to confirm the information is correct.
      </Text>

      {Object.entries(sections).map(([title, data]) => (
        <React.Fragment key={title}>
          <InfoSection title={title} data={data} />
          <Divider />
        </React.Fragment>
      ))}

      <Box mt={6}>
        <Heading size="sm" mb={4} color={textColor}>
          Signature
        </Heading>
        <Text fontSize="sm" color={labelColor} mb={4}>
          By signing below, you confirm that all the information provided is accurate and true.
        </Text>
        
        {formData.signature && (
          <Box 
            mb={4} 
            p={4} 
            borderWidth="1px" 
            borderRadius="md" 
            borderColor={borderColor}
            bg={previewBgColor}
          >
            <Text fontSize="sm" color={labelColor} mb={2}>Current Signature:</Text>
            <Box 
              borderWidth="1px" 
              borderRadius="md" 
              borderColor={borderColor}
              bg="white"
              p={2}
            >
              <img 
                src={formData.signature} 
                alt="Signature" 
                style={{ 
                  maxWidth: '100%', 
                  height: 'auto',
                  display: 'block',
                  margin: '0 auto'
                }} 
              />
            </Box>
          </Box>
        )}
        
        <SignaturePad 
          onSave={handleSignatureSave} 
          initialSignature={formData.signature}
        />
        
        <Text 
          fontSize="xs" 
          color={isSignatureSaved ? "green.500" : "gray.500"} 
          mt={2}
          textAlign="right"
        >
          {isSignatureSaved ? "✓ Signature saved" : "No signature saved yet"}
        </Text>
      </Box>
    </VStack>
  );
};

export default ReviewStep;
