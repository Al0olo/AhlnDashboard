import React from "react";
import { Card, Container, Row } from "reactstrap";
import BreadCrumb from "../../../../Components/Common/BreadCrumb";
import Widgets from "./Widgets";
import TabletsData from "./TabletsData";

const TabletView = () => {
  document.title = "Tablets List | Ahln - React Admin & Dashboard";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Card className="p-3">
            <BreadCrumb title="Tablets List" pageTitle="Tablets" />
            <Row>
              <Widgets />
            </Row>
          </Card>
          <TabletsData />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default TabletView;
