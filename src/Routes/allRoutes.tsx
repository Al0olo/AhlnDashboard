import { Navigate } from "react-router-dom";

//Dashboard
import DashboardAnalytics from "../pages/DashboardAnalytics";
// import DashboardCrm from "../pages/DashboardCrm";
import DashboardEcommerce from "../pages/DashboardEcommerce";

// Email box
import MailInbox from "../pages/EmailInbox";

//Invoices
import InvoiceCreate from "../pages/Invoices/InvoiceCreate";
import InvoiceDetails from "../pages/Invoices/InvoiceDetails";
import InvoiceList from "../pages/Invoices/InvoiceList";

// Support Tickets
import ListView from "../pages/SupportTickets/ListView";
import TicketsDetails from "../pages/SupportTickets/TicketsDetails";

//Ecommerce Pages
//Models
import EcommerceAddModel from "../pages/Ecommerce/EcommerceModels/EcommerceAddModel";
import EcommerceModelDetail from "../pages/Ecommerce/EcommerceModels/EcommerceModelDetail";
import EcommerceModels from "../pages/Ecommerce/EcommerceModels/index";

//Products
import EcommerceAddProduct from "../pages/Ecommerce/EcommerceProducts/EcommerceAddProduct";
import EcommerceProductDetail from "../pages/Ecommerce/EcommerceProducts/EcommerceProductDetail";
import EcommerceProducts from "../pages/Ecommerce/EcommerceProducts/index";
// import EcommerceCustomers from "../pages/Ecommerce/EcommerceCustomers/index";
import EcommerceCart from "../pages/Ecommerce/EcommerceCart";
import EcommerceCheckout from "../pages/Ecommerce/EcommerceCheckout";
import EcommerceCustomers from "../pages/Ecommerce/EcommerceCustomers/index";
import EcommerceOrderDetail from "../pages/Ecommerce/EcommerceOrders/EcommerceOrderDetail";
import EcommerceOrders from "../pages/Ecommerce/EcommerceOrders/index";
import EcommerceSellerDetail from "../pages/Ecommerce/EcommerceSellers/EcommerceSellerDetail";
import EcommerceSellers from "../pages/Ecommerce/EcommerceSellers/index";

// Base Ui
import UiAccordions from "../pages/BaseUi/UiAccordion&Collapse/UiAccordion&Collapse";
import UiAlerts from "../pages/BaseUi/UiAlerts/UiAlerts";
import UiBadges from "../pages/BaseUi/UiBadges/UiBadges";
import UiButtons from "../pages/BaseUi/UiButtons/UiButtons";
import UiCards from "../pages/BaseUi/UiCards/UiCards";
import UiCarousel from "../pages/BaseUi/UiCarousel/UiCarousel";
import UiColors from "../pages/BaseUi/UiColors/UiColors";
import UiDropdowns from "../pages/BaseUi/UiDropdowns/UiDropdowns";
import UiEmbedVideo from "../pages/BaseUi/UiEmbedVideo/UiEmbedVideo";
import UiGeneral from "../pages/BaseUi/UiGeneral/UiGeneral";
import UiGrid from "../pages/BaseUi/UiGrid/UiGrid";
import UiImages from "../pages/BaseUi/UiImages/UiImages";
import UiList from "../pages/BaseUi/UiLists/UiLists";
import UiMediaobject from "../pages/BaseUi/UiMediaobject/UiMediaobject";
import UiModals from "../pages/BaseUi/UiModals/UiModals";
import UiNotifications from "../pages/BaseUi/UiNotifications/UiNotifications";
import UiOffcanvas from "../pages/BaseUi/UiOffcanvas/UiOffcanvas";
import UiPlaceholders from "../pages/BaseUi/UiPlaceholders/UiPlaceholders";
import UiProgress from "../pages/BaseUi/UiProgress/UiProgress";
import UiRibbons from "../pages/BaseUi/UiRibbons/UiRibbons";
import UiTabs from "../pages/BaseUi/UiTabs/UiTabs";
import UiTypography from "../pages/BaseUi/UiTypography/UiTypography";
import UiUtilities from "../pages/BaseUi/UiUtilities/UiUtilities";

