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
  AssignRolePermissionAction,
  GetRolePermissionsAction,
  GetRolesAction,
  RevokeRolePermissionAction,
  // GetOneRoleOermissionAction, // no use for now
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

const RolePermissionsData = () => {
  const dispatch: any = useDispatch();
  const { rolePermissionsList, loading, error } = useAppSelector(
    (state) => state.RolePermission
  );
  const { rolesList } = useAppSelector((state) => state.Role);
  const { permissionsList } = useAppSelector((state) => state.Permission);

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [rolePermission, setRolePermission] = useState<any>([]);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);

  const toggle = useCallback(() => {
    setModal((prevState) => !prevState);
  }, [modal]);

  // validation
  const validation: any = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: isEdit ? rolePermission.id : "",
      role_id: isEdit ? rolePermission.title : "",
      permission_id: isEdit ? rolePermission.description : "",
    },
    validationSchema: Yup.object({
      role_id: Yup.string().required("Please Enter Role ID"),
      permission_id: Yup.string().required("Please Enter Permission ID"),
    }),
    onSubmit: async (values) => {
      if (isEdit) {
        // no need for edit in this model
      } else {
        const newRolePermission = {
          role_id: values.role_id,
          permission_id: values.permission_id,
        };
        await dispatch(AssignRolePermissionAction(newRolePermission)).then(
          (result: any) => {
            if (result.type === "rolePermission/assign/fulfilled") {
              toast.success("Role Permission Assigned Successfully", {
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
  const onClickDelete = (rolePermission: any) => {
    setRolePermission(rolePermission);
    setDeleteModal(true);
  };

  const handleRevokeRolePermission = async () => {
    if (rolePermission) {
      await dispatch(RevokeRolePermissionAction(rolePermission)).then(
        (result: any) => {
          if (result.type === "rolePermission/revoke/fulfilled") {
            toast.success("Role Permission Revoked Successfully", {
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
  const handleRolePermissionsClick = useCallback(
    (arg: any) => {
      setIsEdit(true);
      setRolePermission({
        id: arg.id,
        title: arg.title,
        description: arg.description,
      });

      toggle();
    },
    [toggle]
  );

  // Get Data

  useEffect(() => {
    dispatch(GetRolePermissionsAction());
    dispatch(GetRolesAction());
    dispatch(GetPermissionsAction());
  }, [dispatch]);

  useEffect(() => {
    if (rolePermission) {
      validation.setValues({
        id: rolePermission.id || "",
        title: rolePermission.title || "",
        description: rolePermission.description || "",
      });
    }
  }, [rolePermission]);

  const columns = useMemo(
    () => [
      {
        header: "Role ID",
        accessorKey: "role_id",
        enableColumnFilter: false,
      },
      {
        header: "Permission ID",
        accessorKey: "permission_id",
        enableColumnFilter: false,
      },
      {
        header: "Role Title",
        accessorKey: "role_title",
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
                    const rolePermissionData = cell.row.original;
                    onClickDelete(rolePermissionData);
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
    [handleRolePermissionsClick]
  );

  return (
    <React.Fragment>
      <Row>
        <DeleteModal
          show={deleteModal}
          onDeleteClick={handleRevokeRolePermission}
          onCloseClick={() => setDeleteModal(false)}
        />

        <Col lg={12}>
          <Card>
            <CardHeader className="border-0">
              <div className="d-flex align-items-center">
                <h5 className="card-title mb-0 flex-grow-1">
                  Role Permissions
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
                      <i className="ri-add-line align-bottom"></i> Assign Role
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
                  data={rolePermissionsList}
                  isGlobalFilter={true}
                  customPageSize={96} // all 96 permissions to the system_admin comes first
                  divClass="table-responsive table-card mb-3"
                  tableClass="align-middle table-nowrap mb-0"
                  SearchPlaceholder="Search for rolePermission details or something..."
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
          {!!isEdit ? "Edit RolePermission" : "Add RolePermission"}
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
                    Role ID
                  </Label>
                  <Input
                    name="role_id"
                    type="select"
                    id="role_id-field"
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
                      Select Role
                    </option>
                    {rolesList &&
                      rolesList?.map((role: any) => (
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
                {!!isEdit ? "Update" : "Add RolePermission"}
              </button>
            </div>
          </div>
        </Form>
      </Modal>
    </React.Fragment>
  );
};

export default RolePermissionsData;
