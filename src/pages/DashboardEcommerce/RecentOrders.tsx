import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import { recentOrders } from "../../common/data";
import { LineChart } from "pages/Charts/ChartsJs/ChartsJs";
import LineCharts from "./LineCharts";
import SideChart from "./LineCharts/SideChart";

const RecentOrders = () => {
  return (
    <React.Fragment>
      <Row>
        <Col md={7} className="p-0">
          <Card>
            <CardHeader className="align-items-center d-flex">
              <h4 className="card-title mb-0 flex-grow-1 recent-orders-title">New Arrivals</h4>
              <div className="flex-shrink-0">
                <button type="button" className="btn btn-soft-primary btn-sm">
                  <i className="ri-file-list-3-line align-middle"></i> Generate
                  Report
                </button>
              </div>
            </CardHeader>

            <CardBody>
              <div className="table-responsive table-card">
                <table className="table table-borderless table-centered align-middle table-nowrap mb-0">
                  <thead className="">
                    <tr>
                      <th className="th-recent-orders" scope="col">Order ID</th>
                      <th className="th-recent-orders" scope="col">Customer</th>
                      <th className="th-recent-orders" scope="col">Product</th>
                      <th className="th-recent-orders" scope="col">Vendor</th>
                      <th className="th-recent-orders" scope="col">Status</th>
                      <th className="th-recent-orders" scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(recentOrders || []).map((item, key) => (
                      <tr key={key} className="text-muted">
                        <td className="td-recent-orders">
                          <Link
                            to="/apps-ecommerce-order-details"
                            className="fw-medium text-reset"
                          >
                            {item.orderId}
                          </Link>
                        </td>
                        <td className="td-recent-orders">
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
                        <td className="td-recent-orders">{item.product}</td>
                        <td className="td-recent-orders">{item.vendor}</td>
                        <td className="td-recent-orders">
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
                        <td>
                          <Link to={``} className="text-muted"><i className="ri-edit-box-line "></i> </Link>
                          <Link to={``} className="text-muted"><i className="ri-pencil-fill "></i> </Link>
                          <Link to={``} className="text-muted"><i className="ri-close-circle-line "></i> </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col md={4}>
        <SideChart />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default RecentOrders;
