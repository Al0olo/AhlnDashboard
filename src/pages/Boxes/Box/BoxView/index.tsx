import React from "react";
import { Card, Container, Row } from "reactstrap";
import BreadCrumb from "../../../../Components/Common/BreadCrumb";
import Widgets from "./Widgets";
import BoxesData from "./BoxesData";

const BoxView = () => {
  document.title = "Boxes List | Ahln - React Admin & Dashboard";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Card className="p-4">
            <BreadCrumb title="Boxes List" pageTitle="Boxes" />
            <Row>
              <Widgets />
            </Row>
          </Card>
          <BoxesData />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default BoxView;
