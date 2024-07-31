import React, { useState } from "react";
import { Col, Container, Row } from "reactstrap";
import Widget from "./Widgets";
// import BestSellingProducts from "./BestSellingProducts";
import RecentActivity from "./RecentActivity";
import RecentOrders from "./RecentOrders";
import Revenue from "./Revenue";
// import SalesByLocations from "./SalesByLocations";
import Section from "./Section";
import LineCharts from "./LineCharts";
// import StoreVisits from "./StoreVisits";
// import TopSellers from "./TopSellers";

const DashboardEcommerce = () => {
  document.title = "Dashboard | Ahln - React Admin & Dashboard Template";

  const [rightColumn, setRightColumn] = useState<boolean>(false);
  const toggleRightColumn = () => {
    setRightColumn(!rightColumn);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col>
              <div className="h-100">
                <Section rightClickBtn={toggleRightColumn} />
                <Row>
                  <Widget />
                </Row>
                <Row>
                  <Col>
                    <LineCharts />
                    {/* <Revenue /> */}
                  </Col>
                </Row>
                {/* <Row>
                  <BestSellingProducts />
                  <TopSellers />
                </Row> */}
                <Row>
                  {/* <StoreVisits /> */}
                  <Col>
                    <RecentOrders />
                  </Col>
                </Row>
              </div>
            </Col>
            <RecentActivity
              rightColumn={rightColumn}
              hideRightColumn={toggleRightColumn}
            />
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default DashboardEcommerce;
