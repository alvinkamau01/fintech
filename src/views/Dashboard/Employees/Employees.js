import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Container,
  Button,
  Flex,
  Text,
  Avatar,
  Badge,
  useColorModeValue,
  Grid,
  GridItem,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Progress,
  Icon,
  VStack,
  HStack,
  Heading,
  Divider,
  List,
  ListItem,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
} from "@chakra-ui/react";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  Calendar, 
  TrendingUp, 
  Users, 
  Award,
  Briefcase,
  Target,
  Clock,
  ChevronUp,
  UserPlus,
  AlertTriangle,
  CheckCircle,
  Activity
} from "lucide-react";

// Enhanced mock data for employees
const employees = [
  {
    id: 1,
    name: "Alex Johnson",
    position: "Senior Account Manager",
    department: "Sales",
    email: "alex.johnson@company.com",
    phone: "+1 (555) 123-4567",
    startDate: "March 15, 2019",
    avatar: "/abstract-letter-aj.png",
    manager: "Sarah Williams",
    directReports: ["Emily Chen", "James Wilson"],
    clients: [
      { id: 1, name: "Acme Corporation", status: "Active", revenue: "$125,000", satisfaction: 92 },
      { id: 2, name: "Globex Industries", status: "Active", revenue: "$98,500", satisfaction: 88 },
      { id: 3, name: "Initech LLC", status: "At Risk", revenue: "$65,000", satisfaction: 72 },
      { id: 4, name: "Massive Dynamic", status: "Active", revenue: "$210,000", satisfaction: 95 },
      { id: 5, name: "Stark Enterprises", status: "Active", revenue: "$175,000", satisfaction: 90 },
      { id: 6, name: "Wayne Industries", status: "Pending", revenue: "$45,000", satisfaction: 85 },
      { id: 7, name: "Umbrella Corp", status: "Active", revenue: "$88,000", satisfaction: 83 },
      { id: 8, name: "Cyberdyne Systems", status: "At Risk", revenue: "$52,000", satisfaction: 68 },
    ],
    metrics: {
      clientRetention: 92,
      revenueTarget: 87,
      clientSatisfaction: 90,
      responseTime: 95,
      upsellRate: 78,
    },
    recentActivity: [
      { date: "2023-10-01", type: "Client Meeting", description: "Strategic review with Acme Corp" },
      { date: "2023-09-28", type: "Deal Closed", description: "New contract with Massive Dynamic" },
      { date: "2023-09-25", type: "Client Issue", description: "Resolved Initech service complaint" },
      { date: "2023-09-20", type: "Performance Review", description: "Quarterly objectives met" },
    ],
    tasks: [
      { id: 1, title: "Quarterly Business Review", status: "In Progress", dueDate: "2023-10-15" },
      { id: 2, title: "Client Satisfaction Survey", status: "Pending", dueDate: "2023-10-20" },
      { id: 3, title: "Contract Renewal - Stark", status: "Completed", dueDate: "2023-09-30" },
    ],
    performance: {
      current: {
        revenue: 858500,
        clients: 8,
        satisfaction: 90
      },
      previous: {
        revenue: 750000,
        clients: 6,
        satisfaction: 85
      }
    }
  },
];

// Function to get color based on value
const getColorScheme = (value) => {
  if (value >= 90) return "green";
  if (value >= 75) return "blue";
  if (value >= 60) return "yellow";
  return "red";
};

// Function to calculate percentage change
const calculateChange = (current, previous) => {
  return ((current - previous) / previous) * 100;
};

