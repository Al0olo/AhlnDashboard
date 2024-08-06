import React, { useState } from "react";
import * as moment from "moment";

const handleValidDate = (date: any) => {
  const date1 = moment(new Date(date)).format("DD MMM YY");
  return date1;
};

const handleValidTime = (time: any) => {
  const time1 = new Date(time);
  const getHour = time1.getUTCHours();
  const getMin = time1.getUTCMinutes();
  const getTime = `${getHour}:${getMin}`;
  var meridiem = "";
  if (getHour >= 12) {
    meridiem = "PM";
  } else {
    meridiem = "AM";
  }
  const updateTime = moment(getTime, "hh:mm").format("hh:mm") + " " + meridiem;
  return updateTime;
};

const Rating = (cell: any) => {
  return (
    <React.Fragment>
      <span>
        <span className="badge bg-light text-body fs-12 fw-medium">
          <i className="mdi mdi-star text-warning me-1"></i>
          {cell.value}
        </span>
      </span>
    </React.Fragment>
  );
};
const GetValid = (cell: any) => {
  let exist = cell.getValue();
  return (
    <React.Fragment>
      <span>
        <span className="badge bg-light text-body fs-12 fw-medium">
          {exist ==true?<i className="mdi mdi-check text-success me-1"></i> 
           : <i className="mdi mdi-cancel text-danger me-1"></i>
           }
        </span>
      </span>
    </React.Fragment>
  );
};
const Published = (cell: any) => {
  return (
    <React.Fragment>
      <span>
        {handleValidDate(cell.getValue())}
        <small className="text-muted ms-1">{handleValidTime(cell.value)}</small>
      </span>
    </React.Fragment>
  );
};

const Price = (cell: any) => {
  return <React.Fragment>{"$ " + cell.value + ".00"}</React.Fragment>;
};

export { Rating, Published, Price, GetValid };
