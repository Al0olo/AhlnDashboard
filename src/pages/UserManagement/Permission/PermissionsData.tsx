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
  AddPermissionAction,
  GetPermissionsAction,
  DeletePermissionAction,
  // GetOnePermissionAction,
  UpdatePermissionAction,
} from "../../../slices/thunks";

// Formik
import * as Yup from "yup";
import { useFormik } from "formik";

import DeleteModal from "../../../Components/Common/DeleteModal";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../../Components/Common/Loader";
import { useAppSelector } from "redux-hooks";

const PermissionsData = () => {
  const dispatch: any = useDispatch();
  const { permissionsList, loading, error } = useAppSelector(
    (state) => state.Permission
  );
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [permission, setPermission] = useState<any>([]);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);

  const toggle = useCallback(() => {
    setModal((prevState) => !prevState);
  }, [modal]);

  // validation
  const validation: any = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: isEdit ? permission.id : "",
      title: isEdit ? permission.title : "",
      description: isEdit ? permission.description : "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Please Enter Permission Title"),
      description: Yup.string().required("Please Enter Permission Description"),
    }),
    onSubmit: async (values) => {
      if (isEdit) {
        const updatePermissions = {
          id: values.id,
          title: values.title || undefined,
          description: values.description || undefined,
        };

        dispatch(UpdatePermissionAction(updatePermissions)).then(
          (result: any) => {
            if (result.type === "permission/update/fulfilled") {
              toast.success("Permission Updated Successfully", {
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
      } else {
        const newPermission = {
          title: values.title,
          description: values.description,
        };
        await dispatch(AddPermissionAction(newPermission)).then(
          (result: any) => {
            if (result.type === "permission/add/fulfilled") {
              toast.success("Permission Added Successfully", {
                autoClose: 3000,
              });
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
  const onClickDelete = (permission: any) => {
    setPermission(permission);
    setDeleteModal(true);
  };

  const handleDeletepermission = async () => {
    if (permission) {
      await dispatch(DeletePermissionAction(permission.id)).then(
        (result: any) => {
          if (result.type === "permission/delete/fulfilled") {
            toast.success("Permission Deleted Successfully", {
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
  const handlePermissionsClick = useCallback(
    (arg: any) => {
      setIsEdit(true);
      setPermission({
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
    dispatch(GetPermissionsAction());
  }, [dispatch]);

  useEffect(() => {
    if (permission) {
      validation.setValues({
        id: permission.id || "",
        title: permission.title || "",
        description: permission.description || "",
      });
    }
  }, [permission]);

  const columns = useMemo(
    () => [
      {
        header: "ID",
        accessorKey: "id",
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
                <DropdownItem
                  className="edit-item-btn"
                  href="#showModal"
                  data-bs-toggle="modal"
                  onClick={() => {
                    const permissionData = cell.row.original;
                    handlePermissionsClick(permissionData);
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
                    const permissionData = cell.row.original;
                    onClickDelete(permissionData);
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
    [handlePermissionsClick]
  );

  return (
    <React.Fragment>
      <Row>
        <DeleteModal
          show={deleteModal}
          onDeleteClick={handleDeletepermission}
          onCloseClick={() => setDeleteModal(false)}
        />

        <Col lg={12}>
          <Card>
            <CardHeader className="border-0">
              <div className="d-flex align-items-center">
                <h5 className="card-title mb-0 flex-grow-1">Permissions</h5>
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
                  data={permissionsList}
                  isGlobalFilter={true}
                  customPageSize={50}
                  divClass="table-responsive table-card mb-3"
                  tableClass="align-middle table-nowrap mb-0"
                  SearchPlaceholder="Search for permission details or something..."
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
          {!!isEdit ? "Edit Permission" : "Add Permission"}
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
                  <Label htmlFor="title-field" className="form-label">
                    Title
                  </Label>
                  <Input
                    name="title"
                    id="title-field"
                    className="form-control"
                    placeholder="Enter Permission Title"
                    type="text"
                    validate={{
                      required: { value: true },
                    }}
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.title || ""}
                    invalid={
                      validation.touched.title && validation.errors.title
                        ? true
                        : false
                    }
                  />
                  {validation.touched.title && validation.errors.title ? (
                    <FormFeedback type="invalid">
                      {validation.errors.title}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col lg={12}>
                <div>
                  <Label htmlFor="description-field" className="form-label">
                    Description
                  </Label>
                  <Input
                    name="description"
                    type="text"
                    id="description-field"
                    placeholder="Enter Permission Description"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.description || ""}
                    invalid={
                      validation.touched.description &&
                      validation.errors.description
                        ? true
                        : false
                    }
                  />
                  {validation.touched.description &&
                  validation.errors.description ? (
                    <FormFeedback type="invalid">
                      {validation.errors.description}
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
                {!!isEdit ? "Update" : "Add Permission"}
              </button>
            </div>
          </div>
        </Form>
      </Modal>
    </React.Fragment>
  );
};

export default PermissionsData;
