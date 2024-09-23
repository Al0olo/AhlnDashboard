import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormFeedback,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
//redux
import { useDispatch } from "react-redux";
import TableContainer from "../../../../Components/Common/TableContainer";
import {
  AddBoxAction,
  DeleteBoxAction,
  GetAddressesAction,
  GetBoxesAction,
  GetBoxGenerationsAction,
  GetTabletsAction,
  UpdateBoxAction,
} from "../../../../slices/thunks";

import * as moment from "moment";

// Formik
import { useFormik } from "formik";
import * as Yup from "yup";

import DeleteModal from "../../../../Components/Common/DeleteModal";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppSelector } from "redux-hooks";
import Loader from "../../../../Components/Common/Loader";
const BoxesData = () => {
  const dispatch: any = useDispatch();

  const { boxes, loading, spinner } = useAppSelector((state) => state.Boxes);
  const { boxGenerations } = useAppSelector((state) => state.BoxGeneration);
  const { addressList } = useAppSelector((state) => state.Address);

  const [filterTablet, setFilterTablet] = useState<any>([]);
  const [filterAddress, setFilterAddress] = useState<any>([]);

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [box, setBox] = useState<any>({
    id: "",
    serial_number: "",
    box_label: "",
    has_empty_lockers: "",
    box_model_id: "",
    current_tablet_id: "",
    previous_tablet_id: "",
    address_id: "",
  });

  // Delete Box
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);

  const toggle = useCallback(() => {
    setModal((prevState) => !prevState);
  }, [modal]);

  // validation
  const validation: any = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      serial_number: isEdit ? box.serial_number : "",
      box_label: isEdit ? box.box_label : "",
      has_empty_lockers: isEdit ? box.has_empty_lockers : "",
      box_model_id: isEdit ? box.box_model_id : "",
      current_tablet_id: isEdit ? box.current_tablet_id : "",
      previous_tablet_id: isEdit ? box.previous_tablet_id : "",
      address_id: isEdit ? box.address_id : "",
    },
    validationSchema: Yup.object({
      serial_number: Yup.string().required("Please Enter Serial Number"),
      box_label: Yup.string().required("Please Enter Box Label"),
      box_model_id: Yup.string().required("Please Enter Box Generation Id"),
      has_empty_lockers: Yup.string().required(
        "Please Enter Has Empty Lockers"
      ),
    }),
    onSubmit: (values) => {
      if (isEdit) {
        const updateBoxes = {
          id: box.id,
          serial_number: values.serial_number,
          box_label: values.box_label,
          has_empty_lockers: values.has_empty_lockers,
          current_tablet_id: values.current_tablet_id || box.current_tablet_id,
          previous_tablet_id: values.previous_tablet_id,
          box_model_id: values.box_model_id,
          address_id: values.address_id,
        };
        // update box
        dispatch(UpdateBoxAction(updateBoxes)).then((result: any) => {
          if (result.type === "box/update/fulfilled") {
            toast.success("Box Updated Successfully", { autoClose: 3000 });
            toggle();
          } else {
            toast.error(`Error ${result.payload}`, { autoClose: 3000 });
          }
        });
        validation.resetForm();
      } else {
        const newBox = {
          serial_number: values.serial_number,
          box_label: values.box_label,
          has_empty_lockers: values.has_empty_lockers,
          box_model_id: values.box_model_id,
          current_tablet_id: values.current_tablet_id,
          address_id: values.address_id,
        };

        // save new box
        dispatch(AddBoxAction(newBox)).then((result: any) => {
          if (result.type === "box/add/fulfilled") {
            toast.success("Box Added Successfully", { autoClose: 3000 });
            toggle();
          } else {
            toast.error(`Error ${result.payload}`, { autoClose: 3000 });
          }
        });
        validation.resetForm();
      }
    },
  });

  // Delete Data
  const onClickDelete = (box: any) => {
    setBox(box);
    setDeleteModal(true);
  };

  const handleDeleteBox = () => {
    if (box) {
      dispatch(DeleteBoxAction(box.id)).then((result: any) => {
        if (result.type === "box/delete/fulfilled") {
          toast.success("Box Deleted Successfully", { autoClose: 3000 });
        } else {
          toast.error(`Error ${result.payload}`, { autoClose: 3000 });
        }
      });
      setDeleteModal(false);
    }
  };

  // Update Data
  const handleBoxesClick = useCallback(
    (arg: any) => {
      setIsEdit(true);
      filterTablet.push({ id: arg.current_tablet_id });
      setBox({
        id: arg.id,
        serial_number: arg.serial_number,
        box_label: arg.box_label,
        has_empty_lockers: arg.has_empty_lockers,
        current_tablet_id: arg.current_tablet_id,
        previous_tablet_id: arg.previous_tablet_id,
        box_model_id: arg.box_model_id,
        address_id: arg.address_id,
      });
      toggle();
    },
    [toggle, filterTablet]
  );

  // Get Data

  useEffect(() => {
    dispatch(GetBoxesAction());
    dispatch(GetBoxGenerationsAction());
    dispatch(GetAddressesAction());
    dispatch(GetTabletsAction()).then((res: any) => {
      if (res.type === "tablet/get-all/fulfilled") {
        setFilterTablet(res.payload.filter((obj: any) => !obj.box_id));
      }
    });
    dispatch(GetAddressesAction()).then((res: any) => {
      if (res.type === "address/get-all/fulfilled") {
        setFilterAddress(res.payload.filter((obj: any) => !obj.box_id));
      }
    });
  }, [dispatch, GetAddressesAction]);
  console.log(box.address_id, "box.address_id");

  const columns = useMemo(
    () => [
      {
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
        header: "Address ID",
        accessorKey: "address_id",
        enableColumnFilter: false,
      },
      {
        header: "Actions",
        cell: (cell: any) => (
          <>
            <a
              href="#showModal"
              data-bs-toggle="modal"
              onClick={(e: any) => {
                e.preventDefault();
                const BoxData = cell.row.original;
                handleBoxesClick(BoxData);
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
                const boxData = cell.row.original;
                onClickDelete(boxData);
              }}
              className="text-muted"
            >
              <i className="ri-close-circle-line "></i>{" "}
            </a>
          </>
        ),
      },
    ],
    [handleBoxesClick]
  );

  return (
    <React.Fragment>
      <Row>
        <DeleteModal
          show={deleteModal}
          onDeleteClick={handleDeleteBox}
          onCloseClick={() => setDeleteModal(false)}
        />
        <Col lg={12}>
          <Card className="">
            <CardHeader className="card-round">
              <div className="d-flex align-items-center">
                <h5 className="card-title mb-0 flex-grow-1 ahln-module-title">
                  Boxes
                </h5>
                <div className="flex-shrink-0">
                  <div className="d-flex flex-wrap gap-2">
                    <Form
                      className="btn btn-primary add-btn ahln-btn-module"
                      onClick={() => {
                        setIsEdit(false);
                        toggle();
                      }}
                    >
                      <i className="ri-add-line align-bottom"></i> Create Box
                    </Form>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardBody className="pt-0">
              {loading ? (
                <Loader error={spinner} />
              ) : (
                <TableContainer
                  columns={columns}
                  data={boxes}
                  isGlobalFilter={true}
                  customPageSize={10}
                  divClass="table-responsive table-card mb-3"
                  tableClass="align-middle table-nowrap mb-0"
                  SearchPlaceholder="Search for box details or something..."
                />
              )}
              <ToastContainer closeButton={false} limit={1} />
            </CardBody>
          </Card>

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
        <ModalHeader toggle={toggle} className="p-3 bg-img text-light">
          {!!isEdit ? "Edit Box" : "Add Box"}
        </ModalHeader>
        <Form
          encType="multipart/form-data"
          onSubmit={(e) => {
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
                    Serial Number
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    id="serial-input"
                    placeholder="Enter Serial Number"
                    name="serial_number"
                    value={validation.values.serial_number || ""}
                    onBlur={validation.handleBlur}
                    onChange={validation.handleChange}
                    invalid={
                      validation.errors.serial_number &&
                      validation.touched.serial_number
                        ? true
                        : false
                    }
                  />
                  {validation.errors.serial_number &&
                  validation.touched.serial_number ? (
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

              <Col lg={6}>
                <div>
                  <Label htmlFor="current_tablet_id" className="form-label">
                    Tablet ID by Serial Number
                  </Label>
                  <Input
                    name="current_tablet_id"
                    type="select"
                    id="current_tablet_id"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.current_tablet_id}
                    invalid={
                      validation.touched.current_tablet_id &&
                      validation.errors.current_tablet_id
                        ? true
                        : false
                    }
                  >
                    <option
                      value={undefined}
                      defaultValue={validation.values.current_tablet_id}
                    >
                      Select Tablet Serial Number
                    </option>
                    {filterTablet &&
                      filterTablet?.map((tablet: any) => (
                        <option
                          key={tablet.id}
                          value={tablet.id}
                          defaultValue={box.current_tablet_id}
                        >
                          {tablet.id}
                        </option>
                      ))}
                  </Input>
                  {validation.touched.current_tablet_id &&
                  validation.errors.current_tablet_id ? (
                    <FormFeedback type="invalid">
                      {validation.errors.current_tablet_id}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col lg={6}>
                <div>
                  <Label htmlFor="address_id" className="form-label">
                    Address ID by User Email
                  </Label>
                  <Input
                    name="address_id"
                    type="select"
                    id="address_id"
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
                    {isEdit
                      ? addressList &&
                        addressList?.map((address: any) => (
                          <option
                            key={address.id}
                            value={address.id}
                            defaultValue={box.address_id}
                          >
                            {address.id}
                          </option>
                        ))
                      : filterAddress &&
                        filterAddress?.map((address: any) => (
                          <option
                            key={address.id}
                            value={address.id}
                            defaultValue={box.address_id}
                          >
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
              </Col>
              <Col lg={6}>
                <div>
                  <Label htmlFor="tasksTitle-field" className="form-label">
                    Box Generation ID
                  </Label>
                  <Input
                    name="box_model_id"
                    type="select"
                    id="box_model_id-field"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.box_model_id}
                    invalid={
                      validation.touched.box_model_id &&
                      validation.errors.box_model_id
                        ? true
                        : false
                    }
                  >
                    <option
                      value={undefined}
                      defaultValue={validation.values.box_model_id}
                    >
                      Select Box Generation
                    </option>
                    {boxGenerations &&
                      boxGenerations?.map((boxGenerarion: any) => (
                        <option key={boxGenerarion.id} value={boxGenerarion.id}>
                          {boxGenerarion.model_name}
                        </option>
                      ))}
                  </Input>
                  {validation.touched.box_model_id &&
                  validation.errors.box_model_id ? (
                    <FormFeedback type="invalid">
                      {validation.errors.box_model_id}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col lg={6}>
                <Label htmlFor="has_empty_lockers">Has Empty Lockers ?</Label>
                <Input
                  type="checkbox"
                  value="true"
                  name="has_empty_lockers"
                  className="form-check-input mx-3"
                  id="has_empty_lockers"
                  onBlur={validation.handleBlur}
                  onChange={validation.handleChange}
                  invalid={
                    validation.touched.has_empty_lockers &&
                    validation.errors.has_empty_lockers
                      ? true
                      : false
                  }
                />
                {validation.touched.has_empty_lockers &&
                validation.errors.has_empty_lockers ? (
                  <FormFeedback type="invalid">
                    {validation.errors.has_empty_lockers}
                  </FormFeedback>
                ) : null}
              </Col>
            </Row>
          </ModalBody>
          <div className="modal-footer">
            <div className="hstack gap-2 justify-content-end">
              <button
                type="submit"
                className="btn btn-success btn-lg ahln-btn-module"
                id="add-btn"
              >
                {!!isEdit ? "Update" : "Add Box"}
              </button>
              <button
                onClick={toggle}
                type="button"
                className="btn btn-light ahln-btn-muted text-center"
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

export default BoxesData;
