import { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Link,
  Button,
  Input,
  Badge,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Select,
  Text,
  IconButton,
  Avatar,
  useColorModeValue,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon, TriangleDownIcon, TriangleUpIcon, AddIcon, DownloadIcon, HamburgerIcon } from "@chakra-ui/icons";

// Define status colors
const statusColors = {
  active: "green",
  inactive: "gray",
  onLeave: "yellow",
  terminated: "red",
};

// Mock data for employees
const mockEmployees = [
  {
    id: "EMP-001",
    name: "Alex Johnson",
    position: "Senior Account Manager",
    department: "Sales",
    email: "alex.johnson@company.com",
    phone: "(555) 123-4567",
    status: "active",
    performance: 85,
    clients: 8,
    lastActivity: "2023-05-01",
    avatarUrl: "/employees/alex.jpg",
  },
  {
    id: "EMP-002",
    name: "Sarah Williams",
    position: "Customer Success Lead",
    department: "Customer Relations",
    email: "sarah.williams@company.com",
    phone: "(555) 234-5678",
    status: "active",
    performance: 92,
    clients: 12,
    lastActivity: "2023-05-03",
    avatarUrl: "/employees/sarah.jpg",
  },
  {
    id: "EMP-003",
    name: "Michael Chen",
    position: "Project Manager",
    department: "Operations",
    email: "michael.chen@company.com",
    phone: "(555) 345-6789",
    status: "onLeave",
    performance: 75,
    clients: 5,
    lastActivity: "2023-04-28",
    avatarUrl: "/employees/michael.jpg",
  },
  {
    id: "EMP-004",
    name: "Emily Rodriguez",
    position: "Senior Consultant",
    department: "Consulting",
    email: "emily.rodriguez@company.com",
    phone: "(555) 456-7890",
    status: "active",
    performance: 88,
    clients: 7,
    lastActivity: "2023-05-02",
    avatarUrl: "/employees/emily.jpg",
  },
  {
    id: "EMP-005",
    name: "David Kim",
    position: "Account Executive",
    department: "Sales",
    email: "david.kim@company.com",
    phone: "(555) 567-8901",
    status: "inactive",
    performance: 60,
    clients: 9,
    lastActivity: "2023-03-20",
    avatarUrl: "/employees/david.jpg",
  },
];

