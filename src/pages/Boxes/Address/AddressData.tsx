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
  DeleteAddressAction,
  GetAddressesAction,
  // GetOneAddressAction,
  UpdateAddressAction,
  AddAddressAction,
  getCustomers,
  GetCountryAction,
  GetCityAction,
  GetCityInCountryAction,
} from "../../../slices/thunks";

import * as moment from "moment";

// Formik
import * as Yup from "yup";
import { useFormik } from "formik";

import DeleteModal from "../../../Components/Common/DeleteModal";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "Components/Common/Loader";
import { useAppSelector } from "redux-hooks";

const AddressesData = () => {
  const dispatch: any = useDispatch();

  const { addressList, loading, oneAddress, error } = useAppSelector(
    (state) => state.Address
  );
  const { countryList } = useAppSelector((state) => state.Country);
  const { cityList, cityInCountryList } = useAppSelector((state) => state.City);
  const { users } = useAppSelector((state) => state.Users);

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [address, setAddress] = useState<any>({
    id: "",
    country_id: "",
    city_id: "",
    district: "",
    street: "",
    building_type: "",
    building_number: "",
    floor: "",
    apartment_number: "",
    user_id: "",
  });

  // Delete Addresses
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
      country_id: isEdit ? address.country_id : "",
      city_id: isEdit ? address.city_id : "",
      district: isEdit ? address.district : "",
      street: isEdit ? address.street : "",
      building_type: isEdit ? address.building_type : "",
      building_number: isEdit ? address.building_number : "",
      floor: isEdit ? address.floor : "",
      apartment_number: isEdit ? address.apartment_number : "",
      user_id: isEdit ? address.user_id : "",
    },
    validationSchema: Yup.object({
      country_id: Yup.string().required("Country is required"),
      city_id: Yup.string().required("City is required"),
      district: Yup.string().required("District is required"),
      street: Yup.string().required("Street is required"),
      building_type: Yup.string().required("Building type is required"),
      building_number: Yup.string().required("Building number is required"),
      floor: Yup.string().required("Floor is required"),
      apartment_number: Yup.string().required("Apartment number is required"),
      user_id: Yup.string().required("User id is required"),
    }),
    onSubmit: async (values) => {
      if (isEdit) {
        const updateAddresses = {
          id: address.id,
          country_id: values.country_id,
          city_id: values.city_id,
          district: values.district,
          street: values.street,
          building_type: values.building_type,
          building_number: values.building_number,
          floor: values.floor,
          apartment_number: values.apartment_number,
          user_id: values.user_id,
        };
        dispatch(UpdateAddressAction(updateAddresses)).then((result: any) => {
          if (result.type === "address/update/fulfilled") {
            toast.success("Address Updated Successfully", {
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
        const newAddress = {
          country_id: values.country_id,
          city_id: values.city_id,
          district: values.district,
          street: values.street,
          building_type: values.building_type,
          building_number: values.building_number,
          floor: values.floor,
          apartment_number: values.apartment_number,
          user_id: values.user_id,
        };
        // save new address
        dispatch(AddAddressAction(newAddress)).then((result: any) => {
          if (result.type === "address/new/fulfilled") {
            toast.success("Address Added Successfully", {
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
  const onClickDelete = (address: any) => {
    setAddress(address);
    setDeleteModal(true);
  };

  const handleDeleteAddress = async () => {
    if (address) {
      dispatch(DeleteAddressAction(address.id)).then((result: any) => {
        if (result.type === "address/delete/fulfilled") {
          toast.success("Address Deleted Successfully", {
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
  const handleAddressesClick = useCallback(
    (arg: any) => {
      setIsEdit(true);
      setAddress({
        id: arg.id,
        country_id: arg.country_id,
        city_id: arg.city_id,
        district: arg.district,
        street: arg.street,
        building_type: arg.building_type,
        building_number: arg.building_number,
        floor: arg.floor,
        apartment_number: arg.apartment_number,
        user_id: arg.user_id,
      });
      toggle();
    },
    [toggle]
  );

  // Get Data

  useEffect(() => {
    dispatch(GetAddressesAction());
    dispatch(getCustomers());
    dispatch(GetCountryAction()).then((result: any) => {
      if (result.type === "country/get/fulfilled") {
        dispatch(GetCityInCountryAction(result.payload.id));
      }
    });
  }, [dispatch, GetCountryAction]);
  console.log(users);

  const columns = useMemo(
    () => [
      {
        header: "ID",
        accessorKey: "id",
        enableColumnFilter: false,
      },
      {
        header: "Box ID",
        accessorKey: "box_id",
        enableColumnFilter: false,
      },
      {
        header: "Country",
        accessorKey: "country_name",
        enableColumnFilter: false,
      },
      {
        header: "City",
        accessorKey: "city_name",
        enableColumnFilter: false,
      },
      {
        header: "Create Date",
        accessorKey: "createdat",
        enableColumnFilter: false,
        cell: (cell: any) => moment(cell.getValue()).format("DD MMMM, YYYY"),
      },
      {
        header: "Area",
        accessorKey: "district",
        enableColumnFilter: false,
      },
      {
        header: "Street",
        accessorKey: "street",
        enableColumnFilter: false,
      },
      {
        header: "Building Type",
        accessorKey: "building_type",
        enableColumnFilter: false,
      },
      {
        header: "Building Number",
        accessorKey: "building_number",
        enableColumnFilter: false,
      },
      {
        header: "Floor",
        accessorKey: "floor",
        enableColumnFilter: false,
      },
      {
        header: "Apartment Number",
        accessorKey: "apartment_number",
        enableColumnFilter: false,
      },
      {
        header: "User ID",
        accessorKey: "user_id",
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
                <DropdownItem href="/apps-addresss-details">
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
                    const AddressData = cell.row.original;
                    handleAddressesClick(AddressData);
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
                    const addressData = cell.row.original;
                    onClickDelete(addressData);
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
    [handleAddressesClick]
  );

  return (
    <React.Fragment>
      <Row>
        <DeleteModal
          show={deleteModal}
          onDeleteClick={handleDeleteAddress}
          onCloseClick={() => setDeleteModal(false)}
        />

        <Col lg={12}>
          <Card>
            <CardHeader className="border-0">
              <div className="d-flex align-items-center">
                <h5 className="card-title mb-0 flex-grow-1">Address</h5>
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
                      Address
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
                  data={addressList}
                  isGlobalFilter={true}
                  customPageSize={10}
                  divClass="table-responsive table-card mb-3"
                  tableClass="align-middle table-nowrap mb-0"
                  SearchPlaceholder="Search for address details or something..."
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
          {!!isEdit ? "Edit Address" : "Add Address"}
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
                  <Label htmlFor="country_id" className="form-label">
                    Country Name
                  </Label>
                  <Input
                    name="country_id"
                    type="select"
                    id="country_id"
                    onChange={(e) => {
                      validation.handleChange(e);
                      dispatch(GetCityInCountryAction(e.target.value[0]));
                    }}
                    onBlur={validation.handleBlur}
                    value={validation.values.country_id}
                    invalid={
                      validation.touched.country_id &&
                      validation.errors.country_id
                        ? true
                        : false
                    }
                  >
                    <option
                      value={undefined}
                      defaultValue={validation.values.country_id}
                    >
                      Select Country
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
                  {validation.touched.country_id &&
                  validation.errors.country_id ? (
                    <FormFeedback type="invalid">
                      {validation.errors.country_id}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col lg={6}>
                <div>
                  <Label htmlFor="city_id" className="form-label">
                    City Name
                  </Label>
                  <Input
                    name="city_id"
                    type="select"
                    id="city_id"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.city_id}
                    invalid={
                      validation.touched.city_id && validation.errors.city_id
                        ? true
                        : false
                    }
                  >
                    <option
                      value={undefined}
                      defaultValue={validation.values.city_id}
                    >
                      Select City
                    </option>
                    {cityInCountryList &&
                      cityInCountryList?.map((city: any) => (
                        <option
                          key={city.id}
                          value={city.id}
                          defaultValue={city.id}
                        >
                          {city.name}
                        </option>
                      ))}
                  </Input>
                  {validation.touched.city_id && validation.errors.city_id ? (
                    <FormFeedback type="invalid">
                      {validation.errors.city_id}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col lg={6}>
                <div>
                  <Label htmlFor="user_id-field" className="form-label">
                    Assign To User
                  </Label>
                  <Input
                    name="user_id"
                    type="select"
                    id="user_id-field"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.user_id}
                    invalid={
                      validation.touched.user_id && validation.errors.user_id
                        ? true
                        : false
                    }
                  >
                    <option value="">Select Customer</option>
                    {users &&
                      users?.map((user: any) => (
                        <option
                          key={user.id}
                          value={user.id}
                          defaultValue={user.id}
                        >
                          {user.email}
                        </option>
                      ))}
                  </Input>
                  {validation.touched.user_id && validation.errors.user_id ? (
                    <FormFeedback type="invalid">
                      {validation.errors.user_id}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col lg={6}>
                <div>
                  <Label htmlFor="district-field" className="form-label">
                    District
                  </Label>
                  <Input
                    name="district"
                    type="text"
                    id="district-field"
                    placeholder="Enter Ditrict"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.district || ""}
                    invalid={
                      validation.touched.district && validation.errors.district
                        ? true
                        : false
                    }
                  />
                  {validation.touched.district && validation.errors.district ? (
                    <FormFeedback type="invalid">
                      {validation.errors.district}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col lg={6}>
                <div>
                  <Label htmlFor="street-field" className="form-label">
                    Street
                  </Label>
                  <Input
                    name="street"
                    type="text"
                    id="street-field"
                    placeholder="Enter Street"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.street || ""}
                    invalid={
                      validation.touched.street && validation.errors.street
                        ? true
                        : false
                    }
                  />
                  {validation.touched.street && validation.errors.street ? (
                    <FormFeedback type="invalid">
                      {validation.errors.street}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col lg={6}>
                <div>
                  <Label htmlFor="building_type-field" className="form-label">
                    Building Type
                  </Label>
                  <Input
                    name="building_type"
                    type="text"
                    id="building_type-field"
                    placeholder="Enter Building Type"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.building_type || ""}
                    invalid={
                      validation.touched.building_type &&
                      validation.errors.building_type
                        ? true
                        : false
                    }
                  />
                  {validation.touched.building_type &&
                  validation.errors.building_type ? (
                    <FormFeedback type="invalid">
                      {validation.errors.building_type}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col lg={6}>
                <div>
                  <Label htmlFor="building_number-field" className="form-label">
                    Building Number
                  </Label>
                  <Input
                    name="building_number"
                    type="text"
                    id="building_number-field"
                    placeholder="Enter Building Number"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.building_number || ""}
                    invalid={
                      validation.touched.building_number &&
                      validation.errors.building_number
                        ? true
                        : false
                    }
                  />
                  {validation.touched.building_number &&
                  validation.errors.building_number ? (
                    <FormFeedback type="invalid">
                      {validation.errors.building_number}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col lg={6}>
                <div>
                  <Label htmlFor="floor-field" className="form-label">
                    Floor
                  </Label>
                  <Input
                    name="floor"
                    type="text"
                    id="floor-field"
                    placeholder="Enter Floor"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.floor || ""}
                    invalid={
                      validation.touched.floor && validation.errors.floor
                        ? true
                        : false
                    }
                  />
                  {validation.touched.floor && validation.errors.floor ? (
                    <FormFeedback type="invalid">
                      {validation.errors.floor}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col lg={6}>
                <div>
                  <Label
                    htmlFor="apartment_number-field"
                    className="form-label"
                  >
                    Apartment Number
                  </Label>
                  <Input
                    name="apartment_number"
                    type="text"
                    id="apartment_number-field"
                    placeholder="Enter Apartment Number"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.apartment_number || ""}
                    invalid={
                      validation.touched.apartment_number &&
                      validation.errors.apartment_number
                        ? true
                        : false
                    }
                  />
                  {validation.touched.apartment_number &&
                  validation.errors.apartment_number ? (
                    <FormFeedback type="invalid">
                      {validation.errors.apartment_number}
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
                {!!isEdit ? "Update" : "Add Address"}
              </button>
            </div>
          </div>
        </Form>
      </Modal>
    </React.Fragment>
  );
};

export default AddressesData;
