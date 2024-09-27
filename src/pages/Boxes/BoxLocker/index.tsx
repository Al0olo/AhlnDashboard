import React from "react";
import { Container } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import BoxLockerData from "./BoxLockerData";

const BoxLockerView = () => {
  document.title = "Boxes Lockers List | Ahln - Admin & Dashboard";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Boxes Lockers List" pageTitle="Boxes Lockers" />
          <BoxLockerData />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default BoxLockerView;
