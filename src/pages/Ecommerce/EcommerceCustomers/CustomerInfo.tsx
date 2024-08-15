import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  Modal,
  Form,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Label,
  Input,
  FormFeedback,
  Button,
  Alert,
  CardBody,
} from "reactstrap";
import { Link } from "react-router-dom";
import Flatpickr from "react-flatpickr";
// import { isEmpty } from "lodash";
import moment from "moment";

// Formik
import * as Yup from "yup";
import { useFormik } from "formik";

//Import Breadcrumb
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import DeleteModal from "../../../Components/Common/DeleteModal";

import {
  getCustomers as onGetCustomers,
  addNewCustomer as onAddNewCustomer,
  updateCustomer as onUpdateCustomer,
  deleteCustomer as onDeleteCustomer,
} from "../../../slices/thunks";

//redux
import { useSelector, useDispatch } from "react-redux";
import TableContainer from "../../../Components/Common/TableContainer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../../Components/Common/Loader";

// Export Modal
import ExportCSVModal from "../../../Components/Common/ExportCSVModal";
import { createSelector } from "reselect";
import avatar from "../../../assets/images/custormes/avatar2.jpg";

const EcommerceCustomerInfo = () => {
  const dispatch: any = useDispatch();

  const ecomCustomerProperties = createSelector(
    (state: any) => state.Ecommerce,
    (ecom) => ({
      customers: ecom.data,
      isCustomerSuccess: ecom.isCustomerSuccess,
      error: ecom.error,
      loader: ecom.loading,
    })
  );
  // Inside your component
  const { customers, isCustomerSuccess, error, loader } = useSelector(
    ecomCustomerProperties
  );

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [customer, setCustomer] = useState<any>([]);

  // Delete customer
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [deleteModalMulti, setDeleteModalMulti] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);

  const toggle = useCallback(() => {
    if (modal) {
      setModal(false);
      setCustomer(null);
    } else {
      setModal(true);
      // setDate(dateFormat());
    }
  }, [modal]);

  const customermocalstatus = [
    {
      options: [
        { label: "Status", value: "Status" },
        { label: "Active", value: "true" },
        { label: "Block", value: "false" },
      ],
    },
  ];

  // Delete Data
  const onClickDelete = (customer: any) => {
    setCustomer(customer);
    setDeleteModal(true);
  };

  // validation
  const validation: any = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      customer: (customer && customer.customer) || "",
      email: (customer && customer.email) || "",
      phone: (customer && customer.phone) || "",
      date: (customer && customer.date) || "",
      status: (customer && customer.status) || "",
    },
    validationSchema: Yup.object({
      customer: Yup.string().required("Please Enter Customer Name"),
      email: Yup.string().required("Please Enter Your Email"),
      phone: Yup.string().required("Please Enter Your Phone"),
      date: Yup.string().required("Please Enter date"),
      status: Yup.string().required("Please Enter Your Status"),
    }),
    onSubmit: (values) => {
      if (isEdit) {
        const updateCustomer = {
          id: customer ? customer.id : 0,
          customer: values.customer,
          email: values.email,
          phone: values.phone,
          date: values.date,
          status: values.status,
        };
        // update customer
        dispatch(onUpdateCustomer(updateCustomer));
        validation.resetForm();
      } else {
        const newCustomer = {
          id: "",
          customer: values["customer"],
          email: values["email"],
          phone: values["phone"],
          date: values["date"],
          status: values["status"],
        };
        // save new customer
        dispatch(onAddNewCustomer(newCustomer));
        validation.resetForm();
      }
      toggle();
    },
  });

  // Delete Multiple
  const [selectedCheckBoxDelete, setSelectedCheckBoxDelete] = useState<any>([]);
  const [isMultiDeleteButton, setIsMultiDeleteButton] =
    useState<boolean>(false);
  const deleteMultiple = () => {
    const checkall: any = document.getElementById("checkBoxAll");
    selectedCheckBoxDelete.forEach((element: any) => {
      dispatch(onDeleteCustomer(element.value));
      setTimeout(() => {
        toast.clearWaitingQueue();
      }, 3000);
      setTimeout(() => {
        toast.clearWaitingQueue();
      }, 3000);
    });
    setIsMultiDeleteButton(false);
    checkall.checked = false;
  };

  const deleteCheckbox = () => {
    const ele = document.querySelectorAll(".customerCheckBox:checked");
    ele.length > 0
      ? setIsMultiDeleteButton(true)
      : setIsMultiDeleteButton(false);
    ele.length > 0
      ? setIsMultiDeleteButton(true)
      : setIsMultiDeleteButton(false);
    setSelectedCheckBoxDelete(ele);
  };

  document.title = "Customers | Ahln - React Admin & Dashboard";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col lg={12} className="rounded p-2  mb-5 pb-0">
              <Card id="customerList" className="rounded">
                <CardHeader className="border-0">
                  <BreadCrumb title="Customers" pageTitle="Ecommerce" />
                  <Row className="g-4 align-items-center">
                    <div className="col-sm">
                      <div className="row d-flex justify-content-start">
                        <h5 className="card-title mb-0 ahln-module-title col-md-3 ">
                          User Information{" "}
                        </h5>
                        <Alert className="col-md-3 alert alert-success ahln-alert-success mt-1">
                          Active
                        </Alert>
                      </div>
                    </div>
                    <div className="col-sm-auto">
                      <div>
                        {isMultiDeleteButton && (
                          <Button
                            className="btn btn-soft-danger me-1"
                            onClick={() => setDeleteModalMulti(true)}
                          >
                            <i className="ri-delete-bin-2-line"></i>
                          </Button>
                        )}
                        <button
                          type="button"
                          className="btn btn-secondary ahln-btn-muted "
                        >
                          <i className="ri-file-download-line align-bottom me-1"></i>{" "}
                          Edit
                        </button>{" "}
                      </div>
                    </div>
                  </Row>
                </CardHeader>
              </Card>
            </Col>
            <Card lg={12} className="rounded p-3 pb-0">
              <Card lg={10} className="border border-light">
                <CardBody className="rounded" >
                  <Row>
                    <Col md={1} className="me-0 ">
                      <img
                        src={avatar}
                        alt=""
                        width={74.53}
                        height={81.78}
                        className="rounded-4"
                      />
                    </Col>
                    <Col md={3}>
                      <p className="ahl-module-title fs-4 m-0">Jack Bryan</p>
                      <p className="text-muted p-0">sarajackson@gmail.com</p>
                      <Alert className="col-md-3 alert alert-success ahln-alert-success mt-1">
                        Active
                      </Alert>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={9} className="row">
                      <Col lg={4}>
                        <p className="text-muted user-details-title">Name</p>
                        <p className="ahln-title-module user-details-info">Sara Jackson</p>
                      </Col>
                      <Col lg={4}>
                        <p className="text-muted user-details-title">Phone Number</p>
                        <p className="ahln-title-module user-details-info">+971507686191</p>
                      </Col>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={9} className="row">
                      <Col lg={4}>
                        <p className="text-muted user-details-title">Country</p>
                        <p className="ahln-title-module user-details-info">United Arab Emirates</p>
                      </Col>
                      <Col lg={4}>
                        <p className="text-muted user-details-title">City</p>
                        <p className="ahln-title-module user-details-info">Sharga</p>
                      </Col>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={9} className="row">
                      <Col lg={4}>
                        <p className="text-muted user-details-title">Email</p>
                        <p className="ahln-title-module user-details-info">Osama.fathi1@gmail.com</p>
                      </Col>
                      <Col lg={4}>
                        <p className="text-muted user-details-title">No. of Boxes</p>
                        <p className="ahln-title-module .user-details-info ">5 Boxes</p>
                      </Col>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Card>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default EcommerceCustomerInfo;
