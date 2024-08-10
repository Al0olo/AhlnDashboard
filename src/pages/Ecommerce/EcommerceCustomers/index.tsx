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
} from "reactstrap";
import { Link, useParams } from "react-router-dom";
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
  updateUserStatus,
  GetRolesAction,
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
  const selectLayoutState = (state: any) => state.Role;

  const roleLayoutProperties = createSelector(selectLayoutState, (state) => ({
    RoleList: state.data,
    isRoleSuccess: state.isRoleSuccess,
    error: state.error,
    loader: state.loading,
  }));

  // Inside your component
  const { customers, isCustomerSuccess, error, loader } = useSelector(
    ecomCustomerProperties
  );

  const { RoleList, isRoleSuccess } = useSelector(roleLayoutProperties);

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [customer, setCustomer] = useState<any>({});

  // Delete customer
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [deleteModalMulti, setDeleteModalMulti] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);

  const toggle = useCallback(() => {
    setModal((prevState) => !prevState);
  }, []);

  const updateStatusUser = (userId: string, status: boolean) => {
    dispatch(updateUserStatus({ userId, status }));
    setModal(false);
  };

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
      id: customer.id ? customer.id : "",
      user_name: customer.user_name ? customer.user_name : "",
      email: customer.email ? customer.email : "",
      phone_number: customer.phone_number ? customer.phone_number : "",
      role_id: customer.role_id ? customer.role_id : 2,
      status: customer.is_active ? customer.is_active : "",
    },
    validationSchema: Yup.object({
      user_name: Yup.string().required("Please Enter Customer Name"),
      email: Yup.string().required("Please Enter Your Email"),
      phone_number: Yup.string().length(10).required("Please Enter Your Phone"),
    }),
    onSubmit: (values: any) => {
      if (isEdit) {
        const updateCustomer = {
          id: validation.values.id,
          user_name: values.user_name || undefined,
          phone_number: values.phone_number || undefined,
          role_id: values.role_id,
        };

        // Remove the keys which have undefined values from the updateCustomer object
        const updatedCustomerObj = Object.keys(updateCustomer)
          .filter(
            (key) =>
              updateCustomer[key as keyof typeof updateCustomer] !== undefined
          )
          .reduce((obj: any, key) => {
            obj[key] = updateCustomer[key as keyof typeof updateCustomer];
            return obj;
          }, {});
        if (
          Object.values(updatedCustomerObj).some((val) => val !== undefined)
        ) {
          dispatch(onUpdateCustomer(updatedCustomerObj));
        }

        validation.resetForm();
      } else {
        const newCustomer = {
          user_name: values.user_name,
          email: values.email,
          role_id: values.role_id || 2,
          phone_number: values.phone_number,
        };
        dispatch(onAddNewCustomer(newCustomer));
        validation.resetForm();
      }
      dispatch(onGetCustomers());
      toggle();
    },
  });

  // Delete Data
  const handleDeleteCustomer = () => {
    dispatch(onDeleteCustomer(customer.id));
    setDeleteModal(false);
    dispatch(onGetCustomers());
  };

  // Update Data
  const handleCustomerClick = useCallback(
    (arg: any) => {
      setIsEdit(true);
      setCustomer({
        id: arg.id,
        user_name: arg.user_name,
        email: arg.email,
        phone_number: arg.phone_number,
        role_id: arg.role_id,
        status: arg.is_active,
      });
      toggle();
    },
    [toggle]
  );

  useEffect(() => {
    dispatch(onGetCustomers());
    dispatch(GetRolesAction());
  }, [dispatch]);

  useEffect(() => {
    if (customer) {
      validation.setValues({
        id: customer.id || "",
        user_name: customer.user_name || "",
        email: customer.email || "",
        phone_number: customer.phone_number || "",
        role_id: customer.role_id || "",
        status: customer.is_active ? customer.is_active : 1,
      });
    }
  }, [customer]);

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
            className="form-check-input"
            onClick={() => checkedAll()}
          />
        ),
        cell: (cell: any) => {
          return (
            <Input
              type="checkbox"
              className="customerCheckBox form-check-input"
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
        header: "Role",
        accessorKey: "title",
        enableColumnFilter: false,
      },
      {
        header: "Updated At",
        accessorKey: "updatedat",
        enableColumnFilter: false,
        cell: (cell: any) => moment(cell.getValue()).format("DD MMMM, YYYY"),
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
                  updateStatusUser(cellProps.row.original.id, e.target.checked);
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
                  className="text-primary d-inline-block edit-item-btn"
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
                  className="text-danger d-inline-block remove-item-btn"
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

  document.title = "Users | Ahln - React Admin & Dashboard";
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
          <BreadCrumb title="USERS" pageTitle="Ecommerce" />
          <Row>
            <Col lg={12}>
              <Card id="customerList">
                <CardHeader className="border-0">
                  <Row className="g-4 align-items-center">
                    <div className="col-sm">
                      <div>
                        <h5 className="card-title mb-0">Customer List</h5>
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
                          className="btn btn-success add-btn me-1"
                          id="create-btn"
                          onClick={() => {
                            setIsEdit(false);
                            toggle();
                          }}
                        >
                          <i className="ri-add-line align-bottom me-1"></i> Add
                          User
                        </button>{" "}
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={() => setIsExportCSV(true)}
                        >
                          <i className="ri-file-download-line align-bottom me-1"></i>{" "}
                          Export
                        </button>
                      </div>
                    </div>
                  </Row>
                </CardHeader>
                <div className="card-body pt-0">
                  {loader ? (
                    <Loader error={error} />
                  ) : (
                    <TableContainer
                      columns={columns}
                      data={customers || []}
                      isGlobalFilter={true}
                      customPageSize={10}
                      isCustomerFilter={true}
                      theadClass="table-light text-muted"
                      SearchPlaceholder="Search for user, email, phone, status or something..."
                    />
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
                          <Label htmlFor="user_name" className="form-label">
                            User Name
                          </Label>
                          <Input
                            name="user_name"
                            id="user_name"
                            className="form-control"
                            placeholder="Enter Name"
                            type="text"
                            validate={{
                              required: { value: true },
                            }}
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.user_name || ""}
                            invalid={
                              validation.touched.user_name &&
                              validation.errors.user_name
                                ? true
                                : false
                            }
                          />
                          {validation.touched.user_name &&
                          validation.errors.user_name ? (
                            <FormFeedback type="invalid">
                              {validation.errors.user_name}
                            </FormFeedback>
                          ) : null}
                        </div>

                        {!isEdit && (
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
                                validation.touched.email &&
                                validation.errors.email
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.email &&
                            validation.errors.email ? (
                              <FormFeedback type="invalid">
                                {validation.errors.email}
                              </FormFeedback>
                            ) : null}
                          </div>
                        )}

                        {
                          <div className="mb-3">
                            <Label
                              htmlFor="role_id-field"
                              className="form-label"
                            >
                              Role
                            </Label>
                            <Input
                              name="role_id"
                              type="select"
                              id="role_id-field"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.role_id}
                              invalid={
                                validation.touched.role_id &&
                                validation.errors.role_id
                                  ? true
                                  : false
                              }
                            >
                              <option value="">Select Role</option>
                              {RoleList &&
                                RoleList?.map((role: any) => (
                                  <option key={role.id} value={role.id}>
                                    {role.title}
                                  </option>
                                ))}
                            </Input>
                            {validation.touched.role_id &&
                            validation.errors.role_id ? (
                              <FormFeedback type="invalid">
                                {validation.errors.role_id}
                              </FormFeedback>
                            ) : null}
                          </div>
                        }

                        <div className="mb-3">
                          <Label htmlFor="phone_number" className="form-label">
                            Phone
                          </Label>
                          <Input
                            name="phone_number"
                            type="text"
                            id="phone_number"
                            placeholder="Enter Phone no."
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.phone_number || ""}
                            invalid={
                              validation.touched.phone_number &&
                              validation.errors.phone_number
                                ? true
                                : false
                            }
                          />
                          {validation.touched.phone_number &&
                          validation.errors.phone_number ? (
                            <FormFeedback type="invalid">
                              {validation.errors.phone_number}
                            </FormFeedback>
                          ) : null}
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
                          <button type="submit" className="btn btn-success">
                            {" "}
                            {!!isEdit ? "Update" : "Add Customer"}{" "}
                          </button>
                        </div>
                      </ModalFooter>
                    </Form>
                  </Modal>
                  <ToastContainer closeButton={false} limit={1} />
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default EcommerceCustomers;
