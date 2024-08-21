import React from "react";
import { Container } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import UsersData from "./UsersData";

const UserView = () => {
  document.title = "Users List | Ahln - Admin & Dashboard";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Users List" pageTitle="Users" />
          <UsersData />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default UserView;
