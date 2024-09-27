import React from "react";
import { Container } from "reactstrap";
import BreadCrumb from "../../../../Components/Common/BreadCrumb";
import CustomersData from "./CustomersData";

const CustomersView = () => {
  document.title = "Customers List | Ahln - Admin & Dashboard";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Customers List" pageTitle="Customers" />
          <CustomersData />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default CustomersView;
