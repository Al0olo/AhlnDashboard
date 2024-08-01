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
import { GetBoxAction, AddBoxAction } from "../../../../slices/thunks";

// import {
//   BoxsId,
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

const BoxesData = () => {
  const dispatch: any = useDispatch();
  const selectLayoutState = (state: any) => state.Boxes;

  const selectLayoutProperties = createSelector(selectLayoutState, (state) => ({
    boxsList: state.data,
    isBoxSuccess: state.isBoxSuccess,
    error: state.error,
  }));

  // Inside your component
  const { boxsList, isBoxSuccess, error } = useSelector(selectLayoutProperties);

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [box, setBox] = useState<any>([]);

  // Delete Boxes
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [deleteModalMulti, setDeleteModalMulti] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);

  const toggle = useCallback(() => {
    if (modal) {
      setModal(false);
      setBox("");
    } else {
      setModal(true);
      setBox("");
    }
  }, [modal]);

  const onSubmit = (values: any, action: any) => {
    handleSubmit(values);
    action.resetForm();
  };

  const handleSubmit = (values: {
    [x: string]: any;
    serial_number: any;
    box_label: any;
    has_empty_lockers: any;
    box_model_id: any;
  }) => {
    console.log("FIREEEEEEE");
    // if (isEdit) {
    //   const updateBoxes = {
    //     // id: box ? box.id : 0,
    //     // boxId: values.boxId,
    //     serial_number: values.serial_number,
    //     box_label: values.box_label,
    //     has_empty_lockers: values.has_empty_lockers,
    //     // createDate: values.createDate,
    //     // current_tablet_id: values.current_tablet_id,
    //     // previous_tablet_id: values.previous_tablet_id,
    //     box_model_id: values.box_model_id,
    //     // address_id: values.address_id,
    //   };
    //   // update box
    //   // dispatch(updateBox(updateBoxes));
    //   validation.resetForm();
    // } else {
    const newBox = {
      serial_number: values["serial_number"],
      box_label: values["box_label"],
      has_empty_lockers: values["has_empty_lockers"],
      box_model_id: values["box_model_id"],
    };
    console.log("RRRRRRRRRRRRRRR");

    // save new box
    dispatch(AddBoxAction(newBox));
    validation.resetForm();
    // }
    toggle();
  };

  // validation
  const validation: any = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      // id: (box && box.id) || "",
      // boxId: (box && box.boxId) || "",
      serial_number: (box && box.serial_number) || "",
      box_label: (box && box.box_label) || "",
      has_empty_lockers: (box && box.has_empty_lockers) || "",
      current_tablet_id: (box && box.current_tablet_id) || "",
      previous_tablet_id: (box && box.previous_tablet_id) || "",
      box_model_id: (box && box.box_model_id) || "",
      address_id: (box && box.address_id) || "",
    },
    validationSchema: Yup.object({
      serial_number: Yup.string().required("Please Enter Serial Number"),
      box_label: Yup.string().required("Please Enter Box Label"),
      current_tablet_id: Yup.number().required("Please Enter Tablet Id"),
      box_model_id: Yup.string().required("Please Enter Box Generation Id"),
    }),
    onSubmit,
  });

  // Delete Data
  const onClickDelete = (box: any) => {
    setBox(box);
    setDeleteModal(true);
  };

  const handleDeleteBox = () => {
    if (box) {
      //   dispatch(deleteBox(box.id));
      setDeleteModal(false);
    }
  };

  // Update Data
  const handleBoxesClick = (arg: any) => {
    const box = arg;

    setBox({
      // id: box.id,
      // boxId: box.id,
      serial_number: box.serial_number,
      box_label: box.box_label,
      has_empty_lockers: box.has_empty_lockers,
      box_model_id: box.box_model_id,
      // dueDate: box.dueDate,
      // status: box.status,
      // priority: box.priority,
    });

    setIsEdit(true);
    setModal(true);
  };

  // Get Data

  useEffect(() => {
    dispatch(GetBoxAction()).then((res: { payload: any; type: any }) => {
      if (res.type === "box/get-all/fulfilled" && res.payload) {
        toast("Boxes Retrived successful", {
          position: "top-right",
          hideProgressBar: false,
          className: "bg-success text-white",
          progress: undefined,
          toastId: "",
        });
      }
    });
  }, [dispatch]);

  // Checked All
  const checkedAll = useCallback(() => {
    const checkall: any = document.getElementById("checkBoxAll");
    const ele = document.querySelectorAll(".boxCheckBox");

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
      //   dispatch(deleteBox(element.value));
      setTimeout(() => {
        toast.clearWaitingQueue();
      }, 3000);
    });
    setIsMultiDeleteButton(false);
    checkall.checked = false;
  };

  const deleteCheckbox = () => {
    const ele = document.querySelectorAll(".boxCheckBox:checked");
    ele.length > 0
      ? setIsMultiDeleteButton(true)
      : setIsMultiDeleteButton(false);
    setSelectedCheckBoxDelete(ele);
  };

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
        cell: (cell: any) => (
          <input
            type="checkbox"
            className="boxCheckBox form-check-input"
            value={cell.getValue()}
            onChange={() => deleteCheckbox()}
          />
        ),
        id: "#",
        accessorKey: "id",
        enableColumnFilter: false,
        enableSorting: false,
      },
      {
        header: "ID",
        accessorKey: "id",
        enableColumnFilter: false,
      },
      {
        header: "Serial",
        accessorKey: "serial_number",
        enableColumnFilter: false,
      },
      {
        header: "Title",
        accessorKey: "box_label",
        enableColumnFilter: false,
      },
      {
        header: "Create Date",
        accessorKey: "createdat",
        enableColumnFilter: false,
        cell: (cell: any) => moment(cell.getValue()).format("DD MMMM, YYYY"),
      },
      {
        header: "Box Model",
        accessorKey: "box_model_id",
        enableColumnFilter: false,
      },
      {
        header: "Tablet ID",
        accessorKey: "current_tablet_id",
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
                <DropdownItem href="/apps-boxs-details">
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
                    const BoxData = cell.row.original;
                    handleBoxesClick(BoxData);
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
                    const boxData = cell.row.original;
                    onClickDelete(boxData);
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
          onDeleteClick={handleDeleteBox}
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
                <h5 className="card-title mb-0 flex-grow-1">Boxes</h5>
                <div className="flex-shrink-0">
                  <div className="d-flex flex-wrap gap-2">
                    <button
                      className="btn btn-primary add-btn"
                      onClick={() => {
                        setIsEdit(false);
                        toggle();
                      }}
                    >
                      <i className="ri-add-line align-bottom"></i> Create Box
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
              {boxsList && boxsList.length ? (
                <TableContainer
                  columns={columns}
                  data={boxsList}
                  isGlobalFilter={true}
                  customPageSize={8}
                  divClass="table-responsive table-card mb-3"
                  tableClass="align-middle table-nowrap mb-0"
                  SearchPlaceholder="Search for box details or something..."
                />
              ) : (
                <Loader error={error} />
                // <></>
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
          {!!isEdit ? "Edit Box" : "Add Box"}
        </ModalHeader>
        <Form className="tablelist-form" onSubmit={validation.handleSubmit}>
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
                    Box Label
                  </Label>
                  <Input
                    name="box_label"
                    type="text"
                    id="box_label-field"
                    placeholder="Enter Box Label"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.box_label || ""}
                    invalid={
                      validation.touched.box_label &&
                      validation.errors.box_label
                        ? true
                        : false
                    }
                  />
                  {validation.touched.box_label &&
                  validation.errors.box_label ? (
                    <FormFeedback type="invalid">
                      {validation.errors.box_label}
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
                <Label htmlFor="box-status" className="form-label">
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
                    Box Generation ID
                  </Label>
                  <Input
                    name="box_model_id"
                    id="serial-field"
                    className="form-control"
                    placeholder="Enter Box Generation Model"
                    type="text"
                    validate={{
                      required: { value: true },
                    }}
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.box_model_id || ""}
                    invalid={
                      validation.touched.box_model_id &&
                      validation.errors.box_model_id
                        ? true
                        : false
                    }
                  />
                  {validation.touched.box_model_id &&
                  validation.errors.box_model_id ? (
                    <FormFeedback type="invalid">
                      {validation.errors.box_model_id}
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
                {!!isEdit ? "Update" : "Add Box"}
              </button>
            </div>
          </div>
        </Form>
      </Modal>
    </React.Fragment>
  );
};

export default BoxesData;
