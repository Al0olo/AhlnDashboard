import React from "react";
import { Card, Col, Row } from "reactstrap";

export const BasicInfo = () => {
  return (
    <>
      <Col lg={10} className="round-4">
        <Card className="p-3">
          <Card className="rounded-4  card-border-muted p-3 ">
            <Row className="border-bottom border-light pb-1 mb-3">
            <Col lg={4} >
              <h5 className="ahln-module-title text-start">Personal Information</h5>
            </Col>
            <Col lg={8} className="row d-flex justify-content-end">
                <button className="btn-edit border-0 text-danger col-md-6" style={{width:"fit-content"}}><i className="bx bx-trash" />Delete</button>
                <button className="col-md-6 btn-edit" style={{width:"fit-content"}}><i className="bx bx-edit" />Edit</button>
            </Col>
            </Row>
            <Row>
              <Col lg={12} className="row">
                <Col lg={4}>
                  <p className="text-muted user-details-title">Name</p>
                  <p className="ahln-title-module user-details-info">
                    Sara Jackson
                  </p>
                </Col>
                <Col lg={4}>
                  <p className="text-muted user-details-title">Phone Number</p>
                  <p className="ahln-title-module user-details-info">
                    +971507686191
                  </p>
                </Col>
                <Col lg={4}>
                  <p className="text-muted user-details-title">Email</p>
                  <p className="ahln-title-module user-details-info">
                    Osama.fathi1@gmail.com
                  </p>
                </Col>
              </Col>
            </Row>
            <Row className="mt-10">
              <Col lg={12} className="row">
                <Col lg={4}>
                  <p className="text-muted user-details-title">Country</p>
                  <p className="ahln-title-module user-details-info">
                    United Arab Emirates
                  </p>
                </Col>
                <Col lg={4}>
                  <p className="text-muted user-details-title">City</p>
                  <p className="ahln-title-module user-details-info">Sharga</p>
                </Col>

                <Col lg={4}>
                  <p className="text-muted user-details-title">No. of Boxes</p>
                  <p className="ahln-title-module .user-details-info text-start">
                    5 Boxes
                  </p>
                </Col>
              </Col>
            </Row>
          </Card>
        </Card>
      </Col>
    </>
  );
};