// Advance Ui
import UiAnimation from "../pages/AdvanceUi/UiAnimation/UiAnimation";
import UiHighlight from "../pages/AdvanceUi/UiHighlight/UiHighlight";
import UiRatings from "../pages/AdvanceUi/UiRatings/UiRatings";
import UiScrollbar from "../pages/AdvanceUi/UiScrollbar/UiScrollbar";
import UiSwiperSlider from "../pages/AdvanceUi/UiSwiperSlider/UiSwiperSlider";

// Widgets
import Widgets from "../pages/Widgets/Index";

//Forms
import BasicElements from "../pages/Forms/BasicElements/BasicElements";
import CheckBoxAndRadio from "../pages/Forms/CheckboxAndRadio/CheckBoxAndRadio";
import FileUpload from "../pages/Forms/FileUpload/FileUpload";
import FormAdvanced from "../pages/Forms/FormAdvanced/FormAdvanced";
import FormEditor from "../pages/Forms/FormEditor/FormEditor";
import Formlayouts from "../pages/Forms/FormLayouts/Formlayouts";
import FormPickers from "../pages/Forms/FormPickers/FormPickers";
import FormRangeSlider from "../pages/Forms/FormRangeSlider/FormRangeSlider";
import FormSelect from "../pages/Forms/FormSelect/FormSelect";
import FormValidation from "../pages/Forms/FormValidation/FormValidation";
import FormWizard from "../pages/Forms/FormWizard/FormWizard";
import Masks from "../pages/Forms/Masks/Masks";
import Select2 from "../pages/Forms/Select2/Select2";

//Tables
import BasicTables from "../pages/Tables/BasicTables/BasicTables";
import ReactTable from "../pages/Tables/ReactTables";

//Icon pages
import BoxIcons from "../pages/Icons/BoxIcons/BoxIcons";
import CryptoIcons from "../pages/Icons/CryptoIcons/CryptoIcons";
import FeatherIcons from "../pages/Icons/FeatherIcons/FeatherIcons";
import LineAwesomeIcons from "../pages/Icons/LineAwesomeIcons/LineAwesomeIcons";
import MaterialDesign from "../pages/Icons/MaterialDesign/MaterialDesign";
import RemixIcons from "../pages/Icons/RemixIcons/RemixIcons";

//Maps
import GoogleMaps from "../pages/Maps/GoogleMaps/GoogleMaps";

//AuthenticationInner pages
import BasicSignIn from "../pages/AuthenticationInner/Login/BasicSignIn";
import CoverSignIn from "../pages/AuthenticationInner/Login/CoverSignIn";
import BasicPasswReset from "../pages/AuthenticationInner/PasswordReset/BasicPasswReset";
import BasicSignUp from "../pages/AuthenticationInner/Register/BasicSignUp";
import CoverSignUp from "../pages/AuthenticationInner/Register/CoverSignUp";
//pages
import ComingSoon from "../pages/Pages/ComingSoon/ComingSoon";
import Faqs from "../pages/Pages/Faqs/Faqs";
import Gallery from "../pages/Pages/Gallery/Gallery";
import Maintenance from "../pages/Pages/Maintenance/Maintenance";
import Pricing from "../pages/Pages/Pricing/Pricing";
import Settings from "../pages/Pages/Profile/Settings/Settings";
import SimplePage from "../pages/Pages/Profile/SimplePage/SimplePage";
import SearchResults from "../pages/Pages/SearchResults/SearchResults";
import SiteMap from "../pages/Pages/SiteMap/SiteMap";
import Starter from "../pages/Pages/Starter/Starter";
import Team from "../pages/Pages/Team/Team";
import Timeline from "../pages/Pages/Timeline/Timeline";

import Alt404 from "../pages/AuthenticationInner/Errors/Alt404";
import Basic404 from "../pages/AuthenticationInner/Errors/Basic404";
import Cover404 from "../pages/AuthenticationInner/Errors/Cover404";
import Error500 from "../pages/AuthenticationInner/Errors/Error500";
import BasicLockScreen from "../pages/AuthenticationInner/LockScreen/BasicLockScr";
import CoverLockScreen from "../pages/AuthenticationInner/LockScreen/CoverLockScr";
import BasicLogout from "../pages/AuthenticationInner/Logout/BasicLogout";
import CoverLogout from "../pages/AuthenticationInner/Logout/CoverLogout";
import CoverPasswReset from "../pages/AuthenticationInner/PasswordReset/CoverPasswReset";
import BasicSuccessMsg from "../pages/AuthenticationInner/SuccessMessage/BasicSuccessMsg";
import CoverSuccessMsg from "../pages/AuthenticationInner/SuccessMessage/CoverSuccessMsg";
import BasicTwosVerify from "../pages/AuthenticationInner/TwoStepVerification/BasicTwosVerify";
import CoverTwosVerify from "../pages/AuthenticationInner/TwoStepVerification/CoverTwosVerify";

