// import
import Dashboard from "views/Dashboard/Dashboard";
import LoansDueTable from "views/Dashboard/loans/components/LoansDue";
import Tables from "views/Dashboard/Tables";
import Billing from "views/Dashboard/Billing";
import SignIn from "views/Auth/SignIn.js";
import { ClientDetails } from "views/Dashboard/Clients/clientsDetails";
import ClientsList from "views/Dashboard/Clients/clientsList"
import SignUp from "views/Auth/SignUp.js";
import EmployeesList from "views/Dashboard/Employees/EmployeesList.js";
import Employees from "views/Dashboard/Employees/Employees.js";
import EmployeeDetails from "views/Dashboard/Employees/EmployeeDetails.js";
import MapView from "views/Dashboard/Map";
import { useLocation } from "react-router-dom";
import SearchBar from "./components/Navbars/SearchBar/SearchBar";
import MembershipForm from "./views/Dashboard/loans/forms/membership-form";
import LoanApplicationForm from "./views/Dashboard/loans/forms/loan-application-form-new";

import {
  HomeIcon,
  StatsIcon,
  CreditIcon,
  PersonIcon,
  DocumentIcon,
  RocketIcon,
  SupportIcon,
} from "components/Icons/Icons";
import { Icon } from "@chakra-ui/react";

const GlobeIcon = (props) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"
    />
  </Icon>
);

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Overview Dashboard",
    rtlName: "لوحة القيادة",
    icon: <HomeIcon color="inherit" />,
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/loans",
    name: "Active Loans",
    rtlName: "لوحة ا",
    icon: <RocketIcon color="inherit" />,
    component: LoansDueTable,
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "Loan Applications",
    rtlName: "لوحة القيادة",
    icon: <StatsIcon color="inherit" />,
    component: Tables,
    layout: "/admin",
  },
  {
    path: "/membership",
    name: "Become a Member",
    icon: <PersonIcon color="inherit" />,
    component: MembershipForm,
    layout: "/admin",
  },
  {
    path: "/forms",
    name: "New Loan Application",
    icon: <DocumentIcon color="inherit" />,
    component: LoanApplicationForm,
    layout: "/admin",
  },
  {
    path: "/clients",
    name: "Client Management",
    icon: <PersonIcon color="inherit" />,
    component: ClientsList,
    layout: "/admin",
  },
  {
    path: "/clientsdetails",
    name: "Client Profile",
    icon: <PersonIcon color="inherit" />,
    component: ClientDetails,
    layout: "/admin",
  },
  {
    path: "/employees",
    name: "Staff Directory",
    icon: <PersonIcon color="inherit" />,
    component: EmployeesList,
    layout: "/admin",
  },
  {
    path: "/employee/:id",
    name: "Staff Profile",
    icon: <PersonIcon color="inherit" />,
    component: EmployeeDetails,
    layout: "/admin",
    hidden: true, // This will hide it from the sidebar
  },
  {
    path: "/map",
    name: "Branch Locations",
    icon: <GlobeIcon color="inherit" />,
    component: MapView,
    layout: "/admin",
  },
  {
    path: "/signin",
    name: "Authentication",
    rtlName: "لوحة القيادة",
    icon: <DocumentIcon color="inherit" />,
    component: SignIn,
    layout: "/auth",
  },
];

export default dashRoutes;
