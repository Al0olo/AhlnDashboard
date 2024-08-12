import React from "react";
import { Container } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import AuditTrailData from "./AuditTrailData";

const AuditTrailView = () => {
  document.title = "Audit Trail List | Ahln - Admin & Dashboard";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Audit Trail List" pageTitle="AuditTrail" />
          <AuditTrailData />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default AuditTrailView;
