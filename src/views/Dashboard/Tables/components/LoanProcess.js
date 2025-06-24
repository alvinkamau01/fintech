import React, { useState } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Heading,
  Text,
  Badge,
  Button,
  Flex,
  HStack,
  VStack,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Progress,
  useColorModeValue,
} from "@chakra-ui/react";
import { ArrowUpDown, Calendar, ClipboardList, Filter, MoreHorizontal, Search, Upload, Eye, Clock, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';

// Mock application data
const MOCK_APPLICATIONS = [
  {
    id: "app-1",
    referenceNumber: "LN-2025-0042",
    type: "Mortgage",
    purpose: "Home Purchase",
    amount: 250000.0,
    applicant: "John Smith",
    applicationDate: "2025-04-20",
    status: "under-review",
    processingDays: 5,
    assignedTo: "Sarah Johnson",
    priority: "medium",
  },
  {
    id: "app-2",
    referenceNumber: "LN-2025-0038",
    type: "Personal",
    purpose: "Debt Consolidation",
    amount: 15000.0,
    applicant: "Maria Garcia",
    applicationDate: "2025-04-18",
    status: "pending-documents",
    processingDays: 7,
    missingDocuments: ["Proof of Income", "Bank Statements"],
    priority: "low",
  },
  {
    id: "app-3",
    referenceNumber: "LN-2025-0036",
    type: "Auto",
    purpose: "Vehicle Purchase",
    amount: 35000.0,
    applicant: "Robert Chen",
    applicationDate: "2025-04-15",
    status: "final-review",
    processingDays: 10,
    assignedTo: "Michael Brown",
    priority: "medium",
  },
  {
    id: "app-4",
    referenceNumber: "LN-2025-0031",
    type: "Business",
    purpose: "Equipment Purchase",
    amount: 75000.0,
    applicant: "Priya Patel",
    applicationDate: "2025-04-10",
    status: "submitted",
    processingDays: 1,
    priority: "high",
  },
  {
    id: "app-5",
    referenceNumber: "LN-2025-0029",
    type: "Education",
    purpose: "Tuition Fees",
    amount: 20000.0,
    applicant: "James Wilson",
    applicationDate: "2025-04-08",
    status: "under-review",
    processingDays: 8,
    assignedTo: "Emily Davis",
    priority: "medium",
  },
  {
    id: "app-6",
    referenceNumber: "LN-2025-0027",
    type: "Home Equity",
    purpose: "Home Renovation",
    amount: 50000.0,
    applicant: "Lisa Thompson",
    applicationDate: "2025-04-05",
    status: "pending-documents",
    processingDays: 12,
    missingDocuments: ["Property Appraisal", "Insurance Documentation"],
    priority: "low",
  },
  {
    id: "app-7",
    referenceNumber: "LN-2025-0025",
    type: "Mortgage",
    purpose: "Refinance",
    amount: 320000.0,
    applicant: "David Martinez",
    applicationDate: "2025-04-03",
    status: "approved",
    processingDays: 15,
    priority: "high",
  },
  {
    id: "app-8",
    referenceNumber: "LN-2025-0022",
    type: "Personal",
    purpose: "Wedding Expenses",
    amount: 10000.0,
    applicant: "Sophia Lee",
    applicationDate: "2025-04-01",
    status: "rejected",
    processingDays: 14,
    priority: "medium",
  },
];

function LoansProcessingTable() {
  const [applications, setApplications] = useState(MOCK_APPLICATIONS);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortField, setSortField] = useState("applicationDate");
  const [sortDirection, setSortDirection] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const applicationsPerPage = 5;

  // Handle application removal
  const handleRemoveApplication = (applicationId) => {
    setApplications((prevApplications) =>
      prevApplications.filter((app) => app.id !== applicationId)
    );
  };

  // Handle status change
  const handleStatusChange = (applicationId, newStatus) => {
    setApplications((prevApplications) =>
      prevApplications.map((app) =>
        app.id === applicationId ? { ...app, status: newStatus } : app
      )
    );
  };

  // Color mode values
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const headerBgColor = useColorModeValue("gray.50", "gray.700");
  const textColor = useColorModeValue("gray.900", "white");
  const secondaryTextColor = useColorModeValue("gray.500", "gray.400");
  const hoverBgColor = useColorModeValue("gray.50", "gray.700");

  // Status colors
  const statusColors = {
    submitted: {
      bg: useColorModeValue("blue.50", "blue.900"),
      color: useColorModeValue("blue.700", "blue.200"),
      borderColor: useColorModeValue("blue.200", "blue.700"),
    },
    "under-review": {
      bg: useColorModeValue("orange.50", "orange.900"),
      color: useColorModeValue("orange.700", "orange.200"),
      borderColor: useColorModeValue("orange.200", "orange.700"),
    },
    "pending-documents": {
      bg: useColorModeValue("purple.50", "purple.900"),
      color: useColorModeValue("purple.700", "purple.200"),
      borderColor: useColorModeValue("purple.200", "purple.700"),
    },
    "final-review": {
      bg: useColorModeValue("indigo.50", "indigo.900"),
      color: useColorModeValue("indigo.700", "indigo.200"),
      borderColor: useColorModeValue("indigo.200", "indigo.700"),
    },
    approved: {
      bg: useColorModeValue("green.50", "green.900"),
      color: useColorModeValue("green.700", "green.200"),
      borderColor: useColorModeValue("green.200", "green.700"),
    },
    rejected: {
      bg: useColorModeValue("red.50", "red.900"),
      color: useColorModeValue("red.700", "red.200"),
      borderColor: useColorModeValue("red.200", "red.700"),
    },
  };

  // Priority colors
  const priorityColors = {
    high: {
      bg: useColorModeValue("red.100", "red.900"),
      color: useColorModeValue("red.800", "red.300"),
    },
    medium: {
      bg: useColorModeValue("orange.100", "orange.900"),
      color: useColorModeValue("orange.800", "orange.300"),
    },
    low: {
      bg: useColorModeValue("green.100", "green.900"),
      color: useColorModeValue("green.800", "green.300"),
    },
  };

  // Filter applications based on search term and status
  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.referenceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.applicant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.purpose.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || app.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Sort applications
  const sortedApplications = [...filteredApplications].sort((a, b) => {
    if (sortField === "referenceNumber") {
      return sortDirection === "asc"
        ? a.referenceNumber.localeCompare(b.referenceNumber)
        : b.referenceNumber.localeCompare(a.referenceNumber);
    } else if (sortField === "amount") {
      return sortDirection === "asc" ? a.amount - b.amount : b.amount - a.amount;
    } else if (sortField === "applicationDate") {
      return sortDirection === "asc"
        ? new Date(a.applicationDate).getTime() - new Date(b.applicationDate).getTime()
        : new Date(b.applicationDate).getTime() - new Date(a.applicationDate).getTime();
    } else if (sortField === "processingDays") {
      return sortDirection === "asc" ? a.processingDays - b.processingDays : b.processingDays - a.processingDays;
    } else if (sortField === "priority") {
      const priorityOrder = { low: 1, medium: 2, high: 3 };
      return sortDirection === "asc"
        ? priorityOrder[a.priority] - priorityOrder[b.priority]
        : priorityOrder[b.priority] - priorityOrder[a.priority];
    }
    return 0;
  });

  // Pagination
  const indexOfLastApplication = currentPage * applicationsPerPage;
  const indexOfFirstApplication = indexOfLastApplication - applicationsPerPage;
  const currentApplications = sortedApplications.slice(indexOfFirstApplication, indexOfLastApplication);
  const totalPages = Math.ceil(sortedApplications.length / applicationsPerPage);

  // Handle sort
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  // Get status badge
  const getStatusBadge = (status) => {
    const colors = statusColors[status];
    const labels = {
      submitted: "Submitted",
      "under-review": "Under Review",
      "pending-documents": "Pending Documents",
      "final-review": "Final Review",
      approved: "Approved",
      rejected: "Rejected",
    };

    return (
      <Badge
        px={2}
        py={1}
        borderRadius="full"
        bg={colors.bg}
        color={colors.color}
        borderWidth="1px"
        borderColor={colors.borderColor}
      >
        {labels[status]}
      </Badge>
    );
  };

  // Get priority badge
  const getPriorityBadge = (priority) => {
    const colors = priorityColors[priority];
    return (
      <Badge px={2} py={1} borderRadius="full" bg={colors.bg} color={colors.color}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </Badge>
    );
  };

  // Get processing progress
  const getProcessingProgress = (status) => {
    switch (status) {
      case "submitted":
        return 20;
      case "under-review":
        return 40;
      case "pending-documents":
        return 60;
      case "final-review":
        return 80;
      case "approved":
        return 100;
      case "rejected":
        return 100;
      default:
        return 0;
    }
  };

  return (
    <Box
      width="full"
      bg={bgColor}
      mt="80px"
      borderRadius="xl"
      borderWidth="1px"
      borderColor={borderColor}
      boxShadow="sm"
    >
      <Box p={4} borderBottomWidth="1px" borderColor={borderColor}>
        <Flex
          direction={{ base: "column", sm: "row" }}
          alignItems={{ sm: "center" }}
          justifyContent="space-between"
          gap={4}
        >
          <Heading as="h2" size="md" color={textColor}>
            Loan Applications
          </Heading>

          <Flex direction={{ base: "column", sm: "row" }} gap={2} alignItems={{ sm: "center" }}>
            <InputGroup size="sm">
              <InputLeftElement pointerEvents="none">
                <Search size={16} color={secondaryTextColor} />
              </InputLeftElement>
              <Input
                type="search"
                placeholder="Search applications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                width={{ md: "200px", lg: "250px" }}
              />
            </InputGroup>

            <Select
              size="sm"
              width="150px"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              icon={<Filter size={16} />}
            >
              <option value="all">All Status</option>
              <option value="submitted">Submitted</option>
              <option value="under-review">Under Review</option>
              <option value="pending-documents">Pending Documents</option>
              <option value="final-review">Final Review</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </Select>
          </Flex>
        </Flex>
      </Box>

      <Box overflowX="auto">
        <Table variant="simple">
          <Thead>
            <Tr bg={headerBgColor}>
              <Th>
                <Button
                  variant="unstyled"
                  display="flex"
                  alignItems="center"
                  fontSize="xs"
                  fontWeight="medium"
                  color={secondaryTextColor}
                  textTransform="uppercase"
                  onClick={() => handleSort("referenceNumber")}
                  _hover={{ color: textColor }}
                >
                  Application
                  <ArrowUpDown size={14} style={{ marginLeft: "4px" }} />
                </Button>
              </Th>
              <Th>
                <Button
                  variant="unstyled"
                  display="flex"
                  alignItems="center"
                  fontSize="xs"
                  fontWeight="medium"
                  color={secondaryTextColor}
                  textTransform="uppercase"
                  onClick={() => handleSort("amount")}
                  _hover={{ color: textColor }}
                >
                  Amount
                  <ArrowUpDown size={14} style={{ marginLeft: "4px" }} />
                </Button>
              </Th>
              <Th>
                <Button
                  variant="unstyled"
                  display="flex"
                  alignItems="center"
                  fontSize="xs"
                  fontWeight="medium"
                  color={secondaryTextColor}
                  textTransform="uppercase"
                  onClick={() => handleSort("applicationDate")}
                  _hover={{ color: textColor }}
                >
                  Date
                  <ArrowUpDown size={14} style={{ marginLeft: "4px" }} />
                </Button>
              </Th>
              <Th>
                <Text
                  fontSize="xs"
                  fontWeight="medium"
                  color={secondaryTextColor}
                  textTransform="uppercase"
                >
                  Status
                </Text>
              </Th>
              <Th>
                <Button
                  variant="unstyled"
                  display="flex"
                  alignItems="center"
                  fontSize="xs"
                  fontWeight="medium"
                  color={secondaryTextColor}
                  textTransform="uppercase"
                  onClick={() => handleSort("processingDays")}
                  _hover={{ color: textColor }}
                >
                  Processing
                  <ArrowUpDown size={14} style={{ marginLeft: "4px" }} />
                </Button>
              </Th>
              <Th>
                <Button
                  variant="unstyled"
                  display="flex"
                  alignItems="center"
                  fontSize="xs"
                  fontWeight="medium"
                  color={secondaryTextColor}
                  textTransform="uppercase"
                  onClick={() => handleSort("priority")}
                  _hover={{ color: textColor }}
                >
                  Priority
                  <ArrowUpDown size={14} style={{ marginLeft: "4px" }} />
                </Button>
              </Th>
              <Th textAlign="right">
                <Text
                  fontSize="xs"
                  fontWeight="medium"
                  color={secondaryTextColor}
                  textTransform="uppercase"
                >
                  Actions
                </Text>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentApplications.length > 0 ? (
              currentApplications.map((application) => (
                <Tr key={application.id} _hover={{ bg: hoverBgColor }} transition="background-color 0.2s">
                  <Td>
                    <VStack spacing={0} alignItems="flex-start">
                      <Text fontSize="sm" fontWeight="medium" color={textColor}>
                        {application.referenceNumber}
                      </Text>
                      <Text fontSize="xs" color={secondaryTextColor}>
                        {application.applicant}
                      </Text>
                    </VStack>
                  </Td>
                  <Td>
                    <VStack spacing={0} alignItems="flex-start">
                      <Text fontSize="sm" fontWeight="medium" color={textColor}>
                        ${application.amount.toLocaleString()}
                      </Text>
                      <Text fontSize="xs" color={secondaryTextColor}>
                        {application.type} - {application.purpose}
                      </Text>
                    </VStack>
                  </Td>
                  <Td>
                    <Flex alignItems="center">
                      <Calendar size={16} color={secondaryTextColor} style={{ marginRight: "6px" }} />
                      <Text fontSize="sm" color={textColor}>
                        {formatDate(application.applicationDate)}
                      </Text>
                    </Flex>
                  </Td>
                  <Td>
                    <Select
                      size="sm"
                      value={application.status}
                      onChange={(e) => handleStatusChange(application.id, e.target.value)}
                    >
                      <option value="submitted">Submitted</option>
                      <option value="under-review">Under Review</option>
                      <option value="pending-documents">Pending Documents</option>
                      <option value="final-review">Final Review</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </Select>
                  </Td>
                  <Td>
                    <VStack spacing={1} alignItems="flex-start">
                      <Flex alignItems="center" gap={1.5}>
                        <Clock size={14} color={secondaryTextColor} />
                        <Text fontSize="xs" color={textColor}>
                          {application.processingDays} {application.processingDays === 1 ? "day" : "days"}
                        </Text>
                      </Flex>
                      <Progress
                        value={getProcessingProgress(application.status)}
                        size="xs"
                        width="100%"
                        borderRadius="full"
                        colorScheme={
                          application.status === "rejected"
                            ? "red"
                            : application.status === "approved"
                              ? "green"
                              : "blue"
                        }
                      />
                    </VStack>
                  </Td>
                  <Td>{getPriorityBadge(application.priority)}</Td>
                  <Td textAlign="right">
                    <Flex justifyContent="flex-end" gap={2}>
                      {application.status === "pending-documents" && (
                        <Button
                          size="sm"
                          variant="outline"
                          leftIcon={<Upload size={14} />}
                          colorScheme="purple"
                        >
                          Upload
                        </Button>
                      )}
                      <Menu>
                        <MenuButton
                          as={IconButton}
                          aria-label="Options"
                          icon={<MoreHorizontal size={16} />}
                          variant="ghost"
                          size="sm"
                        />
                        <MenuList>
                          <MenuItem icon={<Eye size={14} />}>View Details</MenuItem>
                          <MenuItem icon={<ClipboardList size={14} />}>View Documents</MenuItem>
                          {application.status !== "approved" && application.status !== "rejected" && (
                            <MenuItem icon={<Clock size={14} />}>Check Status</MenuItem>
                          )}
                          <MenuItem 
                            icon={<Trash2 size={14} />} 
                            onClick={() => {
                              if (window.confirm('Are you sure you want to remove this loan application?')) {
                                handleRemoveApplication(application.id);
                              }
                            }}
                            color="red.500"
                          >
                            Remove Application
                          </MenuItem>
                        </MenuList>
                      </Menu>
                    </Flex>
                  </Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan={7} textAlign="center" py={8}>
                  <Text fontSize="sm" color={secondaryTextColor}>
                    No loan applications found matching your criteria
                  </Text>
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </Box>

      {/* Pagination */}
      {sortedApplications.length > applicationsPerPage && (
        <Flex
          px={4}
          py={3}
          alignItems="center"
          justifyContent="space-between"
          borderTopWidth="1px"
          borderColor={borderColor}
        >
          <Text fontSize="xs" color={secondaryTextColor}>
            Showing {indexOfFirstApplication + 1} to {Math.min(indexOfLastApplication, sortedApplications.length)} of{" "}
            {sortedApplications.length} applications
          </Text>
          <HStack spacing={1}>
            <IconButton
              variant="outline"
              size="sm"
              icon={<ChevronLeft size={16} />}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              isDisabled={currentPage === 1}
              aria-label="Previous page"
            />
            <Text fontSize="xs" color={textColor} px={2}>
              Page {currentPage} of {totalPages}
            </Text>
            <IconButton
              variant="outline"
              size="sm"
              icon={<ChevronRight size={16} />}
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              isDisabled={currentPage === totalPages}
              aria-label="Next page"
            />
          </HStack>
        </Flex>
      )}
    </Box>
  );
}

export default LoansProcessingTable;
