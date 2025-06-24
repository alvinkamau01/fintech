import React from "react";
import {
  Box,
  Flex,
  Circle,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";

function FormProgress({ steps, currentStep }) {
  // Theme colors
  const activeColor = useColorModeValue("blue.500", "blue.200");
  const inactiveColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.700", "gray.200");

  return (
    <Box 
      px={6} 
      py={4}
    >
      <Flex 
        justify="space-between" 
        position="relative"
      >
        {/* Progress Bar */}
        <Box
          position="absolute"
          top="50%"
          transform="translateY(-50%)"
          w={`${(currentStep / (steps.length - 1)) * 100}%`}
          h="2px"
          bg={activeColor}
          zIndex={0}
          transition="width 0.2s"
        />

        {/* Steps */}
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;
          const isLastStep = index === steps.length - 1;

          return (
            <Flex
              key={step.id}
              direction="column"
              align="center"
              zIndex={1}
              position="relative"
              flex={isLastStep ? "0 0 auto" : 1}
            >
              {/* Step Circle */}
              <Circle
                size="40px"
                bg={isCompleted || isActive ? activeColor : inactiveColor}
                color="white"
                transition="all 0.2s"
              >
                {isCompleted ? (
                  <CheckIcon />
                ) : (
                  <Text fontWeight="bold">
                    {index + 1}
                  </Text>
                )}
              </Circle>

              {/* Step Title */}
              <Text
                mt={2}
                fontSize="sm"
                color={isActive ? activeColor : textColor}
                fontWeight={isActive ? "bold" : "medium"}
                textAlign="center"
                maxW="120px"
              >
                {step.title}
              </Text>

              {/* Step Description */}
              <Text
                fontSize="xs"
                color="gray.500"
                textAlign="center"
                maxW="120px"
                display={{ base: "none", md: "block" }}
              >
                {step.description}
              </Text>
            </Flex>
          );
        })}
      </Flex>
    </Box>
  );
}

export default FormProgress;
