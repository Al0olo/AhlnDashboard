import React from "react";
import { Card, Col, Row } from "reactstrap";
import SharedDevices from "./SharedDevices";

export const BoxesInfo = () => {
  return (
    <>
      <Col lg={10} className="round-4">
        {/* Box-Info */}
        <Card className="p-3">
          <Card className="rounded-4  card-border-muted p-3 ">
            <Row className="border-bottom border-light pb-1 mb-3">
              <Col lg={4}>
                <h5 className="ahln-module-title text-start">Box Name</h5>
              </Col>
              <Col lg={8} className="row d-flex justify-content-end">
                <button
                  className="col-md-6 btn-edit"
                  style={{ width: "fit-content" }}
                >
                  <i className="bx bx-edit" />
                  Edit
                </button>
              </Col>
            </Row>
            <Row>
              <Col lg={12} className="row">
                <Col lg={4}>
                  <p className="text-muted user-details-title">Country</p>
                  <p className="ahln-title-module user-details-info">Egypt</p>
                </Col>
                <Col lg={4}>
                  <p className="text-muted user-details-title">City/State</p>
                  <p className="ahln-title-module user-details-info">Cairo</p>
                </Col>
                <Col lg={4}>
                  <p className="text-muted user-details-title">Street</p>
                  <p className="ahln-title-module user-details-info">
                    Omar Ibn Alkhatab
                  </p>
                </Col>
              </Col>
            </Row>
            <Row className="mt-10">
              <Col lg={12} className="row">
                <Col lg={4}>
                  <p className="text-muted user-details-title">Building No.</p>
                  <p className="ahln-title-module user-details-info">22A</p>
                </Col>
                <Col lg={4}>
                  <p className="text-muted user-details-title">Floor</p>
                  <p className="ahln-title-module user-details-info">
                    14<sup className="text-info">th</sup>&nbsp; Floor
                  </p>
                </Col>

                <Col lg={4}>
                  <p className="text-muted user-details-title">Postal Code</p>
                  <p className="ahln-title-module .user-details-info text-start">
                    65845
                  </p>
                </Col>
              </Col>
            </Row>
          </Card>
        </Card>
        {/* /Box-Info */}
        {/* Box-location */}
        <Card className="p-3">
          <Card className="rounded-4  card-border-muted p-3 ">
            <Row className="border-bottom border-light pb-1 mb-3">
              <Col lg={9} className="text-start">
                <p>
                  Location:{" "}
                  <a href="">https://maps.app.goo.gl/ADu2H7jQczvSBc6Z7</a>
                </p>
              </Col>
            </Row>
            <Row>
              <div style={{ width: "100%" }}>
                <iframe
                  width="100%"
                  height={284}
                  frameBorder={0}
                  scrolling="no"
                  marginHeight={0}
                  marginWidth={0}
                  src="https://maps.google.com/maps?width=100%25&height=600&hl=en&q=1%20Grafton%20Street,%20Dublin,%20Ireland+(My%20Business%20Name)&t=&z=14&ie=UTF8&iwloc=B&output=embed"
                >
                  &lt;a href="https://www.gps.ie/"&gt;gps vehicle
                  tracker&lt;/a&gt;
                </iframe>
              </div>
            </Row>
          </Card>
        </Card>
        {/* /BOx-location */}

        {/* Box-data */}
        <Card className="p-3">
          <Card className="rounded-4  card-border-muted p-3 ">
            <Row className="border-bottom border-light pb-1 mb-3">
              <Col lg={4}>
                <h5 className="ahln-module-title text-start">User Sharing</h5>
              </Col>
              <Col lg={8} className="row d-flex justify-content-end">
                <button
                  className="col-md-6 btn-post"
                  style={{ width: "fit-content" }}
                >
                  <i className="bx bx-plus" />
                  Add sharing device
                </button>
              </Col>
            </Row>
            <Row>
              <SharedDevices/>
            </Row>
          </Card>
        </Card>
        {/* /BOx-data */}
      </Col>
    </>
  );
};
