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
import {
  GetOneTabletAction,
  AddTabletAction,
  DeleteTabletAction,
  GetTabletsAction,
  UpdateTabletAction,
} from "slices/Box/tablet/thunk";
import { Link } from "react-router-dom";

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
      setTablet(tablet);
    } else {
      setModal(true);
      setTablet(tablet);
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
      serial_number: (tablet && tablet.serial_number) || "",
      android_id: (tablet && tablet.android_id) || "",

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
          serial_number: values.serial_number,
          android_id: values.android_id,
          // assigned: values.assigned,
          // createDate: values.createDate,
          // dueDate: values.dueDate,
          // status: values.status,
          // priority: values.priority,
        };
        // update tablet
        dispatch(UpdateTabletAction(updateTablets));
        validation.resetForm();
      } else {
        const newTablet = {
          // id: (Math.floor(Math.random() * (30 - 20)) + 20).toString(),
          // tabletId:
          // "#VLZ4" + (Math.floor(Math.random() * (30 - 20)) + 20).toString(),
          serial_number: values["serial_number"],
          android_id: values["android_id"],
          // assigned: values["assigned"],
          // createDate: values["createDate"],
          // dueDate: values["dueDate"],
          // status: values["status"],
          // priority: values["priority"],
        };
        // save new tablet
        dispatch(AddTabletAction(newTablet));
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
      dispatch(DeleteTabletAction(tablet.id)).then((res: any) => {
        if (res.type === "tablet/delete/fulfilled") {
          dispatch(GetTabletsAction());
        }
      });
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
    dispatch(GetTabletsAction());
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
            className="form-check-input ahln-check"
            onClick={() => checkedAll()}
          />
        ),
        cell: (cell: any) => (
          <input
            type="checktablet"
            className="tabletCheckTablet form-check-input ahln-check"
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
        header: "Tablet Id",
        accessorKey: "id",
        enableColumnFilter: false,
      },
      {
        header: "Box Id",
        accessorKey: "box_id",
        enableColumnFilter: false,
      },
      {
        header: "Box Label",
        accessorKey: "box_label",
        enableColumnFilter: false,
      },
      {
        header: "Previous Tablet ID",
        accessorKey: "previous_tablet_id",
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
          <>
            <Link to={`/apps-tablets-details`} className="text-muted">
              <i className="ri-edit-box-line "></i>{" "}
            </Link>
            <a
              href="#showModal"
              data-bs-toggle="modal"
              onClick={(e: any) => {
                e.preventDefault();
                const TabletData = cell.row.original;
                handleTabletsClick(TabletData);
              }}
              className="text-muted"
            >
              <i className="ri-pencil-fill "></i>{" "}
            </a>
            <a
              data-bs-toggle="modal"
              href="#deleteOrder"
              onClick={(e: any) => {
                e.preventDefault();
                const tabletData = cell.row.original;
                onClickDelete(tabletData);
              }}
              className="text-muted"
            >
              <i className="ri-close-circle-line "></i>{" "}
            </a>
          </>
          // <UncontrolledDropdown>
          //   <DropdownToggle tag="a" className="btn btn-soft-secondary btn-sm">
          //     <i className="ri-more-fill align-middle"></i>
          //   </DropdownToggle>
          //   <DropdownMenu className="dropdown-menu-end">
          //     <li>
          //       <DropdownItem href="/apps-tablets-details">
          //         <i className="ri-eye-fill align-bottom me-2 text-muted"></i>{" "}
          //         View
          //       </DropdownItem>
          //     </li>
          //     <li>
          //       <DropdownItem
          //         className="edit-item-btn"
          //         href="#showModal"
          //         data-bs-toggle="modal"
          //         onClick={() => {
          //           const TabletData = cell.row.original;
          //           handleTabletsClick(TabletData);
          //         }}
          //       >
          //         <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>{" "}
          //         Edit
          //       </DropdownItem>
          //     </li>
          //     <li>
          //       <DropdownItem
          //         className="remove-item-btn"
          //         data-bs-toggle="modal"
          //         href="#deleteOrder"
          //         onClick={() => {
          //           const tabletData = cell.row.original;
          //           onClickDelete(tabletData);
          //         }}
          //       >
          //         <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>{" "}
          //         Delete
          //       </DropdownItem>
          //     </li>
          //   </DropdownMenu>
          // </UncontrolledDropdown>
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
          <Card className="border-0 p-3">
            <div className="d-flex align-items-center">
              <h5 className="card-title mb-0 flex-grow-1 ahln-module-title">
                Tablets
              </h5>
              <div className="flex-shrink-0">
                <div className="d-flex flex-wrap gap-2">
                  <button
                    className="btn btn-primary add-btn ahln-btn-module"
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
          </Card>
          <CardBody className="pt-0">
            {tabletsList && tabletsList.length ? (
              <TableContainer
                columns={columns}
                modelName={"tablets"}
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
        <ModalHeader toggle={toggle} className="p-3 bg-info-subtle bg-img">
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
                  <Label htmlFor="serial_number" className="form-label">
                    Serial Number
                  </Label>
                  <Input
                    name="serial_number"
                    id="serial_number"
                    className="form-control"
                    placeholder="Enter Title"
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
                  <Label htmlFor="android_id" className="form-label">
                    Android ID
                  </Label>
                  <Input
                    name="serial_number"
                    id="serial_number"
                    className="form-control"
                    placeholder="Enter Title"
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
            </Row>
          </ModalBody>
          <div className="modal-footer">
            <div className="hstack gap-2 justify-content-end">
              <button
                type="submit"
                className="btn btn-success btn-lg ahln-btn-module "
                id="add-btn"
              >
                {!!isEdit ? "Update" : "Add"}
              </button>
              <button
                onClick={toggle}
                type="button"
                className="btn btn-light ahln-btn-muted"
              >
                Close
              </button>
            </div>
          </div>
        </Form>
      </Modal>
    </React.Fragment>
  );
};

export default TabletsData;
