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
import { BasicInfo } from "./includes/BasicInfo";
import { BoxesInfo } from "./includes/BoxesInfo";
import { ChangePassword } from "./includes/ChangePassword";
import { ShipmentDetails } from "./includes/ShipmentDetails";

const EcommerceCustomerDetail = () => {
  const dispatch: any = useDispatch();
  const [includes, setIncludes] = useState(<BasicInfo />);
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
  const changePage = (comp: any, currentId: string) => {
    setIncludes(comp);
    const current = document.getElementById(currentId);
    const elements = document.querySelectorAll(".side-details");
    elements.forEach((element) => {
      element.classList.remove("side-details-active");
    });
    current?.classList.add("side-details-active");
  };
  document.title = "Customers | Ahln Dashboard";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col lg={12} className="rounded p-2  mb-5 pb-0">
              <Card id="customerList" className="rounded">
                <CardHeader className="border-0 bg-img">
                  <BreadCrumb title="Customers" pageTitle="Ecommerce" />
                  <Row className="g-4 align-items-center">
                    <div className="col-sm">
                      <div className="row d-flex justify-content-start">
                        <h5 className="card-title mb-0 ahln-module-title col-md-3 ">
                          Customer's Details{" "}
                        </h5>
                      </div>
                    </div>
                  </Row>
                </CardHeader>
              </Card>
            </Col>
            <Row>
              <Col
                lg={11}
                className="row bg-white rounded-4 "
                id="customer-name"
              >
                <Row>
                  <Card>
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
                    </Col>
                  </Card>
                </Row>
              </Col>
            </Row>
          </Row>

          <Row
            className="d-flex justify-content-center text-center  mt-0 "
            id="content-info"
          >
            <Col lg={2} className="round-4">
              <Card className="p-2 d-flex justify-content-center">
                <p
                  className="side-details side-details-active"
                  id="basic-info"
                  onClick={() => changePage(<BasicInfo />, "basic-info")}
                >
                  Personal Details
                </p>
                <p
                  className="side-details"
                  id="boxes-info"
                  onClick={() => changePage(<BoxesInfo />, "boxes-info")}
                >
                  Boxes Details
                </p>
                <p
                  className="side-details"
                  id="shipment-details"
                  onClick={() =>
                    changePage(<ShipmentDetails />, "shipment-details")
                  }
                >
                  Shipments Details
                </p>
                <p
                  className="side-details"
                  id="change-password"
                  onClick={() =>
                    changePage(<ChangePassword />, "change-password")
                  }
                >
                  Change Password
                </p>
              </Card>
            </Col>
            {includes}
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default EcommerceCustomerDetail;
