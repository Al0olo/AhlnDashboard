import React from "react";
import { Container } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import RolesData from "./RolesData";

const RoleView = () => {
  document.title = "Roles List | Ahln - Admin & Dashboard";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Roles List" pageTitle="Roles" />
          <RolesData />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default RoleView;
