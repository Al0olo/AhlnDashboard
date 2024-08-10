import React from "react";
import { Container, Row } from "reactstrap";
import BreadCrumb from "../../../../Components/Common/BreadCrumb";
import Widgets from "./Widgets";
import RolesData from "./RolesData";

const ShippingCompaniesView = () => {
  document.title = "Roles List | Ahln - Admin & Dashboard";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Roles List" pageTitle="Roles" />
          <Row>
            <Widgets />
          </Row>
          <RolesData />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ShippingCompaniesView;
