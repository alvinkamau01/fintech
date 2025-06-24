import React, { useState } from "react";
import {
  IconButton,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useColorModeValue,
  Tooltip,
} from "@chakra-ui/react";
import { Settings } from "lucide-react";
import ProfileCard from "./profile-card";

export default function Configurator() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  return (
    <>
      <Tooltip label="Settings" placement="left">
        <IconButton
          aria-label="Settings"
          icon={<Settings size={20} />}
          variant="ghost"
          position="fixed"
          right="24px"
          top="50%"
          transform="translateY(-50%)"
          borderRadius="50%"
          onClick={toggleDrawer}
          _hover={{
            bg: useColorModeValue("gray.100", "gray.700"),
          }}
          zIndex={99}
        />
      </Tooltip>

      <Drawer 
        isOpen={isDrawerOpen} 
        placement="right" 
        onClose={toggleDrawer} 
        size="sm"
      >
        <DrawerOverlay />
        <DrawerContent bg={useColorModeValue("white", "gray.800")}>
          <DrawerCloseButton />
          <DrawerHeader 
            borderBottomWidth="1px" 
            borderColor={useColorModeValue("gray.200", "gray.700")}
          >
            Profile Settings
          </DrawerHeader>
          <DrawerBody>
            <ProfileCard onClose={toggleDrawer} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
