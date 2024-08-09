import React from "react";
import ReactApexChart from "react-apexcharts";
import { seriesData } from "../../Charts/ApexCharts/series";
import logoSm from "../../../assets/images/logo-sm.png";

import getChartColorsArray from "../../../Components/Common/ChartsDynamicColor";
import { Line } from "react-chartjs-2";

const MonthlyRevenueChart = ({ dataColors }: any) => {
  var linechartBasicColors = getChartColorsArray(dataColors);
  const series = [
    {
      name: "Desktops",
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
    },
  ];
  var options: any = {
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    markers: {
      size: 4,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    colors: linechartBasicColors,
    title: {
      text: "Product Trends by Month",
      align: "left",
      style: {
        fontWeight: 500,
      },
    },

    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
      ],
    },
  };
  return (
    <React.Fragment>
      <ReactApexChart
        dir="ltr"
        options={options}
        series={series}
        type="line"
        height="350"
        className="apex-charts"
      />
    </React.Fragment>
  );
};

const YearlyTotalInvestmentChart = ({ dataColors }: any) => {
  var linechartBasicColors = getChartColorsArray(dataColors);
  const series = [
    {
      name: "Desktops",
      data: [7, 33, 77, 111, 313, 214, 555, 450, 777],
    },
  ];
  var options: any = {
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    markers: {
      size: 4,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    colors: linechartBasicColors,
    title: {
      text: "Product Trends by Year",
      align: "left",
      style: {
        fontWeight: 500,
      },
    },

    xaxis: {
      categories: [
        "2019",
        "2020",
        "2021",
        "2022",
        "2023",
        "2024",
        "2025",
        "2026",
        "2027",
      ],
    },
  };
  return (
    <React.Fragment>
      <ReactApexChart
        dir="ltr"
        options={options}
        series={series}
        type="line"
        height="350"
        className="apex-charts"
      />
    </React.Fragment>
  );
};
const LineChart = ({dataColors} :any) => {
  var lineChartColor =  getChartColorsArray(dataColors);
  const data :any= {
      labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October"],
      // labels: ["", "", "", "", "", "", "", "", "", ""],
      datasets: [
          {
              label: "Sales Analytics",
              fill: true,
              lineTension: 0.5,
              backgroundColor: lineChartColor[0],
              borderColor: lineChartColor[1],
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: lineChartColor[1],
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: lineChartColor[1],
              pointHoverBorderColor: "#fff",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: [65, 59, 80, 81, 56, 55, 40, 55, 30, 80]
          },
          {
              label: "Monthly Earnings",
              fill: true,
              lineTension: 0.5,
              backgroundColor: lineChartColor[2],
              borderColor: lineChartColor[3],
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: lineChartColor[3],
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: lineChartColor[3],
              pointHoverBorderColor: "#EEF0F2",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: [80, 23, 56, 65, 23, 35, 85, 25, 92, 36]
          }
      ]
  }
  const option= {
      x: {
          ticks: {
              font: {
                  family: 'Poppins',
              },
          },
          gridLines:{
            color:"rgba(255,255,2555)"
          }
      },
      y: {
          ticks: {
              font: {
                  family: 'Poppins',
              },
          },
      },
      plugins: {
          legend: {
              labels: {
                  // This more specific font property overrides the global property
                  font: {
                      family: 'Poppins',
                  }
              }
          },
      },
      
  }
return (
  <React.Fragment>
    <Line width={517} height={320} data={data} options={option} />
  </React.Fragment>
)
}
const Groupes = ({ dataColors } : any) => {
  var chartGroupbarColors = getChartColorsArray(dataColors);
  const series = [
      {
          data: [44, 55, 41, 64, 22, 43, 21],
      },
      {
          data: [53, 32, 33, 52, 13, 44, 32],
      },
  ];

  var options :any= {
      chart: {
          type: 'bar',
          height: 410,
          toolbar: {
              show: false,
          }
      },
      plotOptions: {
          bar: {
              horizontal: false,
              dataLabels: {
                  position: 'top',
              },
          }
      },
      dataLabels: {
          enabled: true,
          offsetX: -6,
          style: {
              fontSize: '12px',
              colors: ['#fff']
          }
      },
      stroke: {
          show: true,
          width: 1,
          colors: ['#fff']
      },
      tooltip: {
          shared: true,
          intersect: false
      },
      xaxis: {
          categories: [2001, 2002, 2003, 2004, 2005, 2006, 2007],
      },
      colors: chartGroupbarColors
  };
  return (
      <React.Fragment>
          <ReactApexChart
              dir="ltr"
              className="apex-charts"
              options={options}
              series={series}
              type="bar"
              height={200}
              width={`100%`}
          />
      </React.Fragment>
  );
};
export {
  MonthlyRevenueChart,
  YearlyTotalInvestmentChart,
  LineChart,
  Groupes
};
