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
import { TabletAction } from "../../../../slices/thunks";

// import {
//   TabletsId,
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

const TabletsData = () => {
  const dispatch: any = useDispatch();
  const selectLayoutState = (state: any) => state.Tablets;

  const selectLayoutProperties = createSelector(selectLayoutState, (state) => ({
    tabletsList: state.data,
    isTabletSuccess: state.isTabletSuccess,
    error: state.error,
  }));

  // Inside your component
  const { tabletsList, isTabletSuccess, error } = useSelector(
    selectLayoutProperties
  );

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [tablet, setTablet] = useState<any>([]);

  // Delete Tablets
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [deleteModalMulti, setDeleteModalMulti] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);

  const toggle = useCallback(() => {
    if (modal) {
      setModal(false);
      setTablet("");
    } else {
      setModal(true);
      setTablet("");
    }
  }, [modal]);

  // validation
  const validation: any = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      // Initial values are used to set up the initial form values.
      // The keys of the object correspond to the keys of the values object we defined in validationSchema.
      // The values correspond to the initial values for those fields.
      // The || "" is used to prevent uncaught errors if the tablet object is undefined.
      id: (tablet && tablet.id) || "",
      // tabletId: (tablet && tablet.tabletId) || "",
      // title: (tablet && tablet.title) || "",
      // client: (tablet && tablet.client) || "",
      // assigned: (tablet && tablet.assigned) || "",
      // createDate: (tablet && tablet.createDate) || "",
      // dueDate: (tablet && tablet.dueDate) || "",
      // status: (tablet && tablet.status) || "",
      // priority: (tablet && tablet.priority) || "",
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
        const updateTablets = {
          id: tablet ? tablet.id : 0,
          // tabletId: values.tabletId,
          // title: values.title,
          // client: values.client,
          // assigned: values.assigned,
          // createDate: values.createDate,
          // dueDate: values.dueDate,
          // status: values.status,
          // priority: values.priority,
        };
        // update tablet
        // dispatch(updateTablet(updateTablets));
        validation.resetForm();
      } else {
        const newTablet = {
          id: (Math.floor(Math.random() * (30 - 20)) + 20).toString(),
          tabletId:
            "#VLZ4" + (Math.floor(Math.random() * (30 - 20)) + 20).toString(),
          // title: values["title"],
          // client: values["client"],
          // assigned: values["assigned"],
          // createDate: values["createDate"],
          // dueDate: values["dueDate"],
          // status: values["status"],
          // priority: values["priority"],
        };
        // save new tablet
        // dispatch(onAddNewTablet(newTablet));
        validation.resetForm();
      }
      toggle();
    },
  });

  // Delete Data
  const onClickDelete = (tablet: any) => {
    setTablet(tablet);
    setDeleteModal(true);
  };

  const handleDeleteTablet = () => {
    if (tablet) {
      //   dispatch(deleteTablet(tablet.id));
      setDeleteModal(false);
    }
  };

  // Update Data
  const handleTabletsClick = (arg: any) => {
    const tablet = arg;

    setTablet({
      id: tablet.id,
      // tabletId: tablet.id,
      // title: tablet.serial_number,
      // client: tablet.client,
      // assigned: tablet.assigned,
      // createDate: tablet.createDate,
      // dueDate: tablet.dueDate,
      // status: tablet.status,
      // priority: tablet.priority,
    });

    setIsEdit(true);
    setModal(true);
  };

  // Get Data

  useEffect(() => {
    dispatch(TabletAction()).then((res: { payload: any; type: any }) => {
      if (res.type === "tablet/get-all/fulfilled" && res.payload) {
        toast("Tablets Retrived successful", {
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
    const checkall: any = document.getElementById("checkTabletAll");
    const ele = document.querySelectorAll(".tabletCheckTablet");

    if (checkall.checked) {
      ele.forEach((ele: any) => {
        ele.checked = true;
      });
    } else {
      ele.forEach((ele: any) => {
        ele.checked = false;
      });
    }
    deleteChecktablet();
  }, []);

  // Delete Multiple
  const [selectedCheckTabletDelete, setSelectedCheckTabletDelete] =
    useState<any>([]);
  const [isMultiDeleteButton, setIsMultiDeleteButton] =
    useState<boolean>(false);

  const deleteMultiple = () => {
    const checkall: any = document.getElementById("checkTabletAll");
    selectedCheckTabletDelete.forEach((element: any) => {
      //   dispatch(deleteTablet(element.value));
      setTimeout(() => {
        toast.clearWaitingQueue();
      }, 3000);
    });
    setIsMultiDeleteButton(false);
    checkall.checked = false;
  };

  const deleteChecktablet = () => {
    const ele = document.querySelectorAll(".tabletCheckTablet:checked");
    ele.length > 0
      ? setIsMultiDeleteButton(true)
      : setIsMultiDeleteButton(false);
    setSelectedCheckTabletDelete(ele);
  };

  const columns = useMemo(
    () => [
      {
        header: (
          <input
            type="checktablet"
            id="checkTabletAll"
            className="form-check-input"
            onClick={() => checkedAll()}
          />
        ),
        cell: (cell: any) => (
          <input
            type="checktablet"
            className="tabletCheckTablet form-check-input"
            value={cell.getValue()}
            onChange={() => deleteChecktablet()}
          />
        ),
        id: "#",
        accessorKey: "",
        enableColumnFilter: false,
        enableSorting: false,
      },
      {
        header: "Serial",
        accessorKey: "serial_number",
        enableColumnFilter: false,
      },
      {
        header: "Title",
        accessorKey: "android_id",
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
                <DropdownItem href="/apps-tablets-details">
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
                    const TabletData = cell.row.original;
                    handleTabletsClick(TabletData);
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
                    const tabletData = cell.row.original;
                    onClickDelete(tabletData);
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

  console.log(tabletsList, "tabletsList");

  return (
    <React.Fragment>
      <Row>
        <DeleteModal
          show={deleteModal}
          onDeleteClick={handleDeleteTablet}
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
                <h5 className="card-title mb-0 flex-grow-1">Tablets</h5>
                <div className="flex-shrink-0">
                  <div className="d-flex flex-wrap gap-2">
                    <button
                      className="btn btn-primary add-btn"
                      onClick={() => {
                        setIsEdit(false);
                        toggle();
                      }}
                    >
                      <i className="ri-add-line align-bottom"></i> Create Tablet
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
              {tabletsList && tabletsList.length ? (
                <TableContainer
                  columns={columns}
                  data={tabletsList}
                  isGlobalFilter={true}
                  customPageSize={8}
                  divClass="table-responsive table-card mb-3"
                  tableClass="align-middle table-nowrap mb-0"
                  SearchPlaceholder="Search for tablet details or something..."
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

      {/* <Modal
        isOpen={modal}
        toggle={toggle}
        centered
        size="lg"
        className="border-0"
        modalClassName="zoomIn"
      >
        <ModalHeader toggle={toggle} className="p-3 bg-info-subtle">
          {!!isEdit ? "Edit Tablet" : "Add Tablet"}
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
                <Label htmlFor="tablet-status" className="form-label">
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
              <button onClick={toggle} type="button" className="btn btn-light">
                Close
              </button>
              <button type="submit" className="btn btn-success" id="add-btn">
                {!!isEdit ? "Update" : "Add Tablet"}
              </button>
            </div>
          </div>
        </Form>
      </Modal> */}
    </React.Fragment>
  );
};

export default TabletsData;