export default function EmployeesList() {
  const [employees, setEmployees] = useState(mockEmployees);
  const [filteredEmployees, setFilteredEmployees] = useState(mockEmployees);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(Math.ceil(mockEmployees.length / itemsPerPage));

  const textColor = useColorModeValue("gray.900", "white");
  const secondaryTextColor = useColorModeValue("gray.500", "gray.400");

  useEffect(() => {
    let result = [...employees];

    if (searchTerm) {
      result = result.filter(
        (emp) =>
          emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          emp.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      result = result.filter((emp) => emp.status === statusFilter);
    }

    result.sort((a, b) => {
      const fieldA = a[sortField];
      const fieldB = b[sortField];

      if (typeof fieldA === "string" && typeof fieldB === "string") {
        return sortDirection === "asc" ? fieldA.localeCompare(fieldB) : fieldB.localeCompare(fieldA);
      } else {
        return sortDirection === "asc" ? fieldA - fieldB : fieldB - fieldA;
      }
    });

    setFilteredEmployees(result);
    setTotalPages(Math.ceil(result.length / itemsPerPage));
    setCurrentPage(1);
  }, [searchTerm, statusFilter, sortField, sortDirection, itemsPerPage, employees]);

  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredEmployees.slice(startIndex, startIndex + itemsPerPage);
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  return (
    <Box width="100%" p={4} mt={"50px"}>
      <Flex justify="space-between" align="center" mb={4} flexWrap="wrap" gap={4}>
        <Text fontSize="2xl" fontWeight="bold">
          Employees
        </Text>
        <Flex gap={2} flexWrap="wrap">
          <Button leftIcon={<DownloadIcon />} variant="outline" size="sm">
            Export
          </Button>
          <Button leftIcon={<AddIcon />} size="sm" colorScheme="blue">
            Add Employee
          </Button>
        </Flex>
      </Flex>

      <Box mb={6} display="flex" flexWrap="wrap" gap={4}>
        <Input
          placeholder="Search employees..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          width={{ base: "100%", md: "auto" }}
          maxWidth="300px"
        />
        <Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          maxWidth="180px"
          placeholder="Filter by status"
        >
          <option value="all">All Statuses</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="onLeave">On Leave</option>
          <option value="terminated">Terminated</option>
        </Select>
        <Select
          value={itemsPerPage.toString()}
          onChange={(e) => setItemsPerPage(Number(e.target.value))}
          maxWidth="130px"
          placeholder="Show"
        >
          <option value="5">Show 5</option>
          <option value="10">Show 10</option>
          <option value="20">Show 20</option>
          <option value="50">Show 50</option>
        </Select>
      </Box>

      <Box overflowX="auto">
        <Table variant="simple" size="sm">
          <Thead>
            <Tr>
              <Th cursor="pointer" onClick={() => handleSort("name")}>
                <Flex align="center" gap={1}>
                  Employee
                  {sortField === "name" && (sortDirection === "asc" ? <TriangleUpIcon /> : <TriangleDownIcon />)}
                </Flex>
              </Th>
              <Th>Contact</Th>
              <Th cursor="pointer" onClick={() => handleSort("status")}>
                <Flex align="center" gap={1}>
                  Status
                  {sortField === "status" && (sortDirection === "asc" ? <TriangleUpIcon /> : <TriangleDownIcon />)}
                </Flex>
              </Th>
              <Th cursor="pointer" onClick={() => handleSort("performance")}>
                <Flex align="center" gap={1}>
                  Performance
                  {sortField === "performance" && (sortDirection === "asc" ? <TriangleUpIcon /> : <TriangleDownIcon />)}
                </Flex>
              </Th>
              <Th cursor="pointer" onClick={() => handleSort("clients")}>
                <Flex align="center" gap={1}>
                  Clients
                  {sortField === "clients" && (sortDirection === "asc" ? <TriangleUpIcon /> : <TriangleDownIcon />)}
                </Flex>
              </Th>
              <Th cursor="pointer" onClick={() => handleSort("lastActivity")}>
                <Flex align="center" gap={1}>
                  Last Activity
                  {sortField === "lastActivity" && (sortDirection === "asc" ? <TriangleUpIcon /> : <TriangleDownIcon />)}
                </Flex>
              </Th>
              <Th textAlign="right">Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {getCurrentPageItems().map((emp) => (
              <Tr key={emp.id} _hover={{ bg: "gray.50" }}>
                <Td>
                  <Flex align="center" gap={3}>
                    <Avatar size="sm" src={emp.avatarUrl} name={emp.name} />
                    <Box>
                      <Link href={`/employees/${emp.id}`} passHref>
                        <Text as="a" fontWeight="medium" _hover={{ textDecoration: "underline" }}>
                          {emp.name}
                        </Text>
                      </Link>
                      <Text fontSize="xs" color={secondaryTextColor}>
                        {emp.position}
                      </Text>
                    </Box>
                  </Flex>
                </Td>
                <Td>
                  <Box>
                    <Text fontSize="sm">{emp.email}</Text>
                    <Text fontSize="xs" color={secondaryTextColor}>
                      {emp.phone}
                    </Text>
                  </Box>
                </Td>
                <Td>
                  <Badge colorScheme={statusColors[emp.status]}>
                    {emp.status.charAt(0).toUpperCase() + emp.status.slice(1)}
                  </Badge>
                </Td>
                <Td>
                  <Flex align="center" gap={2}>
                    <Box
                      w={2}
                      h={2}
                      borderRadius="full"
                      bg={
                        emp.performance >= 80
                          ? "green.500"
                          : emp.performance >= 60
                          ? "yellow.500"
                          : "red.500"
                      }
                    />
                    <Text>{emp.performance}%</Text>
                  </Flex>
                </Td>
                <Td>
                  <Text>{emp.clients}</Text>
                  <Text fontSize="xs" color={secondaryTextColor}>
                    assigned
                  </Text>
                </Td>
                <Td>{formatDate(emp.lastActivity)}</Td>
                <Td textAlign="right">
                  <Menu>
                    <MenuButton as={IconButton} icon={<HamburgerIcon />} size="sm" variant="ghost" />
                    <MenuList>
                      <MenuItem>View Details</MenuItem>
                      <MenuItem>Edit Employee</MenuItem>
                      <MenuDivider />
                      <MenuItem>Assign Clients</MenuItem>
                      <MenuItem>Performance Review</MenuItem>
                      <MenuDivider />
                      <MenuItem color="red.500">Deactivate</MenuItem>
                    </MenuList>
                  </Menu>
                </Td>
              </Tr>
            ))}
            {filteredEmployees.length === 0 && (
              <Tr>
                <Td colSpan={7} textAlign="center" py={6} color="gray.500">
                  No employees found matching your filters
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </Box>

      {filteredEmployees.length > 0 && (
        <Flex justify="space-between" align="center" mt={6} flexWrap="wrap" gap={2}>
          <Text fontSize="sm" color="gray.500">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, filteredEmployees.length)} of {filteredEmployees.length} employees
          </Text>
          <Flex gap={2}>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              leftIcon={<ChevronLeftIcon />}
            >
              Prev
            </Button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              let pageNum = i + 1;
              if (totalPages > 5) {
                if (currentPage > 3) {
                  pageNum = currentPage - 3 + i;
                }
                if (currentPage > totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                }
              }
              return (
                <Button
                  key={i}
                  size="sm"
                  variant={currentPage === pageNum ? "solid" : "outline"}
                  onClick={() => setCurrentPage(pageNum)}
                  minWidth="32px"
                >
                  {pageNum}
                </Button>
              );
            })}
            <Button
              size="sm"
              variant="outline"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              rightIcon={<ChevronRightIcon />}
            >
              Next
            </Button>
          </Flex>
        </Flex>
      )}
    </Box>
  );
}
