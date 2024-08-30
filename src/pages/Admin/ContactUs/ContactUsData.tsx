import React, { useEffect, useMemo, useState, useCallback } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardText,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  UncontrolledDropdown,
} from "reactstrap";
//redux
import { useDispatch } from "react-redux";
import TableContainer from "../../../Components/Common/TableContainer";
import {
  GetContactUsAction,
  DeleteContactUsAction,
  GetOneContactUsAction,
} from "../../../slices/thunks";

// Formik

import DeleteModal from "../../../Components/Common/DeleteModal";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../../Components/Common/Loader";
import moment from "moment";
import { useAppSelector } from "redux-hooks";

const ContactUsData = () => {
  const dispatch: any = useDispatch();

  const { contactUsList, loading, error, loadingOne, oneContactUs } =
    useAppSelector((state) => state.ContactUs);

  const [contactUs, setContactUs] = useState<any>([]);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);

  // Delete Data
  const onClickDelete = (contactUs: any) => {
    setContactUs(contactUs);
    setDeleteModal(true);
  };

  const handleDeletecontactUs = async () => {
    if (contactUs) {
      dispatch(DeleteContactUsAction(contactUs.id)).then((result: any) => {
        if (result.type === "contactUs/delete/fulfilled") {
          toast.success("Contact Us Deleted Successfully", {
            autoClose: 3000,
          });
        } else {
          toast.error(`Error ${result.payload}`, {
            autoClose: 3000,
          });
        }
      });

      setDeleteModal(false);
    }
  };
  const toggle = useCallback(() => {
    setModal((prevState) => !prevState);
  }, [modal]);
  // Get Data

  useEffect(() => {
    dispatch(GetContactUsAction());
  }, [dispatch]);

  const handleContactUsClick = useCallback(
    (arg: any) => {
      dispatch(GetOneContactUsAction(arg.id));
      toggle();
    },
    [toggle]
  );

  const columns = useMemo(
    () => [
      {
        header: "ID",
        accessorKey: "id",
        enableColumnFilter: false,
      },
      {
        header: "Email",
        accessorKey: "email",
        enableColumnFilter: false,
      },
      {
        header: "Mobile Number",
        accessorKey: "mobile_number",
        enableColumnFilter: false,
      },
      {
        header: "Message",
        accessorKey: "message",
        enableColumnFilter: false,
      },
      {
        header: "User ID",
        accessorKey: "created_by",
        enableColumnFilter: false,
      },
      {
        header: "Created At",
        accessorKey: "createdat",
        enableColumnFilter: false,
        cell: (cell: any) => moment(cell.getValue()).format("DD MMMM, YYYY"),
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
                <DropdownItem
                  className="edit-item-btn"
                  href="#showModal"
                  data-bs-toggle="modal"
                  onClick={() => {
                    handleContactUsClick(cell.row.original);
                  }}
                >
                  <i className="ri-eye-fill align-bottom me-2 text-muted"></i>{" "}
                  View
                </DropdownItem>
              </li>
              <li>
                <DropdownItem
                  className="remove-item-btn"
                  data-bs-toggle="modal"
                  href="#deleteOrder"
                  onClick={() => {
                    const contactUsData = cell.row.original;
                    onClickDelete(contactUsData);
                  }}
                >
                  <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>{" "}
                  Delete
                </DropdownItem>
              </li>
            </DropdownMenu>
          </UncontrolledDropdown>
        ),
      },
    ],
    [contactUsList]
  );

  return (
    <React.Fragment>
      <Row>
        <DeleteModal
          show={deleteModal}
          onDeleteClick={handleDeletecontactUs}
          onCloseClick={() => setDeleteModal(false)}
        />

        <Col lg={12}>
          <Card>
            <CardHeader className="border-0">
              <div className="d-flex align-items-center">
                <h5 className="card-title mb-0 flex-grow-1">Contact Us</h5>
              </div>
            </CardHeader>
            <CardBody className="pt-0">
              {loading ? (
                <Loader error={error} />
              ) : (
                <TableContainer
                  columns={columns}
                  data={contactUsList}
                  isGlobalFilter={true}
                  customPageSize={10}
                  divClass="table-responsive table-card mb-3"
                  tableClass="align-middle table-nowrap mb-0"
                  SearchPlaceholder="Search for contactUs details or something..."
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
          Contact Us Details
        </ModalHeader>
        {loadingOne ? (
          <Loader error={error} />
        ) : (
          <ModalBody>
            <Row className="g-3">
              <Col lg={6}>
                <div>
                  <CardHeader className="DPCH my-3">ID</CardHeader>
                  <CardBody>
                    <CardText className="DPCT my-3">
                      {oneContactUs?.id}
                    </CardText>
                  </CardBody>
                </div>
              </Col>
              <Col lg={6}>
                <div>
                  <CardHeader className="DPCH my-3">Email</CardHeader>
                  <CardBody>
                    <CardText className="DPCT my-3">
                      {oneContactUs?.email}
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
                      {moment(oneContactUs?.createdat).format("DD MMMM, YYYY")}
                    </CardText>
                  </CardBody>
                </div>
              </Col>
              <Col lg={6}>
                <div>
                  <CardHeader className="DPCH my-3">Updated At</CardHeader>
                  <CardBody>
                    <CardText className="DPCT my-3">
                      {moment(oneContactUs?.updatedat).format("DD MMMM, YYYY")}
                    </CardText>
                  </CardBody>
                </div>
              </Col>
            </Row>

            <Row className="g-3">
              <Col lg={6}>
                <div>
                  <CardHeader className="DPCH my-3">Mobile Number</CardHeader>
                  <CardBody>
                    <CardText className="DPCT my-3">
                      {oneContactUs?.mobile_number}
                    </CardText>
                  </CardBody>
                </div>
              </Col>
              <Col lg={6}>
                <div>
                  <CardHeader className="DPCH my-3">Created By</CardHeader>
                  <CardBody>
                    <CardText className="DPCT my-3">
                      {oneContactUs?.created_by}
                    </CardText>
                  </CardBody>
                </div>
              </Col>
            </Row>
            <Row className="g-3">
              <Col lg={12}>
                <div>
                  <CardHeader className="DPCH my-3">Message</CardHeader>
                  <CardBody>
                    <CardText className="DPCT my-3">
                      {oneContactUs?.message}
                    </CardText>
                  </CardBody>
                </div>
              </Col>
            </Row>
          </ModalBody>
        )}{" "}
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

export default ContactUsData;
