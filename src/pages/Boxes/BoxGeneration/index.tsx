import React from "react";
import { Container, Row } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import BoxGenerationData from "./BoxGenerationData";

const BoxGenerationView = () => {
  document.title = "Box Generation List | Ahln - React Admin & Dashboard";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Box Generation List" pageTitle="Box Generation" />
          <BoxGenerationData />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default BoxGenerationView;
