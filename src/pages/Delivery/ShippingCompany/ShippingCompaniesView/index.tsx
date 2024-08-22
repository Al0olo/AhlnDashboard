import React from "react";
import { Container } from "reactstrap";
import BreadCrumb from "../../../../Components/Common/BreadCrumb";
import ShippingCompaniesData from "./ShippingCompaniesData";

const ShippingCompaniesView = () => {
  document.title = "Shipping Companies List | Ahln - React Admin & Dashboard";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb
            title="Shipping Companies List"
            pageTitle="Shipping Companies"
          />
          <ShippingCompaniesData />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ShippingCompaniesView;
