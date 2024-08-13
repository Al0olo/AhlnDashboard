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
import TableContainer from "../../../../Components/Common/TableContainer";
import {
  DeleteAddressAction,
  GetAddressesAction,
  GetOneAddressAction,
  UpdateAddressAction,
  AddAddressAction,
} from "../../../../slices/thunks";

// import {
//   AddresssId,
//   Title,
//   Client,
//   AssignedTo,
//   CreateDate,
//   DueDate,
//   Status,
//   Priority,
// } from "./TicketCol";
//Import Flatepicker
import Flatpickr from "react-flatpickr";
import * as moment from "moment";

// Formik
import * as Yup from "yup";
import { useFormik } from "formik";

import DeleteModal from "../../../../Components/Common/DeleteModal";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../../../Components/Common/Loader";
import { createSelector } from "reselect";
import { Link } from "react-router-dom";

const AddressesData = () => {
  const dispatch: any = useDispatch();
  const selectLayoutState = (state: any) => state.Address;

  const selectLayoutProperties = createSelector(selectLayoutState, (state) => ({
    addressList: state.data,
    isAddressSuccess: state.isAddressSuccess,
    error: state.error,
    loader: state.loading,
  }));

  // Inside your component
  const { addressList, isAddressSuccess, error, loader } = useSelector(
    selectLayoutProperties
  );

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [address, setAddress] = useState<any>([]);

  // Delete Addresses
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [deleteModalMulti, setDeleteModalMulti] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);

  const toggle = useCallback(() => {
    if (modal) {
      setModal(false);
      setAddress(address);
    } else {
      setModal(true);
      setAddress(address);
    }
  }, [modal, address]);

  // validation
  const validation: any = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      // Initial values are used to set up the initial form values.
      // The keys of the object correspond to the keys of the values object we defined in validationSchema.
      // The values correspond to the initial values for those fields.
      // The || "" is used to prevent uncaught errors if the address object is undefined.
      id: (address && address.id) || "",
      // addressId: (address && address.addressId) || "",
      // title: (address && address.title) || "",
      // client: (address && address.client) || "",
      // assigned: (address && address.assigned) || "",
      // createDate: (address && address.createDate) || "",
      // dueDate: (address && address.dueDate) || "",
      // status: (address && address.status) || "",
      // priority: (address && address.priority) || "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Please Enter Title"),
      client: Yup.string().required("Please Enter Client Name"),
      assigned: Yup.string().required("Please Enter Assigned Name"),
      createDate: Yup.string().required("Please Enter Date"),
      dueDate: Yup.string().required("Please Enter Date"),
      status: Yup.string().required("Please Enter Your Joining status"),
      priority: Yup.string().required("Please Enter Your Priority"),
    }),
    onSubmit: (values) => {
      if (isEdit) {
        const updateAddresses = {
          id: address ? address.id : 0,
          // addressId: values.addressId,
          // title: values.title,
          // client: values.client,
          // assigned: values.assigned,
          // createDate: values.createDate,
          // dueDate: values.dueDate,
          // status: values.status,
          // priority: values.priority,
        };
        // update address
        // dispatch(updateAddress(updateAddresses));
        validation.resetForm();
      } else {
        const newAddress = {
          // id: (Math.floor(Math.random() * (30 - 20)) + 20).toString(),
          // addressId:
          //   "#VLZ4" + (Math.floor(Math.random() * (30 - 20)) + 20).toString(),
          // title: values["title"],
          // client: values["client"],
          // assigned: values["assigned"],
          // createDate: values["createDate"],
          // dueDate: values["dueDate"],
          // status: values["status"],
          // priority: values["priority"],
        };
        // save new address
        dispatch(AddAddressAction(newAddress));
        validation.resetForm();
      }
      toggle();
    },
  });

  // Delete Data
  const onClickDelete = (address: any) => {
    setAddress(address);
    setDeleteModal(true);
  };

  const handleDeleteAddress = () => {
    if (address) {
      //   dispatch(deleteAddress(address.id));
      setDeleteModal(false);
    }
  };

  // Update Data
  const handleAddressesClick = (arg: any) => {
    const address = arg;

    setAddress({
      id: address.id,
      // addressId: address.id,
      // title: address.serial_number,
      // client: address.client,
      // assigned: address.assigned,
      // createDate: address.createDate,
      // dueDate: address.dueDate,
      // status: address.status,
      // priority: address.priority,
    });

    setIsEdit(true);
    setModal(true);
  };

  // Get Data

  useEffect(() => {
    dispatch(GetAddressesAction());
  }, [dispatch]);

  // Checked All
  const checkedAll = useCallback(() => {
    const checkall: any = document.getElementById("checkAddressAll");
    const ele = document.querySelectorAll(".addressCheckAddress");

    if (checkall.checked) {
      ele.forEach((ele: any) => {
        ele.checked = true;
      });
    } else {
      ele.forEach((ele: any) => {
        ele.checked = false;
      });
    }
    deleteCheckaddress();
  }, []);

  // Delete Multiple
  const [selectedCheckAddressDelete, setSelectedCheckAddressDelete] =
    useState<any>([]);
  const [isMultiDeleteButton, setIsMultiDeleteButton] =
    useState<boolean>(false);

  const deleteMultiple = () => {
    const checkall: any = document.getElementById("checkAddressAll");
    selectedCheckAddressDelete.forEach((element: any) => {
      //   dispatch(deleteAddress(element.value));
      setTimeout(() => {
        toast.clearWaitingQueue();
      }, 3000);
    });
    setIsMultiDeleteButton(false);
    checkall.checked = false;
  };

  const deleteCheckaddress = () => {
    const ele = document.querySelectorAll(".addressCheckAddress:checked");
    ele.length > 0
      ? setIsMultiDeleteButton(true)
      : setIsMultiDeleteButton(false);
    setSelectedCheckAddressDelete(ele);
  };

  const columns = useMemo(
    () => [
      {
        header: (
          <input
            type="checkaddress"
            id="checkAddressAll"
            className="form-check-input ahln-check"
            onClick={() => checkedAll()}
          />
        ),
        cell: (cell: any) => (
          <input
            type="checkaddress"
            className="addressCheckAddress form-check-input ahln-check"
            value={cell.getValue()}
            onChange={() => deleteCheckaddress()}
          />
        ),
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
        header: "Box ID",
        accessorKey: "box_id",
        enableColumnFilter: false,
      },
      {
        header: "Country",
        accessorKey: "country",
        enableColumnFilter: false,
      },
      {
        header: "City",
        accessorKey: "city",
        enableColumnFilter: false,
      },
      {
        header: "Create Date",
        accessorKey: "createdat",
        enableColumnFilter: false,
        cell: (cell: any) => moment(cell.getValue()).format("DD MMMM, YYYY"),
      },
      {
        header: "District",
        accessorKey: "district",
        enableColumnFilter: false,
      },
      {
        header: "Street",
        accessorKey: "street",
        enableColumnFilter: false,
      },
      {
        header: "Building Type",
        accessorKey: "building_type",
        enableColumnFilter: false,
      },
      {
        header: "Building Number",
        accessorKey: "building_number",
        enableColumnFilter: false,
      },
      {
        header: "Floor",
        accessorKey: "floor",
        enableColumnFilter: false,
      },
      {
        header: "Apartment Number",
        accessorKey: "apartment_number",
        enableColumnFilter: false,
      },
      {
        header: "User ID",
        accessorKey: "user_id",
        enableColumnFilter: false,
      },
      {
        header: "Actions",
        cell: (cell: any) => (
          <>
          <Link to={`/apps-boxs-details`} className="text-muted">
            <i className="ri-edit-box-line "></i>{" "}
          </Link>
          <a 
                  data-bs-toggle="modal"
                  onClick={(e:any) => {
                    e.preventDefault()
                    const AddressData = cell.row.original;
                    handleAddressesClick(AddressData);
                  }} className="text-muted">
            <i className="ri-pencil-fill "></i>{" "}
          </a>
          <a data-bs-toggle="modal"
                  href="#deleteOrder"
                  onClick={(e:any) => {
                    e.preventDefault()
                    const addressData = cell.row.original;
                    onClickDelete(addressData);
                  }} className="text-muted">
            <i className="ri-close-circle-line "></i>{" "}
          </a>
          <UncontrolledDropdown>
            {/* <DropdownToggle tag="a" className="btn btn-soft-secondary btn-sm">
              <i className="ri-more-fill align-middle"></i>
            </DropdownToggle> */}
            <DropdownMenu className="dropdown-menu-end">
              <li>
                <DropdownItem href="/apps-addresss-details">
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
                    const AddressData = cell.row.original;
                    handleAddressesClick(AddressData);
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
                    const addressData = cell.row.original;
                    onClickDelete(addressData);
                  }}
                >
                  <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>{" "}
                  Delete
                </DropdownItem>
              </li>
            </DropdownMenu>
          </UncontrolledDropdown>
          </>
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
          onDeleteClick={handleDeleteAddress}
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
          
            <Card className="border-0 p-3">
              <div className="d-flex align-items-center">
                <h5 className="card-title mb-0 flex-grow-1 ahln-module-title">Addresses</h5>
                <div className="flex-shrink-0">
                  <div className="d-flex flex-wrap gap-2">
                    <button
                      className="btn btn-primary add-btn  ahln-btn-module"
                      onClick={() => {
                        setIsEdit(false);
                        toggle();
                      }}
                    >
                      <i className="ri-add-line align-bottom"></i> Create
                      Address
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
            </Card>
              {loader ? (
                <Loader error={error} />
              ) : (
                <TableContainer
                  columns={columns}
                  modelName={`addresses`}
                  data={addressList}
                  isGlobalFilter={true}
                  customPageSize={8}
                  divClass="table-responsive table-card mb-3"
                  tableClass="align-middle table-nowrap mb-0"
                  SearchPlaceholder="Search for address details or something..."
                />
              )}
              <ToastContainer closeButton={false} limit={1} />
           
          
        </Col>
      </Row>

      <Modal
        isOpen={modal}
        toggle={toggle}
        centered
        size="lg"
        className="ahln-modal border-0"
        modalClassName="zoomIn"
      >
        <ModalHeader toggle={toggle} className="p-3 bg-info-subtle bg-img ">
          {!!isEdit ? "Edit Address" : "Add Address"}
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
            <Row className="g-3">
              <Col lg={12}>
                <div>
                  <Label htmlFor="tasksTitle-field" className="form-label">
                    Title
                  </Label>
                  <Input
                    name="title"
                    id="tasksTitle-field"
                    className="form-control"
                    placeholder="Enter Title"
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
              <Col lg={6}>
                <div>
                  <Label htmlFor="client_nameName-field" className="form-label">
                    Client
                  </Label>
                  <Input
                    name="client"
                    type="text"
                    id="client_nameName-field"
                    placeholder="Enter Client Name"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.client || ""}
                    invalid={
                      validation.touched.client && validation.errors.client
                        ? true
                        : false
                    }
                  />
                  {validation.touched.client && validation.errors.client ? (
                    <FormFeedback type="invalid">
                      {validation.errors.client}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col lg={6}>
                <div>
                  <Label htmlFor="assignedtoName-field" className="form-label">
                    Assigned To
                  </Label>
                  <Input
                    name="assigned"
                    type="text"
                    id="assignedtoName-field"
                    placeholder="Enter Assigned Name"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.assigned || ""}
                    invalid={
                      validation.touched.assigned && validation.errors.assigned
                        ? true
                        : false
                    }
                  />
                  {validation.touched.assigned && validation.errors.assigned ? (
                    <FormFeedback type="invalid">
                      {validation.errors.assigned}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col lg={6}>
                <Label htmlFor="date-field" className="form-label">
                  Create Date
                </Label>
                <Flatpickr
                  name="createDate"
                  id="date-field"
                  className="form-control"
                  placeholder="Select a date"
                  options={{
                    altInput: true,
                    altFormat: "d M, Y",
                    dateFormat: "d M, Y",
                  }}
                  onChange={(createDate: any) =>
                    validation.setFieldValue(
                      "createDate",
                      moment(createDate[0]).format("DD MMMM ,YYYY")
                    )
                  }
                  value={validation.values.createDate || ""}
                />
                {validation.errors.createDate &&
                validation.touched.createDate ? (
                  <FormFeedback type="invalid" className="d-block">
                    {validation.errors.createDate}
                  </FormFeedback>
                ) : null}
              </Col>
              <Col lg={6}>
                <Label htmlFor="duedate-field" className="form-label">
                  Due Date
                </Label>
                <Flatpickr
                  name="dueDate"
                  id="date-field"
                  className="form-control"
                  placeholder="Select a date"
                  options={{
                    altInput: true,
                    altFormat: "d M, Y",
                    dateFormat: "d M, Y",
                  }}
                  onChange={(dueDate: any) =>
                    validation.setFieldValue(
                      "dueDate",
                      moment(dueDate[0]).format("DD MMMM ,YYYY")
                    )
                  }
                  value={validation.values.dueDate || ""}
                />
                {validation.errors.dueDate && validation.touched.dueDate ? (
                  <FormFeedback type="invalid" className="d-block">
                    {validation.errors.dueDate}
                  </FormFeedback>
                ) : null}
              </Col>
              <Col lg={6}>
                <Label htmlFor="address-status" className="form-label">
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
                  <option value="">Status</option>
                  <option value="New">New</option>
                  <option value="Inprogress">Inprogress</option>
                  <option value="Closed">Closed</option>
                  <option value="Open">Open</option>
                </Input>
                {validation.touched.status && validation.errors.status ? (
                  <FormFeedback type="invalid">
                    {validation.errors.status}
                  </FormFeedback>
                ) : null}
              </Col>
              <Col lg={6}>
                <Label htmlFor="priority-field" className="form-label">
                  Priority
                </Label>
                <Input
                  name="priority"
                  type="select"
                  className="form-select"
                  id="priority-field"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.priority || ""}
                  invalid={
                    validation.touched.priority && validation.errors.priority
                      ? true
                      : false
                  }
                >
                  <option value="">Priority</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </Input>
                {validation.touched.priority && validation.errors.priority ? (
                  <FormFeedback type="invalid">
                    {validation.errors.priority}
                  </FormFeedback>
                ) : null}
              </Col>
            </Row>
          </ModalBody>
          <div className="modal-footer">
            <div className="hstack gap-2 justify-content-end">
              
            <button type="submit" className="btn btn-success btn-lg ahln-btn-module" id="add-btn">
                {!!isEdit ? "Update" : "Add Address"}
              </button>
              <button onClick={toggle} type="button" className="btn btn-light ahln-btn-muted text-center">
                Close
              </button>
            </div>
          </div>
        </Form>
      </Modal>
    </React.Fragment>
  );
};

export default AddressesData;
