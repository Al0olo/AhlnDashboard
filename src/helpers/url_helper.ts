//REGISTER
export const POST_FAKE_REGISTER = "/auth/register";
export const POST_FAKE_LOGOUT = "/auth/logout";
export const POST_FAKE_VERIFY_EMAIL = "/auth/verify-email";

//LOGIN
export const POST_FAKE_LOGIN = "/auth/login";
export const POST_FAKE_JWT_LOGIN = "/post-jwt-login";
export const POST_FAKE_PASSWORD_FORGET = "/auth/resend-otp";
export const POST_FAKE_PASSWORD_RESET = "/auth/update-password";
export const POST_FAKE_JWT_PASSWORD_FORGET = "/jwt-forget-pwd";
export const SOCIAL_LOGIN = "/social-login";

// ADMINSTRATION
// CONTACT US
export const GET_CONTACT_US = "/contact-us/get-all";
export const GET_ONE_CONTACT_US = "/contact-us/get-one";
export const DELETE_CONTACT_US = "/contact-us/delete";

// AUDIT TRAIL
export const GET_AUDIT_TRAIL = "/audit-trail/get-all";
export const GET_ONE_AUDIT_TRAIL = "/audit-trail/get-one";
export const DELETE_AUDIT_TRAIL = "/audit-trail/delete";

// SYSTEM LOG
export const GET_SYSTEM_LOG = "/system-log/get-all";
export const GET_ONE_SYSTEM_LOG = "/system-log/get-one";
export const DELETE_SYSTEM_LOG = "/system-log/delete";

//ROLE
export const GET_ROLES = "/role/get-all";
export const GET_ONE_ROLE = "/role/get-one";
export const ADD_ROLE = "/role/new";
export const UPDATE_ROLE = "/role/update";
export const DELETE_ROLE = "/role/delete";

//BOX
export const GET_BOXES = "/box/get-all";
export const GET_ONE_BOX = "/box/get-one";
export const ADD_BOX = "/box/new";
export const UPDATE_BOX = "/box/update";
export const DELETE_BOX = "/box/delete";

// TABLETS
export const GET_TABLETS = "/tablet/get-all";
export const GET_ONE_TABLET = "/tablet/get-one";
export const ADD_TABLET = "/tablet/new";
export const UPDATE_TABLET = "/tablet/update";
export const DELETE_TABLET = "/tablet/delete";

// BOX GENERATION
export const GET_BOX_GENERATIONS = "/box-generation/get-all";
export const GET_ONE_BOX_GENERATION = "/box-generation/get-one";
export const ADD_BOX_GENERATION = "/box-generation/new";
export const UPDATE_BOX_GENERATION = "/box-generation/update";
export const DELETE_BOX_GENERATION = "/box-generation/delete";
export const UPDATE_HAS_OUTSIDE_CAMERA =
  "/box-generation/update-has-outside-camera-status";
export const UPDATE_HAS_INSIDE_CAMERA =
  "/box-generation/update-has-inside-camera-status";
export const UPDATE_HAS_TABLET = "/box-generation/update-has-tablet-status";

// ADDRESS
export const GET_ADDRESS = "/address/get-all";
export const GET_ONE_ADDRESS = "/address/get-one";
export const ADD_ADDRESS = "/address/new";
export const UPDATE_ADDRESS = "/address/update";
export const DELETE_ADDRESS = "/address/delete";

// USER BOX
export const GET_USER_BOXES = "/user-box/get-all";
export const GET_ONE_USER_BOX = "/user-box/get-one";
export const ASSIGN_USER_BOX = "/user-box/assign-box-to-user";
export const UPDATE_USER_BOX = "/user-box/update";
export const UPDATE_USER_BOX_STATUS = "/user-box/update-box-status";
export const DELETE_USER_BOX = "/user-box/delete";

// BOX IMAGES
export const GET_BOX_IMAGES = "/box-image/get-all-admin";

