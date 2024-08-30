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
import * as moment from "moment";

// Formik
import * as Yup from "yup";
import { useFormik } from "formik";

import DeleteModal from "../../../Components/Common/DeleteModal";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../../Components/Common/Loader";
import {
  // GetOneTabletAction,
  AddTabletAction,
  DeleteTabletAction,
  GetTabletsAction,
  resetTabletToBoxAction,
  UpdateTabletAction,
} from "slices/Box/tablet/thunk";
import { useAppSelector } from "redux-hooks";
import { GetBoxesAction } from "slices/thunks";

const TabletsData = () => {
  const dispatch: any = useDispatch();
  const { tablets, loading, error } = useAppSelector((state) => state.Tablets);
  const { boxes } = useAppSelector((state) => state.Boxes);

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [tablet, setTablet] = useState<any>({
    serial_number: "",
    android_id: "",
  });
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [resetTabletModal, setResetTabletModal] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  const [modalReset, setModalReset] = useState<boolean>(false);

  const toggle = useCallback(() => {
    setModal((prevState) => !prevState);
  }, [modal]);

  const toggleResetTablet = useCallback(() => {
    setModalReset((prevState) => !prevState);
  }, [modalReset]);

  // validation
  const validation: any = useFormik({
    enableReinitialize: true,

    initialValues: {
      id: isEdit ? tablet?.id : "",
      serial_number: isEdit ? tablet?.serial_number : "",
      android_id: isEdit ? tablet?.android_id : "",
    },

    validationSchema: Yup.object({
      serial_number: Yup.string().required("Please Enter Tablet Serial Number"),
      android_id: Yup.string().required("Please Enter Android Number"),
    }),
    onSubmit: async (values) => {
      if (isEdit) {
        const updateTablets = {
          id: values.id,
          serial_number: values.serial_number,
          android_id: values.android_id,
        };
        dispatch(UpdateTabletAction(updateTablets)).then((result: any) => {
          if (result.type === "tablet/update/fulfilled") {
            toast.success("Tablet Updated Successfully", { autoClose: 3000 });
            toggle();
          } else {
            toast.error(`Error ${result.payload}`, { autoClose: 3000 });
          }
        });
        validation.resetForm();
      } else if (!isEdit) {
        const newTablet = {
          serial_number: values.serial_number,
          android_id: values.android_id,
        };
        // save new tablet
        dispatch(AddTabletAction(newTablet)).then((result: any) => {
          if (result.type === "tablet/new/fulfilled") {
            toast.success("Tablet Added Successfully", { autoClose: 3000 });
            toggle();
          } else {
            toast.error(`Error ${result.payload}`, { autoClose: 3000 });
          }
        });
        validation.resetForm();
      } else if (resetTabletModal) {
        const resetTablet = {
          boxId: boxes?.id,
          tabletId: values.id,
        };
        dispatch(resetTabletToBoxAction(resetTablet)).then((result: any) => {
          if (result.type === "tablet/reset/fulfilled") {
            toast.success("Tablet Reset Successfully", { autoClose: 3000 });
            toggleResetTablet();
          } else {
            toast.error(`Error ${result.payload}`, { autoClose: 3000 });
          }
        });
        validation.resetForm();
      }
    },
  });

  // Delete Data
  const onClickDelete = (tablet: any) => {
    setTablet(tablet);
    setDeleteModal(true);
  };

  const handleDeleteTablet = async () => {
    if (tablet) {
      await dispatch(DeleteTabletAction(tablet.id)).then((result: any) => {
        if (result.type === "tablet/delete/fulfilled") {
          toast.success("Tablet Deleted Successfully", { autoClose: 3000 });
        } else {
          toast.error(`Error ${result.payload}`, { autoClose: 3000 });
        }
      });
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
    [toggle, isEdit, tablet]
  );

  // Get Data

  useEffect(() => {
    dispatch(GetTabletsAction());
    dispatch(GetBoxesAction());
  }, [dispatch]);

  const columns = useMemo(
    () => [
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
    [tablets]
  );

  return (
    <React.Fragment>
      <Row>
        <DeleteModal
          show={deleteModal}
          onDeleteClick={handleDeleteTablet}
          onCloseClick={() => setDeleteModal(false)}
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
                        setResetTabletModal(false);
                        toggle();
                      }}
                    >
                      <i className="ri-add-line align-bottom"></i> Create Tablet
                    </button>{" "}
                    <button
                      className="btn btn-success"
                      onClick={() => {
                        setResetTabletModal(true);
                        setIsEdit(false);
                        toggleResetTablet();
                      }}
                    >
                      <i className="ri-pencil-fill align-bottom"></i> Reset
                      Tablet To Box
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
                  data={tablets}
                  isGlobalFilter={true}
                  customPageSize={10}
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
        isOpen={modalReset}
        toggle={toggleResetTablet}
        centered
        size="lg"
        className="border-0"
        modalClassName="zoomIn"
      >
        <ModalHeader className="p-3 bg-info-subtle" toggle={toggleResetTablet}>
          Reset Tablet
        </ModalHeader>
        <ModalBody>
          <Form>
            <Row className="g-3">
              <Col lg={12}>
                <div>
                  <Label htmlFor="box_id" className="form-label">
                    Box ID
                  </Label>
                  <Input
                    name="box_id"
                    id="box_id"
                    className="form-control"
                    type="select"
                    validate={{
                      required: { value: true },
                    }}
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.box_id}
                    invalid={
                      validation.touched.box_id && validation.errors.box_id
                        ? true
                        : false
                    }
                  >
                    <option
                      value={undefined}
                      defaultValue={validation.values.current_tablet_id}
                    >
                      Select Box ID
                    </option>
                    {boxes &&
                      boxes?.map((box: any) => (
                        <option
                          key={box.id}
                          value={box.id}
                          defaultValue={box.id}
                        >
                          {box.id}
                        </option>
                      ))}
                  </Input>

                  {validation.touched.box_id && validation.errors.box_id ? (
                    <FormFeedback type="invalid">
                      {validation.errors.box_id}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col lg={12}>
                <div>
                  <Label htmlFor="tablet_id" className="form-label">
                    Tablet ID
                  </Label>
                  <Input
                    name="tablet_id"
                    id="tablet_id"
                    className="form-control"
                    type="select"
                    validate={{
                      required: { value: true },
                    }}
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.tablet_id || ""}
                    invalid={
                      validation.touched.tablet_id &&
                      validation.errors.tablet_id
                        ? true
                        : false
                    }
                  >
                    <option
                      value={undefined}
                      defaultValue={validation.values.current_tablet_id}
                    >
                      Select Tablet ID
                    </option>
                    {tablets &&
                      tablets?.map((tablet: any) => (
                        <option
                          key={tablet.id}
                          value={tablet.id}
                          defaultValue={tablet.id}
                        >
                          {tablet.serial_number}
                        </option>
                      ))}
                  </Input>
                  {validation.touched.tablet_id &&
                  validation.errors.tablet_id ? (
                    <FormFeedback type="invalid">
                      {validation.errors.tablet_id}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
            </Row>
          </Form>
        </ModalBody>
        <div className="modal-footer">
          <div className="hstack gap-2 justify-content-end">
            <button
              onClick={toggleResetTablet}
              type="button"
              className="btn btn-light"
            >
              Close
            </button>
            <button type="submit" className="btn btn-success" id="reset-btn">
              {"Reset Tablet"}
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={modal}
        toggle={toggle}
        centered
        size="lg"
        className="border-0"
        modalClassName="zoomIn"
      >
        <ModalHeader toggle={toggle} className="p-3 bg-info-subtle">
          {isEdit ? "Edit Tablet" : "Add Tablet"}
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
