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
import { useSelector, useDispatch } from "react-redux";
import TableContainer from "../../../Components/Common/TableContainer";
import {
  AssignUserBoxAction,
  GetUserBoxesAction,
  DeleteUserBoxAction,
  // GetOneUserBoxAction,
  UpdateUserBoxAction,
  updateUserBoxStatus,
  GetBoxesAction,
  getCustomers,
} from "../../../slices/thunks";

// Formik
import * as Yup from "yup";
import { useFormik } from "formik";

import DeleteModal from "../../../Components/Common/DeleteModal";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../../Components/Common/Loader";
import { createSelector } from "reselect";
import moment from "moment";

const UserBoxesData = () => {
  const dispatch: any = useDispatch();

  const selectLayoutStateBox = (state: any) => state.Boxes;
  const selectLayoutPropertiesBox = createSelector(
    selectLayoutStateBox,
    (state) => ({
      boxsList: state.data,
      isBoxSuccess: state.isBoxSuccess,
      error: state.error,
      loader: state.loading,
    })
  );

  // Inside your component
  const { boxsList } = useSelector(selectLayoutPropertiesBox);

  const selectLayoutState = (state: any) => state.UserBox;

  const selectLayoutProperties = createSelector(selectLayoutState, (state) => ({
    userBoxsList: state.data,
    isuserBoxSuccess: state.isuserBoxSuccess,
    error: state.error,
    loader: state.loading,
  }));

  // Inside your component
  const { userBoxsList, isuserBoxSuccess, error, loader } = useSelector(
    selectLayoutProperties
  );

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
  const { customers, isCustomerSuccess } = useSelector(ecomCustomerProperties);

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [userBox, setUserBox] = useState<any>([]);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [deleteModalMulti, setDeleteModalMulti] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);

  const toggle = useCallback(() => {
    setModal((prevState) => !prevState);
  }, []);

  const updateStatusUserBox = (id: string, is_active: boolean) => {
    dispatch(updateUserBoxStatus({ id, is_active }));
    setModal(false);
  };
  // validation
  const validation: any = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: userBox.id ? userBox.id : "",
      user_id: userBox.user_id ? userBox.user_id : "",
      box_id: userBox.box_id ? userBox.box_id : "",
    },
    validationSchema: Yup.object({
      user_id: Yup.string().required("Please Enter UserBox Title"),
    }),
    onSubmit: async (values) => {
      if (isEdit) {
        const updateUserBoxs: any = {
          id: values.id,
          user_id: values.user_id || undefined,
          box_id: values.box_id || undefined,
        };
        const updatedUserBoxObj = Object.keys(updateUserBoxs)
          .filter(
            (key) =>
              updateUserBoxs[key as keyof typeof updateUserBoxs] !== undefined
          )
          .reduce((obj: any, key) => {
            obj[key] = updateUserBoxs[key as keyof typeof updateUserBoxs];
            return obj;
          }, {});

        if (Object.values(updatedUserBoxObj).some((val) => val !== undefined)) {
          const result = await dispatch(UpdateUserBoxAction(updatedUserBoxObj));
          if (result && result.payload) {
            setUserBox(async (prevUserBoxs: any[]) => {
              const updatedUserBoxs = Array.isArray(prevUserBoxs)
                ? [...prevUserBoxs]
                : [];
              const newUserBoxs = result.payload.data;
              if (Array.isArray(newUserBoxs)) {
                updatedUserBoxs.push(...newUserBoxs);
              }

              return await dispatch(GetUserBoxesAction());
            });
          }
        }
        validation.resetForm();
      } else {
        const newUserBox = {
          userId: values.user_id,
          boxId: values.box_id,
        };
        const result = await dispatch(AssignUserBoxAction(newUserBox));
        if (result && result.payload) {
          toggle();
          return await dispatch(GetUserBoxesAction());
        }
        validation.resetForm();
      }

      validation.resetForm(); 
      toggle();
    },
  });

  // Delete Data
  const onClickDelete = (userBox: any) => {
    setUserBox(userBox);
    setDeleteModal(true);
  };

  const handleDeleteuserBox = async () => {
    if (userBox) {
      const result = await dispatch(DeleteUserBoxAction(userBox.user_box_id));
      if (result && result.payload) {
        await dispatch(GetUserBoxesAction());
      }
      setDeleteModal(false);
    }
  };

  // update data
  const handleUserBoxsClick = useCallback(
    (arg: any) => {
      setIsEdit(true);
      setUserBox({
        id: arg.user_box_id,
        user_id: arg.user_id,
        box_id: arg.box_id,
      });

      toggle();
    },
    [toggle]
  );

  // Get Data

  useEffect(() => {
    dispatch(GetUserBoxesAction());
    dispatch(GetBoxesAction());
    dispatch(getCustomers());
  }, [dispatch]);

  useEffect(() => {
    if (userBox) {
      validation.setValues({
        id: userBox.id || "",
        user_id: userBox.user_id || "",
        box_id: userBox.box_id || "",
      });
    }
  }, [userBox]);

  // Checked All
  const checkedAll = useCallback(() => {
    const checkall: any = document.getElementById("checkuserBoxAll");
    const ele = document.querySelectorAll(".userBoxCheckuserBox");

    if (checkall.checked) {
      ele.forEach((ele: any) => {
        ele.checked = true;
      });
    } else {
      ele.forEach((ele: any) => {
        ele.checked = false;
      });
    }
    deleteCheckuserBox();
  }, []);

  // Delete Multiple
  const [selectedCheckuserBoxDelete, setSelectedCheckuserBoxDelete] =
    useState<any>([]);
  const [isMultiDeleteButton, setIsMultiDeleteButton] =
    useState<boolean>(false);

  const deleteMultiple = () => {
    const checkall: any = document.getElementById("checkuserBoxAll");
    selectedCheckuserBoxDelete.forEach((element: any) => {
      dispatch(DeleteUserBoxAction(element.user_box_id));
      setTimeout(() => {
        toast.clearWaitingQueue();
      }, 3000);
    });
    setIsMultiDeleteButton(false);
    checkall.checked = false;
  };

  const deleteCheckuserBox = () => {
    const ele = document.querySelectorAll(".userBoxCheckuserBox:checked");
    ele?.length > 0
      ? setIsMultiDeleteButton(true)
      : setIsMultiDeleteButton(false);
    setSelectedCheckuserBoxDelete(ele);
  };

  const columns = useMemo(
    () => [
      {
        header: (
          <input
            type="checkuserBox"
            id="checkuserBoxAll"
            className="form-check-input"
            onClick={() => checkedAll()}
          />
        ),
        cell: (cell: any) => (
          <input
            type="checkuserBox"
            className="userBoxCheckuserBox form-check-input"
            value={cell.getValue()}
            onChange={() => deleteCheckuserBox()}
          />
        ),
        id: "#",
        accessorKey: "",
        enableColumnFilter: false,
        enableSorting: false,
      },
      {
        header: "User Box ID",
        accessorKey: "user_box_id",
        enableColumnFilter: false,
      },
      {
        header: "User ID",
        accessorKey: "user_id",
        enableColumnFilter: false,
      },
      {
        header: "Box ID",
        accessorKey: "box_id",
        enableColumnFilter: false,
      },

      {
        header: "Created At",
        accessorKey: "createdat",
        enableColumnFilter: false,
        cell: (cell: any) => moment(cell.getValue()).format("DD MMMM, YYYY"),
      },
      {
        header: "Box Label",
        accessorKey: "box_label",
        enableColumnFilter: false,
      },
      {
        header: "Tablet Serial Number",
        accessorKey: "serial_number",
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
                  updateStatusUserBox(
                    cellProps.row.original.user_box_id,
                    e.target.checked
                  );
                }}
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
                <DropdownItem href="/apps-userBox-details">
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
                    const userBoxData = cell.row.original;
                    handleUserBoxsClick(userBoxData);
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
                    const userBoxData = cell.row.original;
                    onClickDelete(userBoxData);
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
    [checkedAll]
  );

  return (
    <React.Fragment>
      <Row>
        <DeleteModal
          show={deleteModal}
          onDeleteClick={handleDeleteuserBox}
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
        <Col lg={12}>
          <Card>
            <CardHeader className="border-0">
              <div className="d-flex align-items-center">
                <h5 className="card-user_id mb-0 flex-grow-1">User Boxes</h5>
                <div className="flex-shrink-0">
                  <div className="d-flex flex-wrap gap-2">
                    <button
                      className="btn btn-primary add-btn"
                      onClick={() => {
                        setIsEdit(false);
                        toggle();
                      }}
                    >
                      <i className="ri-add-line align-bottom"></i> Assign New
                      User Box
                    </button>{" "}
                    {isMultiDeleteButton && (
                      <button
                        className="btn btn-soft-danger"
                        onClick={() => setDeleteModalMulti(true)}
                      >
                        <i className="ri-delete-bin-2-line"></i>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardBody className="pt-0">
              {loader ? (
                <Loader error={error} />
              ) : (
                <TableContainer
                  columns={columns}
                  data={userBoxsList}
                  isGlobalFilter={true}
                  customPageSize={8}
                  divClass="table-responsive table-card mb-3"
                  tableClass="align-middle table-nowrap mb-0"
                  SearchPlaceholder="Search for userBox details or something..."
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
          {!!isEdit ? "Edit UserBox" : "Assign User Box"}
        </ModalHeader>{" "}
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
                {
                  <div className="mb-3">
                    <Label htmlFor="user_id-field" className="form-label">
                      Select User ID
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
                      <option value="">Select Customer</option>
                      {customers &&
                        customers?.map((customer: any) => (
                          <option key={customer.id} value={customer.id}>
                            {customer.email}
                          </option>
                        ))}
                    </Input>
                    {validation.touched.user_id && validation.errors.user_id ? (
                      <FormFeedback type="invalid">
                        {validation.errors.user_id}
                      </FormFeedback>
                    ) : null}
                  </div>
                }
              </Col>
              <Col lg={12}>
                {
                  <div className="mb-3">
                    <Label htmlFor="box_id-field" className="form-label">
                      Select Box Serial Number{" "}
                    </Label>
                    <Input
                      name="box_id"
                      type="select"
                      id="box_id-field"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.box_id}
                      invalid={
                        validation.touched.box_id && validation.errors.box_id
                          ? true
                          : false
                      }
                    >
                      <option value="">Select Box</option>
                      {boxsList &&
                        boxsList?.map((box: any) => (
                          <option key={box.id} value={box.id}>
                            {box.serial_number}
                          </option>
                        ))}
                    </Input>
                    {validation.touched.box_id && validation.errors.box_id ? (
                      <FormFeedback type="invalid">
                        {validation.errors.box_id}
                      </FormFeedback>
                    ) : null}
                  </div>
                }
              </Col>
            </Row>
          </ModalBody>
          <div className="modal-footer">
            <div className="hstack gap-2 justify-content-end">
              <button onClick={toggle} type="button" className="btn btn-light">
                Close
              </button>
              <button type="submit" className="btn btn-success" id="add-btn">
                {!!isEdit ? "Update" : "Assign User Box"}
              </button>{" "}
            </div>
          </div>
        </Form>
      </Modal>
    </React.Fragment>
  );
};

export default UserBoxesData;
