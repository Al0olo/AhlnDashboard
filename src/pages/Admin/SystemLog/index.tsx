import React from "react";
import { Container } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import SystemLogData from "./SystemLogData";

const SystemLogView = () => {
  document.title = "System Log List | Ahln - Admin & Dashboard";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="System Log List" pageTitle="SystemLog" />
          <SystemLogData />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default SystemLogView;
