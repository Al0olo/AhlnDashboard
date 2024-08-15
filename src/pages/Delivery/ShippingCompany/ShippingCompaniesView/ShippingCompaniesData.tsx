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
  GetShippingCompaniesAction,
  AddShippingCompanyAction,
  UpdateShippingCompanyAction,
  DeleteShippingCompanyAction,
  GetOneShippingCompanyAction,
} from "../../../../slices/thunks";

// import {
//   ShippingCompanysId,
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

const ShippingCompaniesData = () => {
  const dispatch: any = useDispatch();
  const selectLayoutState = (state: any) => state.ShippingCompanies;

  const selectLayoutProperties = createSelector(selectLayoutState, (state) => ({
    shippingCompanysList: state.data,
    isShippingCompanySuccess: state.isShippingCompanySuccess,
    error: state.error,
    loader: state.loading,
  }));

  // Inside your component
  const { shippingCompanysList, isShippingCompanySuccess, error, loader } =
    useSelector(selectLayoutProperties);

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [shippingCompany, setShippingCompany] = useState<any>([]);

  // Delete ShippingCompanies
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [deleteModalMulti, setDeleteModalMulti] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);

  const toggle = useCallback(() => {
    if (modal) {
      setModal(false);
      setShippingCompany(shippingCompany);
    } else {
      setModal(true);
      setShippingCompany(shippingCompany);
    }
  }, [modal, shippingCompany]);

  // validation
  const validation: any = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      serial_number: (shippingCompany && shippingCompany.serial_number) || "",
      shippingCompany_label:
        (shippingCompany && shippingCompany.shippingCompany_label) || "",
      has_empty_lockers:
        (shippingCompany && shippingCompany.has_empty_lockers) || "",
      current_tablet_id:
        (shippingCompany && shippingCompany.current_tablet_id) || "",
      previous_tablet_id:
        (shippingCompany && shippingCompany.previous_tablet_id) || "",
      shippingCompany_model_id:
        (shippingCompany && shippingCompany.shippingCompany_model_id) || "",
      address_id: (shippingCompany && shippingCompany.address_id) || "",
    },
    validationSchema: Yup.object({
      serial_number: Yup.string().required("Please Enter Serial Number"),
      shippingCompany_label: Yup.string().required(
        "Please Enter ShippingCompany Label"
      ),
      current_tablet_id: Yup.number().required("Please Enter Tablet Id"),
      shippingCompany_model_id: Yup.string().required(
        "Please Enter ShippingCompany Generation Id"
      ),
    }),
    onSubmit: (values) => {
      if (isEdit) {
        const updateShippingCompanies = {
          serial_number: values.serial_number,
          shippingCompany_label: values.shippingCompany_label,
          has_empty_lockers: values.has_empty_lockers,
          current_tablet_id: values.current_tablet_id,
          previous_tablet_id: values.previous_tablet_id,
          shippingCompany_model_id: values.shippingCompany_model_id,
          address_id: values.address_id,
        };
        // update shippingCompany
        dispatch(UpdateShippingCompanyAction(updateShippingCompanies));
        validation.resetForm();
      } else {
        const newShippingCompany = {
          serial_number: values["serial_number"],
          shippingCompany_label: values["shippingCompany_label"],
          has_empty_lockers: values["has_empty_lockers"],
          shippingCompany_model_id: values["shippingCompany_model_id"],
        };
        console.log("RRRRRRRRRRRRRRR");

        // save new shippingCompany
        dispatch(AddShippingCompanyAction(newShippingCompany));
        validation.resetForm();
      }
      toggle();
    },
  });

  // Delete Data
  const onClickDelete = (shippingCompany: any) => {
    setShippingCompany(shippingCompany);
    setDeleteModal(true);
  };

  const handleDeleteShippingCompany = () => {
    console.log("shippingCompany", shippingCompany);

    if (shippingCompany) {
      dispatch(DeleteShippingCompanyAction(shippingCompany.id));
      setDeleteModal(false);
    }
  };

  // Update Data
  const handleShippingCompaniesClick = (arg: any) => {
    const shippingCompany = arg;

    setShippingCompany({
      serial_number: shippingCompany.serial_number,
      shippingCompany_label: shippingCompany.shippingCompany_label,
      has_empty_lockers: shippingCompany.has_empty_lockers,
      shippingCompany_model_id: shippingCompany.shippingCompany_model_id,
      address_id: shippingCompany.address_id,
    });

    setIsEdit(true);
    setModal(true);
  };

  // Get Data

  useEffect(() => {
    dispatch(GetShippingCompaniesAction());
  }, [dispatch]);

  // Checked All
  const checkedAll = useCallback(() => {
    const checkall: any = document.getElementById("checkShippingCompanyAll");
    const ele = document.querySelectorAll(
      ".shippingCompanyCheckShippingCompany"
    );

    if (checkall.checked) {
      ele.forEach((ele: any) => {
        ele.checked = true;
      });
    } else {
      ele.forEach((ele: any) => {
        ele.checked = false;
      });
    }
    deleteCheckshippingCompany();
  }, []);

  // Delete Multiple
  const [
    selectedCheckShippingCompanyDelete,
    setSelectedCheckShippingCompanyDelete,
  ] = useState<any>([]);
  const [isMultiDeleteButton, setIsMultiDeleteButton] =
    useState<boolean>(false);

  const deleteMultiple = () => {
    const checkall: any = document.getElementById("checkShippingCompanyAll");
    selectedCheckShippingCompanyDelete.forEach((element: any) => {
      dispatch(DeleteShippingCompanyAction(element.id));
      setTimeout(() => {
        toast.clearWaitingQueue();
      }, 3000);
    });
    setIsMultiDeleteButton(false);
    checkall.checked = false;
  };

  const deleteCheckshippingCompany = () => {
    const ele = document.querySelectorAll(
      ".shippingCompanyCheckShippingCompany:checked"
    );
    ele?.length > 0
      ? setIsMultiDeleteButton(true)
      : setIsMultiDeleteButton(false);
    setSelectedCheckShippingCompanyDelete(ele);
  };

  const columns = useMemo(
    () => [
      {
        header: (
          <input
            type="checkshippingCompany"
            id="checkShippingCompanyAll"
            className="form-check-input"
            onClick={() => checkedAll()}
          />
        ),
        cell: (cell: any) => (
          <input
            type="checkshippingCompany"
            className="shippingCompanyCheckShippingCompany form-check-input"
            value={cell.getValue()}
            onChange={() => deleteCheckshippingCompany()}
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
        header: "Title",
        accessorKey: "title",
        enableColumnFilter: false,
      },
      {
        header: "Tracking System",
        accessorKey: "tracking_system",
        enableColumnFilter: false,
      },
      {
        header: "Logo",
        accessorKey: "logo",
        enableColumnFilter: false,
      },
      {
        header: "Create Date",
        accessorKey: "createdat",
        enableColumnFilter: false,
        cell: (cell: any) => moment(cell.getValue()).format("DD MMMM, YYYY"),
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
                <DropdownItem href="/apps-shippingCompanys-details">
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
                    const ShippingCompanyData = cell.row.original;
                    handleShippingCompaniesClick(ShippingCompanyData);
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
                    const shippingCompanyData = cell.row.original;
                    onClickDelete(shippingCompanyData);
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
          onDeleteClick={handleDeleteShippingCompany}
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
                <h5 className="card-title mb-0 flex-grow-1">
                  Shipping Companies
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
                      <i className="ri-add-line align-bottom"></i> Create
                      Shipping Company
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
                  data={shippingCompanysList}
                  isGlobalFilter={true}
                  customPageSize={10}
                  divClass="table-responsive table-card mb-3"
                  tableClass="align-middle table-nowrap mb-0"
                  SearchPlaceholder="Search for shippingCompany details or something..."
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
          {!!isEdit ? "Edit ShippingCompany" : "Add ShippingCompany"}
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
                    Serial Number
                  </Label>
                  <Input
                    name="serial_number"
                    id="serial-field"
                    className="form-control"
                    placeholder="Enter Serial Number"
                    type="text"
                    validate={{
                      required: { value: true },
                    }}
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.serial_number || ""}
                    invalid={
                      validation.touched.serial_number &&
                      validation.errors.serial_number
                        ? true
                        : false
                    }
                  />
                  {validation.touched.serial_number &&
                  validation.errors.serial_number ? (
                    <FormFeedback type="invalid">
                      {validation.errors.serial_number}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col lg={12}>
                <div>
                  <Label htmlFor="client_nameName-field" className="form-label">
                    ShippingCompany Label
                  </Label>
                  <Input
                    name="shippingCompany_label"
                    type="text"
                    id="shippingCompany_label-field"
                    placeholder="Enter ShippingCompany Label"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.shippingCompany_label || ""}
                    invalid={
                      validation.touched.shippingCompany_label &&
                      validation.errors.shippingCompany_label
                        ? true
                        : false
                    }
                  />
                  {validation.touched.shippingCompany_label &&
                  validation.errors.shippingCompany_label ? (
                    <FormFeedback type="invalid">
                      {validation.errors.shippingCompany_label}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              {/* <Col lg={6}>
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
              </Col> */}

              <Col lg={12}>
                <Label htmlFor="shippingCompany-status" className="form-label">
                  Has Empty Lockers
                </Label>
                <Input
                  name="status"
                  type="select"
                  className="form-select"
                  id="lockers-field"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.has_empty_lockers || ""}
                  invalid={
                    validation.touched.has_empty_lockers &&
                    validation.errors.has_empty_lockers
                      ? true
                      : false
                  }
                >
                  <option value="true">True</option>
                  <option value="false">False</option>
                </Input>
                {validation.touched.has_empty_lockers &&
                validation.errors.has_empty_lockers ? (
                  <FormFeedback type="invalid">
                    {validation.errors.has_empty_lockers}
                  </FormFeedback>
                ) : null}
              </Col>
              <Col lg={12}>
                <div>
                  <Label htmlFor="tasksTitle-field" className="form-label">
                    ShippingCompany Generation ID
                  </Label>
                  <Input
                    name="shippingCompany_model_id"
                    id="serial-field"
                    className="form-control"
                    placeholder="Enter ShippingCompany Generation Model"
                    type="text"
                    validate={{
                      required: { value: true },
                    }}
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.shippingCompany_model_id || ""}
                    invalid={
                      validation.touched.shippingCompany_model_id &&
                      validation.errors.shippingCompany_model_id
                        ? true
                        : false
                    }
                  />
                  {validation.touched.shippingCompany_model_id &&
                  validation.errors.shippingCompany_model_id ? (
                    <FormFeedback type="invalid">
                      {validation.errors.shippingCompany_model_id}
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
                {!!isEdit ? "Update" : "Add ShippingCompany"}
              </button>
            </div>
          </div>
        </Form>
      </Modal>
    </React.Fragment>
  );
};

export default ShippingCompaniesData;
