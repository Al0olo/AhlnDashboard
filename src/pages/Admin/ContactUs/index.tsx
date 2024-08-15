import React from "react";
import { Container } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import ContactUsData from "./ContactUsData";

const ContactUsView = () => {
  document.title = "Contact Us List | Ahln - Admin & Dashboard";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Contact Us List" pageTitle="ContactUs" />
          <ContactUsData />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ContactUsView;
