import React from "react";
import { Container, Row } from "reactstrap";
import BreadCrumb from "../../../../Components/Common/BreadCrumb";
import Widgets from "./Widgets";
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
          <Row>
            <Widgets />
          </Row>
          <ShippingCompaniesData />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ShippingCompaniesView;
