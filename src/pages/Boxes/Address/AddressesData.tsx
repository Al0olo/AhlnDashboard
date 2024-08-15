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
import {
  DeleteAddressAction,
  GetAddressesAction,
  // GetOneAddressAction,
  UpdateAddressAction,
  AddAddressAction,
  getCustomers,
} from "../../../slices/thunks";

import Flatpickr from "react-flatpickr";
import * as moment from "moment";

// Formik
import * as Yup from "yup";
import { useFormik } from "formik";

import DeleteModal from "../../../Components/Common/DeleteModal";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createSelector } from "reselect";
import Loader from "Components/Common/Loader";
import { country } from "common/data";

const AddressesData = () => {
  const dispatch: any = useDispatch();
  const selectLayoutState = (state: any) => state.Address;

  const selectLayoutProperties = createSelector(selectLayoutState, (state) => ({
    addressList: state.data,
    isAddressSuccess: state.isAddressSuccess,
    error: state.error,
    loader: state.loading,
  }));

  // Inside your component
  const { addressList, isAddressSuccess, error, loader } = useSelector(
    selectLayoutProperties
  );

  const ecomCustomerProperties = createSelector(
    (state: any) => state.Ecommerce,
    (ecom) => ({
      customers: ecom.data,
      isCustomerSuccess: ecom.isCustomerSuccess,
      error: ecom.error,
      loader: ecom.loading,
    })
  );
  // Inside your component
  const { customers, isCustomerSuccess } = useSelector(ecomCustomerProperties);

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [address, setAddress] = useState<any>([]);

  // Delete Addresses
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [deleteModalMulti, setDeleteModalMulti] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);

  const toggle = useCallback(() => {
    setModal((prevState) => !prevState);
  }, [modal]);

  // validation
  const validation: any = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      id: address.id ? address.id : "",
      country: address.country ? address.country : "",
      city: address.city ? address.city : "",
      district: address.district ? address.district : "",
      street: address.street ? address.street : "",
      building_type: address.building_type ? address.building_type : "",
      building_number: address.building_number ? address.building_number : "",
      floor: address.floor ? address.floor : "",
      apartment_number: address.apartment_number
        ? address.apartment_number
        : "",
      user_id: address.user_id ? address.user_id : "",
    },
    validationSchema: Yup.object({
      country: Yup.string().required("Country is required"),
      city: Yup.string().required("City is required"),
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
          id: values.id,
          country: values.country || undefined,
          city: values.city || undefined,
          district: values.district || undefined,
          street: values.street || undefined,
          building_type: values.building_type || undefined,
          building_number: values.building_number || undefined,
          floor: values.floor || undefined,
          apartment_number: values.apartment_number || undefined,
          user_id: values.user_id || undefined,
        };

        const updatedAddressObj = Object.keys(updateAddresses)
          .filter(
            (key) =>
              updateAddresses[key as keyof typeof updateAddresses] !== undefined
          )
          .reduce((obj: any, key) => {
            obj[key] = updateAddresses[key as keyof typeof updateAddresses];
            return obj;
          }, {});

        if (Object.values(updatedAddressObj).some((val) => val !== undefined)) {
          const result = await dispatch(UpdateAddressAction(updatedAddressObj));
          if (result && result.payload) {
            setAddress(async (prevUserBoxs: any[]) => {
              const updatedTablet = Array.isArray(prevUserBoxs)
                ? [...prevUserBoxs]
                : [];
              const newUserBoxs = result.payload.data;
              if (Array.isArray(newUserBoxs)) {
                updatedTablet.push(...newUserBoxs);
              }

              return await dispatch(GetAddressesAction());
            });
          }
        }

        validation.resetForm();
      } else {
        const newAddress = {
          country: values.country,
          city: values.city,
          district: values.district,
          street: values.street,
          building_type: values.building_type,
          building_number: values.building_number,
          floor: values.floor,
          apartment_number: values.apartment_number,
          user_id: values.user_id,
        };
        // save new address
        const result = await dispatch(AddAddressAction(newAddress));
        if (result && result.payload) {
          toggle();
          return await dispatch(GetAddressesAction());
        }
        validation.resetForm();
      }
      toggle();
    },
  });

  // Delete Data
  const onClickDelete = (address: any) => {
    setAddress(address);
    setDeleteModal(true);
  };

  const handleDeleteAddress = async () => {
    if (address) {
      const result = await dispatch(DeleteAddressAction(address.id));
      if (result && result.payload) {
        await dispatch(GetAddressesAction());
      }
      setDeleteModal(false);
    }
  };

  // Update Data
  const handleAddressesClick = useCallback(
    (arg: any) => {
      setIsEdit(true);
      setAddress({
        id: arg.id,
        country: arg.country,
        city: arg.city,
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
  }, [dispatch]);

  // Checked All
  const checkedAll = useCallback(() => {
    const checkall: any = document.getElementById("checkAddressAll");
    const ele = document.querySelectorAll(".addressCheckAddress");

    if (checkall.checked) {
      ele.forEach((ele: any) => {
        ele.checked = true;
      });
    } else {
      ele.forEach((ele: any) => {
        ele.checked = false;
      });
    }
    deleteCheckaddress();
  }, []);

  // Delete Multiple
  const [selectedCheckAddressDelete, setSelectedCheckAddressDelete] =
    useState<any>([]);
  const [isMultiDeleteButton, setIsMultiDeleteButton] =
    useState<boolean>(false);

  const deleteMultiple = () => {
    const checkall: any = document.getElementById("checkAddressAll");
    selectedCheckAddressDelete.forEach((element: any) => {
      //   dispatch(deleteAddress(element.value));
      setTimeout(() => {
        toast.clearWaitingQueue();
      }, 3000);
    });
    setIsMultiDeleteButton(false);
    checkall.checked = false;
  };

  const deleteCheckaddress = () => {
    const ele = document.querySelectorAll(".addressCheckAddress:checked");
    ele.length > 0
      ? setIsMultiDeleteButton(true)
      : setIsMultiDeleteButton(false);
    setSelectedCheckAddressDelete(ele);
  };

  const columns = useMemo(
    () => [
      {
        header: (
          <input
            type="checkaddress"
            id="checkAddressAll"
            className="form-check-input"
            onClick={() => checkedAll()}
          />
        ),
        cell: (cell: any) => (
          <input
            type="checkaddress"
            className="addressCheckAddress form-check-input"
            value={cell.getValue()}
            onChange={() => deleteCheckaddress()}
          />
        ),
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
        header: "Box ID",
        accessorKey: "box_id",
        enableColumnFilter: false,
      },
      {
        header: "Country",
        accessorKey: "country",
        enableColumnFilter: false,
      },
      {
        header: "City",
        accessorKey: "city",
        enableColumnFilter: false,
      },
      {
        header: "Create Date",
        accessorKey: "createdat",
        enableColumnFilter: false,
        cell: (cell: any) => moment(cell.getValue()).format("DD MMMM, YYYY"),
      },
      {
        header: "District",
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
    [checkedAll]
  );

  return (
    <React.Fragment>
      <Row>
        <DeleteModal
          show={deleteModal}
          onDeleteClick={handleDeleteAddress}
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
                <h5 className="card-title mb-0 flex-grow-1">Addresses</h5>
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
                  <Label htmlFor="country-field" className="form-label">
                    Country
                  </Label>
                  <Input
                    name="country"
                    id="country-field"
                    className="form-control"
                    placeholder="Enter Country"
                    type="text"
                    validate={{
                      required: { value: true },
                    }}
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.country || ""}
                    invalid={
                      validation.touched.country && validation.errors.country
                        ? true
                        : false
                    }
                  />
                  {validation.touched.country && validation.errors.country ? (
                    <FormFeedback type="invalid">
                      {validation.errors.country}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col lg={6}>
                <div>
                  <Label htmlFor="city-field" className="form-label">
                    City
                  </Label>
                  <Input
                    name="city"
                    type="text"
                    id="city-field"
                    placeholder="Enter City"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.city || ""}
                    invalid={
                      validation.touched.city && validation.errors.city
                        ? true
                        : false
                    }
                  />
                  {validation.touched.city && validation.errors.city ? (
                    <FormFeedback type="invalid">
                      {validation.errors.city}
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
                    {customers &&
                      customers?.map((customer: any) => (
                        <option key={customer.id} value={customer.id}>
                          {customer.email}
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
