"use client"

import { useState } from "react"
import { 
  Box,
  Card,
  CardBody,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Avatar,
  Button,
  Badge,
  Progress,
  Input,
  FormLabel,
  Textarea
} from '@chakra-ui/react';
import {
  Phone,
  Mail,
  MapPin,
  Calendar,
  Edit,
  CreditCard,
  FileText,
  Clock,
  CheckCircle,
  PlusCircle,
  Download,
  MessageCircle,
  Briefcase,
  Home,
  GraduationCap,
  Heart,
  ArrowUpRight,
  ArrowDownLeft,
} from "lucide-react"

export function ClientDetails({ clientId }) {
  const [activeTab, setActiveTab] = useState("overview")
  const [isEditing, setIsEditing] = useState(false)

  // In a real app, this would be fetched from an API based on the clientId
  const client = {
    id: clientId || "CL-1001",
    name: "Maria Garcia",
    avatar: "/clients/maria.jpg",
    email: "maria.garcia@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, Anytown, CA 94123",
    joinDate: "2021-05-15",
    occupation: "Small Business Owner",
    income: "$3,500/month",
    status: "active",
    riskLevel: "low",
    creditScore: 720,
    businessName: "Maria's Handcrafts",
    businessType: "Retail - Handmade Crafts",
    businessAddress: "456 Market St, Anytown, CA 94123",
    businessStartDate: "2019-03-10",
    dependents: 2,
    education: "Bachelor's Degree",
    maritalStatus: "Married",
    spouseName: "Carlos Garcia",
    spouseOccupation: "Teacher",
    emergencyContact: "Ana Rodriguez (Sister) - +1 (555) 987-6543",
  }

  const loans = [
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
    // ... rest of the loans data ...
  ]

  const paymentHistory = [
    // ... payment history data ...
  ]

  const documents = [
    // ... documents data ...
  ]

  const notes = [
    // ... notes data ...
  ]

  const interactions = [
    // ... interactions data ...
  ]

  // ... rest of the code remains the same ...
}
