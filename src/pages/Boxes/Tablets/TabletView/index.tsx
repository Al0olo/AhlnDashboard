import React from "react";
import { Container, Row } from "reactstrap";
import BreadCrumb from "../../../../Components/Common/BreadCrumb";
import Widgets from "./Widgets";
import TabletsData from "./TabletsData";

const TabletView = () => {
  document.title = "Tablets List | Ahln - React Admin & Dashboard";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Tablets List" pageTitle="Tablets" />
          <Row>
            <Widgets />
          </Row>
          <TabletsData />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default TabletView;
