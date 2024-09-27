import React from "react";
import { Container } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import DeliveryPackageData from "./DeliveryPackageData";

const DeliveryPackageView = () => {
  document.title = "Delivery Package List | Ahln - React Admin & Dashboard";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb
            title="Delivery Package List"
            pageTitle="Delivery Package"
          />

          <DeliveryPackageData />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default DeliveryPackageView;