// RELATIVE CUSTOMER
export const GET_RELATIVE_CUSTOMER = "/relative-customer/get-all-admin";
export const UPDATE_RELATIVE_CUSTOMER_STATUS =
  "/relative-customer/update-status";

// DELIVERY
// DELIVERY PACKAGE
export const GET_DELIVERY_ALL = "/delivery-package/get-all";
export const GET_ONE_DELIVERY = "/delivery-package/get-one";

// SHIPPING COMPANIES
export const GET_SHIPPING_COMPANIES = "/shipping-company/get-all";
export const GET_ONE_SHIPPING_COMPANY = "/shipping-company/get-one";
export const ADD_SHIPPING_COMPANY = "/shipping-company/new";
export const UPDATE_SHIPPING_COMPANY = "/shipping-company/update";
export const DELETE_SHIPPING_COMPANY = "/shipping-company/delete";

//PROFILE
export const POST_EDIT_JWT_PROFILE = "/post-jwt-profile";
export const POST_EDIT_PROFILE = "/user";

// Calendar
export const GET_EVENTS = "/events";
export const GET_CATEGORIES = "/categories";
export const GET_UPCOMMINGEVENT = "/upcommingevents";
export const ADD_NEW_EVENT = "/add/event";
export const UPDATE_EVENT = "/update/event";
export const DELETE_EVENT = "/delete/event";

// Chat
export const GET_DIRECT_CONTACT = "/chat";
export const GET_MESSAGES = "/messages";
export const ADD_MESSAGE = "add/message";
export const GET_CHANNELS = "/channels";
export const DELETE_MESSAGE = "delete/message";

// Mailbox
export const GET_MAIL_DETAILS = "/mail";
export const DELETE_MAIL = "/delete/mail";
export const UNREAD_MAIL = "/unread/mail";
export const STARED_MAIL = "/stared/mail";
export const LABEL_MAIL = "/label/mail";
export const TRASH_MAIL = "/trash/mail";

// Ecommerce
//Models

// Models
export const GET_MODELS = "box-generation/get-all";
export const DELETE_MODEL = "/box-generation/delete/";
export const ADD_NEW_MODEL = "/box-generation/new";
export const UPDATE_MODEL = "/box-generation/update/";
export const GET_MODEL_ID = "/box-generation/get-one/";
// Product
export const GET_PRODUCTS = "/product";
export const DELETE_PRODUCT = "/delete/product";
export const ADD_NEW_PRODUCT = "/add/product";
export const UPDATE_PRODUCT = "/update/product";

// Orders
export const GET_ORDERS = "/order";
export const ADD_NEW_ORDER = "/add/order";
export const UPDATE_ORDER = "/update/order";
export const DELETE_ORDER = "/delete/order";

// Customers
export const GET_CUSTOMERS = "/users/get-all";
export const ADD_NEW_CUSTOMER = "/users/new";
export const UPDATE_CUSTOMER = "/users/update";
export const UPDATE_USER_STATUS = "/users/update-user-status";
export const DELETE_CUSTOMER = "/users/delete";

// Sellers
export const GET_SELLERS = "/sellers";

// Project list
export const GET_PROJECT_LIST = "/project/list";

// Task
export const GET_TASK_LIST = "/apps/task";
export const ADD_NEW_TASK = "/apps/task";
export const UPDATE_TASK = "/apps/task";
export const DELETE_TASK = "/apps/task";

// kanban
export const GET_TASKS = "/apps/tasks";
export const ADD_TASKS = "/add/tasks";
export const UPDATE_TASKS = "/update/tasks";
export const DELETE_TASKS = "/delete/tasks";

// CRM
// Conatct
export const GET_CONTACTS = "/apps/contact";
export const ADD_NEW_CONTACT = "/apps/contact";
export const UPDATE_CONTACT = "/apps/contact";
export const DELETE_CONTACT = "/apps/contact";

