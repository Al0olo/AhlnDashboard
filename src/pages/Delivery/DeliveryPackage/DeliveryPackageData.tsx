import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledDropdown,
  Modal,
  ModalBody,
  ModalHeader,
  CardText,
} from "reactstrap";
//redux
import { useDispatch } from "react-redux";
import TableContainer from "../../../Components/Common/TableContainer";
import {
  getDeliveryPackages,
  getOneDeliveryPackage,
} from "../../../slices/thunks";

import * as moment from "moment";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../../Components/Common/Loader";
import { useAppSelector } from "redux-hooks";

const DeliveryData = () => {
  const dispatch: any = useDispatch();
  const {
    deliveryPackages,
    loadingDeliveryPackage,
    loadingOneDeliveryPackage,
    deliveryPackage,
    error,
  } = useAppSelector((state) => state.Delivery);
  const [modal, setModal] = useState<boolean>(false);

  const toggle = useCallback(() => {
    setModal((prevState) => !prevState);
  }, [modal]);

  // View Data
  const handleDeliveryPackageClick = useCallback(
    (arg: any) => {
      dispatch(getOneDeliveryPackage(arg.id));
      toggle();
    },
    [toggle]
  );

  useEffect(() => {
    dispatch(getDeliveryPackages());
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
      {
        header: "Tracking Number",
        accessorKey: "tracking_number",
        enableColumnFilter: false,
      },
      {
        header: "Updated Date",
        accessorKey: "updatedat",
        enableColumnFilter: false,
        cell: (cell: any) => moment(cell.getValue()).format("DD MMMM, YYYY"),
      },
      {
        header: "Address ID",
        accessorKey: "address_id",
        enableColumnFilter: false,
      },
      {
        header: "Shipping Company Name",
        accessorKey: "shipping_company_name",
        enableColumnFilter: false,
      },
      {
        header: "Other Shipping Company",
        accessorKey: "other_shipping_company",
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
        header: "Actions",
        cell: (cell: any) => (
          <UncontrolledDropdown>
            <DropdownToggle tag="a" className="btn btn-soft-secondary btn-sm">
              <i className="ri-more-fill align-middle"></i>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-end">
              <li>
                <li>
                  <DropdownItem
                    className="edit-item-btn"
                    href="#showModal"
                    data-bs-toggle="modal"
                    onClick={() => {
                      handleDeliveryPackageClick(cell.row.original);
                    }}
                  >
                    <i className="ri-eye-fill align-bottom me-2 text-muted"></i>{" "}
                    View
                  </DropdownItem>
                </li>
              </li>
            </DropdownMenu>
          </UncontrolledDropdown>
        ),
      },
    ],
    [handleDeliveryPackageClick]
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
              {loadingDeliveryPackage ? (
                <Loader error={error} />
              ) : (
                <TableContainer
                  columns={columns}
                  data={deliveryPackages}
                  isGlobalFilter={true}
                  customPageSize={50}
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

      <Modal
        isOpen={modal}
        toggle={toggle}
        centered
        size="lg"
        className="border-0"
        modalClassName="zoomIn"
      >
        <ModalHeader toggle={toggle} className="p-3 bg-info-subtle">
          Delivery Package Details
        </ModalHeader>
        {loadingOneDeliveryPackage ? (
          <Loader error={error} />
        ) : (
          <ModalBody>
            <Row className="g-3">
              <Col lg={6}>
                <div>
                  <CardHeader className="DPCH my-3">
                    Delivery Package ID
                  </CardHeader>
                  <CardBody>
                    <CardText className="DPCT my-3">
                      {deliveryPackage?.id}
                    </CardText>
                  </CardBody>
                </div>
              </Col>
              <Col lg={6}>
                <div>
                  <CardHeader className="DPCH my-3">Title</CardHeader>
                  <CardBody>
                    <CardText className="DPCT my-3">
                      {deliveryPackage?.title}
                    </CardText>
                  </CardBody>
                </div>
              </Col>
            </Row>
            <Row className="g-3">
              <Col lg={6}>
                <div>
                  <CardHeader className="DPCH my-3">Created At</CardHeader>
                  <CardBody>
                    <CardText className="DPCT my-3">
                      {moment(deliveryPackage?.createdat).format(
                        "DD MMMM, YYYY"
                      )}
                    </CardText>
                  </CardBody>
                </div>
              </Col>
              <Col lg={6}>
                <div>
                  <CardHeader className="DPCH my-3">Updated At</CardHeader>
                  <CardBody>
                    <CardText className="DPCT my-3">
                      {moment(deliveryPackage?.updatedat).format(
                        "DD MMMM, YYYY"
                      )}
                    </CardText>
                  </CardBody>
                </div>
              </Col>
            </Row>
            <Row className="g-3">
              <Col lg={6}>
                <div>
                  <CardHeader className="DPCH my-3">Customer ID</CardHeader>
                  <CardBody>
                    <CardText className="DPCT my-3">
                      {deliveryPackage?.customer_id}
                    </CardText>
                  </CardBody>
                </div>
              </Col>
              <Col lg={6}>
                <div>
                  <CardHeader className="DPCH my-3">Vendor ID</CardHeader>
                  <CardBody>
                    <CardText className="DPCT my-3">
                      {deliveryPackage?.vendor_id}
                    </CardText>
                  </CardBody>
                </div>
              </Col>
            </Row>
            <Row className="g-3">
              <Col lg={6}>
                <div>
                  <CardHeader className="DPCH my-3">Delivery ID</CardHeader>
                  <CardBody>
                    <CardText className="DPCT my-3">
                      {deliveryPackage?.delivery_id}
                    </CardText>
                  </CardBody>
                </div>
              </Col>
              <Col lg={6}>
                <div>
                  <CardHeader className="DPCH my-3">Tracking Number</CardHeader>
                  <CardBody>
                    <CardText className="DPCT my-3">
                      {deliveryPackage?.tracking_number}
                    </CardText>
                  </CardBody>
                </div>
              </Col>
            </Row>
            <Row className="g-3">
              <Col lg={6}>
                <div>
                  <CardHeader className="DPCH my-3">Address ID</CardHeader>
                  <CardBody>
                    <CardText className="DPCT my-3">
                      {deliveryPackage?.address_id}
                    </CardText>
                  </CardBody>
                </div>
              </Col>
              <Col lg={6}>
                <div>
                  <CardHeader className="DPCH my-3">
                    Shipping Company Name
                  </CardHeader>
                  <CardBody>
                    <CardText className="DPCT my-3">
                      {deliveryPackage?.shipping_company_name}
                    </CardText>
                  </CardBody>
                </div>
              </Col>
            </Row>
            <Row className="g-3">
              <Col lg={6}>
                <div>
                  <CardHeader className="DPCH my-3">Box ID</CardHeader>
                  <CardBody>
                    <CardText className="DPCT my-3">
                      {deliveryPackage?.box_id}
                    </CardText>
                  </CardBody>
                </div>
              </Col>
              <Col lg={6}>
                <div>
                  <CardHeader className="DPCH my-3">Box Locker ID</CardHeader>
                  <CardBody>
                    <CardText className="DPCT my-3">
                      {deliveryPackage?.box_locker_id}
                    </CardText>
                  </CardBody>
                </div>
              </Col>
            </Row>
            <Row className="g-3">
              <Col lg={6}>
                <div>
                  <CardHeader className="DPCH my-3">Shipment Status</CardHeader>
                  <CardBody>
                    <CardText className="DPCT my-3">
                      {deliveryPackage?.shipment_status}
                    </CardText>
                  </CardBody>
                </div>
              </Col>
              <Col lg={6}>
                <div>
                  <CardHeader className="DPCH my-3">
                    Delivered Status
                  </CardHeader>
                  <CardBody>
                    <CardText className="DPCT my-3">
                      {deliveryPackage?.is_delivered}
                    </CardText>
                  </CardBody>
                </div>
              </Col>
            </Row>
            <Row className="g-3">
              <Col lg={6}>
                <div>
                  <CardHeader className="DPCH my-3">
                    Box Locker String
                  </CardHeader>
                  <CardBody>
                    <CardText className="DPCT my-3">
                      {deliveryPackage?.box_locker_string}
                    </CardText>
                  </CardBody>
                </div>
              </Col>
              <Col lg={6}>
                <div>
                  <CardHeader className="DPCH my-3">Description</CardHeader>
                  <CardBody>
                    <CardText className="DPCT my-3">
                      {deliveryPackage?.description}
                    </CardText>
                  </CardBody>
                </div>
              </Col>
            </Row>
            <Row className="g-3">
              <Col lg={6}>
                <div>
                  <CardHeader className="DPCH my-3">
                    Other Shipping Company
                  </CardHeader>
                  <CardBody>
                    <CardText className="DPCT my-3">
                      {deliveryPackage?.other_shipping_company}
                    </CardText>
                  </CardBody>
                </div>
              </Col>
              <Col lg={6}>
                <div>
                  <CardHeader className="DPCH my-3">OTP</CardHeader>
                  <CardBody>
                    <CardText className="DPCT my-3">
                      {deliveryPackage?.otp}
                    </CardText>
                  </CardBody>
                </div>
              </Col>
            </Row>
          </ModalBody>
        )}
        <div className="modal-footer">
          <div className="hstack gap-2 justify-content-end">
            <button onClick={toggle} type="button" className="btn btn-danger">
              Close
            </button>
          </div>
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default DeliveryData;
