import React from "react";
import { Container } from "reactstrap";
import BreadCrumb from "../../../../Components/Common/BreadCrumb";
import RelativeCustomerData from "./RelativeCustomerData";

const RelativeCustomerView = () => {
  document.title = "Relative Customer List | Ahln - Admin & Dashboard";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb
            title="Relative Customer List"
            pageTitle="Relative Customer"
          />
          <RelativeCustomerData />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default RelativeCustomerView;
