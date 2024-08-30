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
import {
  getShippingCompanies,
  addShippingCompany,
  updateShippingCompany,
  deleteShippingCompany,
} from "../../../slices/thunks";

import * as moment from "moment";

// Formik
import * as Yup from "yup";
import { useFormik } from "formik";

import DeleteModal from "../../../Components/Common/DeleteModal";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../../Components/Common/Loader";
import { useAppSelector } from "redux-hooks";

const ShippingCompaniesData = () => {
  const dispatch: any = useDispatch();
  const { shippingCompanies, error, loadingShippingCompany } = useAppSelector(
    (state) => state.Delivery
  );

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [shippingCompany, setShippingCompany] = useState<any>({
    title: "",
    logo: "",
    tracking_system: "",
  });

  // Delete ShippingCompanies
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
      title: isEdit ? shippingCompany.title : "",
      logo: isEdit ? shippingCompany.logo : "",
      tracking_system: isEdit ? shippingCompany.tracking_system : "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      logo: Yup.string().required("Logo is required"),
      // tracking_system: Yup.string().required("Tracking system is required"),
    }),
    onSubmit: (values) => {
      if (isEdit) {
        const updateShippingCompanies = {
          title: values.title,
          logo: values.logo,
          tracking_system: values.tracking_system,
          id: shippingCompany.id,
        };
        // update shippingCompany
        dispatch(updateShippingCompany(updateShippingCompanies)).then(
          (result: any) => {
            if (
              result.type ===
              "shippingCompanies/updateShippingCompany/fulfilled"
            ) {
              toast.success("Shipping Company Updated Successfully", {
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
        const newShippingCompany = {
          title: values.title,
          logo: values.logo,
          tracking_system: values.tracking_system,
        };

        // save new shippingCompany
        dispatch(addShippingCompany(newShippingCompany)).then((result: any) => {
          if (
            result.type === "shippingCompanies/addShippingCompany/fulfilled"
          ) {
            toast.success("Shipping Company Added Successfully", {
              autoClose: 3000,
            });
            toggle();
          } else {
            toast.error(`Error ${result.payload}`, {
              autoClose: 3000,
            });
          }
        });
        validation.resetForm();
      }
    },
  });

  // Delete Data
  const onClickDelete = (shippingCompany: any) => {
    setShippingCompany(shippingCompany);
    setDeleteModal(true);
  };

  const handleDeleteShippingCompany = () => {
    if (shippingCompany) {
      dispatch(deleteShippingCompany(shippingCompany.id)).then(
        (result: any) => {
          if (
            result.type === "shippingCompanies/deleteShippingCompany/fulfilled"
          ) {
            toast.success("Shipping Company Deleted Successfully", {
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
  const handleShippingCompaniesClick = useCallback(
    (arg: any) => {
      setIsEdit(true);
      setShippingCompany({
        title: arg.title,
        logo: arg.logo,
        tracking_system: arg.tracking_system,
        id: arg.id,
      });
      toggle();
    },
    [toggle]
  );

  // Get Data

  useEffect(() => {
    dispatch(getShippingCompanies());
  }, [dispatch]);

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
              {/* <li>
                <DropdownItem href="/apps-shippingCompanys-details">
                  <i className="ri-eye-fill align-bottom me-2 text-muted"></i>{" "}
                  View
                </DropdownItem>
              </li> */}
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
    [handleShippingCompaniesClick]
  );

  return (
    <React.Fragment>
      <Row>
        <DeleteModal
          show={deleteModal}
          onDeleteClick={handleDeleteShippingCompany}
          onCloseClick={() => setDeleteModal(false)}
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
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardBody className="pt-0">
              {loadingShippingCompany ? (
                <Loader error={error} />
              ) : (
                <TableContainer
                  columns={columns}
                  data={shippingCompanies}
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
          {!!isEdit ? "Edit Shipping Company" : "Add Shipping Company"}
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
                  <Label htmlFor="title" className="form-label">
                    Title
                  </Label>
                  <Input
                    name="title"
                    id="title"
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
              <Col lg={12}>
                <div>
                  <Label htmlFor="logo" className="form-label">
                    Logo
                  </Label>
                  <Input
                    name="logo"
                    type="text"
                    id="logo"
                    placeholder="Enter Logo Link"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.logo || ""}
                    invalid={
                      validation.touched.logo && validation.errors.logo
                        ? true
                        : false
                    }
                  />
                  {validation.touched.logo && validation.errors.logo ? (
                    <FormFeedback type="invalid">
                      {validation.errors.logo}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col lg={12}>
                <div>
                  <Label htmlFor="tracking_system" className="form-label">
                    Tracking System
                  </Label>
                  <Input
                    name="tracking_system"
                    type="text"
                    id="tracking_system"
                    placeholder="Enter Tracking System Api"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.tracking_system || ""}
                    invalid={
                      validation.touched.tracking_system &&
                      validation.errors.tracking_system
                        ? true
                        : false
                    }
                  />
                  {validation.touched.tracking_system &&
                  validation.errors.tracking_system ? (
                    <FormFeedback type="invalid">
                      {validation.errors.tracking_system}
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
                {!!isEdit ? "Update" : "Add Shipping Company"}
              </button>
            </div>
          </div>
        </Form>
      </Modal>
    </React.Fragment>
  );
};

export default ShippingCompaniesData;
