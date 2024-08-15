import React from "react";
import { Container } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import UserBoxesData from "./UserBoxesData";

const UserBoxView = () => {
  document.title = "User Boxes List | Ahln - Admin & Dashboard";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="User Boxes List" pageTitle="User Boxes" />
          <UserBoxesData />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default UserBoxView;
