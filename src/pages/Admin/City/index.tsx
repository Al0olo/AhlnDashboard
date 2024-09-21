import React from "react";
import { Container } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import CityData from "./CityData";

const CityView = () => {
  document.title = "City List | Ahln - React Admin & Dashboard";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="City List" pageTitle="City" />
          <CityData />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default CityView;
