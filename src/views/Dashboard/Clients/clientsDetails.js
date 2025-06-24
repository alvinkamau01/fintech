"use client"

import { useState } from "react"
import { 
  Box,
  Stack,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Avatar,
  AvatarBadge,
  Button,
  Badge,
  Progress,
  Input,
  FormLabel,
  Textarea,
  Flex,
  Text,
  Grid,
  GridItem,
  Container,
  VStack,
  HStack,
  Divider,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  SimpleGrid,
  useColorModeValue,
  Icon,
  CircularProgress,
  CircularProgressLabel,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
} from '@chakra-ui/react'
import {
  Phone,
  Mail,
  MapPin,
  Calendar,
  Edit,
  CreditCard,
  FileText,
  Clock,
  CheckCircle,
  PlusCircle,
  Download,
  MessageCircle,
  Briefcase,
  Home,
  GraduationCap,
  Heart,
  ArrowUpRight,
  ArrowDownLeft,
  AlertTriangle,
  Shield,
  DollarSign,
  Users
} from "lucide-react"
import { clientData } from './clientsData'

export function ClientDetails({ clientId }) {
  const [activeTab, setActiveTab] = useState("overview")
  const [isEditing, setIsEditing] = useState(false)

  const textColor = useColorModeValue("gray.600", "gray.300")
  const headingColor = useColorModeValue("gray.700", "white")
  const borderColor = useColorModeValue("gray.200", "gray.700")
  const cardBg = useColorModeValue("white", "gray.800")

  const getCreditScoreColor = (score) => {
    if (score >= 750) return "green.400"
    if (score >= 650) return "blue.400"
    if (score >= 550) return "yellow.400"
    return "red.400"
  }

  const getCreditScoreText = (score) => {
    if (score >= 750) return "Excellent"
    if (score >= 650) return "Good"
    if (score >= 550) return "Fair"
    return "Poor"
  }

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: "green", icon: CheckCircle },
      overdue: { color: "yellow", icon: Clock },
      defaulted: { color: "red", icon: ArrowDownLeft },
      completed: { color: "blue", icon: CheckCircle },
      pending: { color: "gray", icon: Clock }
    }
    const config = statusConfig[status] || statusConfig.pending
    return (
      <Badge colorScheme={config.color} display="flex" alignItems="center" px={3} py={1} borderRadius="full">
        <Icon as={config.icon} mr={2} boxSize={3} />
        <Text>{status.charAt(0).toUpperCase() + status.slice(1)}</Text>
      </Badge>
    )
  }

  const getRiskBadge = (risk) => {
    const riskConfig = {
      low: { color: "green", icon: Shield },
      medium: { color: "yellow", icon: AlertTriangle },
      high: { color: "red", icon: AlertTriangle }
    }
    const config = riskConfig[risk] || riskConfig.medium
    return (
      <Badge colorScheme={config.color} display="flex" alignItems="center" px={3} py={1} borderRadius="full">
        <Icon as={config.icon} mr={2} boxSize={3} />
        <Text>{risk.charAt(0).toUpperCase() + risk.slice(1)} Risk</Text>
      </Badge>
    )
  }

  const getLoanTypeBadge = (type) => {
    const typeConfig = {
      Business: { color: "blue", icon: Briefcase },
      Agricultural: { color: "green", icon: Home },
      Education: { color: "purple", icon: GraduationCap },
      Housing: { color: "yellow", icon: Home },
      Emergency: { color: "red", icon: Heart }
    }
    const config = typeConfig[type] || { color: "gray", icon: CreditCard }
    return (
      <Badge variant="subtle" colorScheme={config.color} display="flex" alignItems="center" px={3} py={1} borderRadius="full">
        <Icon as={config.icon} mr={2} boxSize={3} />
        <Text>{type}</Text>
      </Badge>
    )
  }

  const client = {
    id: clientId || "CL-1001",
    name: "Maria Garcia",
    avatar: "/clients/maria.jpg",
    email: "maria.garcia@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, Anytown, CA 94123",
    joinDate: "2021-05-15",
    occupation: "Small Business Owner",
    income: "$3,500/month",
    status: "active",
    riskLevel: "low",
    creditScore: 720,
    businessName: "Maria's Handcrafts",
    businessType: "Retail - Handmade Crafts",
    businessAddress: "456 Market St, Anytown, CA 94123",
    businessStartDate: "2019-03-10",
    dependents: 2,
    education: "Bachelor's Degree",
    maritalStatus: "Married",
    spouseName: "Carlos Garcia",
    spouseOccupation: "Teacher",
    emergencyContact: "Ana Rodriguez (Sister) - +1 (555) 987-6543",
    totalLoans: 2,
    activeLoans: 1,
    totalBorrowed: 4300,
    totalRepaid: 3050,
    nextPaymentDate: "2023-06-15",
    nextPaymentAmount: 250
  }

  return (
    <Box p={6} mt={"50px"}>
      {/* Client Header Card */}
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
                src={client.avatar}
                name={client.name}
                borderWidth={2}
                borderColor={borderColor}
              >
                <AvatarBadge boxSize="1.25em" bg="green.500" />
              </Avatar>
              <VStack align={{ base: "center", md: "start" }} spacing={2}>
                <Heading size="lg" color={headingColor}>{client.name}</Heading>
                <Text color={textColor} fontSize="lg">{client.id}</Text>
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
                  <Text fontSize="sm" color={textColor}>Phone</Text>
                  <Text fontWeight="bold" color={headingColor}>{client.phone}</Text>
                </Box>
              </HStack>

              <HStack spacing={4} align="center">
                <Box p={2} borderRadius="full" borderWidth="1px" borderColor={borderColor}>
                  <Mail size={20} />
                </Box>
                <Box flex="1">
                  <Text fontSize="sm" color={textColor}>Email</Text>
                  <Text fontWeight="bold" color={headingColor}>{client.email}</Text>
                </Box>
              </HStack>

              <HStack spacing={4} align="center">
                <Box p={2} borderRadius="full" borderWidth="1px" borderColor={borderColor}>
                  <MapPin size={20} />
                </Box>
                <Box flex="1">
                  <Text fontSize="sm" color={textColor}>Address</Text>
                  <Text fontWeight="bold" color={headingColor}>{client.address}</Text>
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
                    {Math.round((client.totalRepaid/client.totalBorrowed) * 100)}% Repaid
                  </StatHelpText>
                </Stat>
                <Stat>
                  <StatLabel color={textColor}>Active Loans</StatLabel>
                  <StatNumber color={headingColor}>{client.activeLoans}</StatNumber>
                  <StatHelpText>
                    of {client.totalLoans} Total Loans
                  </StatHelpText>
                </Stat>
              </SimpleGrid>
              <Box>
                <Text fontSize="sm" color={textColor} mb={2}>Next Payment</Text>
                <HStack justify="space-between">
                  <Text fontWeight="bold" color={headingColor}>${client.nextPaymentAmount}</Text>
                  <Text color={textColor}>Due {new Date(client.nextPaymentDate).toLocaleDateString()}</Text>
                </HStack>
                <Progress value={75} colorScheme="purple" size="sm" mt={2} borderRadius="full" />
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
                  boxShadow: "lg"
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
                  boxShadow: "lg"
                }}
              >
                Edit Client
              </Button>
            </VStack>
          </Flex>
        </Box>
      </Box>

      {/* Tabs Section */}
      <Tabs variant="soft-rounded" colorScheme="purple" value={activeTab} onChange={setActiveTab} isLazy>
        <TabList mb={6}>
          <Tab borderRadius="full" mx={1}>Overview</Tab>
          <Tab borderRadius="full" mx={1}>Loans</Tab>
          <Tab borderRadius="full" mx={1}>Payments</Tab>
          <Tab borderRadius="full" mx={1}>Documents</Tab>
          <Tab borderRadius="full" mx={1}>Notes</Tab>
        </TabList>

        <TabPanels>
          {/* Overview Tab */}
          <TabPanel>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
              {/* Credit Score Card */}
              <Box
                borderWidth="1px"
                borderColor={borderColor}
                borderRadius="xl"
                p={6}
                bg={cardBg}
                boxShadow="sm"
                transition="all 0.3s"
                _hover={{ transform: "translateY(-2px)", boxShadow: "md" }}
              >
                <VStack spacing={4} align="stretch">
                  <Heading size="md" color={headingColor}>Credit Score</Heading>
                  <Box position="relative" h="160px">
                    <CircularProgress
                      value={(client.creditScore / 850) * 100}
                      size="160px"
                      thickness="8px"
                      color={getCreditScoreColor(client.creditScore)}
                    >
                      <CircularProgressLabel>
                        <VStack spacing={0}>
                          <Text fontSize="2xl" fontWeight="bold">
                            {client.creditScore}
                          </Text>
                          <Text fontSize="sm" color={textColor}>
                            {getCreditScoreText(client.creditScore)}
                          </Text>
                        </VStack>
                      </CircularProgressLabel>
                    </CircularProgress>
                  </Box>
                  <Box pt={2}>
                    <Text fontSize="sm" color={textColor} textAlign="center">
                      Last updated: {new Date().toLocaleDateString()}
                    </Text>
                  </Box>
                </VStack>
              </Box>

              {/* Personal Information Card */}
              <Box
                borderWidth="1px"
                borderColor={borderColor}
                borderRadius="xl"
                p={6}
                bg={cardBg}
                boxShadow="sm"
                transition="all 0.3s"
                _hover={{ transform: "translateY(-2px)", boxShadow: "md" }}
              >
                <Heading size="md" mb={6} color={headingColor}>Personal Information</Heading>
                <VStack align="stretch" spacing={4}>
                  <Flex justify="space-between" p={3}>
                    <Text color={textColor}>Full Name</Text>
                    <Text fontWeight="bold" color={headingColor}>{client.name}</Text>
                  </Flex>
                  <Divider />
                  <Flex justify="space-between" p={3}>
                    <Text color={textColor}>Marital Status</Text>
                    <Text fontWeight="bold" color={headingColor}>{client.maritalStatus}</Text>
                  </Flex>
                  <Divider />
                  <Flex justify="space-between" p={3}>
                    <Text color={textColor}>Spouse</Text>
                    <VStack align="end" spacing={0}>
                      <Text fontWeight="bold" color={headingColor}>{client.spouseName}</Text>
                      <Text fontSize="sm" color={textColor}>{client.spouseOccupation}</Text>
                    </VStack>
                  </Flex>
                  <Divider />
                  <Flex justify="space-between" p={3}>
                    <Text color={textColor}>Dependents</Text>
                    <Text fontWeight="bold" color={headingColor}>{client.dependents}</Text>
                  </Flex>
                  <Divider />
                  <Flex justify="space-between" p={3}>
                    <Text color={textColor}>Education</Text>
                    <Text fontWeight="bold" color={headingColor}>{client.education}</Text>
                  </Flex>
                  <Divider />
                  <Flex justify="space-between" p={3}>
                    <Text color={textColor}>Emergency Contact</Text>
                    <Text fontWeight="bold" color={headingColor}>{client.emergencyContact}</Text>
                  </Flex>
                </VStack>
              </Box>

              {/* Business Information Card */}
              <Box
                borderWidth="1px"
                borderColor={borderColor}
                borderRadius="xl"
                p={6}
                bg={cardBg}
                boxShadow="sm"
                transition="all 0.3s"
                _hover={{ transform: "translateY(-2px)", boxShadow: "md" }}
              >
                <Heading size="md" mb={6} color={headingColor}>Business Information</Heading>
                <VStack align="stretch" spacing={4}>
                  <Flex justify="space-between" p={3}>
                    <Text color={textColor}>Business Name</Text>
                    <Text fontWeight="bold" color={headingColor}>{client.businessName}</Text>
                  </Flex>
                  <Divider />
                  <Flex justify="space-between" p={3}>
                    <Text color={textColor}>Business Type</Text>
                    <Text fontWeight="bold" color={headingColor}>{client.businessType}</Text>
                  </Flex>
                  <Divider />
                  <Flex justify="space-between" p={3}>
                    <Text color={textColor}>Business Address</Text>
                    <Text fontWeight="bold" color={headingColor}>{client.businessAddress}</Text>
                  </Flex>
                  <Divider />
                  <Flex justify="space-between" p={3}>
                    <Text color={textColor}>Monthly Income</Text>
                    <Text fontWeight="bold" color={headingColor}>{client.income}</Text>
                  </Flex>
                  <Divider />
                  <Flex justify="space-between" p={3}>
                    <Text color={textColor}>Start Date</Text>
                    <Text fontWeight="bold" color={headingColor}>
                      {new Date(client.businessStartDate).toLocaleDateString()}
                    </Text>
                  </Flex>
                </VStack>
              </Box>
            </SimpleGrid>
          </TabPanel>

          {/* Loans Tab */}
          <TabPanel>
            <Box borderWidth="1px" borderColor={borderColor} borderRadius="xl" overflow="auto" bg={cardBg} boxShadow="sm" transition="all 0.3s" _hover={{ transform: "translateY(-2px)", boxShadow: "md" }}>
              <TableContainer>
                <Table variant="simple" size="sm">
                  <Thead>
                    <Tr>
                      <Th>Loan ID</Th>
                      <Th>Type</Th>
                      <Th>Amount</Th>
                      <Th>Amount Paid</Th>
                      <Th>Term</Th>
                      <Th>Next Payment</Th>
                      <Th>Next Payment Amount</Th>
                      <Th>Status</Th>
                      <Th>Interest Rate</Th>
                      <Th>Payment Frequency</Th>
                      <Th>Purpose</Th>
                      <Th>Actions</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {clientData.loans.map((loan) => (
                      <Tr key={loan.id} transition="all 0.2s">
                        <Td fontWeight="medium">{loan.id}</Td>
                        <Td>{getLoanTypeBadge(loan.type)}</Td>
                        <Td fontWeight="bold" color={headingColor}>${loan.amount}</Td>
                        <Td fontWeight="bold" color={headingColor}>${loan.amountPaid}</Td>
                        <Td>{loan.term}</Td>
                        <Td>{loan.nextPayment ? new Date(loan.nextPayment).toLocaleDateString() : "N/A"}</Td>
                        <Td>${loan.nextPaymentAmount || "N/A"}</Td>
                        <Td>{getStatusBadge(loan.status)}</Td>
                        <Td>{loan.interestRate}</Td>
                        <Td>{loan.paymentFrequency}</Td>
                        <Td>{loan.purpose}</Td>
                        <Td>
                          <Button size="sm" leftIcon={<FileText size={14} />} colorScheme="purple" variant="ghost" _hover={{ transform: "translateY(-2px)", shadow: "md" }}>
                            View
                          </Button>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
          </TabPanel>

          {/* Payments Tab */}
          <TabPanel>
            <Box borderWidth="1px" borderColor={borderColor} borderRadius="xl" overflow="auto" bg={cardBg} boxShadow="sm" transition="all 0.3s" _hover={{ transform: "translateY(-2px)", boxShadow: "md" }}>
              <TableContainer>
                <Table variant="simple" size="sm">
                  <Thead>
                    <Tr>
                      <Th>Payment ID</Th>
                      <Th>Date</Th>
                      <Th>Amount</Th>
                      <Th>Method</Th>
                      <Th>Status</Th>
                      <Th>Loan ID</Th>
                      <Th>Type</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {clientData.paymentHistory.map((payment) => (
                      <Tr key={payment.id} transition="all 0.2s">
                        <Td fontWeight="medium">{payment.id}</Td>
                        <Td>{new Date(payment.date).toLocaleDateString()}</Td>
                        <Td fontWeight="bold" color={headingColor}>${payment.amount}</Td>
                        <Td>{payment.method}</Td>
                        <Td>{getStatusBadge(payment.status)}</Td>
                        <Td>{payment.loanId}</Td>
                        <Td>{payment.type}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
          </TabPanel>

          {/* Documents Tab */}
          <TabPanel>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              {clientData.documents.map((doc) => (
                <Box key={doc.id} borderWidth="1px" borderColor={borderColor} borderRadius="xl" p={6} bg={cardBg} boxShadow="sm" transition="all 0.3s" _hover={{ transform: "translateY(-2px)", boxShadow: "md" }}>
                  <HStack justify="space-between" mb={4}>
                    <HStack spacing={3}>
                      <Box p={2} borderWidth="1px" borderColor={borderColor} borderRadius="lg">
                        <FileText size={24} />
                      </Box>
                      <VStack align="start" spacing={0}>
                        <Text fontWeight="bold" color={headingColor}>{doc.name}</Text>
                        <Text fontSize="sm" color={textColor}>{doc.type}</Text>
                      </VStack>
                    </HStack>
                    <Badge colorScheme={doc.status === 'verified' ? 'green' : 'yellow'} borderRadius="full" px={3} py={1}>
                      {doc.status}
                    </Badge>
                  </HStack>
                  <HStack justify="space-between" mb={4}>
                    <Text color={textColor} fontSize="sm">{doc.size}</Text>
                    <Text color={textColor} fontSize="sm">Uploaded on {new Date(doc.uploadDate).toLocaleDateString()}</Text>
                  </HStack>
                  <Button leftIcon={<Download size={16} />} colorScheme="purple" variant="outline" size="sm" width="full" _hover={{ transform: "translateY(-2px)", shadow: "md" }}>
                    Download
                  </Button>
                </Box>
              ))}
            </SimpleGrid>
          </TabPanel>

          {/* Notes Tab */}
          <TabPanel>
            <VStack spacing={4} align="stretch">
              {clientData.notes.map((note) => (
                <Box key={note.id} borderWidth="1px" borderColor={borderColor} borderRadius="xl" p={6} bg={cardBg} boxShadow="sm" transition="all 0.3s" _hover={{ transform: "translateY(-2px)", boxShadow: "md" }}>
                  <HStack justify="space-between" mb={4}>
                    <HStack spacing={3}>
                      <Box p={2} borderWidth="1px" borderColor={borderColor} borderRadius="lg">
                        <MessageCircle size={24} />
                      </Box>
                      <VStack align="start" spacing={0}>
                        <Text fontWeight="bold" color={headingColor}>{note.author}</Text>
                        <Text fontSize="sm" color={textColor}>{new Date(note.date).toLocaleDateString()}</Text>
                      </VStack>
                    </HStack>
                    <Badge colorScheme="purple" borderRadius="full" px={3} py={1}>
                      {note.type}
                    </Badge>
                  </HStack>
                  <Text color={textColor} fontSize="md" lineHeight="tall">{note.content}</Text>
                </Box>
              ))}
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}
