import { combineReducers } from "redux";

// Front
import LayoutReducer from "./layouts/reducer";

// Authentication
import { loginSlices } from "./auth/login/reducer";
import { authSlices } from "./auth/logout/reducer";
import { registerSlices } from "./auth/register/reducer";
import { forgotPasswordSlices } from "./auth/forgetpwd/reducer";
import { verifySlices } from "./auth/verifyOtp/reducer";

// Admin
import { roleSlices } from "./admin/role/reducer";

import ProfileReducer from "./auth/profile/reducer";

//Boxes
import { boxSlices } from "./Box/boxes/reducer";

//Tablets
import { tabletSlices } from "./Box/tablet/reducer";

//Address
import { addressSlices } from "./Box/Address/reducer";

//User Boxes
import { userBoxSlices } from "./Box/UserBoxes/reducer";

// Box Images
import { boxImgesSlices } from "./Box/BoxImages/reducer";

// Delivery Packages
import { deliverySlices } from "./delivery/deliveryPackage/reducer";

// Shipping Companies
import { shippingCompaniesSlices } from "./delivery/shippingCompany/reducer";

//Calendar
import CalendarReducer from "./calendar/reducer";
//Chat
import chatReducer from "./chat/reducer";

//Project
import ProjectsReducer from "./projects/reducer";

// Tasks
import TasksReducer from "./tasks/reducer";

//Crypto
import CryptoReducer from "./crypto/reducer";

//TicketsList
import TicketsReducer from "./tickets/reducer";
//Crm
import CrmReducer from "./crm/reducer";

//Invoice
import InvoiceReducer from "./invoice/reducer";

//Mailbox
import MailboxReducer from "./mailbox/reducer";

// Dashboard Analytics
import DashboardAnalyticsReducer from "./dashboardAnalytics/reducer";

// Dashboard CRM
import DashboardCRMReducer from "./dashboardCRM/reducer";

// Dashboard Ecommerce
import DashboardEcommerceReducer from "./dashboardEcommerce/reducer";

// Dashboard Cryto
import DashboardCryptoReducer from "./dashboardCrypto/reducer";

// Dashboard Cryto
import DashboardProjectReducer from "./dashboardProject/reducer";

// Dashboard NFT
import DashboardNFTReducer from "./dashboardNFT/reducer";

// Pages > Team
import TeamDataReducer from "./team/reducer";

// File Manager
import FileManagerReducer from "./fileManager/reducer";

// To do
import TodosReducer from "./todos/reducer";

// Job
import JobReducer from "./jobs/reducer";

// API Key
import APIKeyReducer from "./apiKey/reducer";
import { contactUsSlices } from "./admin/constactUs/reducer";
import { auditTrailSlices } from "./admin/auditTrail/reducer";
import { systemLogSlices } from "./admin/systemLog/reducer";
import { boxGenerationSlices } from "./Box/boxGeneration/reducer";
import { usersSlices } from "./users/reducer";

const rootReducer = combineReducers({
  Users: usersSlices,
  Role: roleSlices,
  ContactUs: contactUsSlices,
  AuditTrail: auditTrailSlices,
  SystemLog: systemLogSlices,
  BoxGeneration: boxGenerationSlices,
  Layout: LayoutReducer,
  Login: loginSlices,
  Logout: authSlices,
  Boxes: boxSlices,
  BoxImages: boxImgesSlices,
  Tablets: tabletSlices,
  Address: addressSlices,
  UserBox: userBoxSlices,
  Delivery: deliverySlices,
  ShippingCompanies: shippingCompaniesSlices,
  Account: registerSlices,
  ForgetPassword: forgotPasswordSlices,
  VerifyPasswordOtp: verifySlices,
  Profile: ProfileReducer,
  Calendar: CalendarReducer,
  Chat: chatReducer,
  Projects: ProjectsReducer,
  Tasks: TasksReducer,
  Crypto: CryptoReducer,
  Tickets: TicketsReducer,
  Crm: CrmReducer,
  Invoice: InvoiceReducer,
  Mailbox: MailboxReducer,
  DashboardAnalytics: DashboardAnalyticsReducer,
  DashboardCRM: DashboardCRMReducer,
  DashboardEcommerce: DashboardEcommerceReducer,
  DashboardCrypto: DashboardCryptoReducer,
  DashboardProject: DashboardProjectReducer,
  DashboardNFT: DashboardNFTReducer,
  Team: TeamDataReducer,
  FileManager: FileManagerReducer,
  Todos: TodosReducer,
  Jobs: JobReducer,
  APIKey: APIKeyReducer,
});

export default rootReducer;
