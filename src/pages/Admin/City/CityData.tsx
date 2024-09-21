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
  AddCityAction,
  DeleteCityAction,
  UpdateCityAction,
  GetCityAction,
} from "slices/admin/city/thunk";
import { useAppSelector } from "redux-hooks";
import { GetCountryAction } from "slices/thunks";

const CityData = () => {
  const dispatch: any = useDispatch();
  const { cityList, loading, spinner } = useAppSelector((state) => state.City);
  const { countryList } = useAppSelector((state) => state.Country);

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [city, setCity] = useState<any>({
    id: "",
    name: "",
    country: "",
  });
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);

  const toggle = useCallback(() => {
    setModal((prevState) => !prevState);
  }, [modal]);

  // validation
  const validation: any = useFormik({
    enableReinitialize: true,

    initialValues: {
      name: isEdit ? city.name : "",
      country: isEdit ? city.country : "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("City Name is required"),
      country: Yup.string().required("Country Name is required"),
    }),
    onSubmit: async (values) => {
      if (isEdit) {
        const updateCity = {
          id: city.id,
          name: values.name,
          country: values.country,
        };

        dispatch(UpdateCityAction(updateCity)).then((result: any) => {
          if (result.type === "city/update/fulfilled") {
            toast.success("City Updated Successfully", {
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
      } else {
        const newCity = {
          name: values.name,
          country: values.country,
        };
        // save new city
        dispatch(AddCityAction(newCity)).then((result: any) => {
          if (result.type === "city/new/fulfilled") {
            toast.success("City Added Successfully", {
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
  const onClickDelete = (city: any) => {
    setCity(city);
    setDeleteModal(true);
  };

  const handleDeleteCity = () => {
    if (city) {
      dispatch(DeleteCityAction(city.id)).then((result: any) => {
        if (result.type === "city/delete/fulfilled") {
          toast.success("City Deleted Successfully", {
            autoClose: 3000,
          });
        } else {
          toast.error(`Error ${result.payload}`, {
            autoClose: 3000,
          });
        }
      });
      setDeleteModal(false);
    }
  };

  // Update Data
  const handleCityClick = useCallback(
    (arg: any) => {
      setIsEdit(true);
      setCity({
        id: arg.id,
        name: arg.name,
        country: arg.country,
      });
      toggle();
    },
    [toggle]
  );

  // Get Data

  useEffect(() => {
    dispatch(GetCityAction());
    dispatch(GetCountryAction());
  }, [dispatch]);

  const columns = useMemo(
    () => [
      {
        id: "#",
        accessorKey: "id",
        enableColumnFilter: false,
        enableSorting: false,
      },
      {
        header: "City Name",
        accessorKey: "name",
        enableColumnFilter: false,
      },
      {
        header: "Country Name",
        accessorKey: "country_name",
        enableColumnFilter: false,
      },

      {
        header: "Create Date",
        accessorKey: "createdat",
        enableColumnFilter: false,
        cell: (cell: any) => moment(cell.getValue()).format("DD MMMM, YYYY"),
      },
      {
        header: "Updated Date",
        accessorKey: "updatedat",
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
                <DropdownItem
                  className="edit-item-btn"
                  href="#showModal"
                  data-bs-toggle="modal"
                  onClick={() => {
                    const CityData = cell.row.original;
                    handleCityClick(CityData);
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
    [city]
  );

  return (
    <React.Fragment>
      <Row>
        <DeleteModal
          show={deleteModal}
          onDeleteClick={handleDeleteCity}
          onCloseClick={() => setDeleteModal(false)}
        />
        <Col lg={12}>
          <Card>
            <CardHeader className="border-0">
              <div className="d-flex align-items-center">
                <h5 className="card-title mb-0 flex-grow-1">City</h5>
                <div className="flex-shrink-0">
                  <div className="d-flex flex-wrap gap-2">
                    <button
                      className="btn btn-primary add-btn"
                      onClick={() => {
                        setIsEdit(false);
                        toggle();
                      }}
                    >
                      <i className="ri-add-line align-bottom"></i> Create City
                    </button>{" "}
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
                  data={cityList}
                  isGlobalFilter={true}
                  customPageSize={10}
                  divClass="table-responsive table-card mb-3"
                  tableClass="align-middle table-nowrap mb-0"
                  SearchPlaceholder="Search for City details or something..."
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
          {!!isEdit ? "Edit City" : "Add City"}
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
                  <Label htmlFor="name" className="form-label">
                    City Name
                  </Label>
                  <Input
                    name="name"
                    id="name"
                    className="form-control"
                    placeholder="Enter City Name"
                    type="text"
                    validate={{
                      required: { value: true },
                    }}
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.name || ""}
                    invalid={
                      validation.touched.name && validation.errors.name
                        ? true
                        : false
                    }
                  />
                  {validation.touched.name && validation.errors.name ? (
                    <FormFeedback type="invalid">
                      {validation.errors.name}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col lg={12}>
                <div>
                  <Label htmlFor="country" className="form-label">
                    Country Name
                  </Label>
                  <Input
                    name="country"
                    type="select"
                    id="country"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.country}
                    invalid={
                      validation.touched.country && validation.errors.country
                        ? true
                        : false
                    }
                  >
                    <option
                      value={undefined}
                      defaultValue={validation.values.country}
                    >
                      Select Country Name
                    </option>
                    {countryList &&
                      countryList?.map((country: any) => (
                        <option
                          key={country.id}
                          value={country.id}
                          defaultValue={country.id}
                        >
                          {country.name}
                        </option>
                      ))}
                  </Input>
                  {validation.touched.country && validation.errors.country ? (
                    <FormFeedback type="invalid">
                      {validation.errors.country}
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
                {!!isEdit ? "Update" : "Add City"}
              </button>
            </div>
          </div>
        </Form>
      </Modal>
    </React.Fragment>
  );
};

export default CityData;
