import React from "react";
import { Container } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import UserPermissionsData from "./UserPermissionsData";

const UserPermissionView = () => {
  document.title = "User Permissions List | Ahln - Admin & Dashboard";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb
            title="User Permissions List"
            pageTitle="User Permissions"
          />
          <UserPermissionsData />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default UserPermissionView;
