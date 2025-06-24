import React, { useState, useEffect } from "react";
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
import PersonalInfoStep from "./personal-info-step";
import BusinessInfoStep from "./buisness-info-step";
import FinancialInfoStep from "./financial-info-step";
import FormProgress from "./form-progress";
import usePost from "../../../../hooks/postHook";
import useFetch from "../../../../hooks/fetchHook";
import supabase from "../../../../supabase";
import { v4 as uuidv4 } from "uuid";
import { UploadCloudIcon } from "lucide-react";

const FORM_STEPS = [
  {
    id: "personal",
    title: "Personal Information",
    description: "Provide your basic personal details",
  },
  {
    id: "business",
    title: "Business Information",
    description: "Tell us about your business",
  },
  {
    id: "financial",
    title: "Financial Information",
    description: "Share your financial situation",
  }
];

function MembershipForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const toast = useToast();
  const { postData: postPersonal } = usePost('personal_info');
  const { postData: postBusiness } = usePost('business_info');
  const { postData: postFinancial } = usePost('financial_info');
  const { fetchData: fetchPersonalData, data: fetchedPersonalData, error: fetchError } = useFetch('personal_info');
  const [formData, setFormData] = useState({
    // Personal Info
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    personalPhoto: null,
    imageUrl: "",
    
    // Financial Info
    annual: null,
    other: null,
    housing: "",
    credit: "",
    
    // Business Info
    isBusinessOwner: "",
    businessName: null,
    businessDuration: null,
    businessType: null,
    businessAddress: null,
    businessTurnover: null,
  });
  
  const updateFormData = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
    if (data.personalPhoto) {
      setIsUploading(true);
      toast({
        title: "Photo selected",
        description: "Your photo will be uploaded when you submit the form.",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    if (currentStep !== 0) {
      setIsUploading(false);
    }
  }, [currentStep]);

  // Fetch personal data on component mount or as needed
  useEffect(() => {
    const fetchPersonalID = async () => {
      try {
        const data = await fetchPersonalData();
        if (data && data.length > 0) {
          // Assuming personalID is the id field of the first record
          const personalID = data[0].id;
          console.log("Fetched personalID:", personalID);
          // You can update formData or state with this personalID if needed
          setFormData((prev) => ({ ...prev, personalID }));
        }
      } catch (error) {
        console.error("Error fetching personal data:", error);
        toast({
          title: "Error fetching personal data",
          description: error.message || "Failed to fetch personal data.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };
    fetchPersonalID();
  }, [fetchPersonalData, toast]);

  const handleNext = () => {
    if (isUploading) {
      toast({
        title: "Please wait",
        description: "Please wait for the photo to finish uploading before proceeding.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    
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
    setIsSubmitting(true);
    
    try {
      // Handle photo upload first if exists
      let photoUrl = null;
      if (formData.personalPhoto) {
        const file = formData.personalPhoto;
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        
        // Upload file to Supabase storage
        const { data: uploadData, error: uploadError } = await supabase.storage
        .from('images')
        .upload(`public/${fileName}`, file, {
          cacheControl: '3600',
          upsert: false,
        });
        
        if (uploadError) {
          throw new Error(`File upload error: ${uploadError.message}`);
        }
        
        // Get public URL for the uploaded file
        const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(`public/${fileName}`);
        
        photoUrl = publicUrl;
      }
      
      // Format date to YYYY-MM-DD
      const formattedDate = formData.dateOfBirth ? new Date(formData.dateOfBirth).toISOString().split('T')[0] : null;
      
      // Submit personal info
      const personalPayload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        dateOfBirth: formattedDate,
        address: formData.address,
        city: formData.city,
        town: formData.town,
        zipCode: formData.zipCode,
        photo_url: photoUrl || "https://images.pexels.com/photos/30775234/pexels-photo-30775234/free-photo-of-tallinn-town-hall-with-reflective-puddle-view.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load",
        created_at: new Date().toISOString()
      };
      const personalResult = await postPersonal(personalPayload);
      setIsUploading(false);
      const personalId = personalResult.id;

      const uniqueId = uuidv4();
      console.log("Generated unique ID:", uniqueId);

      // Submit business info with reference to personal ID
      const businessPayload = {
        id: uniqueId,
        personal_id: personalId,
        is_owner: formData.isBusinessOwner,
        name: formData.businessName,
        duration: formData.businessDuration,
        type: formData.businessType,
        address: formData.businessAddress,
        turnover: formData.businessTurnover,
        created_at: new Date().toISOString()
      };
      await postBusiness(businessPayload);
      
      // Submit financial info with reference to personal ID
      const financialPayload = {
        id: uniqueId,
        personal_id: personalId,
        annual: formData.annual ? Number(formData.annual) : null,
        other: formData.other ? Number(formData.other) : null,
        housing: formData.housing ? Number(formData.housing) : null,
        credit: formData.credit || null,
        created_at: new Date().toISOString()
      };
      await postFinancial(financialPayload);
      
      setIsSubmitting(false);
      toast({
        title: "Membership application submitted",
        description: "Your membership application has been submitted successfully!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      
      // Redirect to loan application form
      window.location.href = "/admin/forms";
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsSubmitting(false);
      toast({
        title: "Submission error",
        description: error.message || "There was an error submitting your application. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <PersonalInfoStep 
          formData={formData} 
          updateFormData={updateFormData}
          isUploading={isUploading}
        />;
      case 1:
        return <BusinessInfoStep formData={formData} updateFormData={updateFormData} />;
      case 2:
        return <FinancialInfoStep formData={formData} updateFormData={updateFormData} />;
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
          Membership Application
        </Heading>
        <Text mt={1} fontSize="sm" color="gray.600" _dark={{ color: "gray.400" }}>
          Complete the form below to become a member. After membership approval, you can proceed with loan applications.
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
              {isSubmitting ? "Submitting..." : "Submit Membership Application"}
            </Button>
          )}
        </Flex>
      </Box>
    </Box>
  );
}

export default MembershipForm;
