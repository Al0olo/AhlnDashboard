import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardHeader, Col, Input, Row } from "reactstrap";
import { recentOrders } from "../../../../common/data";

const SharedDevices = () => {
  return (
    <React.Fragment>
      <Row>
        <Col md={12} className="p-0">
          <Card className="border card-border-muted">
            <CardBody className="">
              <div className="table-responsive table-card">
                <table className="table table-centered align-middle table-nowrap mb-0 w-100">
                  <thead className="">
                    <tr  className="text-center">
                      <th className="" scope="col">
                        Customer
                      </th>
                      <th className="" scope="col">
                        Product
                      </th>
                      <th className="" scope="col">
                        Vendor
                      </th>
                      <th className="" scope="col">
                        Status
                      </th>
                      <th className="" scope="col">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody >
                    {(recentOrders || []).map((item, key) => (
                      <tr key={key} className="text-muted">
                        
                        <td className="text-center">
                          <div className="d-flex align-items-center">
                            <div className="flex-shrink-0 me-2">
                              <img
                                src={item.img}
                                alt=""
                                className="avatar-xs rounded-circle"
                              />
                            </div>
                            <div className="flex-grow-1">{item.name}</div>
                          </div>
                        </td>
                        <td className="text-center">{item.product}</td>
                        <td className="text-center">{item.vendor}</td>
                        <td className="text-center">
                          <span
                            className={
                              "badge bg-" +
                              item.statusClass +
                              "-subtle text-" +
                              item.statusClass
                            }
                          >
                            {item.status}
                          </span>
                        </td>
                        <td className="text-center">
                          <Link to={``} className="text-muted">
                            <i className="ri-edit-box-line "></i>{" "}
                          </Link>
                          <Link to={``} className="text-muted">
                            <i className="ri-pencil-fill "></i>{" "}
                          </Link>
                          <Link to={``} className="text-muted">
                            <i className="ri-close-circle-line "></i>{" "}
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default SharedDevices;