import Offlinepage from "../pages/AuthenticationInner/Errors/Offlinepage";
import BasicPasswCreate from "../pages/AuthenticationInner/PasswordCreate/BasicPasswCreate";
import CoverPasswCreate from "../pages/AuthenticationInner/PasswordCreate/CoverPasswCreate";

//login
import ForgetPasswordPage from "../pages/Authentication/ForgetPassword";
import ForgetPasswordOtpPage from "../pages/Authentication/ForgotPasswordOtpPage";
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";
import VerifyEmailPage from "../pages/Authentication/VerifyEmailPage";

//Charts
import AreaCharts from "../pages/Charts/ApexCharts/AreaCharts";
import BarCharts from "../pages/Charts/ApexCharts/BarCharts";
import BoxplotCharts from "../pages/Charts/ApexCharts/BoxplotCharts";
import BubbleChart from "../pages/Charts/ApexCharts/BubbleChart";
import CandlestickChart from "../pages/Charts/ApexCharts/CandlestickChart";
import ColumnCharts from "../pages/Charts/ApexCharts/ColumnCharts";
import HeatmapCharts from "../pages/Charts/ApexCharts/HeatmapCharts";
import LineCharts from "../pages/Charts/ApexCharts/LineCharts";
import MixedCharts from "../pages/Charts/ApexCharts/MixedCharts";
import PieCharts from "../pages/Charts/ApexCharts/PieCharts";
import PolarCharts from "../pages/Charts/ApexCharts/PolarCharts";
import RadarCharts from "../pages/Charts/ApexCharts/RadarCharts";
import RadialbarCharts from "../pages/Charts/ApexCharts/RadialbarCharts";
import ScatterCharts from "../pages/Charts/ApexCharts/ScatterCharts";
import TimelineCharts from "../pages/Charts/ApexCharts/TimelineCharts";
import TreemapCharts from "../pages/Charts/ApexCharts/TreemapCharts";
import ChartsJs from "../pages/Charts/ChartsJs/index";
import Echarts from "../pages/Charts/ECharts/index";

// Landing Index
import NFTLanding from "../pages/Landing/NFTLanding";
import OnePage from "../pages/Landing/OnePage";

import JobLanding from "../pages/Job_Landing/Job";
import PrivecyPolicy from "../pages/Pages/PrivacyPolicy";
import TermsCondition from "../pages/Pages/TermsCondition";

// User Profilez
import EcommerceCustomerDetail from "pages/Ecommerce/EcommerceCustomers/CustomerDetail";
import EcommerceCustomerInfo from "pages/Ecommerce/EcommerceCustomers/CustomerInfo";
import EcommerceEditProduct from "pages/Ecommerce/EcommerceModels/EcommerceEditModel";
import UserProfile from "../pages/Authentication/user-profile";
import UILink from "../pages/BaseUi/UiLink/Index";
import FunnelCharts from "../pages/Charts/ApexCharts/FunnelCharts/Index";
import RangeArea from "../pages/Charts/ApexCharts/RangeAreaCharts/Index";
import ToDoList from "../pages/ToDo";

import AuditTrailView from "pages/Admin/AuditTrail";
import ContactUsView from "pages/Admin/ContactUs";
import RolesView from "pages/Admin/Role";
import SystemLogView from "pages/Admin/SystemLog";
import AddressView from "pages/Boxes/Address";
import BoxView from "pages/Boxes/Box/BoxView";
import BoxGenerationView from "pages/Boxes/BoxGeneration";
import BoxImagesView from "pages/Boxes/BoxImages";
import RelativeCustomerView from "pages/Boxes/RelativeCustomer";
import TabletView from "pages/Boxes/Tablets";
import UserBoxesView from "pages/Boxes/UserBoxes";
import DeliveryView from "pages/Delivery/DeliveryPackage/DeliveryPackageView";
import ShippingCompaniesView from "pages/Delivery/ShippingCompany/ShippingCompaniesView";

