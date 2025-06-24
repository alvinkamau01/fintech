import React, { useState, useEffect } from "react";
import useFetch from "../../../../hooks/fetchHook";
import useFilter from "../../../../hooks/filterHook";
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

 
// Mock loan data
const MOCK_LOANS = [
  {
    id: "loan-1",
    name: "Home Mortgage",
    type: "Mortgage",
    amount: 1250.0,
    dueDate: "2025-05-01",
    daysRemaining: 2,
    status: "upcoming",
    lender: "John Mwangi",
    accountNumber: "XXXX-3456",
  },
  {
    id: "loan-2",
    name: "Auto Loan",
    type: "Auto",
    amount: 385.5,
    dueDate: "2025-04-29",
    daysRemaining: 0,
    status: "due-today",
    lender: "Capital Auto Finance",
    accountNumber: "XXXX-7890",
  },
  {
    id: "loan-3",
    name: "Student Loan",
    type: "Education",
    amount: 220.75,
    dueDate: "2025-04-25",
    daysRemaining: -4,
    status: "overdue",
    lender: "Education Funding Corp",
    accountNumber: "XXXX-1234",
  },
  {
    id: "loan-4",
    name: "Personal Loan",
    type: "Personal",
    amount: 175.0,
    dueDate: "2025-05-10",
    daysRemaining: 11,
    status: "upcoming",
    lender: "Community Credit Union",
    accountNumber: "XXXX-5678",
  },
  {
    id: "loan-5",
    name: "Credit Card",
    type: "Credit Card",
    amount: 150.0,
    dueDate: "2025-05-15",
    daysRemaining: 16,
    status: "upcoming",
    lender: "Universal Bank",
    accountNumber: "XXXX-9012",
  },
  {
    id: "loan-6",
    name: "Home Equity Line",
    type: "HELOC",
    amount: 325.0,
    dueDate: "2025-04-20",
    daysRemaining: -9,
    status: "overdue",
    lender: "First National Bank",
    accountNumber: "XXXX-3457",
  },
  {
    id: "loan-7",
    name: "Business Loan",
    type: "Business",
    amount: 875.0,
    dueDate: "2025-05-05",
    daysRemaining: 6,
    status: "upcoming",
    lender: "Business Capital Inc",
    accountNumber: "XXXX-8765",
  },
  {
    id: "loan-8",
    name: "Furniture Financing",
    type: "Retail",
    amount: 95.0,
    dueDate: "2025-04-15",
    daysRemaining: -14,
    status: "paid",
    lender: "Home Goods Finance",
    accountNumber: "XXXX-4321",
  },
];




function LoansDueTable() {
  const { fetchData } = useFetch("loan_details");
  const { fetchData: fetchPersonalInfo } = useFetch("personal_info");
  const { filterData: fetchPaymentschedules } = useFilter("payment_schedules");
  const [loans, setLoans] = useState([]);
  const [dueDateFilter, setDueDateFilter] = useState([])
  const [personalInfo, setPersonalInfo] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortField, setSortField] = useState("dueDate");
  const [sortDirection, setSortDirection] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingLoans, setLoadingLoans] = useState(false);
  const [loadingPersonalInfo, setLoadingPersonalInfo] = useState(false);
  const [errorLoans, setErrorLoans] = useState(null);
  const [errorPersonalInfo, setErrorPersonalInfo] = useState(null);
  const loansPerPage = 5;

  // Color mode values
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const headerBgColor = useColorModeValue("gray.50", "gray.700");
  const textColor = useColorModeValue("gray.900", "white");
  const secondaryTextColor = useColorModeValue("gray.500", "gray.400");
  const hoverBgColor = useColorModeValue("gray.50", "gray.700");


  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const loansDataRaw = await fetchData();
        const personalInfoData = await fetchPersonalInfo();
        setPersonalInfo(personalInfoData || []);
        const paymentSchedulesData = await fetchPaymentschedules();
        
        const paymentSchedulesMap = {};
        if (paymentSchedulesData && Array.isArray(paymentSchedulesData)) {
          paymentSchedulesData.forEach(schedule => {
            if (schedule.loanId && schedule.dueDate) {
              paymentSchedulesMap[schedule.loanId] = schedule.dueDate;
            }
          });         
        }

        // Create a map from userId to full name from personalInfoData
        const userIdToFullNameMap = {};
        if (personalInfoData && Array.isArray(personalInfoData)) {
          personalInfoData.forEach(user => {
            userIdToFullNameMap[user.id] = `${user.firstName} ${user.lastName}`;
            console.log(userIdToFullNameMap[user.id]);
          });
        }

        // Transform raw loans data to expected format
        const loansData = loansDataRaw.map((loan) => {
          // Use due_date or fallback to created_at if due_date not available
          const dueDate = loan.due_date || loan.created_at || null;
          const daysRemaining = dueDate
            ? Math.floor((new Date(dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
            : null;

          // Normalize status to consistent keys (replace underscores or spaces with hyphens and lowercase)
          let normalizedStatus = loan.status ? loan.status.toLowerCase().replace(/[_\s]/g, "-") : "pending";

          // Map lender name from userId if available
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

        setLoans(loansData);
      } catch (error) {
        console.error("Error fetching loans or personal info:", error);
        setLoans([]);
      }
    };

    fetchAllData();
  }, [fetchData, fetchPersonalInfo]);

  // Status badge colors
  const statusColors = {
    upcoming: {
      bg: useColorModeValue("blue.50", "blue.900"),
      color: useColorModeValue("blue.700", "blue.200"),
      borderColor: useColorModeValue("blue.200", "blue.700"),
    },
    dueToday : {
      bg: useColorModeValue("orange.50", "orange.900"),
      color: useColorModeValue("orange.700", "orange.200"),
      borderColor: useColorModeValue("orange.200", "orange.700"),
    },
    overdue: {
      bg: useColorModeValue("red.50", "red.900"),
      color: useColorModeValue("red.700", "red.200"),
      borderColor: useColorModeValue("red.200", "red.700"),
    },
    paid: {
      bg: useColorModeValue("green.50", "green.900"),
      color: useColorModeValue("green.700", "green.200"),
      borderColor: useColorModeValue("green.200", "green.700"),
    },
    cancelled: {
      bg: useColorModeValue("gray.50", "gray.700"),
      color: useColorModeValue("gray.700", "gray.200"),
      borderColor: useColorModeValue("gray.200", "gray.700"),
    },
  };

  // Filter loans based on search term and status
  const filteredLoans = loans.filter((loan) => {
    const matchesSearch =
      (loan.purpose?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
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
      upcoming : "Upcoming",
      dueToday : "Due Today",
      overdue: "Overdue",
      paid : "Paid",
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

export default LoansDueTable;
