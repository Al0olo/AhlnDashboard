import React from "react";
import { Container } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import PermissionsData from "./PermissionsData";

const PermissionView = () => {
  document.title = "Permissions List | Ahln - Admin & Dashboard";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Permissions List" pageTitle="Permissions" />
          <PermissionsData />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default PermissionView;
