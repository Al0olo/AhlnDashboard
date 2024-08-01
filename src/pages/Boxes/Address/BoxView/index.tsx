import React from "react";
import { Container, Row } from "reactstrap";
import BreadCrumb from "../../../../Components/Common/BreadCrumb";
import Widgets from "./Widgets";
import BoxesData from "./BoxesData";

const BoxView = () => {
  document.title = "Boxes List | Ahln - React Admin & Dashboard";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Boxes List" pageTitle="Boxes" />
          <Row>
            <Widgets />
          </Row>
          <BoxesData />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default BoxView;
