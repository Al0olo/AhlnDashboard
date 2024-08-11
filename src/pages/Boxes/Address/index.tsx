import React from "react";
import { Container, Row } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import AddressesData from "./AddressesData";

const BoxView = () => {
  document.title = "Addresses List | Ahln - React Admin & Dashboard";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Addresses List" pageTitle="Addresses" />
          <AddressesData />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default BoxView;
