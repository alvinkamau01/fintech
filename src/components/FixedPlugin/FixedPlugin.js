"use client";

// Chakra Imports
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Flex,
  VStack,
  HStack,
  Text,
  Heading,
  Image,
  Divider,
  useDisclosure,
  useColorModeValue,
} from "@chakra-ui/react";
import { LogOut, MoveUpRight, Settings, CreditCard, FileText } from "lucide-react";
import { ProfileIcon } from "components/Icons/Icons"
import PropTypes from "prop-types";
import React from "react";

const defaultProfile = {
  name: "Eugene An",
  role: "Prompt Engineer",
  avatar: "https://ferf1mheo22r9ira.public.blob.vercel-storage.com/avatar-02-albo9B0tWOSLXCVZh9rX9KFxXIVWMr.png",
  subscription: "Free Trial",
};

export default function Configurator() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  // Chakra Color Mode
  const navbarIcon = useColorModeValue("gray.500", "gray.200");
  const bgButton = useColorModeValue("white", "gray.600");

  const menuItems = [
    {
      label: "Subscription",
      value: defaultProfile.subscription,
      href: "#",
      icon: <CreditCard size={16} />,
      external: false,
    },
    {
      label: "Settings",
      href: "#",
      icon: <Settings size={16} />,
    },
    {
      label: "Terms & Policies",
      href: "#",
      icon: <FileText size={16} />,
      external: true,
    },
  ];

  return (
    <>
      {/* Floating Button to Open Sidebar */}
      <Button
        h="52px"
        w="52px"
        onClick={onOpen} // Opens the sidebar
        bg={bgButton}
        position="fixed"
        variant="no-hover"
        left={document.documentElement.dir === "rtl" ? "35px" : ""}
        right={document.documentElement.dir === "rtl" ? "" : "35px"}
        bottom="30px"
        borderRadius="50px"
        boxShadow="0 2px 12px 0 rgb(0 0 0 / 16%)"
      >
        <ProfileIcon cursor="pointer" color={navbarIcon} size={20} />
      </Button>

      {/* Sidebar Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Profile Settings</DrawerHeader>
          <DrawerBody>
            {/* Profile Section */}
            <Flex alignItems="center" gap={4} mb={8}>
              <Box position="relative" flexShrink={0}>
                <Image
                  src={defaultProfile.avatar}
                  alt={defaultProfile.name}
                  width="72px"
                  height="72px"
                  borderRadius="full"
                  borderWidth="4px"
                  borderColor="white"
                  objectFit="cover"
                />
                <Box
                  position="absolute"
                  bottom={0}
                  right={0}
                  width={4}
                  height={4}
                  borderRadius="full"
                  bg="emerald.500"
                  borderWidth="2px"
                  borderColor="white"
                />
              </Box>
              <Box flex="1">
                <Heading fontSize="xl" fontWeight="semibold" color="gray.900">
                  {defaultProfile.name}
                </Heading>
                <Text color="gray.600">{defaultProfile.role}</Text>
              </Box>
            </Flex>

            {/* Divider */}
            <Divider my={6} borderColor="gray.200" />

            {/* Menu Items */}
            <VStack spacing={2} align="stretch">
              {menuItems.map((item) => (
                <Flex
                  as="a"
                  href={item.href}
                  key={item.label}
                  align="center"
                  justify="space-between"
                  px={4}
                  py={2}
                  rounded="lg"
                  _hover={{ bg: "gray.50" }}
                  transition="background-color 0.2s"
                >
                  <HStack spacing={2}>
                    {item.icon}
                    <Text fontSize="sm" fontWeight="medium" color="gray.900">
                      {item.label}
                    </Text>
                  </HStack>
                  <Flex align="center">
                    {item.value && (
                      <Text fontSize="sm" color="gray.500" mr={2}>
                        {item.value}
                      </Text>
                    )}
                    {item.external && <MoveUpRight size={16} />}
                  </Flex>
                </Flex>
              ))}

              {/* Logout Button */}
              <Button variant="ghost" w="full" justifyContent="space-between" px={4} py={2} rounded="lg" _hover={{ bg: "gray.50" }}>
                <HStack spacing={2}>
                  <LogOut size={16} />
                  <Text fontSize="sm" fontWeight="medium" color="gray.900">
                    Logout
                  </Text>
                </HStack>
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}