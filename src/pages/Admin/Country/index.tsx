import React from "react";
import { Container } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import CountryData from "./CountryData";

const CountryView = () => {
  document.title = "Country List | Ahln - React Admin & Dashboard";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Country List" pageTitle="Country" />
          <CountryData />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default CountryView;
