import { useState } from "react"
import {
  Box,
  Flex,
  Input,
  Button,
  Select,
  Icon,
  Stack,
} from "@chakra-ui/react"
import { SearchIcon, CloseIcon } from "@chakra-ui/icons"

export function ClientsFilter() {
  const [filters, setFilters] = useState({
    search: "",
    loanStatus: "all",
    loanType: "all",
    riskLevel: "all",
  })

  const clearFilters = () => {
    setFilters({
      search: "",
      loanStatus: "all",
      loanType: "all",
      riskLevel: "all",
    })
  }

  return (
    <Box borderWidth="1px" borderRadius="md" p={4} mb={4}>
      <Stack spacing={4} direction={{ base: "column", md: "row" }}>
        <Box position="relative" flex="1">
          <Input
            placeholder="Search clients..."
            pl="2.5rem"
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />
          <Box position="absolute" left="0.75rem" top="50%" transform="translateY(-50%)" color="gray.400">
            <Icon as={SearchIcon} />
          </Box>
        </Box>

        <Select
          value={filters.loanStatus}
          onChange={(e) => setFilters({ ...filters, loanStatus: e.target.value })}
          maxW="180px"
          placeholder="Loan Status"
        >
          <option value="all">All Statuses</option>
          <option value="active">Active Loans</option>
          <option value="completed">Completed Loans</option>
          <option value="overdue">Overdue Payments</option>
          <option value="defaulted">Defaulted</option>
        </Select>

        <Select
          value={filters.loanType}
          onChange={(e) => setFilters({ ...filters, loanType: e.target.value })}
          maxW="180px"
          placeholder="Loan Type"
        >
          <option value="all">All Types</option>
          <option value="business">Business</option>
          <option value="agricultural">Agricultural</option>
          <option value="education">Education</option>
          <option value="housing">Housing</option>
          <option value="emergency">Emergency</option>
        </Select>

        <Select
          value={filters.riskLevel}
          onChange={(e) => setFilters({ ...filters, riskLevel: e.target.value })}
          maxW="180px"
          placeholder="Risk Level"
        >
          <option value="all">All Risk Levels</option>
          <option value="low">Low Risk</option>
          <option value="medium">Medium Risk</option>
          <option value="high">High Risk</option>
        </Select>

        <Flex align="center" gap={2} justify={{ base: "flex-start", md: "flex-end" }} flex="1">
          <Button variant="outline" size="sm" leftIcon={<CloseIcon />} onClick={clearFilters}>
            Clear Filters
          </Button>
          <Button size="sm" leftIcon={<SearchIcon />}>
            Apply Filters
          </Button>
        </Flex>
      </Stack>
    </Box>
  )
}
