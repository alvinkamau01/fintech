import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  useToast,
  Icon,
  Spinner,
} from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon, CheckIcon } from "@chakra-ui/icons";
import LoanDetailsStep from "./loan-details-step";
import ReviewStep from "./review-step-new";
import FormProgress from "./form-progress";
import usePost from "../../../../hooks/postHook";


const FORM_STEPS = [
  {
    id: "loan",
    title: "Loan Details",
    description: "Specify your loan requirements",
  }
];

function LoanApplicationForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const { postData: postLoanDetails } = usePost('loan_details');
  const { postData: postPaymentSchedule } = usePost('payment_schedules');
  const { postData: postLoanApplication } = usePost('loan_applications');

  const [formData, setFormData] = useState({
    loanAmount: "",
    loanPurpose: "",
    loanTerm: "",
    paymentFrequency: "monthly",
    interestRate: 0.15,
    schedule: [],
    signature: null,
    interest : "",
    userId: "",
    totalPayment: "",
  });

  const updateFormData = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const handleNext = () => {
    if (currentStep < FORM_STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo(0, 0);
    }
  };

    const handleSubmit = async (e) => {
      e.preventDefault();

      if (currentStep === FORM_STEPS.length - 1 && (!formData.signature || !formData.signature.trim())) {
        toast({
          title: "Signature required",
          description: "Please provide your signature before submitting.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return;
      }

      setIsSubmitting(true);

      try {
        console.log("Submitting loan details with totalPayment:", formData.totalPayment);

        // First create the loan details
        const loanDetailsPayload = {
          amount: parseFloat(formData.loanAmount),
          term: parseInt(formData.loanTerm),
          purpose: formData.loanPurpose,
          payment_frequency: formData.paymentFrequency,
          interestRate: formData.interestRate,
          interest:formData.totalInterest,
          status: 'pending',
          userId:formData.userId,
          totalPayment: formData.totalPayment,
          created_at: new Date().toISOString()
        };

        const loanData = await postLoanDetails(loanDetailsPayload);
        const loanId = loanData.id;
        console.log('Created loan with ID:', loanId);

        // Create all payment schedules in a single batch
        const schedulePayloads = formData.schedule.map(payment => ({
          loan_id: loanId,
          installmentNumber: payment.installmentNumber,
          dueDate: payment.dueDate,
          principal: parseFloat(payment.principal),
          interest: parseFloat(payment.interest),
          totalPayment: parseFloat(payment.totalAmount),
          remainingBalance: parseFloat(payment.remainingBalance || 0),
          status: 'pending',
          created_at: new Date().toISOString()
        }));

        await postPaymentSchedule(schedulePayloads);

        // Create loan application
        const applicationPayload = {
          loan_id: loanId,
          signature: formData.signature,
          status: 'pending',
          created_at: new Date().toISOString()
        };

        await postLoanApplication(applicationPayload);

        setIsSubmitting(false);
        toast({
          title: "Application submitted",
          description: "Your loan application has been submitted successfully!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });

        window.location.href = "/admin/loans";
      } catch (error) {
        console.error("Error submitting form:", error);
        setIsSubmitting(false);
        toast({
          title: "Submission error",
          description: "There was an error submitting your application. Please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <LoanDetailsStep formData={formData} updateFormData={updateFormData} />;
      default:
        return null;
    }
  };

  return (
    <Box 
      w="full" 
      maxW="4xl" 
      mx="auto" 
      bg="white" 
      borderRadius="xl" 
      borderWidth="1px" 
      borderColor="gray.200" 
      boxShadow="sm"
      mt="80px"
      _dark={{
        bg: "gray.800",
        borderColor: "gray.700",
      }}
    >
      <Box p={6} borderBottomWidth="1px" borderColor="gray.200" _dark={{ borderColor: "gray.700" }}>
        <Heading as="h1" size="lg" color="gray.900" _dark={{ color: "white" }}>
          Loan Application
        </Heading>
        <Text mt={1} fontSize="sm" color="gray.600" _dark={{ color: "gray.400" }}>
          Complete the loan application form below. Make sure you're already a registered member before proceeding.
        </Text>
      </Box>

      <FormProgress steps={FORM_STEPS} currentStep={currentStep} />

      <Box as="form" onSubmit={handleSubmit} p={6}>
        {renderStep()}

        <Flex 
          mt={8} 
          pt={5} 
          borderTopWidth="1px" 
          borderColor="gray.200" 
          justifyContent="space-between"
          _dark={{ borderColor: "gray.700" }}
        >
          <Button
            leftIcon={<Icon as={ArrowBackIcon} />}
            onClick={handlePrevious}
            isDisabled={currentStep === 0 || isSubmitting}
            visibility={currentStep === 0 ? "hidden" : "visible"}
            variant="outline"
          >
            Back
          </Button>

          {currentStep < FORM_STEPS.length - 1 ? (
            <Button 
              rightIcon={<Icon as={ArrowForwardIcon} />} 
              onClick={handleNext} 
              colorScheme="blue" 
              ml="auto"
            >
              Next
            </Button>
          ) : (
            <Button 
              type="submit" 
              isDisabled={isSubmitting} 
              colorScheme="blue" 
              ml="auto"
              leftIcon={isSubmitting ? <Spinner size="sm" /> : <Icon as={CheckIcon} />}
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </Button>
          )}
        </Flex>
      </Box>
    </Box>
  );
}

export default LoanApplicationForm;
