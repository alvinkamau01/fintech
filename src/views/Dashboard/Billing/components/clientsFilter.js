import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Input,
  Badge,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Select,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  IconButton,
  Flex,
  Text,
  Avatar,
} from "@chakra-ui/react";
import {
  SearchIcon,
  DownloadIcon,
  AddIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  HamburgerIcon,
} from "@chakra-ui/icons";

// Define client status colors
const statusColors = {
  active: "green",
  inactive: "gray",
  pending: "yellow",
  "high-risk": "red",
};

// Mock data for clients
const mockClients = [
  {
    id: "CL-001",
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "(555) 123-4567",
    status: "active",
    riskScore: 85,
    lastActivity: "2023-05-01",
    outstandingBalance: 15000,
    loanCount: 2,
    avatarUrl: "/clients/john.jpg",
  },
  {
    id: "CL-002",
    name: "Maria Rodriguez",
    email: "maria.r@example.com",
    phone: "(555) 234-5678",
    status: "active",
    riskScore: 92,
    lastActivity: "2023-05-03",
    outstandingBalance: 25000,
    loanCount: 1,
    avatarUrl: "/clients/maria.jpg",
  },
  {
    id: "CL-003",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    phone: "(555) 345-6789",
    status: "pending",
    riskScore: 75,
    lastActivity: "2023-04-28",
    outstandingBalance: 0,
    loanCount: 0,
    avatarUrl: "/clients/sarah.jpg",
  },
  {
    id: "CL-004",
    name: "Carlos Mendez",
    email: "carlos.m@example.com",
    phone: "(555) 456-7890",
    status: "high-risk",
    riskScore: 45,
    lastActivity: "2023-04-15",
    outstandingBalance: 12000,
    loanCount: 3,
    avatarUrl: "/clients/carlos.jpg",
  },
  {
    id: "CL-005",
    name: "Emily Chen",
    email: "emily.c@example.com",
    phone: "(555) 567-8901",
    status: "inactive",
    riskScore: 60,
    lastActivity: "2023-03-20",
    outstandingBalance: 5000,
    loanCount: 1,
    avatarUrl: "/clients/emily.jpg",
  },
  {
    id: "CL-006",
    name: "Ahmed Hassan",
    email: "ahmed.h@example.com",
    phone: "(555) 678-9012",
    status: "active",
    riskScore: 88,
    lastActivity: "2023-05-02",
    outstandingBalance: 30000,
    loanCount: 2,
    avatarUrl: "/clients/ahmed.jpg",
  },
  {
    id: "CL-007",
    name: "Olivia Taylor",
    email: "olivia.t@example.com",
    phone: "(555) 789-0123",
    status: "active",
    riskScore: 90,
    lastActivity: "2023-05-04",
    outstandingBalance: 18000,
    loanCount: 1,
    avatarUrl: "/clients/olivia.jpg",
  },
];

