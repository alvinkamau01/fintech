export const clientData = {
  loans: [
    {
      id: "LN-5001",
      type: "Business",
      amount: 2500,
      amountPaid: 1250,
      term: "12 months",
      startDate: "2023-01-15",
      nextPayment: "2023-05-15",
      nextPaymentAmount: 250,
      status: "active",
      interestRate: "12%",
      paymentFrequency: "Monthly",
      purpose: "Inventory purchase for small retail shop",
      disbursementDate: "2023-01-20",
      disbursementMethod: "Bank Transfer",
      collateral: "None",
      guarantor: "None",
    },
    {
      id: "LN-4582",
      type: "Agricultural",
      amount: 1800,
      amountPaid: 1800,
      term: "6 months",
      startDate: "2022-06-10",
      nextPayment: null,
      nextPaymentAmount: null,
      status: "completed",
      interestRate: "10%",
      paymentFrequency: "Monthly",
      purpose: "Purchase of seeds and fertilizers",
      disbursementDate: "2022-06-15",
      disbursementMethod: "Cash",
      collateral: "None",
      guarantor: "None",
      completionDate: "2022-12-10",
    }
  ],

  paymentHistory: [
    {
      id: "PMT-8765",
      date: "2023-04-15",
      amount: 250,
      loanId: "LN-5001",
      status: "completed",
      method: "Bank Transfer",
      type: "repayment",
    },
    {
      id: "PMT-8234",
      date: "2023-03-15",
      amount: 250,
      loanId: "LN-5001",
      status: "completed",
      method: "Cash",
      type: "repayment",
    }
  ],

  documents: [
    {
      id: "DOC-1001",
      name: "ID Card.pdf",
      type: "Identification",
      uploadDate: "2021-05-15",
      size: "1.2 MB",
      status: "verified"
    },
    {
      id: "DOC-1002",
      name: "Business Registration.pdf",
      type: "Business Document",
      uploadDate: "2021-05-15",
      size: "2.5 MB",
      status: "verified"
    }
  ],

  notes: [
    {
      id: "NOTE-1001",
      date: "2023-04-20",
      author: "Maria Fernandez",
      content: "Client called to inquire about early repayment options for current loan. Explained the process and confirmed no early repayment penalties.",
      type: "call"
    },
    {
      id: "NOTE-1002",
      date: "2023-03-05",
      author: "John Williams",
      content: "Conducted quarterly business check-in. Business is performing well with 15% growth in revenue compared to last quarter.",
      type: "meeting"
    }
  ],

  interactions: [
    {
      id: "INT-1001",
      date: "2023-04-20",
      type: "Phone Call",
      duration: "15 minutes",
      summary: "Discussed early repayment options",
      staff: "Maria Fernandez"
    },
    {
      id: "INT-1002",
      date: "2023-03-05",
      type: "In-Person Meeting",
      duration: "45 minutes",
      summary: "Quarterly business review",
      staff: "John Williams"
    }
  ]
}