const authProtectedRoutes = [
  { path: "/dashboard-analytics", component: <DashboardAnalytics /> },
  { path: "/dashboard", component: <DashboardEcommerce /> },
  { path: "/index", component: <DashboardEcommerce /> },
  //Models

  { path: "/apps-ecommerce-models", component: <EcommerceModels /> },
  {
    path: "/apps-ecommerce-model-details/:id",
    component: <EcommerceModelDetail />,
  },
  {
    path: "/apps-ecommerce-model-details",
    component: <EcommerceModelDetail />,
  },
  { path: "/apps-ecommerce-add-model", component: <EcommerceAddModel /> },
  { path: "/apps-ecommerce-models", component: <EcommerceModels /> },
  {
    path: "/apps-ecommerce-model-details/:_id",
    component: <EcommerceModelDetail />,
  },
  {
    path: "/apps-ecommerce-model-details",
    component: <EcommerceModelDetail />,
  },
  { path: "/apps-ecommerce-add-model", component: <EcommerceAddModel /> },
  {
    path: "/apps-ecommerce-edit-model/:id",
    component: <EcommerceEditProduct />,
  },

  //Products

  { path: "/apps-ecommerce-products", component: <EcommerceProducts /> },
  {
    path: "/apps-ecommerce-product-details/:_id",
    component: <EcommerceProductDetail />,
  },
  {
    path: "/apps-ecommerce-product-details",
    component: <EcommerceProductDetail />,
  },
  { path: "/apps-ecommerce-add-product", component: <EcommerceAddProduct /> },
  //Orders
  { path: "/apps-ecommerce-products", component: <EcommerceProducts /> },
  {
    path: "/apps-ecommerce-product-details/:_id",
    component: <EcommerceProductDetail />,
  },
  {
    path: "/apps-ecommerce-product-details",
    component: <EcommerceProductDetail />,
  },
  { path: "/apps-ecommerce-add-product", component: <EcommerceAddModel /> },
  //Orders

  { path: "/apps-ecommerce-orders", component: <EcommerceOrders /> },
  {
    path: "/apps-ecommerce-order-details",
    component: <EcommerceOrderDetail />,
  },
  { path: "/apps-ecommerce-customers", component: <EcommerceCustomers /> },
  { path: "/apps-ecommerce-customer", component: <EcommerceCustomerInfo /> },
  { path: "/apps-ecommerce-customer-detail", component: <EcommerceCustomerDetail /> },
  { path: "/apps-ecommerce-cart", component: <EcommerceCart /> },
  { path: "/apps-ecommerce-checkout", component: <EcommerceCheckout /> },
  { path: "/apps-ecommerce-sellers", component: <EcommerceSellers /> },
  {
    path: "/apps-ecommerce-seller-details",
    component: <EcommerceSellerDetail />,
  },

  { path: "/apps-todo", component: <ToDoList /> },

  //EMail
  { path: "/apps-mailbox", component: <MailInbox /> },

  //Invoices
  { path: "/apps-invoices-list", component: <InvoiceList /> },
  { path: "/apps-invoices-details", component: <InvoiceDetails /> },
  { path: "/apps-invoices-create", component: <InvoiceCreate /> },

  //Supports Tickets
  { path: "/apps-tickets-list", component: <ListView /> },
  { path: "/apps-tickets-details", component: <TicketsDetails /> },

  //Boxes
  { path: "/boxes", component: <BoxView /> },
  { path: "/box-generation", component: <BoxGenerationView /> },
  { path: "/tablets", component: <TabletView /> },
  { path: "/addresses", component: <AddressView /> },
  { path: "/user-boxes", component: <UserBoxesView /> },
  { path: "/boxes-images", component: <BoxImagesView /> },

  // Delivery Packages
  { path: "/delivery-packages", component: <DeliveryView /> },
  { path: "/shipping-companies", component: <ShippingCompaniesView /> },

  // Admin
  { path: "/role", component: <RolesView /> },
  { path: "/contact-us", component: <ContactUsView /> },
  { path: "/audit-trail", component: <AuditTrailView /> },
  { path: "/system-log", component: <SystemLogView /> },

  //charts
  { path: "/charts-apex-line", component: <LineCharts /> },
  { path: "/charts-apex-area", component: <AreaCharts /> },
  { path: "/charts-apex-column", component: <ColumnCharts /> },
  { path: "/charts-apex-bar", component: <BarCharts /> },
  { path: "/charts-apex-mixed", component: <MixedCharts /> },
  { path: "/charts-apex-timeline", component: <TimelineCharts /> },
  { path: "/charts-apex-range-area", component: <RangeArea /> },
  { path: "/charts-apex-funnel", component: <FunnelCharts /> },
  { path: "/charts-apex-candlestick", component: <CandlestickChart /> },
  { path: "/charts-apex-boxplot", component: <BoxplotCharts /> },
  { path: "/charts-apex-bubble", component: <BubbleChart /> },
  { path: "/charts-apex-scatter", component: <ScatterCharts /> },
  { path: "/charts-apex-heatmap", component: <HeatmapCharts /> },
  { path: "/charts-apex-treemap", component: <TreemapCharts /> },
  { path: "/charts-apex-pie", component: <PieCharts /> },
  { path: "/charts-apex-radialbar", component: <RadialbarCharts /> },
  { path: "/charts-apex-radar", component: <RadarCharts /> },
  { path: "/charts-apex-polar", component: <PolarCharts /> },

  { path: "/charts-chartjs", component: <ChartsJs /> },
  { path: "/charts-echarts", component: <Echarts /> },

  // Base Ui
  { path: "/ui-alerts", component: <UiAlerts /> },
  { path: "/ui-badges", component: <UiBadges /> },
  { path: "/ui-buttons", component: <UiButtons /> },
  { path: "/ui-colors", component: <UiColors /> },
  { path: "/ui-cards", component: <UiCards /> },
  { path: "/ui-carousel", component: <UiCarousel /> },
  { path: "/ui-dropdowns", component: <UiDropdowns /> },
  { path: "/ui-grid", component: <UiGrid /> },
  { path: "/ui-images", component: <UiImages /> },
  { path: "/ui-tabs", component: <UiTabs /> },
  { path: "/ui-accordions", component: <UiAccordions /> },
  { path: "/ui-modals", component: <UiModals /> },
  { path: "/ui-offcanvas", component: <UiOffcanvas /> },
  { path: "/ui-placeholders", component: <UiPlaceholders /> },
  { path: "/ui-progress", component: <UiProgress /> },
  { path: "/ui-notifications", component: <UiNotifications /> },
  { path: "/ui-media", component: <UiMediaobject /> },
  { path: "/ui-embed-video", component: <UiEmbedVideo /> },
  { path: "/ui-typography", component: <UiTypography /> },
  { path: "/ui-lists", component: <UiList /> },
  { path: "/ui-links", component: <UILink /> },
  { path: "/ui-general", component: <UiGeneral /> },
  { path: "/ui-ribbons", component: <UiRibbons /> },
  { path: "/ui-utilities", component: <UiUtilities /> },

  // Advance Ui
  { path: "/advance-ui-scrollbar", component: <UiScrollbar /> },
  { path: "/advance-ui-animation", component: <UiAnimation /> },
  { path: "/advance-ui-swiper", component: <UiSwiperSlider /> },
  { path: "/advance-ui-ratings", component: <UiRatings /> },
  { path: "/advance-ui-highlight", component: <UiHighlight /> },

  // Widgets
  { path: "/widgets", component: <Widgets /> },

  // Forms
  { path: "/forms-elements", component: <BasicElements /> },
  { path: "/forms-select", component: <FormSelect /> },
  { path: "/forms-editors", component: <FormEditor /> },
  { path: "/forms-checkboxes-radios", component: <CheckBoxAndRadio /> },
  { path: "/forms-masks", component: <Masks /> },
  { path: "/forms-file-uploads", component: <FileUpload /> },
  { path: "/forms-pickers", component: <FormPickers /> },
  { path: "/forms-range-sliders", component: <FormRangeSlider /> },
  { path: "/forms-layouts", component: <Formlayouts /> },
  { path: "/forms-validation", component: <FormValidation /> },
  { path: "/forms-wizard", component: <FormWizard /> },
  { path: "/forms-advanced", component: <FormAdvanced /> },
  { path: "/forms-select2", component: <Select2 /> },

  //Tables
  { path: "/tables-basic", component: <BasicTables /> },
  { path: "/tables-react", component: <ReactTable /> },

  //Icons
  { path: "/icons-remix", component: <RemixIcons /> },
  { path: "/icons-boxicons", component: <BoxIcons /> },
  { path: "/icons-materialdesign", component: <MaterialDesign /> },
  { path: "/icons-feather", component: <FeatherIcons /> },
  { path: "/icons-lineawesome", component: <LineAwesomeIcons /> },
  { path: "/icons-crypto", component: <CryptoIcons /> },

  //Maps
  { path: "/maps-google", component: <GoogleMaps /> },

  //Pages
  { path: "/pages-starter", component: <Starter /> },
  { path: "/pages-profile", component: <SimplePage /> },
  { path: "/pages-profile-settings", component: <Settings /> },
  { path: "/pages-team", component: <Team /> },
  { path: "/pages-timeline", component: <Timeline /> },
  { path: "/pages-faqs", component: <Faqs /> },
  { path: "/pages-gallery", component: <Gallery /> },
  { path: "/pages-pricing", component: <Pricing /> },
  { path: "/pages-sitemap", component: <SiteMap /> },
  { path: "/pages-search-results", component: <SearchResults /> },

  { path: "/pages-privacy-policy", component: <PrivecyPolicy /> },
  { path: "/pages-terms-condition", component: <TermsCondition /> },

  //User Profile
  { path: "/profile", component: <UserProfile /> },

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  {
    path: "/",
    exact: true,
    component: <Navigate to="/dashboard" />,
  },
  {
    path: "/apps-ecommerce-relative-customers",
    component: <RelativeCustomerView />,
  },
  { path: "*", component: <Navigate to="/dashboard" /> },
];