export default function ClientsFilter() {
  const [clients, setClients] = useState(mockClients);
  const [filteredClients, setFilteredClients] = useState(mockClients);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(Math.ceil(mockClients.length / itemsPerPage));

  useEffect(() => {
    let result = [...mockClients];

    if (searchTerm) {
      result = result.filter(
        (client) =>
          client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          client.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      result = result.filter((client) => client.status === statusFilter);
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

    setFilteredClients(result);
    setTotalPages(Math.ceil(result.length / itemsPerPage));
    setCurrentPage(1);
  }, [searchTerm, statusFilter, sortField, sortDirection, itemsPerPage]);

  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredClients.slice(startIndex, startIndex + itemsPerPage);
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(amount);

  const formatDate = (dateString) =>
    new Intl.DateTimeFormat("en-US", { year: "numeric", month: "short", day: "numeric" }).format(new Date(dateString));

  return (
    <Box p={4} maxW="100%" overflowX="auto">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4} flexWrap="wrap" gap={2}>
        <Text fontSize="2xl" fontWeight="bold">
          Clients
        </Text>
        <Flex gap={2} flexWrap="wrap">
          <Button leftIcon={<DownloadIcon />} variant="outline" size="sm">
            Export
          </Button>
          <Button leftIcon={<AddIcon />} size="sm" colorScheme="blue">
            Add Client
          </Button>
        </Flex>
      </Box>

      <Flex gap={4} mb={6} flexWrap="wrap">
        <Box flex="1" minW="250px" position="relative">
          <Input
            placeholder="Search clients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            pl="2.5rem"
          />
          <SearchIcon position="absolute" left="0.75rem" top="50%" transform="translateY(-50%)" color="gray.500" />
        </Box>

        <Select
          w="180px"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          placeholder="Filter by status"
        >
          <option value="all">All Statuses</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="pending">Pending</option>
          <option value="high-risk">High Risk</option>
        </Select>

        <Select
          w="130px"
          value={itemsPerPage.toString()}
          onChange={(e) => setItemsPerPage(Number(e.target.value))}
          placeholder="Show"
        >
          <option value="5">Show 5</option>
          <option value="10">Show 10</option>
          <option value="20">Show 20</option>
          <option value="50">Show 50</option>
        </Select>
      </Flex>

      <Table variant="simple" size="sm" whiteSpace="nowrap">
        <Thead>
          <Tr>
            <Th>
              <Button variant="ghost" size="sm" onClick={() => handleSort("name")}>
                Client
              </Button>
            </Th>
            <Th>Contact</Th>
            <Th>
              <Button variant="ghost" size="sm" onClick={() => handleSort("status")}>
                Status
              </Button>
            </Th>
            <Th>
              <Button variant="ghost" size="sm" onClick={() => handleSort("riskScore")}>
                Risk Score
              </Button>
            </Th>
            <Th>
              <Button variant="ghost" size="sm" onClick={() => handleSort("outstandingBalance")}>
                Balance
              </Button>
            </Th>
            <Th>
              <Button variant="ghost" size="sm" onClick={() => handleSort("lastActivity")}>
                Last Activity
              </Button>
            </Th>
            <Th textAlign="right">Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {getCurrentPageItems().map((client) => (
            <Tr key={client.id} _hover={{ bg: "gray.50" }}>
              <Td>
                <Flex align="center" gap={3}>
                  <Avatar size="sm" src={client.avatarUrl || "/placeholder.svg"} name={client.name} />
                  <Box>
                    <Link to={`/clients/${client.id}`} style={{ fontWeight: "bold", color: "#3182ce" }}>
                      {client.name}
                    </Link>
                    <Text fontSize="xs" color="gray.500">
                      {client.id}
                    </Text>
                  </Box>
                </Flex>
              </Td>
              <Td>
                <Box>
                  <Text fontSize="sm">{client.email}</Text>
                  <Text fontSize="xs" color="gray.500">
                    {client.phone}
                  </Text>
                </Box>
              </Td>
              <Td>
                <Badge colorScheme={statusColors[client.status]}>{client.status.charAt(0).toUpperCase() + client.status.slice(1)}</Badge>
              </Td>
              <Td>
                <Flex align="center" gap={2}>
                  <Box
                    w={2}
                    h={2}
                    borderRadius="full"
                    bg={
                      client.riskScore >= 80
                        ? "green.500"
                        : client.riskScore >= 60
                        ? "yellow.500"
                        : "red.500"
                    }
                  />
                  <Text>{client.riskScore}</Text>
                </Flex>
              </Td>
              <Td>
                {formatCurrency(client.outstandingBalance)}
                <Text fontSize="xs" color="gray.500">
                  {client.loanCount} loans
                </Text>
              </Td>
              <Td>{formatDate(client.lastActivity)}</Td>
              <Td textAlign="right">
                <Menu>
                  <MenuButton as={IconButton} icon={<HamburgerIcon />} size="sm" variant="ghost" />
                  <MenuList>
                    <MenuItem as={Link} to={`/clients/${client.id}`}>
                      View Details
                    </MenuItem>
                    <MenuItem>Edit Client</MenuItem>
                    <MenuDivider />
                    <MenuItem>New Loan</MenuItem>
                    <MenuItem>Record Payment</MenuItem>
                    <MenuDivider />
                    <MenuItem color="red.500">Deactivate</MenuItem>
                  </MenuList>
                </Menu>
              </Td>
            </Tr>
          ))}
          {filteredClients.length === 0 && (
            <Tr>
              <Td colSpan={7} textAlign="center" py={6} color="gray.500">
                No clients found matching your filters
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>

      {filteredClients.length > 0 && (
        <Flex justify="space-between" align="center" mt={6} flexWrap="wrap" gap={2}>
          <Text fontSize="sm" color="gray.500">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, filteredClients.length)} of {filteredClients.length} clients
          </Text>
          <Flex gap={2}>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeftIcon />
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
            >
              <ChevronRightIcon />
            </Button>
          </Flex>
        </Flex>
      )}
    </Box>
  );
}
