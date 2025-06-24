import React, { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  Heading,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import LoanSchedule from "../components/LoanSchedule";
import usePost from "../../../../hooks/postHook";
import useFetch from "../../../../hooks/fetchHook";
import SignaturePad from "./signature-pad-new";

function LoanDetailsStep({ formData, updateFormData }) {
  const toast = useToast();
  const { postData: postLoanDetails, loading: loadingLoanDetails, error: errorLoanDetails, success: successLoanDetails } = usePost('loan_details');
  const { postData: postPaymentSchedule, loading: loadingPaymentSchedule, error: errorPaymentSchedule, success: successPaymentSchedule } = usePost('payment_schedules');
  const { postData: postTotalPayment } = usePost('total_payments');
  const { fetchData } = useFetch('personal_info');
  const [schedule, setSchedule] = useState([]);
  const [paymentFrequency, setPaymentFrequency] = useState("monthly");
  const [hasPosted, setHasPosted] = useState(false);
  const [users, setUsers] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  const handleFrequencyChange = (e) => {
    setPaymentFrequency(e.target.value);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const usersData = await fetchData();
      setUsers(usersData);
    };
    fetchUsers();
  }, [fetchData]);

  const calculateSchedule = (amount, term, frequency) => {
    if (!amount || !term) return [];

    const interestRate = 0.15; // 15% annual interest rate
    let periods;
    let periodRate;
    let paymentInterval;

    switch (frequency) {
      case "weekly":
        periods = term * 52/12; // Convert months to weeks
        periodRate = interestRate / 52; // Weekly interest rate
        paymentInterval = 7; // 7 days
        break;
      case "bi-weekly":
        periods = term * 26/12; // Convert months to bi-weeks
        periodRate = interestRate / 26; // Bi-weekly interest rate
        paymentInterval = 14; // 14 days
        break;
      case "monthly":
        periods = term; // Already in months
        periodRate = interestRate / 12; // Monthly interest rate
        paymentInterval = 30; // Approximately 30 days
        break;
      default:
        periods = term;
        periodRate = interestRate / 12;
        paymentInterval = 30;
    }

    // Calculate payment using the loan amortization formula
    const payment = (amount * periodRate * Math.pow(1 + periodRate, periods)) /
                    (Math.pow(1 + periodRate, periods) - 1);
                    
    let balance = amount;
    const schedule = [];
    const today = new Date();

    for (let i = 1; i <= periods; i++) {
      const interest = balance * periodRate;
      const principal = payment - interest;
      balance -= principal;

      const dueDate = new Date(today);
      dueDate.setDate(today.getDate() + (i * paymentInterval));

      schedule.push({
        installmentNumber: i,
        dueDate: dueDate.toLocaleDateString(),
        principal: principal.toFixed(2),
        interest: interest.toFixed(2),
        totalPayment: payment.toFixed(2),
        remainingBalance: Math.max(0, balance).toFixed(2),
        status: "Pending"
      });
    }

    return schedule;
  };

  useEffect(() => {
      if (formData.loanAmount && formData.loanTerm) {
        const newSchedule = calculateSchedule(
          parseFloat(formData.loanAmount),
          parseInt(formData.loanTerm),
          paymentFrequency
        );
        setSchedule(newSchedule);
        const totalInterest = newSchedule.reduce((acc, item) => acc + parseFloat(item.interest), 0);
        const totalPayment = newSchedule.reduce((acc, item) => acc + parseFloat(item.totalPayment), 0);
        updateFormData({ 
          schedule: newSchedule,
          paymentFrequency: paymentFrequency,
          interestRate: 0.15, // 15% annual interest rate
          totalInterest: totalInterest,
          totalPayment: totalPayment
        });
      }
  }, [formData.loanAmount, formData.loanTerm, paymentFrequency]);

  // Removed automatic posting of loan details and payment schedule to prevent premature database writes
  // useEffect(() => {
  //   const postDataAsync = async () => {
  //     if (
  //       !hasPosted &&
  //       schedule.length > 0 &&
  //       formData.loanAmount &&
  //       formData.loanTerm &&
  //       formData.loanPurpose &&
  //       formData.userId &&
  //       paymentFrequency
  //     ) {
  //       try {
  //         // Calculate total interest and total amount
  //         const totalInterest = schedule.reduce((acc, item) => acc + parseFloat(item.interest), 0);
  //         const totalAmount = schedule.reduce((acc, item) => acc + parseFloat(item.totalPayment), 0);

  //         // Post loan details with total interest and total amount
  //         const loanDetailsPayload = {
  //           amount: parseFloat(formData.loanAmount),
  //           term: parseInt(formData.loanTerm),
  //           purpose: formData.loanPurpose,
  //           userId: formData.userId,
  //           paymentFrequency: paymentFrequency,
  //           interestRate: 0.15,
  //           status: "pending",
  //           interest: totalInterest,
  //           totalPayment: totalAmount,
  //           created_at: new Date().toISOString()
  //         };
  //         console.log("Attempting to insert into table: loan_details");
  //         console.log("Payload:", loanDetailsPayload);
  //         await postLoanDetails(loanDetailsPayload);

  //         // Post payment schedule
  //         const paymentSchedulePayload = schedule.map(item => ({
  //           installmentNumber: item.installmentNumber,
  //           dueDate: item.dueDate,
  //           principal: parseFloat(item.principal),
  //           interest: parseFloat(item.interest),
  //           totalPayment: parseFloat(item.totalPayment),
  //           remainingBalance: parseFloat(item.remainingBalance),
  //           status: item.status,
  //           userId: formData.userId
  //         }));
  //         await postPaymentSchedule(paymentSchedulePayload);


  //         toast({
  //           title: "Loan details saved successfully.",
  //           status: "success",
  //           duration: 3000,
  //           isClosable: true,
  //         });
  //         setHasPosted(true);
  //       } catch (error) {
  //         toast({
  //           title: "Error saving loan details.",
  //           description: error.message || "An error occurred while saving.",
  //           status: "error",
  //           duration: 5000,
  //           isClosable: true,
  //         });
  //       }
  //     }
  //   };

  //   postDataAsync();
  // }, [schedule, formData, paymentFrequency, hasPosted, postLoanDetails, postPaymentSchedule, toast, updateFormData]);

  return (
    <VStack spacing={6} align="stretch">
      <Box mb={6}>
        <Heading as="h2" size="md" color="gray.900" _dark={{ color: "white" }}>
          Loan Details
        </Heading>
        <Text fontSize="sm" color="gray.600" _dark={{ color: "gray.400" }}>
          Please specify your loan requirements.
        </Text>
      </Box>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        <FormControl isRequired>
          <FormLabel htmlFor="loanAmount">Loan Amount</FormLabel>
          <Input
            id="loanAmount"
            name="loanAmount"
            type="number"
            value={formData.loanAmount}
            onChange={handleChange}
            placeholder="Enter loan amount"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel htmlFor="loanTerm">Loan Term (months)</FormLabel>
          <Select
            id="loanTerm"
            name="loanTerm"
            value={formData.loanTerm}
            onChange={handleChange}
            placeholder="Select loan term"
          >
            <option value="12">12 Months</option>
            <option value="24">24 Months</option>
            <option value="36">36 Months</option>
            <option value="48">48 Months</option>
            <option value="60">60 Months</option>
          </Select>
        </FormControl>

        <FormControl isRequired>
          <FormLabel htmlFor="paymentFrequency">Payment Frequency</FormLabel>
          <Select
            id="paymentFrequency"
            name="paymentFrequency"
            value={paymentFrequency}
            onChange={handleFrequencyChange}
          >
            <option value="monthly">Monthly Payments</option>
            <option value="bi-weekly">Bi-Weekly Payments (Every 14 days)</option>
            <option value="weekly">Weekly Payments (Every 7 days)</option>
          </Select>
        </FormControl>

        <FormControl isRequired gridColumn={{ md: "span 2" }}>
          <FormLabel htmlFor="loanPurpose">Loan Purpose</FormLabel>
          <Input
            id="loanPurpose"
            name="loanPurpose"
            value={formData.loanPurpose}
            onChange={handleChange}
            placeholder="Enter the loan purpose"
          />
        </FormControl>

        <FormControl isRequired gridColumn={{ md: "span 2" }}>
          <FormLabel htmlFor="userId">Select Member</FormLabel>
          <Select
            id="userId"
            name="userId"
            value={formData.userId || ""}
            onChange={handleChange}
            placeholder="Select a member"
          >
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name} ({user.membership_number || user.id})
              </option>
            ))}
          </Select>
        </FormControl>
      </SimpleGrid>

      {/* Loan Schedule Component */}
      <LoanSchedule schedule={schedule} />
      <Box mt={8}>
        <Heading>
          Digital Signature
        </Heading>
        <SignaturePad onSave={(signature) => updateFormData({ signature })} />
      </Box>
      
    </VStack>
  );
}

export default LoanDetailsStep;
