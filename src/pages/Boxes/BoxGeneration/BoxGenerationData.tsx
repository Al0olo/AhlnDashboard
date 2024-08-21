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
  AddBoxGenerationAction,
  DeleteBoxGenerationAction,
  GetBoxGenerationsAction,
  UpdateBoxGenerationAction,
} from "slices/Box/boxGeneration/thunk";
import { useAppSelector } from "redux-hooks";

const BoxGenerationsData = () => {
  const dispatch: any = useDispatch();
  const { boxGenerations, loading, spinner } = useAppSelector(
    (state) => state.BoxGeneration
  );

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [boxGeneration, setBoxGeneration] = useState<any>({
    id: "",
    model_name: "",
    number_of_doors: "",
    width: "",
    height: "",
    color: "",
    model_image: "",
    has_outside_camera: false,
    has_inside_camera: false,
    has_tablet: false,
  });
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  // const [deleteModalMulti, setDeleteModalMulti] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);

  const toggle = useCallback(() => {
    setModal((prevState) => !prevState);
  }, [modal]);

  // validation
  const validation: any = useFormik({
    enableReinitialize: true,

    initialValues: {
      id: boxGeneration.id ? boxGeneration.id : "",
      model_name: boxGeneration.model_name ? boxGeneration.model_name : "",
      number_of_doors: boxGeneration.number_of_doors
        ? boxGeneration.number_of_doors
        : "",
      width: boxGeneration.width ? boxGeneration.width : "",
      height: boxGeneration.height ? boxGeneration.height : "",
      color: boxGeneration.color ? boxGeneration.color : "",
      model_image: boxGeneration.model_image ? boxGeneration.model_image : "",
      has_outside_camera: boxGeneration.has_outside_camera,
      has_inside_camera: boxGeneration.has_inside_camera,
      has_tablet: boxGeneration.has_tablet,
    },
    validationSchema: Yup.object({
      model_name: Yup.string().required("Model Name is required"),
      number_of_doors: Yup.string().required("Number of Doors is required"),
      width: Yup.string().required("Width is required"),
      height: Yup.string().required("Height is required"),
      color: Yup.string().required("Color is required"),
      model_image: Yup.string().required("Model Image is required"),
    }),
    onSubmit: async (values) => {
      if (isEdit) {
        const updateBoxGenerations = {
          id: values.id,
          model_name: values.model_name,
          number_of_doors: values.number_of_doors,
          width: values.width,
          height: values.height,
          color: values.color,
          model_image: values.model_image,
          has_outside_camera: values.has_outside_camera,
          has_inside_camera: values.has_inside_camera,
          has_tablet: values.has_tablet,
        };

        dispatch(UpdateBoxGenerationAction(updateBoxGenerations)).then(
          (result: any) => {
            if (result.type === "boxGeneration/update/fulfilled") {
              toast.success("Box Generation Updated Successfully", {
                autoClose: 3000,
              });
              toggle();
            } else {
              toast.error(`Error ${result.payload}`, {
                autoClose: 3000,
              });
            }
          }
        );

        validation.resetForm();
      } else {
        const newBoxGeneration = {
          model_name: values.model_name,
          number_of_doors: values.number_of_doors,
          width: values.width,
          height: values.height,
          color: values.color,
          model_image: values.model_image,
          has_outside_camera: values.has_outside_camera || false,
          has_inside_camera: values.has_inside_camera || false,
          has_tablet: values.has_tablet || false,
        };
        // save new boxGeneration
        dispatch(AddBoxGenerationAction(newBoxGeneration)).then(
          (result: any) => {
            if (result.type === "boxGeneration/new/fulfilled") {
              toast.success("Box Generation Added Successfully", {
                autoClose: 3000,
              });
              toggle();
            } else {
              toast.error(`Error ${result.payload}`, {
                autoClose: 3000,
              });
            }
          }
        );

        validation.resetForm();
      }
    },
  });

  // Delete Data
  const onClickDelete = (boxGeneration: any) => {
    setBoxGeneration(boxGeneration);
    setDeleteModal(true);
  };

  const handleDeleteBoxGeneration = () => {
    if (boxGeneration) {
      dispatch(DeleteBoxGenerationAction(boxGeneration.id)).then(
        (result: any) => {
          if (result.type === "boxGeneration/delete/fulfilled") {
            toast.success("Box Generation Deleted Successfully", {
              autoClose: 3000,
            });
          } else {
            toast.error(`Error ${result.payload}`, {
              autoClose: 3000,
            });
          }
        }
      );
      setDeleteModal(false);
    }
  };

  // Update Data
  const handleBoxGenerationsClick = useCallback(
    (arg: any) => {
      setIsEdit(true);
      setBoxGeneration({
        id: arg.id,
        model_name: arg.model_name,
        number_of_doors: arg.number_of_doors,
        width: arg.width,
        height: arg.height,
        color: arg.color,
        model_image: arg.model_image,
        has_outside_camera: arg.has_outside_camera,
        has_inside_camera: arg.has_inside_camera,
        has_tablet: arg.has_tablet,
      });
      toggle();
    },
    [toggle]
  );

  // Get Data

  useEffect(() => {
    dispatch(GetBoxGenerationsAction());
  }, [dispatch]);

  // Checked All
  // const checkedAll = useCallback(() => {
  //   const checkall: any = document.getElementById("checkBoxGenerationAll");
  //   const ele = document.querySelectorAll(".boxGenerationCheckBoxGeneration");

  //   if (checkall.checked) {
  //     ele.forEach((ele: any) => {
  //       ele.checked = true;
  //     });
  //   } else {
  //     ele.forEach((ele: any) => {
  //       ele.checked = false;
  //     });
  //   }
  //   deleteCheckboxGeneration();
  // }, []);

  // Delete Multiple
  // const [
  //   selectedCheckBoxGenerationDelete,
  //   setSelectedCheckBoxGenerationDelete,
  // ] = useState<any>([]);
  // const [isMultiDeleteButton, setIsMultiDeleteButton] =
  //   useState<boolean>(false);

  // const deleteMultiple = () => {
  //   const checkall: any = document.getElementById("checkBoxGenerationAll");
  //   selectedCheckBoxGenerationDelete.forEach((element: any) => {
  //     console.log(element.value, "value");

  //     dispatch(DeleteBoxGenerationAction(element.value));
  //     setTimeout(() => {
  //       toast.clearWaitingQueue();
  //     }, 3000);
  //   });
  //   setIsMultiDeleteButton(false);
  //   checkall.checked = false;
  // };

  // const deleteCheckboxGeneration = () => {
  //   const ele = document.querySelectorAll(
  //     ".boxGenerationCheckBoxGeneration:checked"
  //   );
  //   console.log(ele, "ele");

  //   ele.length > 0
  //     ? setIsMultiDeleteButton(true)
  //     : setIsMultiDeleteButton(false);
  //   setSelectedCheckBoxGenerationDelete(ele);
  // };

  const columns = useMemo(
    () => [
      {
        // header: (
        //   <input
        //     type="checkbox"
        //     id="checkBoxGenerationAll"
        //     className="form-check-input"
        //     onClick={() => checkedAll()}
        //   />
        // ),
        // cell: (cell: any) => {
        //   console.log(cell.getValue(), "ceelkl");

        //   return (
        //     <input
        //       type="checkbox"
        //       className="boxGenerationCheckBoxGeneration form-check-input"
        //       value={cell.getValue()}
        //       onChange={() => deleteCheckboxGeneration()}
        //     />
        //   );
        // },
        id: "#",
        accessorKey: "id",
        enableColumnFilter: false,
        enableSorting: false,
      },
      {
        header: "Model Name",
        accessorKey: "model_name",
        enableColumnFilter: false,
      },
      {
        header: "# of Doors",
        accessorKey: "number_of_doors",
        enableColumnFilter: false,
      },
      {
        header: "Width",
        accessorKey: "width",
        enableColumnFilter: false,
      },
      {
        header: "Height",
        accessorKey: "height",
        enableColumnFilter: false,
      },
      {
        header: "Color",
        accessorKey: "color",
        enableColumnFilter: false,
      },
      {
        header: "Model Image",
        accessorKey: "model_image",
        enableColumnFilter: false,
        cell: (cell: any) => (
          <a href={cell.getValue()} rel="noreferrer" target="_blank">
            {cell.getValue()}
          </a>
        ),
      },
      {
        header: "Outside Camera",
        accessorKey: "has_outside_camera",
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
        header: "Inside Camera",
        accessorKey: "has_inside_camera",
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
        header: "Tablet",
        accessorKey: "has_tablet",
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
                <DropdownItem href="/apps-boxGenerations-details">
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
                    const BoxGenerationData = cell.row.original;
                    handleBoxGenerationsClick(BoxGenerationData);
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
                    onClickDelete(cell.row.original);
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
    [boxGenerations]
  );

  return (
    <React.Fragment>
      <Row>
        <DeleteModal
          show={deleteModal}
          onDeleteClick={handleDeleteBoxGeneration}
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
                <h5 className="card-title mb-0 flex-grow-1">Box Generations</h5>
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
                      Generation
                    </button>{" "}
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
                  data={boxGenerations}
                  isGlobalFilter={true}
                  customPageSize={10}
                  divClass="table-responsive table-card mb-3"
                  tableClass="align-middle table-nowrap mb-0"
                  SearchPlaceholder="Search for Box Generation details or something..."
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
          {!!isEdit ? "Edit BoxGeneration" : "Add BoxGeneration"}
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
                  <Label htmlFor="model_name" className="form-label">
                    Model Name
                  </Label>
                  <Input
                    name="model_name"
                    id="model_name"
                    className="form-control"
                    placeholder="Enter Model Name"
                    type="text"
                    validate={{
                      required: { value: true },
                    }}
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.model_name || ""}
                    invalid={
                      validation.touched.model_name &&
                      validation.errors.model_name
                        ? true
                        : false
                    }
                  />
                  {validation.touched.model_name &&
                  validation.errors.model_name ? (
                    <FormFeedback type="invalid">
                      {validation.errors.model_name}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col lg={6}>
                <div>
                  <Label htmlFor="number_of_doors" className="form-label">
                    Number Of Doors
                  </Label>
                  <Input
                    name="number_of_doors"
                    id="number_of_doors"
                    className="form-control"
                    placeholder="Enter Number Of Doors"
                    type="number"
                    validate={{
                      required: { value: true },
                    }}
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.number_of_doors || ""}
                    invalid={
                      validation.touched.number_of_doors &&
                      validation.errors.number_of_doors
                        ? true
                        : false
                    }
                  />
                  {validation.touched.number_of_doors &&
                  validation.errors.number_of_doors ? (
                    <FormFeedback type="invalid">
                      {validation.errors.number_of_doors}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col lg={6}>
                <div>
                  <Label htmlFor="color" className="form-label">
                    Color
                  </Label>
                  <Input
                    name="color"
                    id="color"
                    className="form-control"
                    placeholder="Enter Model Color"
                    type="text"
                    validate={{
                      required: { value: true },
                    }}
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.color || ""}
                    invalid={
                      validation.touched.color && validation.errors.color
                        ? true
                        : false
                    }
                  />
                  {validation.touched.color && validation.errors.color ? (
                    <FormFeedback type="invalid">
                      {validation.errors.color}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col lg={6}>
                <div>
                  <Label htmlFor="width" className="form-label">
                    Width
                  </Label>
                  <Input
                    name="width"
                    id="width"
                    className="form-control"
                    placeholder="Enter Width in cms"
                    type="number"
                    validate={{
                      required: { value: true },
                    }}
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.width || ""}
                    invalid={
                      validation.touched.width && validation.errors.width
                        ? true
                        : false
                    }
                  />
                  {validation.touched.width && validation.errors.width ? (
                    <FormFeedback type="invalid">
                      {validation.errors.width}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col lg={6}>
                <div>
                  <Label htmlFor="height" className="form-label">
                    Height
                  </Label>
                  <Input
                    name="height"
                    id="height"
                    className="form-control"
                    placeholder="Enter Height in cms"
                    type="number"
                    validate={{
                      required: { value: true },
                    }}
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.height || ""}
                    invalid={
                      validation.touched.height && validation.errors.height
                        ? true
                        : false
                    }
                  />
                  {validation.touched.height && validation.errors.height ? (
                    <FormFeedback type="invalid">
                      {validation.errors.height}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col lg={4}>
                <Label htmlFor="has_outside_camera">Has Outside Camera?</Label>
                <Input
                  type="checkbox"
                  defaultChecked={
                    boxGeneration.has_outside_camera ? true : false
                  }
                  name="has_outside_camera"
                  className="form-check-input mx-3"
                  id="has_outside_camera"
                  onBlur={validation.handleBlur}
                  onChange={validation.handleChange}
                  invalid={
                    validation.touched.has_outside_camera &&
                    validation.errors.has_outside_camera
                      ? true
                      : false
                  }
                />
                {validation.touched.has_outside_camera &&
                validation.errors.has_outside_camera ? (
                  <FormFeedback type="invalid">
                    {validation.errors.has_outside_camera}
                  </FormFeedback>
                ) : null}
              </Col>
              <Col lg={4}>
                <Label htmlFor="has_inside_camera">Has Inside Camera?</Label>
                <Input
                  type="checkbox"
                  defaultChecked={boxGeneration.has_inside_camera}
                  name="has_inside_camera"
                  className="form-check-input mx-3"
                  id="has_inside_camera"
                  onBlur={validation.handleBlur}
                  onChange={validation.handleChange}
                  invalid={
                    validation.touched.has_inside_camera &&
                    validation.errors.has_inside_camera
                      ? true
                      : false
                  }
                />
                {validation.touched.has_inside_camera &&
                validation.errors.has_inside_camera ? (
                  <FormFeedback type="invalid">
                    {validation.errors.has_inside_camera}
                  </FormFeedback>
                ) : null}
              </Col>
              <Col lg={4}>
                <Label htmlFor="has_tablet">Has Tablet?</Label>
                <Input
                  type="checkbox"
                  defaultChecked={boxGeneration.has_tablet}
                  name="has_tablet"
                  className="form-check-input mx-3"
                  id="has_tablet"
                  onBlur={validation.handleBlur}
                  onChange={validation.handleChange}
                  invalid={
                    validation.touched.has_tablet &&
                    validation.errors.has_tablet
                      ? true
                      : false
                  }
                />
                {validation.touched.has_tablet &&
                validation.errors.has_tablet ? (
                  <FormFeedback type="invalid">
                    {validation.errors.has_tablet}
                  </FormFeedback>
                ) : null}
              </Col>
              <Col lg={12}>
                <div>
                  <Label htmlFor="model_image" className="form-label">
                    Model Image
                  </Label>
                  <Input
                    name="model_image"
                    id="model_image"
                    className="form-control"
                    placeholder="Enter Model Image Link"
                    type="text"
                    validate={{
                      required: { value: true },
                    }}
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.model_image || ""}
                    invalid={
                      validation.touched.model_image &&
                      validation.errors.model_image
                        ? true
                        : false
                    }
                  />
                  {validation.touched.model_image &&
                  validation.errors.model_image ? (
                    <FormFeedback type="invalid">
                      {validation.errors.model_image}
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
                {!!isEdit ? "Update" : "Add Box Generation"}
              </button>
            </div>
          </div>
        </Form>
      </Modal>
    </React.Fragment>
  );
};

export default BoxGenerationsData;