export default function EmployeeDetailPage({ params }) {
  const employeeId = Number.parseInt(params?.id) || 1;
  const employee = employees.find((emp) => emp.id === employeeId) || employees[0];

  // Calculate client status counts
  const activeClients = employee.clients.filter((client) => client.status === "Active").length;
  const atRiskClients = employee.clients.filter((client) => client.status === "At Risk").length;
  const pendingClients = employee.clients.filter((client) => client.status === "Pending").length;

  // Calculate average satisfaction
  const avgSatisfaction = Math.round(
    employee.clients.reduce((sum, client) => sum + client.satisfaction, 0) / employee.clients.length
  );

  // Color mode values
  const bgGradient = useColorModeValue(
    "linear(to-b, gray.50, gray.100)",
    "linear(to-b, gray.900, gray.800)"
  );
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.900", "white");
  const subTextColor = useColorModeValue("gray.600", "gray.400");

  return (
    <Box minH="100vh" bgGradient={bgGradient} mt="50px">
      <Container maxW="container.xl" py={12}>
        {/* Back Button */}
        <Box mb={8}>
          <Button
            as={RouterLink}
            to="/admin/employees"
            variant="ghost"
            leftIcon={<Icon as={ArrowLeft} />}
            color={subTextColor}
            _hover={{ color: textColor }}
          >
            Back to Employee List
          </Button>
        </Box>

        <Grid templateColumns={{ base: "1fr", md: "1fr 2fr" }} gap={8}>
          {/* Left Column - Employee Profile */}
          <VStack spacing={8}>
            {/* Profile Card */}
            <Card bg={cardBg} borderColor={borderColor} overflow="hidden">
              <Box
                bgGradient="linear(to-r, purple.500, blue.500)"
                p={6}
                color="white"
              >
                <VStack spacing={4}>
                  <Avatar
                    size="2xl"
                    src={employee.avatar}
                    name={employee.name}
                    borderWidth="4px"
                    borderColor="whiteAlpha.200"
                    shadow="lg"
                  />
                  <VStack spacing={1}>
                    <Heading size="lg">{employee.name}</Heading>
                    <Text color="whiteAlpha.900">{employee.position}</Text>
                    <Badge colorScheme="whiteAlpha" rounded="full" px={3}>
                      {employee.department}
                    </Badge>
                  </VStack>
                </VStack>
              </Box>

              <CardBody>
                <VStack spacing={4}>
                  {/* Contact Information */}
                  <HStack
                    w="full"
                    p={3}
                    bg={useColorModeValue("gray.50", "gray.700")}
                    rounded="lg"
                    spacing={3}
                  >
                    <Box
                      p={2}
                      bg={useColorModeValue("purple.100", "purple.900")}
                      color="purple.500"
                      rounded="full"
                    >
                      <Icon as={Mail} />
                    </Box>
                    <VStack align="start" spacing={0}>
                      <Text fontSize="sm" color={subTextColor}>
                        Email
                      </Text>
                      <Text fontSize="sm" color={textColor}>
                        {employee.email}
                      </Text>
                    </VStack>
                  </HStack>

                  <HStack
                    w="full"
                    p={3}
                    bg={useColorModeValue("gray.50", "gray.700")}
                    rounded="lg"
                    spacing={3}
                  >
                    <Box
                      p={2}
                      bg={useColorModeValue("blue.100", "blue.900")}
                      color="blue.500"
                      rounded="full"
                    >
                      <Icon as={Phone} />
                    </Box>
                    <VStack align="start" spacing={0}>
                      <Text fontSize="sm" color={subTextColor}>
                        Phone
                      </Text>
                      <Text fontSize="sm" color={textColor}>
                        {employee.phone}
                      </Text>
                    </VStack>
                  </HStack>

                  <HStack
                    w="full"
                    p={3}
                    bg={useColorModeValue("gray.50", "gray.700")}
                    rounded="lg"
                    spacing={3}
                  >
                    <Box
                      p={2}
                      bg={useColorModeValue("green.100", "green.900")}
                      color="green.500"
                      rounded="full"
                    >
                      <Icon as={Calendar} />
                    </Box>
                    <VStack align="start" spacing={0}>
                      <Text fontSize="sm" color={subTextColor}>
                        Started
                      </Text>
                      <Text fontSize="sm" color={textColor}>
                        {employee.startDate}
                      </Text>
                    </VStack>
                  </HStack>
                </VStack>

                {/* Management Structure */}
                <Box mt={6}>
                  <Heading size="sm" mb={4}>
                    Management Structure
                  </Heading>
                  <VStack spacing={4} align="stretch">
                    <Box p={3} bg={useColorModeValue("gray.50", "gray.700")} rounded="lg">
                      <Text fontSize="sm" color={subTextColor} mb={1}>
                        Reports to
                      </Text>
                      <Text fontSize="sm" color={textColor} fontWeight="medium">
                        {employee.manager}
                      </Text>
                    </Box>
                    <Box p={3} bg={useColorModeValue("gray.50", "gray.700")} rounded="lg">
                      <Text fontSize="sm" color={subTextColor} mb={2}>
                        Direct Reports ({employee.directReports.length})
                      </Text>
                      <List spacing={2}>
                        {employee.directReports.map((report, index) => (
                          <ListItem key={index} fontSize="sm" color={textColor}>
                            {report}
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  </VStack>
                </Box>
              </CardBody>
            </Card>

            {/* Tasks Card */}
            <Card w="full">
              <CardHeader
                bg={useColorModeValue("gray.50", "gray.700")}
                borderBottomWidth="1px"
                borderColor={borderColor}
              >
                <HStack>
                  <Icon as={Clock} color="purple.500" />
                  <Heading size="md">Current Tasks</Heading>
                </HStack>
              </CardHeader>
              <CardBody>
                <VStack spacing={4} align="stretch">
                  {employee.tasks.map((task) => (
                    <Box
                      key={task.id}
                      p={3}
                      bg={useColorModeValue("gray.50", "gray.700")}
                      rounded="lg"
                    >
                      <Flex justify="space-between" align="center" mb={2}>
                        <Text fontSize="sm" fontWeight="medium" color={textColor}>
                          {task.title}
                        </Text>
                        <Badge
                          colorScheme={
                            task.status === "Completed"
                              ? "green"
                              : task.status === "In Progress"
                              ? "blue"
                              : "yellow"
                          }
                        >
                          {task.status}
                        </Badge>
                      </Flex>
                      <Text fontSize="xs" color={subTextColor}>
                        Due: {task.dueDate}
                      </Text>
                    </Box>
                  ))}
                </VStack>
              </CardBody>
            </Card>
          </VStack>

          {/* Right Column - Main Content */}
          <VStack spacing={8}>
            {/* Performance Overview */}
            <Card w="full">
              <CardHeader
                bg={useColorModeValue("gray.50", "gray.700")}
                borderBottomWidth="1px"
                borderColor={borderColor}
              >
                <HStack>
                  <Icon as={Activity} color="purple.500" />
                  <Heading size="md">Performance Overview</Heading>
                </HStack>
              </CardHeader>
              <CardBody>
                <SimpleGrid columns={{ base: 1, sm: 3 }} spacing={6}>
                  <Stat>
                    <StatLabel color={subTextColor}>Revenue</StatLabel>
                    <StatNumber>${(employee.performance.current.revenue / 1000).toFixed(1)}k</StatNumber>
                    <StatHelpText>
                      <StatArrow
                        type={
                          calculateChange(
                            employee.performance.current.revenue,
                            employee.performance.previous.revenue
                          ) >= 0
                            ? "increase"
                            : "decrease"
                        }
                      />
                      {Math.abs(
                        calculateChange(
                          employee.performance.current.revenue,
                          employee.performance.previous.revenue
                        )
                      ).toFixed(1)}
                      %
                    </StatHelpText>
                  </Stat>

                  <Stat>
                    <StatLabel color={subTextColor}>Total Clients</StatLabel>
                    <StatNumber>{employee.performance.current.clients}</StatNumber>
                    <StatHelpText>
                      <StatArrow
                        type={
                          calculateChange(
                            employee.performance.current.clients,
                            employee.performance.previous.clients
                          ) >= 0
                            ? "increase"
                            : "decrease"
                        }
                      />
                      {Math.abs(
                        calculateChange(
                          employee.performance.current.clients,
                          employee.performance.previous.clients
                        )
                      ).toFixed(1)}
                      %
                    </StatHelpText>
                  </Stat>

                  <Stat>
                    <StatLabel color={subTextColor}>Satisfaction</StatLabel>
                    <StatNumber>{employee.performance.current.satisfaction}%</StatNumber>
                    <StatHelpText>
                      <StatArrow
                        type={
                          calculateChange(
                            employee.performance.current.satisfaction,
                            employee.performance.previous.satisfaction
                          ) >= 0
                            ? "increase"
                            : "decrease"
                        }
                      />
                      {Math.abs(
                        calculateChange(
                          employee.performance.current.satisfaction,
                          employee.performance.previous.satisfaction
                        )
                      ).toFixed(1)}
                      %
                    </StatHelpText>
                  </Stat>
                </SimpleGrid>

                <Divider my={6} />

                {/* Performance Metrics */}
                <Grid templateColumns={{ base: "1fr", sm: "1fr 1fr" }} gap={8}>
                  {Object.entries(employee.metrics).map(([key, value]) => (
                    <Box key={key}>
                      <Flex justify="space-between" mb={2}>
                        <Text color={subTextColor}>
                          {key.split(/(?=[A-Z])/).join(" ")}
                        </Text>
                        <Text fontWeight="bold" color={textColor}>
                          {value}%
                        </Text>
                      </Flex>
                      <Progress
                        value={value}
                        colorScheme={getColorScheme(value)}
                        rounded="full"
                        size="sm"
                      />
                    </Box>
                  ))}
                </Grid>
              </CardBody>
            </Card>

            {/* Client Summary Cards */}
            <SimpleGrid columns={{ base: 1, sm: 3 }} spacing={4} w="full">
              <Card overflow="hidden">
                <Box h={1} bgGradient="linear(to-r, green.500, teal.500)" />
                <CardBody>
                  <Flex justify="space-between" align="center">
                    <VStack align="start" spacing={1}>
                      <Text color={subTextColor}>Active Clients</Text>
                      <Heading size="lg">{activeClients}</Heading>
                    </VStack>
                    <Box
                      p={3}
                      bg={useColorModeValue("green.100", "green.900")}
                      color="green.500"
                      rounded="full"
                    >
                      <Icon as={CheckCircle} boxSize={6} />
                    </Box>
                  </Flex>
                </CardBody>
              </Card>

              <Card overflow="hidden">
                <Box h={1} bgGradient="linear(to-r, red.500, pink.500)" />
                <CardBody>
                  <Flex justify="space-between" align="center">
                    <VStack align="start" spacing={1}>
                      <Text color={subTextColor}>At Risk</Text>
                      <Heading size="lg">{atRiskClients}</Heading>
                    </VStack>
                    <Box
                      p={3}
                      bg={useColorModeValue("red.100", "red.900")}
                      color="red.500"
                      rounded="full"
                    >
                      <Icon as={AlertTriangle} boxSize={6} />
                    </Box>
                  </Flex>
                </CardBody>
              </Card>

              <Card overflow="hidden">
                <Box h={1} bgGradient="linear(to-r, purple.500, blue.500)" />
                <CardBody>
                  <Flex justify="space-between" align="center">
                    <VStack align="start" spacing={1}>
                      <Text color={subTextColor}>Avg. Satisfaction</Text>
                      <Heading size="lg">{avgSatisfaction}%</Heading>
                    </VStack>
                    <Box
                      p={3}
                      bg={useColorModeValue("purple.100", "purple.900")}
                      color="purple.500"
                      rounded="full"
                    >
                      <Icon as={Award} boxSize={6} />
                    </Box>
                  </Flex>
                </CardBody>
              </Card>
            </SimpleGrid>

            {/* Recent Activity */}
            <Card w="full">
              <CardHeader
                bg={useColorModeValue("gray.50", "gray.700")}
                borderBottomWidth="1px"
                borderColor={borderColor}
              >
                <HStack>
                  <Icon as={Activity} color="purple.500" />
                  <Heading size="md">Recent Activity</Heading>
                </HStack>
              </CardHeader>
              <CardBody>
                <VStack spacing={4} align="stretch">
                  {employee.recentActivity.map((activity, index) => (
                    <Box
                      key={index}
                      p={4}
                      bg={useColorModeValue("gray.50", "gray.700")}
                      rounded="lg"
                    >
                      <Flex gap={4}>
                        <Box
                          p={2}
                          bg={useColorModeValue("purple.100", "purple.900")}
                          color="purple.500"
                          rounded="full"
                          height="fit-content"
                        >
                          <Icon as={Activity} />
                        </Box>
                        <Box>
                          <Text fontSize="sm" fontWeight="medium" color={textColor}>
                            {activity.type}
                          </Text>
                          <Text fontSize="sm" color={subTextColor}>
                            {activity.description}
                          </Text>
                          <Text fontSize="xs" color={subTextColor} mt={1}>
                            {activity.date}
                          </Text>
                        </Box>
                      </Flex>
                    </Box>
                  ))}
                </VStack>
              </CardBody>
            </Card>

            {/* Client List */}
            <Card w="full">
              <CardHeader
                bg={useColorModeValue("gray.50", "gray.700")}
                borderBottomWidth="1px"
                borderColor={borderColor}
              >
                <HStack>
                  <Icon as={Users} color="purple.500" />
                  <Heading size="md">Client List</Heading>
                </HStack>
              </CardHeader>
              <CardBody>
                <Tabs>
                  <TabList>
                    <Tab>All</Tab>
                    <Tab>Active</Tab>
                    <Tab>At Risk</Tab>
                    <Tab>Pending</Tab>
                  </TabList>

                  <TabPanels>
                    <TabPanel>
                      <ClientTable clients={employee.clients} />
                    </TabPanel>
                    <TabPanel>
                      <ClientTable
                        clients={employee.clients.filter(
                          (client) => client.status === "Active"
                        )}
                      />
                    </TabPanel>
                    <TabPanel>
                      <ClientTable
                        clients={employee.clients.filter(
                          (client) => client.status === "At Risk"
                        )}
                      />
                    </TabPanel>
                    <TabPanel>
                      <ClientTable
                        clients={employee.clients.filter(
                          (client) => client.status === "Pending"
                        )}
                      />
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </CardBody>
            </Card>
          </VStack>
        </Grid>
      </Container>
    </Box>
  );
}

function ClientTable({ clients }) {
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const headerBg = useColorModeValue("gray.50", "gray.700");

  return (
    <Box borderWidth="1px" borderColor={borderColor} rounded="lg" overflow="hidden">
      <Table variant="simple">
        <Thead bg={headerBg}>
          <Tr>
            <Th>Client Name</Th>
            <Th>Status</Th>
            <Th>Revenue</Th>
            <Th>Satisfaction</Th>
          </Tr>
        </Thead>
        <Tbody>
          {clients.map((client) => (
            <Tr key={client.id}>
              <Td fontWeight="medium">{client.name}</Td>
              <Td>
                <Badge
                  colorScheme={
                    client.status === "Active"
                      ? "green"
                      : client.status === "At Risk"
                      ? "red"
                      : "yellow"
                  }
                >
                  {client.status}
                </Badge>
              </Td>
              <Td>{client.revenue}</Td>
              <Td>
                <Flex align="center" gap={2}>
                  <Progress
                    value={client.satisfaction}
                    colorScheme={getColorScheme(client.satisfaction)}
                    size="sm"
                    w="100px"
                    rounded="full"
                  />
                  <Text fontWeight="medium">{client.satisfaction}%</Text>
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}
