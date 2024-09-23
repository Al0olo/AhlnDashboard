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
  AssignUserBoxAction,
  GetUserBoxesAction,
  DeleteUserBoxAction,
  // GetOneUserBoxAction,
  // UpdateUserBoxAction,
  GetBoxesAction,
  getCustomers,
  GetAddressesAction,
} from "../../../slices/thunks";

// Formik
import * as Yup from "yup";
import { useFormik } from "formik";

import DeleteModal from "../../../Components/Common/DeleteModal";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../../Components/Common/Loader";
import moment from "moment";
import { useAppSelector } from "redux-hooks";

const UserBoxesData = () => {
  const dispatch: any = useDispatch();

  const { userBoxesList, loading, error } = useAppSelector(
    (state) => state.UserBox
  );
  const { boxes } = useAppSelector((state) => state.Boxes);
  const { users } = useAppSelector((state) => state.Users);
  const { addressList } = useAppSelector((state) => state.Address);

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [userBox, setUserBox] = useState<any>({
    user_box_id: "",
    user_id: "",
    box_id: "",
    is_active: true,
    address_id: "",
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
      user_box_id: userBox.id,
      user_id: userBox.user_id,
      box_id: userBox.box_id,
      is_active: userBox.is_active || true,
      address_id: userBox.address_id,
    },
    validationSchema: Yup.object({
      user_id: Yup.string().required("Please Enter User ID"),
      box_id: Yup.string().required("Please Enter Box ID"),
      address_id: Yup.string().required("Please Enter Address ID"),
    }),
    onSubmit: async (values) => {
      const newUserBox = {
        user_box_id: values.user_box_id,
        userId: values.user_id,
        boxId: values.box_id,
        is_active: values.is_active || true,
        addressId: values.address_id,
      };

      dispatch(AssignUserBoxAction(newUserBox)).then((result: any) => {
        if (result.type === "userBox/assign/fulfilled") {
          toast.success("User Box Added Successfully", {
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
    },
  });

  // Delete Data
  const onClickDelete = (userBox: any) => {
    setUserBox(userBox);
    setDeleteModal(true);
  };

  const handleDeleteuserBox = async () => {
    if (userBox) {
      dispatch(DeleteUserBoxAction(userBox.user_box_id)).then((result: any) => {
        if (result.type === "userBox/delete/fulfilled") {
          toast.success("User Box Deleted Successfully", {
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
  const handleUserBoxsClick = useCallback(
    (arg: any) => {
      setIsEdit(true);
      setUserBox({
        user_box_id: arg.user_box_id,
        user_id: arg.user_id,
        box_id: arg.box_id,
        is_active: arg.is_active,
        address_id: arg.address_id,
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
    dispatch(GetAddressesAction());
  }, [dispatch]);

  const columns = useMemo(
    () => [
      {
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
    [handleUserBoxsClick, userBoxesList]
  );

  return (
    <React.Fragment>
      <Row>
        <DeleteModal
          show={deleteModal}
          onDeleteClick={handleDeleteuserBox}
          onCloseClick={() => setDeleteModal(false)}
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
                  data={userBoxesList}
                  isGlobalFilter={true}
                  customPageSize={10}
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
          {"Assign User Box"}
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
                      {users &&
                        users?.map((customer: any) => (
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
                      {boxes &&
                        boxes?.map((box: any) => (
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
              <Col lg={4}>
                <Label htmlFor="is_active">User Status</Label>
                <Input
                  type="checkbox"
                  defaultChecked={userBox.is_active ? true : false}
                  name="is_active"
                  className="form-check-input mx-3"
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
              <Col lg={12}>
                {
                  <div className="mb-3">
                    <Label htmlFor="address_id-field" className="form-label">
                      Select Address ID
                    </Label>
                    <Input
                      name="address_id"
                      type="select"
                      id="address_id-field"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.address_id}
                      invalid={
                        validation.touched.address_id &&
                        validation.errors.address_id
                          ? true
                          : false
                      }
                    >
                      <option value="">Select Address</option>
                      {addressList &&
                        addressList?.map((address: any) => (
                          <option key={address.id} value={address.id}>
                            {address.id}
                          </option>
                        ))}
                    </Input>
                    {validation.touched.address_id &&
                    validation.errors.address_id ? (
                      <FormFeedback type="invalid">
                        {validation.errors.address_id}
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
