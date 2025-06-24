"use client"

import { useState, useEffect } from "react"
import { Box, Flex, Text, Avatar, Badge, Icon } from "@chakra-ui/react"
import { FaCalendar, FaMapMarkerAlt, FaBriefcase } from "react-icons/fa"
import { motion } from "framer-motion"

const MotionBox = motion(Box)
const MotionFlex = motion(Flex)

export default function ProfileCard({ userName = "Sarah Johnson" }) {
  const [greeting, setGreeting] = useState("")

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting("Good morning")
    else if (hour < 18) setGreeting("Good afternoon")
    else setGreeting("Good evening")
  }, [])

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      maxW="100%"
      mx="auto"
      mb="6"
      borderRadius="2xl"
      overflow="hidden"
      bg="white"
      boxShadow="0 4px 20px rgba(0, 0, 0, 0.08)"
    >
      {/* Banner */}
      <Box h="120px" bgGradient="linear(to-r, green.400, green.600)" position="relative">
        <MotionBox
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bgImage="url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNDQwIiBoZWlnaHQ9IjE0NCIgZmlsbD0ibm9uZSIgdmlld0JveD0iMCAwIDE0NDAgMTQ0Ij48ZyBvcGFjaXR5PSIuMiI+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTAgMGgxNDQwdjE0NEgweiIvPjxwYXRoIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iLjA1IiBkPSJNMTQ0MCAxNDRIMGwxNDQwLTE0NHYxNDR6Ii8+PC9nPjwvc3ZnPg==')"
          bgSize="cover"
          bgPosition="center"
          opacity={0.6}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        />
      </Box>

      {/* Profile Content */}
      <Flex direction={{ base: "column", md: "row" }} px="6" py="5" position="relative">
        {/* Avatar */}
        <MotionFlex
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          mt={{ base: "-55px", md: "-65px" }}
          mb={{ base: "3", md: "0" }}
          justifyContent={{ base: "center", md: "flex-start" }}
        >
          <Avatar
            size="2xl"
            name={userName}
            src="/placeholder-user.jpg"
            border="4px solid white"
            boxShadow="0 4px 12px rgba(0, 0, 0, 0.08)"
          />
        </MotionFlex>

        {/* User Info */}
        <Box
          ml={{ base: "0", md: "6" }}
          mt={{ base: "0", md: "1" }}
          textAlign={{ base: "center", md: "left" }}
          flex="1"
        >
          <MotionFlex
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            direction={{ base: "column", md: "row" }}
            alignItems={{ base: "center", md: "flex-end" }}
            justifyContent={{ base: "center", md: "space-between" }}
            mb="2"
          >
            <Box>
              <Text fontSize="2xl" fontWeight="bold" color="gray.800">
                {userName}
              </Text>
              <Text fontSize="lg" color="green.600" fontWeight="medium">
                {greeting}, welcome back!
              </Text>
            </Box>
            <Badge colorScheme="green" fontSize="sm" px="3" py="1" borderRadius="full" mt={{ base: "2", md: "0" }}>
              Premium Member
            </Badge>
          </MotionFlex>

          <MotionFlex
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            wrap="wrap"
            gap="4"
            mt="3"
            justifyContent={{ base: "center", md: "flex-start" }}
          >
            <Flex align="center">
              <Icon as={FaBriefcase} color="green.500" mr="2" />
              <Text color="gray.600" fontSize="sm">
                Product Designer
              </Text>
            </Flex>
            <Flex align="center">
              <Icon as={FaMapMarkerAlt} color="green.500" mr="2" />
              <Text color="gray.600" fontSize="sm">
                San Francisco, CA
              </Text>
            </Flex>
            <Flex align="center">
              <Icon as={FaCalendar} color="green.500" mr="2" />
              <Text color="gray.600" fontSize="sm">
                Member since 2021
              </Text>
            </Flex>
          </MotionFlex>
        </Box>
      </Flex>

      {/* Stats */}
      <MotionFlex
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        borderTop="1px solid"
        borderColor="gray.100"
        px="6"
        py="3"
        justifyContent="space-around"
        textAlign="center"
      >
        <Box>
          <Text fontWeight="bold" color="green.600">
            12
          </Text>
          <Text fontSize="sm" color="gray.500">
            Forms
          </Text>
        </Box>
        <Box>
          <Text fontWeight="bold" color="green.600">
            248
          </Text>
          <Text fontSize="sm" color="gray.500">
            Submissions
          </Text>
        </Box>
        <Box>
          <Text fontWeight="bold" color="green.600">
            84%
          </Text>
          <Text fontSize="sm" color="gray.500">
            Completion
          </Text>
        </Box>
      </MotionFlex>
    </MotionBox>
  )
}