// Companies
export const GET_COMPANIES = "/apps/company";
export const ADD_NEW_COMPANIES = "/apps/company";
export const UPDATE_COMPANIES = "/apps/company";
export const DELETE_COMPANIES = "/apps/company";

// Lead
export const GET_LEADS = "/apps/lead";
export const ADD_NEW_LEAD = "/apps/lead";
export const UPDATE_LEAD = "/apps/lead";
export const DELETE_LEAD = "/apps/lead";

// Deals
export const GET_DEALS = "/deals";

// Crypto
export const GET_TRANSACTION_LIST = "/transaction-list";
export const GET_ORDRER_LIST = "/order-list";

// Invoice
export const GET_INVOICES = "/apps/invoice";
export const ADD_NEW_INVOICE = "/apps/invoice";
export const UPDATE_INVOICE = "/apps/invoice";
export const DELETE_INVOICE = "/apps/invoice";

// TicketsList
export const GET_TICKETS_LIST = "/ticket";
export const ADD_NEW_TICKET = "/add/ticket";
export const UPDATE_TICKET = "/update/ticket";
export const DELETE_TICKET = "/delete/ticket";

// Dashboard Analytics

// Sessions by Countries
export const GET_ALL_DATA = "/all-data";
export const GET_HALFYEARLY_DATA = "/halfyearly-data";
export const GET_MONTHLY_DATA = "/monthly-data";

// Audiences Metrics
export const GET_ALLAUDIENCESMETRICS_DATA = "/allAudiencesMetrics-data";
export const GET_MONTHLYAUDIENCESMETRICS_DATA = "/monthlyAudiencesMetrics-data";
export const GET_HALFYEARLYAUDIENCESMETRICS_DATA =
  "/halfyearlyAudiencesMetrics-data";
export const GET_YEARLYAUDIENCESMETRICS_DATA = "/yearlyAudiencesMetrics-data";

// Users by Device
export const GET_TODAYDEVICE_DATA = "/todayDevice-data";
export const GET_LASTWEEKDEVICE_DATA = "/lastWeekDevice-data";
export const GET_LASTMONTHDEVICE_DATA = "/lastMonthDevice-data";
export const GET_CURRENTYEARDEVICE_DATA = "/currentYearDevice-data";

// Audiences Sessions by Country
export const GET_TODAYSESSION_DATA = "/todaySession-data";
export const GET_LASTWEEKSESSION_DATA = "/lastWeekSession-data";
export const GET_LASTMONTHSESSION_DATA = "/lastMonthSession-data";
export const GET_CURRENTYEARSESSION_DATA = "/currentYearSession-data";

// Dashboard CRM

// Balance Overview
export const GET_TODAYBALANCE_DATA = "/todayBalance-data";
export const GET_LASTWEEKBALANCE_DATA = "/lastWeekBalance-data";
export const GET_LASTMONTHBALANCE_DATA = "/lastMonthBalance-data";
export const GET_CURRENTYEARBALANCE_DATA = "/currentYearBalance-data";

// Deal type
export const GET_TODAYDEAL_DATA = "/todayDeal-data";
export const GET_WEEKLYDEAL_DATA = "/weeklyDeal-data";
export const GET_MONTHLYDEAL_DATA = "/monthlyDeal-data";
export const GET_YEARLYDEAL_DATA = "/yearlyDeal-data";

// Sales Forecast

export const GET_OCTSALES_DATA = "/octSales-data";
export const GET_NOVSALES_DATA = "/novSales-data";
export const GET_DECSALES_DATA = "/decSales-data";
export const GET_JANSALES_DATA = "/janSales-data";

// Dashboard Ecommerce
// Revenue
export const GET_ALLREVENUE_DATA = "/allRevenue-data";
export const GET_MONTHREVENUE_DATA = "/monthRevenue-data";
export const GET_HALFYEARREVENUE_DATA = "/halfYearRevenue-data";
export const GET_YEARREVENUE_DATA = "/yearRevenue-data";

