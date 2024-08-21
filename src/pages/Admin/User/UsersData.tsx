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
import { useDispatch } from "react-redux";
import TableContainer from "../../../Components/Common/TableContainer";
import { GetRolesAction } from "../../../slices/thunks";
import {
  deleteUser,
  getUsers,
  updateUser,
  addUser,
} from "../../../slices/thunks";
// Formik
import * as Yup from "yup";
import { useFormik } from "formik";

import DeleteModal from "../../../Components/Common/DeleteModal";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../../Components/Common/Loader";
import { useAppSelector } from "redux-hooks";

const UsersData = () => {
  const dispatch: any = useDispatch();

  const { users, loading, spinner } = useAppSelector((state) => state.Users);

  const { roles } = useAppSelector((state) => state.Role);

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [user, setUser] = useState<any>({
    id: "",
    email: "",
    phone_number: "",
    user_name: "",
    is_active: true,
    role_id: "",
  });
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);

  const toggle = useCallback(() => {
    setModal((prevState) => !prevState);
  }, [modal]);

  // validation
  const validation: any = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: isEdit ? user?.id : "",
      email: isEdit ? user?.email : "",
      phone_number: isEdit ? user?.phone_number : "",
      user_name: isEdit ? user?.user_name : "",
      is_active: user?.is_active,
      role_id: isEdit ? user?.role_id : "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter User Email"),
      phone_number: Yup.string().required("Please Enter User Phone"),
      user_name: Yup.string().required("Please Enter User Name"),
      // is_active: Yup.boolean().required("Please Enter User Status"),
      role_id: Yup.number().required("Please Enter User Role"),
    }),
    onSubmit: async (values) => {
      if (isEdit) {
        const updateUsers: any = {
          id: values.id,
          // email: values.email,
          user_name: values.user_name,
          phone_number: values.phone_number,
          is_active: values.is_active,
          role_id: values.role_id,
        };
        dispatch(updateUser(updateUsers)).then((result: any) => {
          if (result.type === "user/update/fulfilled") {
            toast.success("User Updated Successfully", {
              autoClose: 3000,
            });
            toggle();
          } else {
            toast.error(`Error ${result.payload}`, {
              autoClose: 3000,
            });
          }
        });
        validation.resetForm();
      } else {
        const newUser = {
          user_name: values.user_name,
          email: values.email,
          phone_number: values.phone_number,
          is_active: values.is_active,
          role_id: values.role_id,
        };
        dispatch(addUser(newUser)).then((result: any) => {
          if (result.type === "user/new/fulfilled") {
            toast.success("User Added Successfully", {
              autoClose: 3000,
            });
            toggle();
          } else {
            toast.error(`Error ${result.payload}`, {
              autoClose: 3000,
            });
          }
        });
        validation.resetForm();
      }
    },
  });

  // Delete Data
  const onClickDelete = (user: any) => {
    setUser(user);
    setDeleteModal(true);
  };

  const handleDeleteuser = async () => {
    if (user) {
      dispatch(deleteUser(user.id)).then((result: any) => {
        if (result.type === "user/delete/fulfilled") {
          toast.success("User Deleted Successfully", {
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

  // update data
  const handleUsersClick = useCallback(
    (arg: any) => {
      setIsEdit(true);
      setUser({
        id: arg.id,
        email: arg.email,
        phone_number: arg.phone_number,
        user_name: arg.user_name,
        is_active: arg.is_active,
        role_id: arg.role_id,
      });

      toggle();
    },
    [toggle, isEdit, user]
  );

  // Get Data

  useEffect(() => {
    dispatch(getUsers());
    dispatch(GetRolesAction());
  }, [dispatch]);

  const columns = useMemo(
    () => [
      {
        header: "ID",
        accessorKey: "id",
        enableColumnFilter: false,
      },
      {
        header: "Role Title",
        accessorKey: "title",
        enableColumnFilter: false,
      },
      {
        header: "User Name",
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
                disabled={true}
                defaultChecked={cellProps.getValue() === true ? true : false}
              ></Input>
            </div>
          );
        },
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
                <DropdownItem href="/apps-user-details">
                  <i className="ri-eye-fill align-bottom me-2 text-muted"></i>{" "}
                  View
                </DropdownItem>
              </li>
              <li>
                <DropdownItem
                  className="edit-item-btn"
                  href="#showModal"
                  data-bs-toggle="modal"
                  onClick={() => {
                    const userData = cell.row.original;
                    handleUsersClick(userData);
                  }}
                >
                  <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>{" "}
                  Edit
                </DropdownItem>
              </li>
              <li>
                <DropdownItem
                  className="remove-item-btn"
                  data-bs-toggle="modal"
                  href="#deleteOrder"
                  onClick={() => {
                    const userData = cell.row.original;
                    onClickDelete(userData);
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
    [users]
  );

  return (
    <React.Fragment>
      <Row>
        <DeleteModal
          show={deleteModal}
          onDeleteClick={handleDeleteuser}
          onCloseClick={() => setDeleteModal(false)}
        />

        <Col lg={12}>
          <Card>
            <CardHeader className="border-0">
              <div className="d-flex align-items-center">
                <h5 className="card-title mb-0 flex-grow-1">Users</h5>
                <div className="flex-shrink-0">
                  <div className="d-flex flex-wrap gap-2">
                    <button
                      className="btn btn-primary add-btn"
                      onClick={() => {
                        setIsEdit(false);
                        toggle();
                      }}
                    >
                      <i className="ri-add-line align-bottom"></i> Create New
                      User
                    </button>{" "}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardBody className="pt-0">
              {loading ? (
                <Loader error={spinner} />
              ) : (
                <TableContainer
                  columns={columns}
                  data={users}
                  isGlobalFilter={true}
                  customPageSize={10}
                  divClass="table-responsive table-card mb-3"
                  tableClass="align-middle table-nowrap mb-0"
                  SearchPlaceholder="Search for user details or something..."
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
          {!!isEdit ? "Edit User" : "Add User"}
        </ModalHeader>
        <Form
          className="tablelist-form"
          onSubmit={(e) => {
            e.preventDefault();
            validation.submitForm();
          }}
        >
          <ModalBody>
            <Row className="g-3">
              <Col lg={12}>
                <div>
                  <Label htmlFor="email" className="form-label">
                    Email
                  </Label>
                  <Input
                    disabled={isEdit ? true : false}
                    name="email"
                    id="email"
                    className="form-control"
                    placeholder="Enter User Email"
                    type="text"
                    validate={{
                      required: { value: true },
                    }}
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
              </Col>

              <Col lg={12}>
                <div>
                  <Label htmlFor="user_name" className="form-label">
                    User Name
                  </Label>
                  <Input
                    name="user_name"
                    type="text"
                    id="user_name"
                    placeholder="Enter User Name"
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
              </Col>
              <Col lg={12}>
                <div>
                  <Label htmlFor="phone_number" className="form-label">
                    Phone Number
                  </Label>
                  <Input
                    name="phone_number"
                    type="text"
                    id="phone_number"
                    placeholder="Enter User Phone Number"
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
              </Col>
              <Col lg={6}>
                <Label htmlFor="is_active">User Status:</Label>
                <Input
                  type="checkbox"
                  defaultChecked={user.is_active}
                  value={user.is_active}
                  name="is_active"
                  className="form-check-label check-button mx-3"
                  id="is_active"
                  onBlur={validation.handleBlur}
                  onChange={validation.handleChange}
                  invalid={
                    validation.touched.is_active && validation.errors.is_active
                      ? true
                      : false
                  }
                />
                {validation.touched.is_active && validation.errors.is_active ? (
                  <FormFeedback type="invalid">
                    {validation.errors.is_active}
                  </FormFeedback>
                ) : null}
              </Col>
              <Col lg={6}>
                <div>
                  <Label htmlFor="role_id" className="form-label">
                    Role ID
                  </Label>
                  <Input
                    name="role_id"
                    type="select"
                    id="role_id"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.role_id}
                    invalid={
                      validation.touched.role_id && validation.errors.role_id
                        ? true
                        : false
                    }
                  >
                    <option
                      value={undefined}
                      defaultValue={validation.values.role_id}
                    >
                      Select Role ID
                    </option>
                    {roles &&
                      roles?.map((role: any) => (
                        <option key={role.id} value={role.id}>
                          {role.title}
                        </option>
                      ))}
                  </Input>
                  {validation.touched.role_id && validation.errors.role_id ? (
                    <FormFeedback type="invalid">
                      {validation.errors.role_id}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
            </Row>
          </ModalBody>
          <div className="modal-footer">
            <div className="hstack gap-2 justify-content-end">
              <button onClick={toggle} type="button" className="btn btn-light">
                Close
              </button>
              <button type="submit" className="btn btn-success" id="add-btn">
                {isEdit ? "Update" : "Add User"}
              </button>
            </div>
          </div>
        </Form>
      </Modal>
    </React.Fragment>
  );
};

export default UsersData;
