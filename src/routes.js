import Calendar from "views/Calendar/Calendar.js";
import Dashboard from "views/Dashboard/Dashboard.js";
import SchedulePlanner from "views/SchedulePlanner/SchedulePlanner.js";
import PriceCalculator from "views/PriceCalculator/PriceCalculator.js";
import UserPriceCalculator from "views/UserPriceCalculator/UserPriceCalculator.js";
import Leads from "views/Leads/Leads.js";
import Proposals from "views/Proposals/Proposals.js";
import ProposalsCreate from "views/Proposals/ProposalsCreate.js";
import ProposalsView from "views/Proposals/ProposalsView.js";
import ProposalsViewIndividual from "views/Proposals/ProposalsViewIndividual.js";
import ProposalAddItem from "views/Proposals/ProposalAddItem.js";
import ProposalsStandardTemplate from "views/Proposals/ProposalsStandardTemplate.js";
import ProposalsStandardTemplateEdit from "views/Proposals/ProposalsStandardTemplateEdit.js";
import ProposalsStandardTemplate_PDF from "views/Proposals/ProposalsStandardTemplate_PDF.js";
import ProposalsClientView from "views/Proposals/ProposalsClientView.js";
import UserManagement from "views/UserManagement/UserManagement.js";
import Hierarchy from "views/UserManagement/Hierarchy.js";
import Customers from "views/Customers/Customers.js";
import LoginPage from "views/Auth/LoginPage.js";
import RegisterPage from "views/Auth/RegisterPage.js";
import Expenses from "views/Expenses/Expenses.js";

import DashboardIcon from "@material-ui/icons/Dashboard";
import DateRange from "@material-ui/icons/DateRange";
import People from "@material-ui/icons/People";
import Tasks from "views/Tasks/Tasks.js";
var dashRoutes = [
  {
    path: "/login-page",
    name: "eGenius Salesdiary",
    rtlName: "هعذاتسجيل الدخول",
    mini: "L",
    rtlMini: "هعذا",
    component: LoginPage,
    layout: "/auth",   
	  visible: false
  }, 
  {
    path: "/register-page",
    name: "eGenius Salesdiary",
    rtlName: "هعذاتسجيل الدخول",
    mini: "L",
    rtlMini: "هعذا",
    component: RegisterPage,
    layout: "/auth",   
	  visible: false
  },
  {
    path: "/dashboard",
    active: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: DashboardIcon,
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/calendar",
    active: "/calendar",
    name: "Calendar",
    rtlName: "التقويم",
    icon: DateRange,
    component: Calendar,
    layout: "/admin"
  },  
  {
    path: "/Tasks",
	  active: "/Tasks",
    name: "Tasks",
    rtlName: "التقويم",
    icon: "content_paste",
    component: Tasks,
    layout: "/admin"
  },
   
  {
    path: "/Leads",
	  active: "/Leads",
    name: "Leads",
    rtlName: "التقويم",
    icon: "content_paste",
    component: Leads,
    layout: "/admin"
  },  
  {
    path: "/SchedulePlanner",
	  active: "/SchedulePlanner",
    name: "Schedule Planner",
    rtlName: "التقويم",
    icon: "content_paste",
    component: SchedulePlanner,
    layout: "/admin"
  }, 
  {
    path: "/PriceCalculator",
	  active: "/PriceCalculator",
    name: "Price Configuration",
    icon: "account_balance_wallet",
    component: PriceCalculator, 
    layout: "/admin"
  }, 
  {
    path: "/UserPriceCalculator",
	  active: "/UserPriceCalculator",
    name: "Price Calculator",
    icon: "account_balance_wallet",
    component: UserPriceCalculator, 
    layout: "/admin"
  },
  {
    path: "/Proposals",
	  active: "/Proposals",
    name: "Proposals",
    rtlName: "التقويم",
    icon: "content_paste",
    component: Proposals,
    layout: "/admin"
  }, 
  {
    path: "/ProposalsView",
	  active: "/ProposalsView",
    name: "Proposals View",
    rtlName: "التقويم",
    icon: "content_paste",
    component: ProposalsView,
	  visible: false,
    layout: "/admin"
  },   
  {
    path: "/ProposalsCreate",
	  active: "/ProposalsCreate",
    name: "Proposals Create",
    rtlName: "التقويم",
    icon: "content_paste",
    component: ProposalsCreate,
	  visible: false,
    layout: "/admin"
  }, 
  {
    path: "/ProposalAddItem",
	  active: "/ProposalAddItem",
    name: "Proposal AddItem",
    rtlName: "التقويم",
    icon: "content_paste",
    component: ProposalAddItem,
	  visible: false,
    layout: "/admin"
  },  
  {
    path: "/ProposalsStandardTemplate",
	  active: "/ProposalsStandardTemplate",
    name: "Proposal Standard Template",
    rtlName: "التقويم",
    icon: "content_paste",
    component: ProposalsStandardTemplate,
	  visible: false,
    layout: "/admin"
  }, 
  {
    path: "/ProposalsStandardTemplateEdit",
	  active: "/ProposalsStandardTemplateEdit",
    name: "Proposal Standard Template Edit",
    rtlName: "التقويم",
    icon: "content_paste",
    component: ProposalsStandardTemplateEdit,
	  visible: false,
    layout: "/admin"
  }, 
  {
    path: "/ProposalsStandardTemplate_PDF",
	  active: "/ProposalsStandardTemplate_PDF",
    name: "Proposal Standard Template Edit",
    rtlName: "التقويم",
    icon: "content_paste",
    component: ProposalsStandardTemplate_PDF,
	  visible: false,
    layout: "/admin"
  }, 
  {
    path: "/ProposalsClientView",
	  active: "/ProposalsClientView",
    name: "Proposal Standard Template Edit",
    rtlName: "التقويم",
    icon: "content_paste",
    component: ProposalsClientView,
	  visible: false,
    layout: "/admin"
  },  
  {
    path: "/ProposalsViewIndividual",
	  active: "/ProposalsViewIndividual",
    name: "Proposal Standard Template Edit",
    rtlName: "التقويم",
    icon: "content_paste",
    component: ProposalsViewIndividual,
	  visible: false,
    layout: "/admin"
  },
  {
    path: "/user-management",
    name: "User Management",
    rtlName: "لوحة القيادة",
    icon: People,
    component: UserManagement,
    visible: true,			  
    layout: "/admin"
  },
  {
    path: "/hierarchy",
    name: "Hierarchy",
    rtlName: "لوحة القيادة",
    icon: People,
    component: Hierarchy,
    visible: true,			  
    layout: "/admin"
  },
  {
    path: "/expenses",
	  active: "/Expenses",
    name: "Expenses",
    visible: true,
    rtlName: "التقويم",
    icon: "content_paste",
    component: Expenses,
    layout: "/admin"
  }, 
];
export default dashRoutes;
