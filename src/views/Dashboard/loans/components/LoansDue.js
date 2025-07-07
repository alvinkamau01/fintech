import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Badge,
  Button,
  Flex,
  Text,
  HStack,
  VStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { Search, Filter, ArrowUpDown, Calendar, DollarSign, MoreHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';
import { fetchLoanDetails, fetchPersonalInfo } from "../../../../reducers/loanReducer";

// Status badge colors outside component to avoid re-creation
const statusColors = {
  upcoming: {
    bgLight: "blue.50",
    bgDark: "blue.900",
    colorLight: "blue.700",
    colorDark: "blue.200",
    borderLight: "blue.200",
    borderDark: "blue.700",
  },
  "due-today": {
    bgLight: "orange.50",
    bgDark: "orange.900",
    colorLight: "orange.700",
    colorDark: "orange.200",
    borderLight: "orange.200",
    borderDark: "orange.700",
  },
  overdue: {
    bgLight: "red.50",
    bgDark: "red.900",
    colorLight: "red.700",
    colorDark: "red.200",
    borderLight: "red.200",
    borderDark: "red.700",
  },
  paid: {
    bgLight: "green.50",
    bgDark: "green.900",
    colorLight: "green.700",
    colorDark: "green.200",
    borderLight: "green.200",
    borderDark: "green.700",
  },
  cancelled: {
    bgLight: "gray.50",
    bgDark: "gray.700",
    colorLight: "gray.700",
    colorDark: "gray.200",
    borderLight: "gray.200",
    borderDark: "gray.700",
  },
};

function LoansDue() {
  const dispatch = useDispatch();
  const { loanDetails, personalInfo, loading, error } = useSelector((state) => state.loan);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortField, setSortField] = useState("dueDate");
  const [sortDirection, setSortDirection] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const loansPerPage = 5;

  // Color mode values
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const headerBgColor = useColorModeValue("gray.50", "gray.700");
  const textColor = useColorModeValue("gray.900", "white");
  const secondaryTextColor = useColorModeValue("gray.500", "gray.400");
  const hoverBgColor = useColorModeValue("gray.50", "gray.700");

  useEffect(() => {
    dispatch(fetchLoanDetails());
    dispatch(fetchPersonalInfo());
  }, [dispatch]);

  // Create a map from userId to full name from personalInfo
  const userIdToFullNameMap = {};
  if (personalInfo && Array.isArray(personalInfo)) {
    personalInfo.forEach(user => {
      userIdToFullNameMap[user.id] = `${user.firstName} ${user.lastName}`;
    });
  }

  // Transform raw loans data to expected format
  const loansData = (loanDetails || []).map((loan) => {
    const dueDate = loan.due_date || loan.created_at || null;
    const daysRemaining = dueDate
      ? Math.floor((new Date(dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
      : null;

    let normalizedStatus = loan.status ? loan.status.toLowerCase().replace(/[_\s]/g, "-") : "pending";

    const lenderName = userIdToFullNameMap[loan.userId] || loan.lender || "Unknown Lender";

    return {
      id: loan.id,
      name: loan.name || loan.purpose || "Unknown",
      type: loan.type || loan.payment_frequency || "N/A",
      amount: loan.amount || 0,
      dueDate: dueDate,
      daysRemaining: daysRemaining,
      status: normalizedStatus,
      lender: lenderName,
      accountNumber: loan.accountNumber || loan.id || "N/A",
    };
  });

  // Filter loans based on search term and status
  const filteredLoans = loansData.filter((loan) => {
    const matchesSearch =
      (loan.name?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
      (loan.lender?.toLowerCase().includes(searchTerm.toLowerCase()) || false);

    const matchesStatus = statusFilter === "all" || loan.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Sort loans
  const sortedLoans = [...filteredLoans].sort((a, b) => {
    if (sortField === "name") {
      return sortDirection === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    } else if (sortField === "amount") {
      return sortDirection === "asc" ? a.amount - b.amount : b.amount - a.amount;
    } else if (sortField === "dueDate") {
      return sortDirection === "asc"
        ? new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
        : new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
    } else if (sortField === "daysRemaining") {
      return sortDirection === "asc" ? a.daysRemaining - b.daysRemaining : b.daysRemaining - a.daysRemaining;
    }
    return 0;
  });

  // Pagination
  const indexOfLastLoan = currentPage * loansPerPage;
  const indexOfFirstLoan = indexOfLastLoan - loansPerPage;
  const currentLoans = sortedLoans.slice(indexOfFirstLoan, indexOfLastLoan);
  const totalPages = Math.ceil(sortedLoans.length / loansPerPage);

  // Handle sort
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Format date with validation to avoid invalid date errors
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "Invalid date";
    }
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  // Get status badge
  const getStatusBadge = (status) => {
    const colors = statusColors[status];
    if (!colors) {
      return (
        <Badge
          px={2}
          py={1}
          borderRadius="full"
          bg={useColorModeValue("gray.50", "gray.700")}
          color={useColorModeValue("gray.700", "gray.200")}
          borderWidth="1px"
          borderColor={useColorModeValue("gray.200", "gray.700")}
        >
          Unknown
        </Badge>
      );
    }
    const labels = {
      upcoming: "Upcoming",
      "due-today": "Due Today",
      overdue: "Overdue",
      paid: "Paid",
    };

    return (
      <Badge
        px={2}
        py={1}
        borderRadius="full"
        bg={useColorModeValue(colors.bgLight, colors.bgDark)}
        color={useColorModeValue(colors.colorLight, colors.colorDark)}
        borderWidth="1px"
        borderColor={useColorModeValue(colors.borderLight, colors.borderDark)}
      >
        {labels[status] || "Unknown"}
      </Badge>
    );
  };

  // Get days remaining text
  const getDaysRemainingText = (days, status) => {
    if (status === "paid") return "Paid";
    if (days < 0) return `${Math.abs(days)} days overdue`;
    if (days === 0) return "Due today";
    if (days === 1) return "Due tomorrow";
    return `${days} days remaining`;
  };

  // Get text color for days remaining
  const getDaysRemainingColor = (status) => {
    switch (status) {
      case "overdue":
        return useColorModeValue("red.600", "red.300");
      case "due-today":
        return useColorModeValue("orange.600", "orange.300");
      case "paid":
        return useColorModeValue("green.600", "green.300");
      default:
        return textColor;
    }
  };

  if (loading) {
    return (
      <Box p={4} textAlign="center" color={textColor}>
        Loading loans...
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={4} textAlign="center" color="red.500">
        Error loading loans: {error}
      </Box>
    );
  }

  return (
    <Box
      width="full"
      bg={bgColor}
      borderRadius="xl"
      borderWidth="1px"
      borderColor={borderColor}
      boxShadow="sm"
      mt="50px"
    >
      <Box p={4} borderBottomWidth="1px" borderColor={borderColor}>
        <Flex
          direction={{ base: "column", sm: "row" }}
          alignItems={{ sm: "center" }}
          justifyContent="space-between"
          gap={4}
        >
          <Heading as="h2" size="md" color={textColor}>
            Loan Progression
          </Heading>

          <Flex direction={{ base: "column", sm: "row" }} gap={2} alignItems={{ sm: "center" }}>
            <InputGroup size="sm">
              <InputLeftElement pointerEvents="none">
                <Search size={16} color={secondaryTextColor} />
              </InputLeftElement>
              <Input
                type="search"
                placeholder="Search loans..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                width={{ md: "200px", lg: "250px" }}
              />
            </InputGroup>

            <Select
              size="sm"
              width="130px"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              icon={<Filter size={16} />}
            >
              <option value="all">All Status</option>
              <option value="upcoming">Upcoming</option>
              <option value="due-today">Due Today</option>
              <option value="overdue">Overdue</option>
              <option value="paid">Paid</option>
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
                  onClick={() => handleSort("name")}
                  _hover={{ color: textColor }}
                >
                  Loan
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
                  onClick={() => handleSort("dueDate")}
                  _hover={{ color: textColor }}
                >
                  Due Date
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
                  onClick={() => handleSort("daysRemaining")}
                  _hover={{ color: textColor }}
                >
                  Remaining
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
            {currentLoans.length > 0 ? (
              currentLoans.map((loan) => (
                <Tr key={loan.id} _hover={{ bg: hoverBgColor }} transition="background-color 0.2s">
                  <Td>
                    <VStack spacing={0} alignItems="flex-start">
                      <Text fontSize="sm" fontWeight="medium" color={textColor}>
                        {loan.name}
                      </Text>
                      <Text fontSize="xs" color={secondaryTextColor}>
                        {loan.lender}
                      </Text>
                    </VStack>
                  </Td>
                  <Td>
                    <VStack spacing={0} alignItems="flex-start">
                      <Text fontSize="sm" fontWeight="medium" color={textColor}>
                        ${loan.amount.toFixed(2)}
                      </Text>
                      <Text fontSize="xs" color={secondaryTextColor}>
                        {loan.accountNumber}
                      </Text>
                    </VStack>
                  </Td>
                  <Td>
                    <Flex alignItems="center">
                      <Calendar size={16} color={secondaryTextColor} style={{ marginRight: "6px" }} />
                      <Text fontSize="sm" color={textColor}>
                        {formatDate(loan.dueDate)}
                      </Text>
                    </Flex>
                  </Td>
                  <Td>
                    {getStatusBadge(loan.status)}
                  </Td>
                  <Td>
                    <Text fontSize="sm" color={getDaysRemainingColor(loan.status)}>
                      {getDaysRemainingText(loan.daysRemaining, loan.status)}
                    </Text>
                  </Td>
                  <Td textAlign="right">
                    <Flex justifyContent="flex-end" gap={2}>
                      {(loan.status === "upcoming" || loan.status === "due-today" || loan.status === "overdue") && (
                        <Button
                          size="sm"
                          colorScheme={loan.status === "overdue" ? "red" : "blue"}
                          leftIcon={<DollarSign size={14} />}
                        >
                          Pay Now
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
                          <MenuItem>View Details</MenuItem>
                          <MenuItem>Payment History</MenuItem>
                          <MenuItem>Set Reminder</MenuItem>
                        </MenuList>
                      </Menu>
                    </Flex>
                  </Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan={6} textAlign="center" py={8}>
                  <Text fontSize="sm" color={secondaryTextColor}>
                    No loans found matching your criteria
                  </Text>
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </Box>

      {/* Pagination */}
      {sortedLoans.length > loansPerPage && (
        <Flex
          px={4}
          py={3}
          alignItems="center"
          justifyContent="space-between"
          borderTopWidth="1px"
          borderColor={borderColor}
        >
          <Text fontSize="xs" color={secondaryTextColor}>
            Showing {indexOfFirstLoan + 1} to {Math.min(indexOfLastLoan, sortedLoans.length)} of{" "}
            {sortedLoans.length} loans
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

export default LoansDue;
