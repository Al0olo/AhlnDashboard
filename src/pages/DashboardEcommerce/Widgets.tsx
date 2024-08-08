import React from "react";
import CountUp from "react-countup";
import { Link } from "react-router-dom";
import { Card, CardBody, Col } from "reactstrap";
import { ecomWidgets } from "../../common/data";

const Widgets = () => {
  return (
    <React.Fragment>
      {ecomWidgets.map((item, key) => (
        <Col lg={2}>
          <Card className="card-animate rounded round-5">
            <Link to="#" className="">
              <CardBody md={12} className={"bg-" +item.bgcolor +
                        "-subtle"}>
                <div className="position-relative">
                  <div className="widget-number ">
                    <h4 className="fs-20 fw-semibold ff-secondary mb-4  ">
                      <span className="counter-value" data-target="559.25">
                        <CountUp
                          start={0}
                          prefix={item.prefix}
                          suffix={item.suffix}
                          separator={item.separator}
                          end={item.counter}
                          decimals={item.decimals}
                          duration={4}
                        />
                      </span>
                    </h4>
                    {/* {item.link} */}
                  </div>
                  <div className="flex-grow-1 overflow-hidden">
                    <p className="text-capitalize fw-larage text-muted text-truncate mb-0">
                      {item.label}
                    </p>
                  </div>
                  <div className="avatar-sm flex-shrink-0 rounded-circle dash-icon">
                    <span
                      className={
                        "avatar-title rounded-circle fs-3 p-0 text-light bg-" +
                        item.bgcolor 
                      }
                    >
                      <i className={`text-light ${item.icon}`}></i>
                    </span>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="flex-shrink-0">
                      <h5 className={"fs-12 mb-0 text-" + item.badgeClass}>
                        {item.badge ? (
                          <i className={"fs-11 align-middle " + item.badge}></i>
                        ) : null}{" "}
                        {item.percentage} % <span className="text-muted">from yesterday</span>
                      </h5>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Link>
          </Card>
        </Col>
      ))}
    </React.Fragment>
  );
};

export default Widgets;
