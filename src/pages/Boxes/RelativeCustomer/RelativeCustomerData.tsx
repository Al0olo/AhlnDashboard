import React, { useEffect, useMemo } from "react";
import { Card, CardBody, CardHeader, Col, Input, Row } from "reactstrap";
//redux
import { useSelector, useDispatch } from "react-redux";
import TableContainer from "../../../Components/Common/TableContainer";
import {
  GetRelativeCustomerAction,
  updateRelativeCustomerStatus,
} from "../../../slices/thunks";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../../Components/Common/Loader";
import { createSelector } from "reselect";
import moment from "moment";

const RelativeCustomerData = () => {
  const dispatch: any = useDispatch();

  const selectLayoutState = (state: any) => state.RelativeCustomer;

  const selectLayoutProperties = createSelector(selectLayoutState, (state) => ({
    relativeCustomerList: state.data,
    isuserBoxSuccess: state.isuserBoxSuccess,
    error: state.error,
    loader: state.loading,
  }));

  const updateStatusRelativeCustomer = (id: string, status: boolean) => {
    dispatch(updateRelativeCustomerStatus({ id, status }));
  };
  // Inside your component
  const { relativeCustomerList, error, loader } = useSelector(
    selectLayoutProperties
  );

  useEffect(() => {
    dispatch(GetRelativeCustomerAction());
  }, [dispatch]);

  const columns = useMemo(
    () => [
      {
        id: "#",
        accessorKey: "",
        enableColumnFilter: false,
        enableSorting: false,
      },
      {
        header: "ID",
        accessorKey: "id",
        enableColumnFilter: false,
      },
      {
        header: "Main Customer ID",
        accessorKey: "customer_id",
        enableColumnFilter: false,
      },
      {
        header: "Relative Customer",
        accessorKey: "relative_customer_id",
        enableColumnFilter: false,
      },
      {
        header: "Box ID",
        accessorKey: "box_id",
        enableColumnFilter: false,
      },
      {
        header: "Box Label",
        accessorKey: "box_label",
        enableColumnFilter: false,
      },
      {
        header: "Created At",
        accessorKey: "createdat",
        enableColumnFilter: false,
        cell: (cell: any) => moment(cell.getValue()).format("DD MMMM, YYYY"),
      },
      {
        header: "Phone Number",
        accessorKey: "phone_number",
        enableColumnFilter: false,
      },
      {
        header: "Relation",
        accessorKey: "relation",
        enableColumnFilter: false,
      },
      {
        header: "Email",
        accessorKey: "email",
        enableColumnFilter: false,
      },
      {
        header: "Status",
        accessorKey: "is_active",
        enableColumnFilter: false,
        cell: (cellProps: any) => {
          return (
            <div
              dir="ltr"
              className="form-check form-switch form-switch-sm float-right"
            >
              <Input
                type="switch"
                value={cellProps.getValue() === true ? "Active" : "Block"}
                className="form-check-input"
                onChange={(e) => {
                  updateStatusRelativeCustomer(
                    cellProps.row.original.id,
                    e.target.checked
                  );
                }}
                defaultChecked={cellProps.getValue() === true ? true : false}
              ></Input>
            </div>
          );
        },
      },
    ],
    []
  );

  return (
    <React.Fragment>
      <Row>
        <Col lg={12}>
          <Card>
            <CardHeader className="border-0">
              <div className="d-flex align-items-center">
                <h5 className="card-user_id mb-0 flex-grow-1">
                  Relative Customers
                </h5>
              </div>
            </CardHeader>
            <CardBody className="pt-0">
              {loader ? (
                <Loader error={error} />
              ) : (
                <TableContainer
                  columns={columns}
                  data={relativeCustomerList}
                  isGlobalFilter={true}
                  customPageSize={8}
                  divClass="table-responsive table-card mb-3"
                  tableClass="align-middle table-nowrap mb-0"
                  SearchPlaceholder="Search for relative customers details or something..."
                />
              )}
              <ToastContainer closeButton={false} limit={1} />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default RelativeCustomerData;
