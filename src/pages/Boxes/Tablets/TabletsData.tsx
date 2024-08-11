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
import * as moment from "moment";

// Formik
import * as Yup from "yup";
import { useFormik } from "formik";

import DeleteModal from "../../../Components/Common/DeleteModal";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../../Components/Common/Loader";
import { createSelector } from "reselect";
import {
  GetOneTabletAction,
  AddTabletAction,
  DeleteTabletAction,
  GetTabletsAction,
  UpdateTabletAction,
} from "slices/Box/tablet/thunk";

const TabletsData = () => {
  const dispatch: any = useDispatch();
  const selectLayoutState = (state: any) => state.Tablets;

  const selectLayoutProperties = createSelector(selectLayoutState, (state) => ({
    tabletsList: state.data,
    isTabletSuccess: state.isTabletSuccess,
    error: state.error,
    loader: state.loading,
  }));

  // Inside your component
  const { tabletsList, isTabletSuccess, error, loader } = useSelector(
    selectLayoutProperties
  );

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [tablet, setTablet] = useState<any>([]);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [deleteModalMulti, setDeleteModalMulti] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);

  const toggle = useCallback(() => {
    setModal((prevState) => !prevState);
  }, [modal]);

  // validation
  const validation: any = useFormik({
    enableReinitialize: true,

    initialValues: {
      id: tablet.id ? tablet.id : "",
      serial_number: tablet.serial_number ? tablet.serial_number : "",
      android_id: tablet.android_id ? tablet.android_id : "",
    },
    validationSchema: Yup.object({
      serial_number: Yup.string().required("Please Enter Tablet Serial Number"),
      android_id: Yup.string().required("Please Enter Android Number"),
    }),
    onSubmit: async (values) => {
      if (isEdit) {
        const updateTablets = {
          id: values.id,
          serial_number: values.serial_number || undefined,
          android_id: values.android_id || undefined,
        };
        const updatedTabletObj = Object.keys(updateTablets)
          .filter(
            (key) =>
              updateTablets[key as keyof typeof updateTablets] !== undefined
          )
          .reduce((obj: any, key) => {
            obj[key] = updateTablets[key as keyof typeof updateTablets];
            return obj;
          }, {});

        if (Object.values(updatedTabletObj).some((val) => val !== undefined)) {
          const result = await dispatch(UpdateTabletAction(updatedTabletObj));
          if (result && result.payload) {
            setTablet(async (prevUserBoxs: any[]) => {
              const updatedTablet = Array.isArray(prevUserBoxs)
                ? [...prevUserBoxs]
                : [];
              const newUserBoxs = result.payload.data;
              if (Array.isArray(newUserBoxs)) {
                updatedTablet.push(...newUserBoxs);
              }

              return await dispatch(GetTabletsAction());
            });
          }
        }
        validation.resetForm();
      } else {
        const newTablet = {
          serial_number: values.serial_number,
          android_id: values.android_id,
        };
        // save new tablet
        const result = await dispatch(AddTabletAction(newTablet));
        if (result && result.payload) {
          toggle();
          return await dispatch(GetTabletsAction());
        }
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

  const handleDeleteTablet = async () => {
    if (tablet) {
      const result = await dispatch(DeleteTabletAction(tablet.id));
      if (result && result.payload) {
        await dispatch(GetTabletsAction());
      }
      setDeleteModal(false);
    }
  };

  // Update Data
  const handleTabletsClick = useCallback(
    (arg: any) => {
      setIsEdit(true);
      setTablet({
        id: arg.id,
        serial_number: arg.serial_number,
        android_id: arg.android_id,
      });
      toggle();
    },
    [toggle]
  );

  // Get Data

  useEffect(() => {
    dispatch(GetTabletsAction());
  }, [dispatch]);

  useEffect(() => {
    if (tablet) {
      validation.setValues({
        id: tablet.id || "",
        serial_number: tablet.serial_number || "",
        android_id: tablet.android_id || "",
      });
    }
  }, [tablet]);

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
        header: "Tablet ID",
        accessorKey: "id",
        enableColumnFilter: false,
      },
      {
        header: "Serial Number",
        accessorKey: "serial_number",
        enableColumnFilter: false,
      },
      {
        header: "Android ID",
        accessorKey: "android_id",
        enableColumnFilter: false,
      },
      {
        header: "Box ID",
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
              {loader ? (
                <Loader error={error} />
              ) : (
                <TableContainer
                  columns={columns}
                  data={tabletsList}
                  isGlobalFilter={true}
                  customPageSize={8}
                  divClass="table-responsive table-card mb-3"
                  tableClass="align-middle table-nowrap mb-0"
                  SearchPlaceholder="Search for tablet details or something..."
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
                  <Label htmlFor="android_id" className="form-label">
                    Android ID
                  </Label>
                  <Input
                    name="android_id"
                    id="android_id"
                    className="form-control"
                    placeholder="Enter Android ID"
                    type="text"
                    validate={{
                      required: { value: true },
                    }}
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.android_id || ""}
                    invalid={
                      validation.touched.android_id &&
                      validation.errors.android_id
                        ? true
                        : false
                    }
                  />
                  {validation.touched.android_id &&
                  validation.errors.android_id ? (
                    <FormFeedback type="invalid">
                      {validation.errors.android_id}
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
                {!!isEdit ? "Update" : "Add Tablet"}
              </button>
            </div>
          </div>
        </Form>
      </Modal>
    </React.Fragment>
  );
};

export default TabletsData;
