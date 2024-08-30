import React from "react";
import { Container } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import RolePermissionsData from "./RolePermissionsData";

const RolePermissionView = () => {
  document.title = "Role Permissions List | Ahln - Admin & Dashboard";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb
            title="Role Permissions List"
            pageTitle="Role Permissions"
          />
          <RolePermissionsData />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default RolePermissionView;
