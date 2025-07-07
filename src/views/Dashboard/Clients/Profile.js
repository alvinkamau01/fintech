import React from "react";
import {
  Box,
  Flex,
  VStack,
  HStack,
  Heading,
  Text,
  Avatar,
  AvatarBadge,
  Button,
  Badge,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  useColorModeValue,
  Divider,
} from "@chakra-ui/react";
import {
  Phone,
  Mail,
  MapPin,
  PlusCircle,
  Edit,
  CheckCircle,
  Clock,
  ArrowDownLeft,
  Shield,
  AlertTriangle,
  Briefcase,
  Home,
  GraduationCap,
  Heart,
} from "lucide-react";

const Profile = ({ client, getStatusBadge, getRiskBadge }) => {
  const textColor = useColorModeValue("gray.600", "gray.300");
  const headingColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const cardBg = useColorModeValue("white", "gray.800");

  return (
    <Box
      mb={6}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="xl"
      bg={cardBg}
      boxShadow="sm"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-2px)", boxShadow: "md" }}
    >
      <Box p={8}>
        <Flex direction={{ base: "column", md: "row" }} gap={8}>
          {/* Avatar and Basic Info */}
          <VStack align={{ base: "center", md: "start" }} spacing={4}>
            <Avatar
              size="2xl"
              src={client.avatarUrl || "/placeholder.svg"}
              name={client.name}
              borderWidth={2}
              borderColor={borderColor}
            >
              <AvatarBadge boxSize="1.25em" bg="green.500" />
            </Avatar>
            <VStack align={{ base: "center", md: "start" }} spacing={2}>
              <Heading size="lg" color={headingColor}>
                {client.name}
              </Heading>
              <Text color={textColor} fontSize="lg">
                {client.id}
              </Text>
              <HStack mt={2} spacing={3}>
                {getStatusBadge(client.status)}
                {getRiskBadge(client.riskLevel)}
              </HStack>
            </VStack>
          </VStack>

          {/* Contact Information */}
          <VStack flex={1} spacing={4} align="stretch">
            <HStack spacing={4} align="center">
              <Box p={2} borderRadius="full" borderWidth="1px" borderColor={borderColor}>
                <Phone size={20} />
              </Box>
              <Box flex="1">
                <Text fontSize="sm" color={textColor}>
                  Phone
                </Text>
                <Text fontWeight="bold" color={headingColor}>
                  {client.phone}
                </Text>
              </Box>
            </HStack>

            <HStack spacing={4} align="center">
              <Box p={2} borderRadius="full" borderWidth="1px" borderColor={borderColor}>
                <Mail size={20} />
              </Box>
              <Box flex="1">
                <Text fontSize="sm" color={textColor}>
                  Email
                </Text>
                <Text fontWeight="bold" color={headingColor}>
                  {client.email}
                </Text>
              </Box>
            </HStack>

            <HStack spacing={4} align="center">
              <Box p={2} borderRadius="full" borderWidth="1px" borderColor={borderColor}>
                <MapPin size={20} />
              </Box>
              <Box flex="1">
                <Text fontSize="sm" color={textColor}>
                  Address
                </Text>
                <Text fontWeight="bold" color={headingColor}>
                  {client.address}
                </Text>
              </Box>
            </HStack>
          </VStack>

          {/* Quick Stats */}
          <VStack flex={1} spacing={4} align="stretch">
            <SimpleGrid columns={2} spacing={4}>
              <Stat>
                <StatLabel color={textColor}>Total Borrowed</StatLabel>
                <StatNumber color={headingColor}>${client.totalBorrowed}</StatNumber>
                <StatHelpText>
                  <StatArrow type="increase" />
                  {client.totalBorrowed > 0
                    ? Math.round((client.totalRepaid / client.totalBorrowed) * 100)
                    : 0}
                  % Repaid
                </StatHelpText>
              </Stat>
              <Stat>
                <StatLabel color={textColor}>Active Loans</StatLabel>
                <StatNumber color={headingColor}>{client.activeLoans}</StatNumber>
                <StatHelpText>of {client.totalLoans} Total Loans</StatHelpText>
              </Stat>
            </SimpleGrid>
            <Box>
              <Text fontSize="sm" color={textColor} mb={2}>
                Next Payment
              </Text>
              <HStack justify="space-between">
                <Text fontWeight="bold" color={headingColor}>
                  ${client.nextPaymentAmount}
                </Text>
                <Text color={textColor}>
                  Due {new Date(client.nextPaymentDate).toLocaleDateString()}
                </Text>
              </HStack>
            </Box>
          </VStack>

          {/* Action Buttons */}
          <VStack spacing={3} justify="center">
            <Button
              leftIcon={<PlusCircle />}
              colorScheme="purple"
              size="lg"
              borderRadius="full"
              px={8}
              py={6}
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}
            >
              New Loan
            </Button>
            <Button
              leftIcon={<Edit />}
              variant="outline"
              size="lg"
              borderRadius="full"
              px={8}
              py={6}
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}
            >
              Edit Client
            </Button>
          </VStack>
        </Flex>
      </Box>
    </Box>
  );
};

export default Profile;