const publicRoutes: any = [
  // Authentication Page
  { path: "/login", component: <Login /> },
  { path: "/logout", component: <Logout /> },
  { path: "/forgot-password", component: <ForgetPasswordPage /> },
  { path: "/forgot-password-otp", component: <ForgetPasswordOtpPage /> },
  { path: "/verify-email", component: <VerifyEmailPage /> },
  { path: "/register", component: <Register /> },

  //AuthenticationInner pages
  { path: "/auth-signin-basic", component: <BasicSignIn /> },
  { path: "/auth-signin-cover", component: <CoverSignIn /> },
  { path: "/auth-signup-basic", component: <BasicSignUp /> },
  { path: "/auth-signup-cover", component: <CoverSignUp /> },
  { path: "/auth-pass-reset-basic", component: <BasicPasswReset /> },
  { path: "/auth-pass-reset-cover", component: <CoverPasswReset /> },
  { path: "/auth-lockscreen-basic", component: <BasicLockScreen /> },
  { path: "/auth-lockscreen-cover", component: <CoverLockScreen /> },
  { path: "/auth-logout-basic", component: <BasicLogout /> },
  { path: "/auth-logout-cover", component: <CoverLogout /> },
  { path: "/auth-success-msg-basic", component: <BasicSuccessMsg /> },
  { path: "/auth-success-msg-cover", component: <CoverSuccessMsg /> },
  { path: "/auth-twostep-basic", component: <BasicTwosVerify /> },
  { path: "/auth-twostep-cover", component: <CoverTwosVerify /> },
  { path: "/auth-404-basic", component: <Basic404 /> },
  { path: "/auth-404-cover", component: <Cover404 /> },
  { path: "/auth-404-alt", component: <Alt404 /> },
  { path: "/auth-500", component: <Error500 /> },
  { path: "/pages-maintenance", component: <Maintenance /> },
  { path: "/pages-coming-soon", component: <ComingSoon /> },

  { path: "/landing", component: <OnePage /> },
  { path: "/nft-landing", component: <NFTLanding /> },
  { path: "/job-landing", component: <JobLanding /> },

  { path: "/auth-pass-change-basic", component: <BasicPasswCreate /> },
  { path: "/auth-pass-change-cover", component: <CoverPasswCreate /> },
  { path: "/auth-offline", component: <Offlinepage /> },
];

export { authProtectedRoutes, publicRoutes };

