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

const EcommerceCustomers = () => {
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

  // Delete Data
  const handleDeleteCustomer = () => {
    if (customer) {
      dispatch(onDeleteCustomer(customer.id));
      setDeleteModal(false);
    }
  };

  // Update Data
  const handleCustomerClick = useCallback(
    (arg: any) => {
      const customer = arg;

      setCustomer({
        id: customer.id,
        customer: customer.customer,
        email: customer.email,
        phone: customer.phone,
        date: customer.date,
        status: customer.status,
      });
      setCustomer({
        id: customer.id,
        customer: customer.customer,
        email: customer.email,
        phone: customer.phone,
        date: customer.date,
        status: customer.status,
      });

      setIsEdit(true);
      toggle();
    },
    [toggle]
  );
  useEffect(() => {
    dispatch(onGetCustomers());
  }, [dispatch]);

  // useEffect(() => {
  //   dispatch(onGetCustomers());
  // }, [dispatch]);
  //   if (customers && !customers.length) {
  //     dispatch(onGetCustomers());
  //   }
  // }, [dispatch]);

  // useEffect(() => {
  //   setCustomer(customers);
  // }, [customers]);

  // useEffect(() => {
  //   if (!isEmpty(customers)) {
  //     setCustomer(customers);
  //     setIsEdit(false);
  //   }
  // }, [customers]);

  // Node API
  // Node API
  // useEffect(() => {
  //   if (isCustomerCreated) {
  //     setCustomer(null);
  //     dispatch(onGetCustomers());
  //   }
  // }, [dispatch, isCustomerCreated]);

  const handleValidDate = (date: any) => {
    const date1 = moment(new Date(date)).format("DD MMM Y");
    return date1;
  };

  // Checked All
  const checkedAll = useCallback(() => {
    const checkall: any = document.getElementById("checkBoxAll");
    const ele = document.querySelectorAll(".customerCheckBox");

    if (checkall.checked) {
      ele.forEach((ele: any) => {
        ele.checked = true;
      });
    } else {
      ele.forEach((ele: any) => {
        ele.checked = false;
      });
    }
    deleteCheckbox();
  }, []);

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

  // Customers Column
  const columns = useMemo(
    () => [
      {
        header: (
          <input
            type="checkbox"
            id="checkBoxAll"
            className="form-check-input  ahln-check"
            onClick={() => checkedAll()}
          />
        ),
        cell: (cell: any) => {
          return (
            <Input
              type="checkbox"
              className="customerCheckBox form-check-input ahln-check"
              value={cell.getValue()}
              onChange={() => deleteCheckbox()}
            />
          );
        },
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
        header: "Customer Name",
        accessorKey: "user_name",
        enableColumnFilter: false,
      },
      {
        header: "Email",
        accessorKey: "email",
        enableColumnFilter: false,
      },
      {
        header: "Phone",
        accessorKey: "phone_number",
        enableColumnFilter: false,
      },
      {
        header: "Role ID",
        accessorKey: "role_id",
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
                  // updateStatusUser(cellProps.row.original.id, e.target.checked);
                }}
                defaultChecked={cellProps.getValue() === true ? true : false}
              >
                {/* {cellProps.getValue() === true ? "Active" : "Block"} */}
              </Input>
            </div>
          );
        },
      },
      {
        header: "Action",
        cell: (cellProps: any) => {
          return (
            <ul className="list-inline hstack gap-2 mb-0">
              <li className="list-inline-item edit" title="Edit">
                <Link
                  to="#"
                  className="text-primary d-inline-block edit-item-btn text-muted"
                  onClick={() => {
                    const customerData = cellProps.row.original;
                    handleCustomerClick(customerData);
                  }}
                >
                  <i className="ri-pencil-fill fs-16"></i>
                </Link>
              </li>
              <li className="list-inline-item" title="Remove">
                <Link
                  to="#"
                  className="text-danger d-inline-block remove-item-btn text-muted"
                  onClick={() => {
                    const customerData = cellProps.row.original;
                    onClickDelete(customerData);
                  }}
                >
                  <i className="ri-delete-bin-5-fill fs-16"></i>
                </Link>
              </li>
            </ul>
          );
        },
      },
    ],
    [handleCustomerClick, checkedAll]
  );

  // Export Modal
  const [isExportCSV, setIsExportCSV] = useState<boolean>(false);

  document.title = "Customers | Ahln - React Admin & Dashboard";
  return (
    <React.Fragment>
      <div className="page-content">
        <ExportCSVModal
          show={isExportCSV}
          onCloseClick={() => setIsExportCSV(false)}
          data={customers}
        />
        <DeleteModal
          show={deleteModal}
          onDeleteClick={handleDeleteCustomer}
          onCloseClick={() => setDeleteModal(false)}
        />
        <DeleteModal
          show={deleteModalMulti}
          onDeleteClick={() => {
            deleteMultiple();
            setDeleteModalMulti(false);
          }}
          onCloseClick={() => setDeleteModalMulti(false)}
        />
        <Container fluid>
          <Row>
            <Col lg={12}>
              <Card id="customerList">
                <CardHeader className="border-0">
                  <BreadCrumb title="Customers" pageTitle="Ecommerce" />
                  <Row className="g-4 align-items-center">
                    <div className="col-sm">
                      <div className="row d-flex justify-content-start">
                      
                        <h5 className="card-title mb-0 ahln-module-title col-md-3 ">Customer List </h5>
                        <Alert className="col-md-3 alert alert-success ahln-alert-success mt-1">+20 Customers</Alert>
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
                          className="btn btn-secondary ahln-btn-muted"
                          onClick={() => setIsExportCSV(true)}
                        >
                          <i className="ri-file-download-line align-bottom me-1"></i>{" "}
                          Export
                        </button>{" "}
                        <button
                          type="button"
                          className="btn btn-success add-btn me-1 ahln-btn-module"
                          id="create-btn"
                          onClick={() => {
                            setIsEdit(false);
                            toggle();
                          }}
                        >
                          <i className="ri-add-line align-bottom me-1"></i> Add
                          Customer
                        </button>
                      </div>
                    </div>
                  </Row>
                </CardHeader>
              </Card>

              {isCustomerSuccess && customers.length ? (
                <TableContainer
                  modelName={`customerList`}
                  columns={columns}
                  data={customers || []}
                  isGlobalFilter={true}
                  customPageSize={10}
                  isCustomerFilter={true}
                  theadClass="table-light text-muted"
                  SearchPlaceholder="Search for customer, email, phone, status or something..."
                />
              ) : (
                <Loader error={error} />
              )}

              <Modal id="showModal" isOpen={modal} toggle={toggle} centered>
                <ModalHeader className="bg-light p-3" toggle={toggle}>
                  {!!isEdit ? "Edit Customer" : "Add Customer"}
                </ModalHeader>
                <Form
                  className="tablelist-form"
                  onSubmit={(e: any) => {
                    e.preventDefault();
                    validation.handleSubmit();
                    return false;
                  }}
                >
                  <ModalBody>
                    <input type="hidden" id="id-field" />

                    <div
                      className="mb-3"
                      id="modal-id"
                      style={{ display: "none" }}
                    >
                      <Label htmlFor="id-field1" className="form-label">
                        ID
                      </Label>
                      <Input
                        type="text"
                        id="id-field1"
                        className="form-control"
                        placeholder="ID"
                        readOnly
                      />
                    </div>

                    <div className="mb-3">
                      <Label
                        htmlFor="customername-field"
                        className="form-label"
                      >
                        Customer Name
                      </Label>
                      <Input
                        name="customer"
                        id="customername-field"
                        className="form-control"
                        placeholder="Enter Name"
                        type="text"
                        validate={{
                          required: { value: true },
                        }}
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.customer || ""}
                        invalid={
                          validation.touched.customer &&
                          validation.errors.customer
                            ? true
                            : false
                        }
                      />
                      {validation.touched.customer &&
                      validation.errors.customer ? (
                        <FormFeedback type="invalid">
                          {validation.errors.customer}
                        </FormFeedback>
                      ) : null}
                    </div>

                    <div className="mb-3">
                      <Label htmlFor="email-field" className="form-label">
                        Email
                      </Label>
                      <Input
                        name="email"
                        type="email"
                        id="email-field"
                        placeholder="Enter Email"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.email || ""}
                        invalid={
                          validation.touched.email && validation.errors.email
                            ? true
                            : false
                        }
                      />
                      {validation.touched.email && validation.errors.email ? (
                        <FormFeedback type="invalid">
                          {validation.errors.email}
                        </FormFeedback>
                      ) : null}
                    </div>

                    <div className="mb-3">
                      <Label htmlFor="phone-field" className="form-label">
                        Phone
                      </Label>
                      <Input
                        name="phone"
                        type="text"
                        id="phone-field"
                        placeholder="Enter Phone no."
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.phone || ""}
                        invalid={
                          validation.touched.phone && validation.errors.phone
                            ? true
                            : false
                        }
                      />
                      {validation.touched.phone && validation.errors.phone ? (
                        <FormFeedback type="invalid">
                          {validation.errors.phone}
                        </FormFeedback>
                      ) : null}
                    </div>

                    <div className="mb-3">
                      <Label htmlFor="date-field" className="form-label">
                        Joining Date
                      </Label>

                      <Flatpickr
                        name="date"
                        id="date-field"
                        className="form-control"
                        placeholder="Select a date"
                        options={{
                          altInput: true,
                          altFormat: "d M, Y",
                          dateFormat: "d M, Y",
                        }}
                        onChange={(date: any) =>
                          validation.setFieldValue(
                            "date",
                            moment(date[0]).format("DD MMMM ,YYYY")
                          )
                        }
                        value={validation.values.date || ""}
                      />
                      {validation.errors.date && validation.touched.date ? (
                        <FormFeedback type="invalid" className="d-block">
                          {validation.errors.date}
                        </FormFeedback>
                      ) : null}
                    </div>

                    <div>
                      <Label htmlFor="status-field" className="form-label">
                        Status
                      </Label>

                      <Input
                        name="status"
                        type="select"
                        className="form-select"
                        id="status-field"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.status || ""}
                        invalid={
                          validation.touched.status && validation.errors.status
                            ? true
                            : false
                        }
                      >
                        {customermocalstatus.map((item, key) => (
                          <React.Fragment key={key}>
                            {item.options.map((item, key) => (
                              <option value={item.value} key={key}>
                                {item.label}
                              </option>
                            ))}
                            {item.options.map((item, key) => (
                              <option value={item.value} key={key}>
                                {item.label}
                              </option>
                            ))}
                          </React.Fragment>
                        ))}
                      </Input>
                      {/* {validation.touched.status &&
                          validation.errors.status ? (
                          validation.errors.status ? (
                            <FormFeedback type="invalid">
                              {validation.errors.status}
                            </FormFeedback>
                          ) : null} */}
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <div className="hstack gap-2 justify-content-end">
                      <button
                        type="button"
                        className="btn btn-light"
                        onClick={() => {
                          setModal(false);
                        }}
                      >
                        {" "}
                        Close{" "}
                      </button>
                      <button
                        type="button"
                        className="btn btn-light"
                        onClick={() => {
                          setModal(false);
                        }}
                      >
                        {" "}
                        Close{" "}
                      </button>

                      <button type="submit" className="btn btn-success">
                        {" "}
                        {!!isEdit ? "Update" : "Add Customer"}{" "}
                      </button>
                      <button type="submit" className="btn btn-success">
                        {" "}
                        {!!isEdit ? "Update" : "Add Customer"}{" "}
                      </button>
                    </div>
                  </ModalFooter>
                </Form>
              </Modal>
              <ToastContainer closeButton={false} limit={1} />
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default EcommerceCustomers;
