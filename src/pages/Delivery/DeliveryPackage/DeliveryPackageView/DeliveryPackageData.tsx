import React, { useEffect, useMemo, useState, useCallback } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  FormFeedback,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  UncontrolledDropdown,
} from "reactstrap";
//redux
import { useSelector, useDispatch } from "react-redux";
import TableContainer from "../../../../Components/Common/TableContainer";
import { GetDeliveryPackagesAction } from "../../../../slices/thunks";

import * as moment from "moment";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../../../Components/Common/Loader";
import { createSelector } from "reselect";

const DeliveryData = () => {
  const dispatch: any = useDispatch();
  const selectLayoutState = (state: any) => state.Delivery;

  const selectLayoutProperties = createSelector(selectLayoutState, (state) => ({
    deliveryList: state.data,
    isDeliverySuccess: state.isDeliverySuccess,
    error: state.error,
    loader: state.loading,
  }));

  // Inside your component
  const { deliveryList, error, loader } = useSelector(selectLayoutProperties);

  useEffect(() => {
    dispatch(GetDeliveryPackagesAction());
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
        header: "Customer ID",
        accessorKey: "customer_id",
        enableColumnFilter: false,
      },
      // {
      //   header: "Vendor ID",
      //   accessorKey: "vendor_id",
      //   enableColumnFilter: false,
      // },
      // {
      //   header: "Delivery ID",
      //   accessorKey: "delivery_id",
      //   enableColumnFilter: false,
      // },
      {
        header: "Tracking Number",
        accessorKey: "tracking_number",
        enableColumnFilter: false,
      },
      {
        header: "Create Date",
        accessorKey: "createdat",
        enableColumnFilter: false,
        cell: (cell: any) => moment(cell.getValue()).format("DD MMMM, YYYY"),
      },
      {
        header: "Address ID",
        accessorKey: "address_id",
        enableColumnFilter: false,
      },
      {
        header: "Shipping Company ID",
        accessorKey: "shipping_company_id",
        enableColumnFilter: false,
      },
      {
        header: "Box ID",
        accessorKey: "box_id",
        enableColumnFilter: false,
      },
      {
        header: "Shipment Status",
        accessorKey: "shipment_status",
        enableColumnFilter: false,
      },
      {
        header: "Delivered Status",
        accessorKey: "is_delivered",
        enableColumnFilter: false,
      },
      {
        header: "Title",
        accessorKey: "title",
        enableColumnFilter: false,
      },
      {
        header: "Description",
        accessorKey: "description",
        enableColumnFilter: false,
      },
      {
        header: "Other Shipping Company",
        accessorKey: "other_shipping_company",
        enableColumnFilter: false,
      },
      {
        header: "Actions",
        cell: (cell: any) => (
          <UncontrolledDropdown>
            <DropdownToggle tag="a" className="btn btn-soft-secondary btn-sm">
              <i className="ri-more-fill align-middle"></i>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-end">
              <li>
                <DropdownItem href="/apps-delivery-details">
                  <i className="ri-eye-fill align-bottom me-2 text-muted"></i>{" "}
                  View
                </DropdownItem>
              </li>
            </DropdownMenu>
          </UncontrolledDropdown>
        ),
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
                <h5 className="card-title mb-0 flex-grow-1">
                  Delivery Packages
                </h5>
              </div>
            </CardHeader>
            <CardBody className="pt-0">
              {loader ? (
                <Loader error={error} />
              ) : (
                <TableContainer
                  columns={columns}
                  data={deliveryList}
                  isGlobalFilter={true}
                  customPageSize={8}
                  divClass="table-responsive table-card mb-3"
                  tableClass="align-middle table-nowrap mb-0"
                  SearchPlaceholder="Search for delivery details or something..."
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

export default DeliveryData;
