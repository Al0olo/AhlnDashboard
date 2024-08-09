import React from "react";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";

import {
  LineChart,
  MonthlyRevenueChart,
  YearlyTotalInvestmentChart,
  Groupes
  //   ZoomableTimeseries,
  // LinewithDataLabels,
  //   DashedLine,
  //   LinewithAnnotations,
  //   BrushChart,
  //   BrushChart1,
  //   SteplineChart,
  //   GradientCharts,
  //   MissingData,
  //   ChartSyncingLine,
  //   ChartSyncingLine2,
  //   ChartSyncingArea,
} from "./LineCharts";

const SideChart = () => {
  
  return (
    <React.Fragment>
      <div className="page-content mt-0 mb-0  p-0">
        {/* <Container fluid className="p-0 "> */}
          {/* <BreadCrumb title="Line Charts" pageTitle="Apexcharts" /> */}
          <Row className="">
          <Col xl={12} className="ahln-chart-height">
                        <Card className="ahln-recent-chart">
                            <CardHeader>
                                <h4 className="card-title mb-0 ahln-chart-line">Custormers Satisfaction</h4>
                            </CardHeader>
                            <CardBody className="ahln-line-chart">
                                <LineChart dataColors='["--vz-info-rgb, 0.2", "--vz-info", "--vz-success-rgb, 0.2", "--vz-success"]'/>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col lg={12} className="mt-0" >
                            <Card className="ahln-recent-chart">
                                <CardHeader>
                                    <h4 className="card-title mb-0 ahln-chart-line ">Target vs Reality</h4>
                                </CardHeader>
                                <CardBody>
                                    <Groupes dataColors='["--vz-info", "--vz-warning"]'/>
                                </CardBody>
                            </Card>
                        </Col>
           

          </Row> 
        {/* </Container> */}
      </div>
    </React.Fragment>
  );
};

export default SideChart;