// Dashboard Crypto
// Portfolio
export const GET_BTCPORTFOLIO_DATA = "/btcPortfolio-data";
export const GET_USDPORTFOLIO_DATA = "/usdPortfolio-data";
export const GET_EUROPORTFOLIO_DATA = "/euroPortfolio-data";

// Market Graph
export const GET_ALLMARKETDATA_DATA = "/allMarket-data";
export const GET_YEARMARKET_DATA = "/yearMarket-data";
export const GET_MONTHMARKET_DATA = "/monthMarket-data";
export const GET_WEEKMARKET_DATA = "/weekMarket-data";
export const GET_HOURMARKET_DATA = "/hourMarket-data";

// Dashboard Crypto
// Project Overview
export const GET_ALLPROJECT_DATA = "/allProject-data";
export const GET_MONTHPROJECT_DATA = "/monthProject-data";
export const GET_HALFYEARPROJECT_DATA = "/halfYearProject-data";
export const GET_YEARPROJECT_DATA = "/yearProject-data";

// Project Status
export const GET_ALLPROJECTSTATUS_DATA = "/allProjectStatus-data";
export const GET_WEEKPROJECTSTATUS_DATA = "/weekProjectStatus-data";
export const GET_MONTHPROJECTSTATUS_DATA = "/monthProjectStatus-data";
export const GET_QUARTERPROJECTSTATUS_DATA = "/quarterProjectStatus-data";

// Dashboard NFT
// Marketplace
export const GET_ALLMARKETPLACE_DATA = "/allMarketplace-data";
export const GET_MONTHMARKETPLACE_DATA = "/monthMarketplace-data";
export const GET_HALFYEARMARKETPLACE_DATA = "/halfYearMarketplace-data";
export const GET_YEARMARKETPLACE_DATA = "/yearMarketplace-data";

// Project
export const ADD_NEW_PROJECT = "/add/project";
export const UPDATE_PROJECT = "/update/project";
export const DELETE_PROJECT = "/delete/project";

// Pages > Team
export const GET_TEAMDATA = "/teamData";
export const DELETE_TEAMDATA = "/delete/teamData";
export const ADD_NEW_TEAMDATA = "/add/teamData";
export const UPDATE_TEAMDATA = "/update/teamData";

// File Manager
// Folder
export const GET_FOLDERS = "/folder";
export const DELETE_FOLDER = "/delete/folder";
export const ADD_NEW_FOLDER = "/add/folder";
export const UPDATE_FOLDER = "/update/folder";

// File
export const GET_FILES = "/file";
export const DELETE_FILE = "/delete/file";
export const ADD_NEW_FILE = "/add/file";
export const UPDATE_FILE = "/update/file";

// To do
export const GET_TODOS = "/todo";
export const DELETE_TODO = "/delete/todo";
export const ADD_NEW_TODO = "/add/todo";
export const UPDATE_TODO = "/update/todo";

// To do Project
export const GET_PROJECTS = "/projects";
export const ADD_NEW_TODO_PROJECT = "/add/project";

//JOB APPLICATION
export const GET_APPLICATION_LIST = "/application-list";
export const ADD_NEW_APPLICATION_LIST = "/add/application-list";
export const UPDATE_APPLICATION_LIST = "/update/application-list";
export const DELETE_APPLICATION_LIST = "/delete/application-list";

//JOB APPLICATION
export const GET_API_KEY = "/api-key";

// CANDIDATE LIST
export const GET_CANDIDATE = "/candidates";
export const ADD_NEW_CANDIDATE = "add/candidates";
export const UPDATE_CANDIDATE = "update/candidates";
export const DELETE_CANDIDATE = "delete/candidates";

export const GET_CANDIDATE_GRID = "/category-grid";
export const ADD_CANDIDATE_GRID = "/add/category-grid";

export const GET_CATEGORY_LIST = "/category-list";
export const ADD_CATEGORY_LIST = "/add/category-list";
