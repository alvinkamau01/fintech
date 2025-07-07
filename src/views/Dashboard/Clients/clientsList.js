import { useState, useEffect } from "react"
import {useDispatch , useSelector} from "react-redux"
import { fetchClients } from "../../../reducers/clientsReducer";
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
  Image,
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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react"
import { ChevronLeftIcon, ChevronRightIcon, TriangleDownIcon, TriangleUpIcon, AddIcon, DownloadIcon, HamburgerIcon } from "@chakra-ui/icons"
import Profile from "./Profile"

// Define client status colors
const statusColors = {
  active: "green",
  inactive: "gray",
  pending: "yellow",
  "high-risk": "red",
}

export default function ClientsList() {
  const dispatch = useDispatch();
  const { clientsList, loading, error } = useSelector((state) => state.clients);

  const [filteredClients, setFilteredClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortField, setSortField] = useState("name")
  const [sortDirection, setSortDirection] = useState("asc")

  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)
  const [totalPages, setTotalPages] = useState(0)

  // Modal state
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedClient, setSelectedClient] = useState(null)

  useEffect(() => {
    dispatch(fetchClients());
  }, [dispatch]);

  useEffect(() => {
    let result = [...clientsList];

    if (searchTerm) {
      result = result.filter(
        (client) =>
          client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          client.id.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (statusFilter !== "all") {
      result = result.filter((client) => client.status === statusFilter)
    }

    result.sort((a, b) => {
      const fieldA = a[sortField]
      const fieldB = b[sortField]

      if (typeof fieldA === "string" && typeof fieldB === "string") {
        return sortDirection === "asc" ? fieldA.localeCompare(fieldB) : fieldB.localeCompare(fieldA)
      } else {
        const numA = Number(fieldA)
        const numB = Number(fieldB)
        return sortDirection === "asc" ? numA - numB : numB - numA
      }
    })

    setFilteredClients(result)
    setTotalPages(Math.ceil(result.length / itemsPerPage))
    setCurrentPage(1)
  }, [searchTerm, statusFilter, sortField, sortDirection, itemsPerPage, clientsList])

  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return filteredClients.slice(startIndex, endIndex)
  }

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  // Define badge functions
  const getStatusBadge = (status) => {
    const color = statusColors[status] || "gray"
    return <Badge colorScheme={color}>{status ? status.charAt(0).toUpperCase() + status.slice(1) : "Unknown"}</Badge>
  }

  const getRiskBadge = (riskLevel) => {
    let color = "gray"
    if (riskLevel >= 80) color = "green"
    else if (riskLevel >= 60) color = "yellow"
    else color = "red"
    return <Badge colorScheme={color}>{riskLevel}</Badge>
  }

  // Handler to open modal with selected client
  const handleViewDetails = (client) => {
    setSelectedClient(client)
    onOpen()
  }

  if (loading) {
    return <Text>Loading clients...</Text>;
  }

  if (error) {
    return <Text color="red.500">Error loading clients: {error}</Text>;
  }

  return (
    <Box width="100%" p={4} mt={"50px"}>
      <Flex justify="space-between" align="center" mb={4} flexWrap="wrap" gap={4}>
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
      </Flex>

      <Box mb={6} display="flex" flexWrap="wrap" gap={4}>
        <Input
          placeholder="Search clients..."
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
          <option value="pending">Pending</option>
          <option value="high-risk">High Risk</option>
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
                  Client
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
              <Th cursor="pointer" onClick={() => handleSort("riskScore")}>
                <Flex align="center" gap={1}>
                  Risk Score
                  {sortField === "riskScore" && (sortDirection === "asc" ? <TriangleUpIcon /> : <TriangleDownIcon />)}
                </Flex>
              </Th>
              <Th cursor="pointer" onClick={() => handleSort("outstandingBalance")}>
                <Flex align="center" gap={1}>
                  Balance
                  {sortField === "outstandingBalance" && (sortDirection === "asc" ? <TriangleUpIcon /> : <TriangleDownIcon />)}
                </Flex>
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
                      <Link href={`/clients/${client.id}`} passHref>
                        <Text as="a" fontWeight="medium" _hover={{ textDecoration: "underline" }}>
                          {client.name}
                        </Text>
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
                  <Badge colorScheme={statusColors[client.status]}>
                    {client.status ? client.status.charAt(0).toUpperCase() + client.status.slice(1) : "Unknown"}
                  </Badge>
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
                <Td textAlign="right">
                  <Menu>
                    <MenuButton as={IconButton} icon={<HamburgerIcon />} size="sm" variant="ghost" />
                    <MenuList>
                      <MenuItem onClick={() => handleViewDetails(client)}>
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
      </Box>

      {filteredClients.length > 0 && (
        <Flex justify="space-between" align="center" mt={6} flexWrap="wrap" gap={2}>
          <Text fontSize="sm" color="gray.500">
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredClients.length)} of {filteredClients.length} clients
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
              let pageNum = i + 1
              if (totalPages > 5) {
                if (currentPage > 3) {
                  pageNum = currentPage - 3 + i
                }
                if (currentPage > totalPages - 2) {
                  pageNum = totalPages - 4 + i
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
              )
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

      {/* Modal for client details */}
      <Modal isOpen={isOpen} onClose={onClose} size="6xl" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Client Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedClient && (
              <Profile
                client={selectedClient}
                getStatusBadge={getStatusBadge}
                getRiskBadge={getRiskBadge}
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}
