import React, { useState } from "react";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import {
  Card,
  CardBody,
  Col,
  Container,
  CardHeader,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
  Input,
  Label,
  FormFeedback,
  Form,
} from "reactstrap";

// Redux
import { useDispatch } from "react-redux";
import { addNewProduct as onAddNewProduct } from "../../../slices/thunks";

import Dropzone from "react-dropzone";
import { Link, useNavigate } from "react-router-dom";

//formik
import { useFormik } from "formik";
import * as Yup from "yup";

// Import React FilePond
import { registerPlugin } from "react-filepond";
// Import FilePond styles
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const EcommerceAddProduct = (props: any) => {
  document.title = "Create Model | Dashboard";

  const history = useNavigate();
  const dispatch: any = useDispatch();

  const [customActiveTab, setcustomActiveTab] = useState<any>("1");
  const toggleCustom = (tab: any) => {
    if (customActiveTab !== tab) {
      setcustomActiveTab(tab);
    }
  };
  const [selectedFiles, setselectedFiles] = useState<any>([]);
  const [selectedVisibility, setselectedVisibility] = useState<any>(null);

  function handleAcceptedFiles(files: any) {
    files.map((file: any) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    );
    setselectedFiles(files);
  }

  function handleSelectVisibility(selectedVisibility: any) {
    setselectedVisibility(selectedVisibility);
  }

  /**
   * Formats the size
   */
  function formatBytes(bytes: any, decimals = 2) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  // image
  const [selectedImage, setSelectedImage] = useState<any>();

  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      validation.setFieldValue("image", e.target.result);
      setSelectedImage(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const validation: any = useFormik({
    enableReinitialize: true,

    initialValues: {
      model_name: "",
      number_of_doors: "",
      width: "",
      height: "",
      model_image: "",
      has_outside_camera: "",
      has_inside_camera: "",
    },
    validationSchema: Yup.object({
      model_name: Yup.string().required("Please Enter a model Title"),
      number_of_doors: Yup.string().required(
        "Please Enter a model number of door"
      ),
      width: Yup.string().required("Please Enter a model  width"),
      height: Yup.string().required("Please Enter a model height"),
      model_image: Yup.string().required("Please select a model image"),
    }),
    onSubmit: (values) => {
      alert("osama")
      const newModel = {
        id: (Math.floor(Math.random() * (30 - 20)) + 20).toString(),
        model_name: values.model_name,
        number_of_doors: values.number_of_doors,
        width: values.width,
        height: values.height,
        model_image: values.model_image,
        has_outside_camera: values.has_outside_camera,
        has_inside_camera: values.has_inside_camera,
      };
      console.log(newModel);
      // save new product
      dispatch(onAddNewProduct(newModel));
      history("/apps-ecommerce-models");
      validation.resetForm();
    },
  });
  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Create Model" pageTitle="Ecommerce" />
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            validation.handleSubmit();
            return false;
          }}
        >
          <Row>
            <Col lg={8}>
              <Card>
                <CardBody>
                  <div className="mb-3">
                    <Label className="form-label" htmlFor="model-title-input">
                      Model Title
                    </Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="model-title-input"
                      placeholder="Enter model title"
                      name="model_name"
                      value={validation.values.model_name || ""}
                      onBlur={validation.handleBlur}
                      onChange={validation.handleChange}
                      invalid={
                        validation.errors.model_name &&
                        validation.touched.model_name
                          ? true
                          : false
                      }
                    />
                    {validation.errors.model_name &&
                    validation.touched.model_name ? (
                      <FormFeedback type="invalid">
                        {validation.errors.model_name}
                      </FormFeedback>
                    ) : null}
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <div className="mb-4">
                    <h5 className="fs-14 mb-1">Model Image</h5>
                    <p className="text-muted">Add Model main Image.</p>
                    <div className="text-center">
                      <div className="position-relative d-inline-block">
                        <div className="position-absolute top-100 start-100 translate-middle">
                          <Label
                            htmlFor="customer-image-input"
                            className="mb-0"
                            data-bs-toggle="tooltip"
                            data-bs-placement="right"
                            title="Select Image"
                          >
                            <div className="avatar-xs cursor-pointer">
                              <div className="avatar-title bg-light border rounded-circle text-muted">
                                <i className="ri-image-fill"></i>
                              </div>
                            </div>
                          </Label>
                          <Input
                            type="file"
                            className="form-control d-none"
                            id="customer-image-input"
                            name="model_image"
                            accept="image/png, image/gif, image/jpeg"
                            onChange={handleImageChange}
                            invalid={
                              validation.touched.model_image &&
                              validation.errors.model_image
                                ? true
                                : false
                            }
                          />
                        </div>
                        <div className="avatar-lg">
                          <div className="avatar-title bg-light rounded">
                            <img
                              src={selectedImage}
                              id="product-img"
                              alt=""
                              className="avatar-md h-auto"
                              height={100}
                              width={100}
                            />
                          </div>
                        </div>
                      </div>
                      {validation.errors.model_image &&
                      validation.touched.model_image ? (
                        <FormFeedback type="invalid">
                          {" "}
                          {validation.errors.model_image}{" "}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </div>
                  <div>
                    <div className="list-unstyled mb-0" id="file-previews">
                      {selectedFiles.map((f: any, i: any) => {
                        return (
                          <Card
                            className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                            key={i + "-file"}
                          >
                            <div className="p-2">
                              <Row className="align-items-center">
                                <Col className="col-auto">
                                  <img
                                    data-dz-thumbnail=""
                                    height="150"
                                    width="300"
                                    className="avatar-sm rounded bg-light"
                                    alt={f.name}
                                    src={f.preview}
                                  />
                                </Col>
                                <Col>
                                  <Link
                                    to="#"
                                    className="text-muted font-weight-bold"
                                  >
                                    {f.name}
                                  </Link>
                                  <p className="mb-0">
                                    <strong>{f.formattedSize}</strong>
                                  </p>
                                </Col>
                              </Row>
                            </div>
                          </Card>
                        );
                      })}
                    </div>
                  </div>
                </CardBody>
              </Card>

              <Row>
              <Col lg={6}>
                <Card>
                  <CardHeader>
                    <h5 className="card-title mb-0">Width</h5>
                  </CardHeader>

                  <CardBody>
                    <div className="mb-3">
                      <Input
                        type="text"
                        className="form-control"
                        id="model-width-input"
                        placeholder="Enter height"
                        name="width"
                        value={validation.values.width || ""}
                        onBlur={validation.handleBlur}
                        onChange={validation.handleChange}
                        invalid={
                          validation.errors.width && validation.touched.width
                            ? true
                            : false
                        }
                      />
                      {validation.errors.width && validation.touched.width ? (
                        <FormFeedback type="invalid">
                          {validation.errors.width}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col lg={6}>
                <Card>
                  <CardHeader>
                    <h5 className="card-title mb-0">Height</h5>
                  </CardHeader>
                  <CardBody>
                    <div className="mb-3">
                      <Input
                        type="text"
                        className="form-control"
                        id="model-height-input"
                        placeholder="Enter height"
                        name="height"
                        value={validation.values.height || ""}
                        onBlur={validation.handleBlur}
                        onChange={validation.handleChange}
                        invalid={
                          validation.errors.height && validation.touched.height
                            ? true
                            : false
                        }
                      />
                      {validation.errors.height && validation.touched.height ? (
                        <FormFeedback type="invalid">
                          {validation.errors.height}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </CardBody>
                </Card>
              </Col>
              </Row>
              <div className="text-end mb-3 ">
                <button type="submit" className="btn btn-success w-sm">
                  Save
                </button>
              </div>
            </Col>

            <Col lg={4}>
              <Card>
                <CardHeader>
                  <h5 className="card-title mb-3 ">Number of doors</h5>
                </CardHeader>
                <CardBody>
                  <CardBody>
                    <div className="mb-1">
                      <Input
                        type="text"
                        className="form-control"
                        id="model-no_of_doors-input"
                        placeholder="Enter number of doors"
                        name="number_of_doors"
                        value={validation.values.number_of_doors || ""}
                        onBlur={validation.handleBlur}
                        onChange={validation.handleChange}
                        invalid={
                          validation.errors.number_of_doors &&
                          validation.touched.number_of_doors
                            ? true
                            : false
                        }
                      />
                      {validation.errors.number_of_doors &&
                      validation.touched.number_of_doors ? (
                        <FormFeedback type="invalid">
                          {validation.errors.number_of_doors}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </CardBody>
                </CardBody>
              </Card>
              <Card>
                <CardHeader>
                  <h5 className="card-title mb-0">Has Outside Camera</h5>
                </CardHeader>
                <CardBody>
                  <div className="mb-3">
                    <div
                      className="form-check form-switch form-switch-lg"
                      dir="ltr"
                    >
                      <Input
                        type="checkbox"
                        name="has_outside_camera"
                        className="form-check-input"
                        id="model-has_outside_camera-input"
                        onBlur={validation.handleBlur}
                        onChange={validation.handleChange}
                        invalid={
                          validation.errors.has_outside_camera &&
                          validation.touched.has_outside_camera
                            ? true
                            : false
                        }
                        defaultChecked
                      />
                    </div>

                    {validation.errors.has_outside_camera &&
                    validation.touched.has_outside_camera ? (
                      <FormFeedback type="invalid">
                        {validation.errors.has_outside_camera}
                      </FormFeedback>
                    ) : null}
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardHeader>
                  <h5 className="card-title mb-0">Has Inside Camera</h5>
                </CardHeader>
                <CardBody>
                  <div className="mb-3">
                    <div
                      className="form-check form-switch form-switch-lg"
                      dir="ltr"
                    >
                      <Input
                        type="checkbox"
                        name="has_width_camera"
                        className="form-check-input"
                        id="model-has_width_camera-input"
                        onBlur={validation.handleBlur}
                        onChange={validation.handleChange}
                        invalid={
                          validation.errors.has_width_camera &&
                          validation.touched.has_width_camera
                            ? true
                            : false
                        }
                        defaultChecked
                      />
                    </div>

                    {validation.errors.has_width_camera &&
                    validation.touched.has_width_camera ? (
                      <FormFeedback type="invalid">
                        {validation.errors.has_width_camera}
                      </FormFeedback>
                    ) : null}
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
};

export default EcommerceAddProduct;
