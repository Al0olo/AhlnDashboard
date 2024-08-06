import React from "react";
import { Container, Row } from "reactstrap";
import BreadCrumb from "../../../../Components/Common/BreadCrumb";
import Widgets from "./Widgets";
import DeliveryPackageData from "./DeliveryPackageData";

const BoxView = () => {
  document.title = "Delivery Package List | Ahln - React Admin & Dashboard";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb
            title="Delivery Package List"
            pageTitle="Delivery Package"
          />
          <Row>
            <Widgets />
          </Row>
          <DeliveryPackageData />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default BoxView;
