import React from "react";
import { Container } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import AddressData from "./AddressData";

const BoxView = () => {
  document.title = "Address List | Ahln - React Admin & Dashboard";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Address List" pageTitle="Address" />
          <AddressData />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default BoxView;
