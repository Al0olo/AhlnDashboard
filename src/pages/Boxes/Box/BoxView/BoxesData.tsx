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
import TableContainer from "../../../../Components/Common/TableContainer";
import {
  GetBoxesAction,
  AddBoxAction,
  DeleteBoxAction,
  UpdateBoxAction,
  GetBoxGenerationsAction,
  GetTabletsAction,
  GetAddressesAction,
} from "../../../../slices/thunks";

import * as moment from "moment";

// Formik
import * as Yup from "yup";
import { useFormik } from "formik";

import DeleteModal from "../../../../Components/Common/DeleteModal";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../../../Components/Common/Loader";
import { useAppSelector } from "redux-hooks";

const BoxesData = () => {
  const dispatch: any = useDispatch();

  const { boxes, loading, spinner } = useAppSelector((state) => state.Boxes);
  const { boxGenerations } = useAppSelector((state) => state.BoxGeneration);

  const [filterTablet, setFilterTablet] = useState<any>([]);
  const [filterAddress, setFilterAddress] = useState<any>([]);

  const [addressData, setAddressData] = useState<any>({});

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

  // Delete Boxes
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  // const [deleteModalMulti, setDeleteModalMulti] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);

  const toggle = useCallback(() => {
    setModal((prevState) => !prevState);
  }, [modal]);

  // validation
  const validation: any = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      id: box.id ? box.id : "",
      serial_number: box.serial_number ? box.serial_number : "",
      box_label: box.box_label ? box.box_label : "",
      has_empty_lockers: box.has_empty_lockers ? box.has_empty_lockers : "",
      box_model_id: box.box_model_id ? box.box_model_id : "",
      current_tablet_id: box.current_tablet_id ? box.current_tablet_id : "",
      previous_tablet_id: box.previous_tablet_id ? box.previous_tablet_id : "",
      address_id: box.address_id ? box.address_id : "",
    },
    validationSchema: Yup.object({
      serial_number: Yup.string().required("Please Enter Serial Number"),
      box_label: Yup.string().required("Please Enter Box Label"),
      box_model_id: Yup.string().required("Please Enter Box Generation Id"),
      has_empty_lockers: Yup.string().required(
        "Please Enter Has Empty Lockers"
      ),
      current_tablet_id: Yup.string().required(
        "Please Enter Current Tablet Id"
      ),
      address_id: Yup.string().required("Please Enter Address Id"),
    }),
    onSubmit: (values) => {
      if (isEdit) {
        const updateBoxes = {
          id: values.id,
          serial_number: values.serial_number,
          box_label: values.box_label,
          has_empty_lockers: values.has_empty_lockers,
          current_tablet_id: values.current_tablet_id,
          previous_tablet_id: values.previous_tablet_id || null,
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
          current_tablet_id: values.current_tablet_id
            ? values.current_tablet_id
            : null,
          previous_tablet_id: values.current_tablet_id
            ? values.previous_tablet_id
            : null,
          address_id: values.address_id ? values.address_id : null,
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

  const handleOnChange = (event: any) => {
    console.log(event.target.value, "AAASSS");

    const value = event.target.value;
    setAddressData(value);
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
    dispatch(GetTabletsAction()).then((res: any) => {
      if (res.type === "tablet/get-all/fulfilled") {
        // setFilterTablet(
        //   [box, ...res.payload.filter((obj: any) => !obj.box_id)].filter(
        //     (v, i, a) =>
        //       a.findIndex(
        //         (t) => t.current_tablet_id === v.current_tablet_id
        //       ) === i
        //   )
        // );
        console.log(res.payload, "res.payload.before");

        setFilterTablet(
          res.payload.filter((obj: any) => !obj.box_id)
          // res.payload.filter((obj: any) => ({
          //   box_id: !obj.box_id,
          //   current_tablet_id: obj.tablet_id,
          // }))
        );
        // setFilterTablet(res.payload.filter((obj: any) => !obj.box_id));
        console.log("res.payload", res.payload);
      }
    });
    dispatch(GetAddressesAction()).then((res: any) => {
      if (res.type === "address/get-all/fulfilled") {
        setFilterAddress(res.payload.filter((obj: any) => !obj.box_id));
      }
    });
  }, [dispatch]);

  console.log("filterTablet", filterTablet);

  // Checked All
  // const checkedAll = useCallback(() => {
  //   const checkall: any = document.getElementById("checkBoxAll");
  //   const ele = document.querySelectorAll(".boxCheckBox");

  //   if (checkall.checked) {
  //     ele.forEach((ele: any) => {
  //       ele.checked = true;
  //     });
  //   } else {
  //     ele.forEach((ele: any) => {
  //       ele.checked = false;
  //     });
  //   }
  //   deleteCheckbox();
  // }, []);

  // // Delete Multiple
  // const [selectedCheckBoxDelete, setSelectedCheckBoxDelete] = useState<any>([]);
  // const [isMultiDeleteButton, setIsMultiDeleteButton] =
  //   useState<boolean>(false);

  // const deleteMultiple = () => {
  //   const checkall: any = document.getElementById("checkBoxAll");
  //   selectedCheckBoxDelete.forEach((element: any) => {
  //     dispatch(DeleteBoxAction(element.id));
  //     setTimeout(() => {
  //       toast.clearWaitingQueue();
  //     }, 3000);
  //   });
  //   setIsMultiDeleteButton(false);
  //   checkall.checked = false;
  // };

  // const deleteCheckbox = () => {
  //   const ele = document.querySelectorAll(".boxCheckBox:checked");
  //   ele?.length > 0
  //     ? setIsMultiDeleteButton(true)
  //     : setIsMultiDeleteButton(false);
  //   setSelectedCheckBoxDelete(ele);
  // };
  console.log("filterTablet", filterTablet);

  const columns = useMemo(
    () => [
      {
        // header: (
        //   <input
        //     type="checkbox"
        //     id="checkBoxAll"
        //     className="form-check-input"
        //     onClick={() => checkedAll()}
        //   />
        // ),
        // cell: (cell: any) => (
        //   <input
        //     type="checkbox"
        //     className="boxCheckBox form-check-input"
        //     value={cell.getValue()}
        //     onChange={() => deleteCheckbox()}
        //   />
        // ),
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
    [handleBoxesClick]
  );
  console.log(validation.values, "validation values");

  return (
    <React.Fragment>
      <Row>
        <DeleteModal
          show={deleteModal}
          onDeleteClick={handleDeleteBox}
          onCloseClick={() => setDeleteModal(false)}
        />
        {/* <DeleteModal
          show={deleteModalMulti}
          onDeleteClick={() => {
            deleteMultiple();
            setDeleteModalMulti(false);
          }}
          onCloseClick={() => setDeleteModalMulti(false)}
        /> */}
        <Col lg={12}>
          <Card>
            <CardHeader className="border-0">
              <div className="d-flex align-items-center">
                <h5 className="card-title mb-0 flex-grow-1">Boxes</h5>
                <div className="flex-shrink-0">
                  <div className="d-flex flex-wrap gap-2">
                    <Form
                      className="btn btn-primary add-btn"
                      onClick={() => {
                        setIsEdit(false);
                        toggle();
                      }}
                    >
                      <i className="ri-add-line align-bottom"></i> Create Box
                    </Form>{" "}
                    {/* {isMultiDeleteButton && (
                      <button
                        className="btn btn-soft-danger"
                        onClick={() => setDeleteModalMulti(true)}
                      >
                        <i className="ri-delete-bin-2-line"></i>
                      </button>
                    )} */}
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

              <Col lg={6}>
                <div>
                  <Label htmlFor="current_tablet_id" className="form-label">
                    Tablet ID
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
                      Select Tablet ID
                    </option>
                    {filterTablet &&
                      filterTablet?.map((tablet: any) => (
                        <option
                          key={tablet.id}
                          value={tablet.id}
                          defaultValue={tablet.id}
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
                    Address ID
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
                    <option
                      value={undefined}
                      defaultValue={validation.values.address_id}
                    >
                      Select Address ID
                    </option>
                    {filterAddress &&
                      filterAddress?.map((address: any) => (
                        <option value={address.id} key={address.id}>
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
