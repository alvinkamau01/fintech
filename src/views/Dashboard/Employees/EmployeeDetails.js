"use client";

import { useState } from "react";
import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Avatar,
  Button,
  Badge,
  Progress,
  Flex,
  Text,
  Grid,
  Stack,
  Divider,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  Phone,
  Mail,
  MapPin,
  Edit,
  FileText,
  PlusCircle,
  Download,
  Award,
  ArrowUpRight,
  Eye,
  GraduationCap,
} from "lucide-react";

export function EmployeeDetails({ employeeId }) {
  const [activeTab, setActiveTab] = useState("overview");

  const employee = {
    id: employeeId || "EMP-001",
    name: "Alex Johnson",
    avatar: "/employees/alex.jpg",
    email: "alex.johnson@company.com",
    phone: "+1 (555) 123-4567",
    address: "456 Oak Street, Anytown, CA 94123",
    joinDate: "2021-03-15",
    position: "Senior Account Manager",
    department: "Sales",
    status: "active",
    performance: 85,
    salary: "$75,000/year",
    supervisor: "Sarah Williams",
    education: "MBA - Business Administration",
    certifications: ["Sales Leadership", "Account Management"],
    skills: ["Client Relations", "Sales Strategy", "Team Leadership"],
    emergencyContact: "Emily Johnson (Spouse) - +1 (555) 987-6543",
    assignedClients: 8,
    lastReview: "2023-01-15",
    nextReview: "2023-07-15",
  };

  const performanceMetrics = [
    {
      period: "Q1 2023",
      salesTarget: 250000,
      salesAchieved: 275000,
      clientRetention: 95,
      newClients: 3,
      feedback: 4.8,
      kpis: [
        { name: "Sales Performance", value: 110, target: 100 },
        { name: "Client Satisfaction", value: 96, target: 90 },
        { name: "Response Time", value: 85, target: 95 },
        { name: "Documentation", value: 92, target: 90 },
      ],
    },
    {
      period: "Q4 2022",
      salesTarget: 200000,
      salesAchieved: 215000,
      clientRetention: 92,
      newClients: 2,
      feedback: 4.6,
      kpis: [
        { name: "Sales Performance", value: 108, target: 100 },
        { name: "Client Satisfaction", value: 92, target: 90 },
        { name: "Response Time", value: 88, target: 95 },
        { name: "Documentation", value: 90, target: 90 },
      ],
    },
  ];

  const clientAssignments = [
    {
      clientId: "CL-001",
      clientName: "Tech Solutions Inc.",
      status: "active",
      relationship: "12 months",
      lastInteraction: "2023-05-01",
      portfolio: "$150,000",
      products: ["Business Loan", "Investment Account"],
    },
    {
      clientId: "CL-002",
      clientName: "Global Traders Ltd.",
      status: "active",
      relationship: "8 months",
      lastInteraction: "2023-04-28",
      portfolio: "$280,000",
      products: ["Trade Finance", "Business Account"],
    },
  ];

  const documents = [
    {
      id: "DOC-001",
      name: "Employment Contract",
      type: "PDF",
      uploadDate: "2021-03-15",
      size: "2.5 MB",
      category: "HR Documents",
    },
    {
      id: "DOC-002",
      name: "Performance Review Q1 2023",
      type: "PDF",
      uploadDate: "2023-04-01",
      size: "1.8 MB",
      category: "Reviews",
    },
    {
      id: "DOC-003",
      name: "Sales Certification",
      type: "PDF",
      uploadDate: "2022-06-15",
      size: "3.2 MB",
      category: "Certifications",
    },
  ];

  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.900", "white");
  const secondaryTextColor = useColorModeValue("gray.600", "gray.400");

  const renderOverviewTab = () => (
    <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
      <Box p={4} borderWidth="1px" borderRadius="md" bg={bgColor}>
        <Text fontSize="lg" fontWeight="semibold" mb={4}>
          Employee Information
        </Text>
        <Stack spacing={4}>
          <Flex justify="space-between">
            <Text color={secondaryTextColor}>Department</Text>
            <Text>{employee.department}</Text>
          </Flex>
          <Flex justify="space-between">
            <Text color={secondaryTextColor}>Join Date</Text>
            <Text>{employee.joinDate}</Text>
          </Flex>
          <Flex justify="space-between">
            <Text color={secondaryTextColor}>Status</Text>
            <Badge colorScheme={employee.status === "active" ? "green" : "gray"}>
              {employee.status.charAt(0).toUpperCase() + employee.status.slice(1)}
            </Badge>
          </Flex>
          <Flex justify="space-between">
            <Text color={secondaryTextColor}>Supervisor</Text>
            <Text>{employee.supervisor}</Text>
          </Flex>
        </Stack>
      </Box>

      <Box p={4} borderWidth="1px" borderRadius="md" bg={bgColor}>
        <Text fontSize="lg" fontWeight="semibold" mb={4}>
          Performance Overview
        </Text>
        <Stack spacing={4}>
          <Box>
            <Flex justify="space-between" mb={2}>
              <Text color={secondaryTextColor}>Current Performance</Text>
              <Text fontWeight="medium">{employee.performance}%</Text>
            </Flex>
            <Progress value={employee.performance} colorScheme="blue" borderRadius="full" />
          </Box>
          <Flex justify="space-between">
            <Text color={secondaryTextColor}>Assigned Clients</Text>
            <Text>{employee.assignedClients}</Text>
          </Flex>
          <Flex justify="space-between">
            <Text color={secondaryTextColor}>Last Review</Text>
            <Text>{employee.lastReview}</Text>
          </Flex>
          <Flex justify="space-between">
            <Text color={secondaryTextColor}>Next Review</Text>
            <Text>{employee.nextReview}</Text>
          </Flex>
        </Stack>
      </Box>

      <Box p={4} borderWidth="1px" borderRadius="md" bg={bgColor}>
        <Text fontSize="lg" fontWeight="semibold" mb={4}>
          Skills & Qualifications
        </Text>
        <Stack spacing={4}>
          <Box>
            <Text color={secondaryTextColor} mb={2}>
              Education
            </Text>
            <Flex align="center" gap={2}>
              <GraduationCap size={16} />
              <Text>{employee.education}</Text>
            </Flex>
          </Box>
          <Box>
            <Text color={secondaryTextColor} mb={2}>
              Certifications
            </Text>
            <Stack>
              {employee.certifications.map((cert, index) => (
                <Flex key={index} align="center" gap={2}>
                  <Award size={16} />
                  <Text>{cert}</Text>
                </Flex>
              ))}
            </Stack>
          </Box>
          <Box>
            <Text color={secondaryTextColor} mb={2}>
              Skills
            </Text>
            <Flex gap={2} flexWrap="wrap">
              {employee.skills.map((skill, index) => (
                <Badge key={index} colorScheme="blue" variant="subtle">
                  {skill}
                </Badge>
              ))}
            </Flex>
          </Box>
        </Stack>
      </Box>

      <Box p={4} borderWidth="1px" borderRadius="md" bg={bgColor}>
        <Text fontSize="lg" fontWeight="semibold" mb={4}>
          Emergency Contact
        </Text>
        <Text>{employee.emergencyContact}</Text>
      </Box>
    </Grid>
  );

  const renderPerformanceTab = () => (
    <Box p={4} borderWidth="1px" borderRadius="md" bg={bgColor} mb={6}>
      <Text fontSize="lg" fontWeight="semibold" mb={4}>
        Current Quarter Performance
      </Text>
      <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
        {performanceMetrics[0].kpis.map((kpi, index) => (
          <Box key={index}>
            <Flex justify="space-between" mb={2}>
              <Text color={secondaryTextColor}>{kpi.name}</Text>
              <Text fontWeight="medium">
                {kpi.value}% / {kpi.target}%
              </Text>
            </Flex>
            <Progress
              value={kpi.value}
              colorScheme={kpi.value >= kpi.target ? "green" : "orange"}
              borderRadius="full"
            />
          </Box>
        ))}
      </Grid>

      <Divider my={6} />

      <Text fontSize="lg" fontWeight="semibold" mb={4}>
        Key Metrics
      </Text>
      <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={4}>
        <Box p={4} borderWidth="1px" borderRadius="md" bg={bgColor}>
          <Text color={secondaryTextColor} fontSize="sm">
            Sales Achievement
          </Text>
          <Flex align="center" gap={2} mt={1}>
            <Text fontSize="xl" fontWeight="bold">
              110%
            </Text>
            <ArrowUpRight size={20} color="green" />
          </Flex>
        </Box>
        <Box p={4} borderWidth="1px" borderRadius="md" bg={bgColor}>
          <Text color={secondaryTextColor} fontSize="sm">
            Client Retention
          </Text>
          <Flex align="center" gap={2} mt={1}>
            <Text fontSize="xl" fontWeight="bold">
              95%
            </Text>
            <ArrowUpRight size={20} color="green" />
          </Flex>
        </Box>
        <Box p={4} borderWidth="1px" borderRadius="md" bg={bgColor}>
          <Text color={secondaryTextColor} fontSize="sm">
            Client Satisfaction
          </Text>
          <Flex align="center" gap={2} mt={1}>
            <Text fontSize="xl" fontWeight="bold">
              4.8
            </Text>
            <Award size={20} color="gold" />
          </Flex>
        </Box>
      </Grid>

      <Box mt={6}>
        <Text fontSize="lg" fontWeight="semibold" mb={4}>
          Historical Performance
        </Text>
        <Stack spacing={4}>
          {performanceMetrics.map((period, index) => (
            <Box key={index} p={4} borderWidth="1px" borderRadius="md" bg={bgColor}>
              <Text fontWeight="medium" mb={2}>
                {period.period}
              </Text>
              <Stack spacing={3}>
                <Flex justify="space-between">
                  <Text color={secondaryTextColor}>Sales Target</Text>
                  <Text>${period.salesTarget.toLocaleString()}</Text>
                </Flex>
                <Flex justify="space-between">
                  <Text color={secondaryTextColor}>Sales Achieved</Text>
                  <Text>${period.salesAchieved.toLocaleString()}</Text>
                </Flex>
                <Flex justify="space-between">
                  <Text color={secondaryTextColor}>Client Retention</Text>
                  <Text>{period.clientRetention}%</Text>
                </Flex>
                <Flex justify="space-between">
                  <Text color={secondaryTextColor}>New Clients</Text>
                  <Text>{period.newClients}</Text>
                </Flex>
              </Stack>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );

  const renderClientsTab = () => (
    <Box p={4} borderWidth="1px" borderRadius="md" bg={bgColor}>
      <Flex justify="space-between" align="center" mb={4}>
        <Text fontSize="lg" fontWeight="semibold">
          Assigned Clients
        </Text>
        <Button leftIcon={<PlusCircle size={16} />} size="sm" colorScheme="blue">
          Assign New Client
        </Button>
      </Flex>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Client</Th>
            <Th>Status</Th>
            <Th>Portfolio</Th>
            <Th>Last Interaction</Th>
            <Th>Products</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {clientAssignments.map((client) => (
            <Tr key={client.clientId}>
              <Td>
                <Box>
                  <Text fontWeight="medium">{client.clientName}</Text>
                  <Text fontSize="sm" color={secondaryTextColor}>
                    {client.relationship}
                  </Text>
                </Box>
              </Td>
              <Td>
                <Badge colorScheme={client.status === "active" ? "green" : "yellow"}>
                  {client.status}
                </Badge>
              </Td>
              <Td>{client.portfolio}</Td>
              <Td>{client.lastInteraction}</Td>
              <Td>
                <Flex gap={2} flexWrap="wrap">
                  {client.products.map((product, index) => (
                    <Badge key={index} colorScheme="blue" variant="subtle">
                      {product}
                    </Badge>
                  ))}
                </Flex>
              </Td>
              <Td>
                <IconButton
                  icon={<Eye size={16} />}
                  variant="ghost"
                  size="sm"
                  aria-label="View client details"
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );

  const renderDocumentsTab = () => (
    <Box p={4} borderWidth="1px" borderRadius="md" bg={bgColor}>
      <Flex justify="space-between" align="center" mb={4}>
        <Text fontSize="lg" fontWeight="semibold">
          Employee Documents
        </Text>
        <Button leftIcon={<PlusCircle size={16} />} size="sm" colorScheme="blue">
          Upload Document
        </Button>
      </Flex>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Document Name</Th>
            <Th>Category</Th>
            <Th>Upload Date</Th>
            <Th>Size</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {documents.map((doc) => (
            <Tr key={doc.id}>
              <Td>
                <Flex align="center" gap={2}>
                  <FileText size={16} />
                  <Text>{doc.name}</Text>
                </Flex>
              </Td>
              <Td>{doc.category}</Td>
              <Td>{doc.uploadDate}</Td>
              <Td>{doc.size}</Td>
              <Td>
                <IconButton
                  icon={<Download size={16} />}
                  variant="ghost"
                  size="sm"
                  aria-label="Download document"
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );

  return (
    <Box p={4} mt="50px">
      <Box bg={bgColor} shadow="sm" borderRadius="lg" p={6}>
        <Flex direction={{ base: "column", md: "row" }} gap={6} mb={6}>
          <Avatar size="xl" src={employee.avatar} name={employee.name} />
          <Box flex="1">
            <Flex justify="space-between" align="flex-start" mb={4}>
              <Box>
                <Text fontSize="2xl" fontWeight="bold" color={textColor}>
                  {employee.name}
                </Text>
                <Text color={secondaryTextColor}>{employee.position}</Text>
              </Box>
              <Button leftIcon={<Edit size={16} />} size="sm">
                Edit Profile
              </Button>
            </Flex>
            <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={4}>
              <Flex align="center" gap={2}>
                <Mail size={16} color={secondaryTextColor} />
                <Text fontSize="sm">{employee.email}</Text>
              </Flex>
              <Flex align="center" gap={2}>
                <Phone size={16} color={secondaryTextColor} />
                <Text fontSize="sm">{employee.phone}</Text>
              </Flex>
              <Flex align="center" gap={2}>
                <MapPin size={16} color={secondaryTextColor} />
                <Text fontSize="sm">{employee.address}</Text>
              </Flex>
            </Grid>
          </Box>
        </Flex>

        <Tabs variant="enclosed" onChange={(index) => setActiveTab(["overview", "performance", "clients", "documents"][index])}>
          <TabList>
            <Tab>Overview</Tab>
            <Tab>Performance</Tab>
            <Tab>Clients</Tab>
            <Tab>Documents</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>{renderOverviewTab()}</TabPanel>
            <TabPanel>{renderPerformanceTab()}</TabPanel>
            <TabPanel>{renderClientsTab()}</TabPanel>
            <TabPanel>{renderDocumentsTab()}</TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
}

export default EmployeeDetails;
