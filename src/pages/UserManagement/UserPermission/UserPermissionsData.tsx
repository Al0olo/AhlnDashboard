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
import {
  AssignUserPermissionAction,
  GetUserPermissionsAction,
  getUsers,
  RevokeUserPermissionAction,
} from "../../../slices/thunks";

// Formik
import * as Yup from "yup";
import { useFormik } from "formik";

import DeleteModal from "../../../Components/Common/DeleteModal";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../../Components/Common/Loader";
import { useAppSelector } from "redux-hooks";
import { GetPermissionsAction } from "slices/userManagement/permission/thunk";

const UserPermissionsData = () => {
  const dispatch: any = useDispatch();
  const { userPermissionsList, loading, error } = useAppSelector(
    (state) => state.UserPermission
  );
  const { users } = useAppSelector((state) => state.Users);
  const { permissionsList } = useAppSelector((state) => state.Permission);

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [userPermission, setUserPermission] = useState<any>([]);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);

  const toggle = useCallback(() => {
    setModal((prevState) => !prevState);
  }, [modal]);

  // validation
  const validation: any = useFormik({
    enableReinitialize: true,
    initialValues: {
      // id: isEdit ? userPermission.id : "",
      user_id: isEdit ? userPermission.title : "",
      permission_id: isEdit ? userPermission.description : "",
    },
    validationSchema: Yup.object({
      user_id: Yup.string().required("Please Enter User ID"),
      permission_id: Yup.string().required("Please Enter Permission ID"),
    }),
    onSubmit: async (values) => {
      if (isEdit) {
        // no need for edit in this model
      } else {
        const newUserPermission = {
          user_id: values.user_id,
          permission_id: values.permission_id,
        };
        await dispatch(AssignUserPermissionAction(newUserPermission)).then(
          (result: any) => {
            if (result.type === "userPermission/assign/fulfilled") {
              toast.success("User Permission Assigned Successfully", {
                autoClose: 3000,
              });
              toggle();
            } else {
              toast.error(`Error ${result.payload}`, {
                autoClose: 3000,
              });
            }
          }
        );

        validation.resetForm();
      }
    },
  });

  // Delete Data
  const onClickDelete = (userPermission: any) => {
    setUserPermission(userPermission);
    setDeleteModal(true);
  };

  const handleRevokeUserPermission = async () => {
    if (userPermission) {
      await dispatch(RevokeUserPermissionAction(userPermission)).then(
        (result: any) => {
          if (result.type === "userPermission/revoke/fulfilled") {
            toast.success("User Permission Revoked Successfully", {
              autoClose: 3000,
            });
          } else {
            toast.error(`Error ${result.payload}`, {
              autoClose: 3000,
            });
          }
        }
      );
      setDeleteModal(false);
    }
  };

  // update data
  const handleUserPermissionsClick = useCallback(
    (arg: any) => {
      setIsEdit(true);
      setUserPermission({
        user_id: arg.user_id,
        permission_id: arg.permission_id,
      });

      toggle();
    },
    [toggle]
  );

  // Get Data

  useEffect(() => {
    dispatch(GetUserPermissionsAction());
    dispatch(getUsers());
    dispatch(GetPermissionsAction());
  }, [dispatch]);

  useEffect(() => {
    if (userPermission) {
      validation.setValues({
        user_id: userPermission.user_id || "",
        permission_id: userPermission.permission_id || "",
      });
    }
  }, [userPermission]);

  const columns = useMemo(
    () => [
      {
        header: "User ID",
        accessorKey: "user_id",
        enableColumnFilter: false,
      },
      {
        header: "Permission ID",
        accessorKey: "permission_id",
        enableColumnFilter: false,
      },
      {
        header: "User EMail",
        accessorKey: "email",
        enableColumnFilter: false,
      },
      {
        header: "Permission Title",
        accessorKey: "permission_title",
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
                <DropdownItem
                  className="remove-item-btn"
                  data-bs-toggle="modal"
                  href="#deleteOrder"
                  onClick={() => {
                    const userPermissionData = cell.row.original;
                    onClickDelete(userPermissionData);
                  }}
                >
                  <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>{" "}
                  Revoke
                </DropdownItem>
              </li>
            </DropdownMenu>
          </UncontrolledDropdown>
        ),
      },
    ],
    [handleUserPermissionsClick]
  );

  return (
    <React.Fragment>
      <Row>
        <DeleteModal
          show={deleteModal}
          onDeleteClick={handleRevokeUserPermission}
          onCloseClick={() => setDeleteModal(false)}
        />

        <Col lg={12}>
          <Card>
            <CardHeader className="border-0">
              <div className="d-flex align-items-center">
                <h5 className="card-title mb-0 flex-grow-1">
                  User Permissions
                </h5>
                <div className="flex-shrink-0">
                  <div className="d-flex flex-wrap gap-2">
                    <button
                      className="btn btn-primary add-btn"
                      onClick={() => {
                        setIsEdit(false);
                        toggle();
                      }}
                    >
                      <i className="ri-add-line align-bottom"></i> Assign User
                      Permission
                    </button>{" "}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardBody className="pt-0">
              {loading ? (
                <Loader error={error} />
              ) : (
                <TableContainer
                  columns={columns}
                  data={userPermissionsList}
                  isGlobalFilter={true}
                  customPageSize={96} // all 96 permissions to the system_admin comes first
                  divClass="table-responsive table-card mb-3"
                  tableClass="align-middle table-nowrap mb-0"
                  SearchPlaceholder="Search for userPermission details or something..."
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
          {!!isEdit ? "Edit UserPermission" : "Add UserPermission"}
        </ModalHeader>
        <Form
          className="tablelist-form"
          onSubmit={(e) => {
            e.preventDefault();
            validation.submitForm();
            return false;
          }}
        >
          <ModalBody>
            <Row className="g-3">
              <Col lg={12}>
                <div>
                  <Label htmlFor="tasksTitle-field" className="form-label">
                    User ID
                  </Label>
                  <Input
                    name="user_id"
                    type="select"
                    id="user_id-field"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.user_id}
                    invalid={
                      validation.touched.user_id && validation.errors.user_id
                        ? true
                        : false
                    }
                  >
                    <option
                      value={undefined}
                      defaultValue={validation.values.user_id}
                    >
                      Select User
                    </option>
                    {users &&
                      users?.map((user: any) => (
                        <option key={user.id} value={user.id}>
                          {user.email}
                        </option>
                      ))}
                  </Input>
                  {validation.touched.user_id && validation.errors.user_id ? (
                    <FormFeedback type="invalid">
                      {validation.errors.user_id}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col lg={12}>
                <div>
                  <Label htmlFor="tasksTitle-field" className="form-label">
                    Permission ID
                  </Label>
                  <Input
                    name="permission_id"
                    type="select"
                    id="permission_id-field"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.permission_id}
                    invalid={
                      validation.touched.permission_id &&
                      validation.errors.permission_id
                        ? true
                        : false
                    }
                  >
                    <option
                      value={undefined}
                      defaultValue={validation.values.permission_id}
                    >
                      Select Permission
                    </option>
                    {permissionsList &&
                      permissionsList?.map((permission: any) => (
                        <option key={permission.id} value={permission.id}>
                          {permission.title}
                        </option>
                      ))}
                  </Input>
                  {validation.touched.permission_id &&
                  validation.errors.permission_id ? (
                    <FormFeedback type="invalid">
                      {validation.errors.permission_id}
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
                {!!isEdit ? "Update" : "Add UserPermission"}
              </button>
            </div>
          </div>
        </Form>
      </Modal>
    </React.Fragment>
  );
};

export default UserPermissionsData;
