import React from "react";
import { Container } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import BoxImagesData from "./BoxesImagesData";

const BoxImagesView = () => {
  document.title = "Boxes Images List | Ahln - Admin & Dashboard";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Boxes Images List" pageTitle="Boxes Images" />
          <BoxImagesData />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default BoxImagesView;
