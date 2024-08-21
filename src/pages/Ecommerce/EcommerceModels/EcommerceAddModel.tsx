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
// import { addNewModel as onAddNewModel } from "../../../slices/thunks";

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
      validation.setFieldValue("model_image", e.target.result);
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
      has_tablet: "",
    },
    validationSchema: Yup.object({
      model_name: Yup.string().required("Please Enter a model Title"),
      number_of_doors: Yup.string().max(255, "Too long image link"),
      width: Yup.string().required("Please Enter a model  width"),
      height: Yup.string().required("Please Enter a model height"),
      model_image: Yup.string().required("Please Enter model image Link"),
    }),
    onSubmit: (values) => {
      const newModel = {
        // id: (Math.floor(Math.random() * (30 - 20)) + 20).toString(),
        model_name: values.model_name,
        number_of_doors: values.number_of_doors,
        width: values.width,
        height: values.height,
        model_image: values.model_image,
        has_outside_camera: values.has_outside_camera
          ? values.has_outside_camera
          : false,
        has_inside_camera: values.has_inside_camera
          ? values.has_inside_camera
          : false,
        has_tablet: values.has_tablet ? values.has_tablet : false,
      };
      // save new product
      // dispatch(onAddNewModel(newModel));
      history("/apps-ecommerce-models");
      validation.resetForm();
    },
  });
  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Create Model" pageTitle="Ecommerce" />
        <Form
          encType="multipart/form-data"
          onSubmit={(e) => {
            e.preventDefault();
            validation.handleSubmit();
            return false;
          }}
        >
          <Row>
            <Col lg={8}>
              {/* model_name */}
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
              {/* /model_name */}
              {/* model_image */}
              <Card>
                <CardBody>
                  <div className="mb-3">
                    <Label className="form-label" htmlFor="model-title-input">
                      Model Image
                    </Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="model-title-input"
                      placeholder="Enter model image link"
                      name="model_image"
                      maxLength={255}
                      value={validation.values.model_image || ""}
                      onBlur={validation.handleBlur}
                      onChange={validation.handleChange}
                      invalid={
                        validation.errors.model_image &&
                        validation.touched.model_image
                          ? true
                          : false
                      }
                    />
                    {validation.errors.model_image &&
                    validation.touched.model_image ? (
                      <FormFeedback type="invalid">
                        {validation.errors.model_image}
                      </FormFeedback>
                    ) : null}
                  </div>
                </CardBody>
              </Card>
              {/* /model_image */}

              {/* Dimension */}
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
                            validation.errors.height &&
                            validation.touched.height
                              ? true
                              : false
                          }
                        />
                        {validation.errors.height &&
                        validation.touched.height ? (
                          <FormFeedback type="invalid">
                            {validation.errors.height}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
              {/* /Dimension */}
              <div className="text-end mb-3 ">
                <button type="submit" className="btn btn-success w-sm">
                  Save
                </button>
              </div>
            </Col>
            {/* Features */}

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
                        type="switch"
                        value="true"
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
                        type="switch"
                        value="true"
                        name="has_inside_camera"
                        className="form-check-input"
                        id="model-has_inside_camera-input"
                        onBlur={validation.handleBlur}
                        onChange={validation.handleChange}
                        invalid={
                          validation.errors.has_inside_camera &&
                          validation.touched.has_inside_camera
                            ? true
                            : false
                        }
                      />
                    </div>

                    {validation.errors.has_inside_camera &&
                    validation.touched.has_inside_camera ? (
                      <FormFeedback type="invalid">
                        {validation.errors.has_inside_camera}
                      </FormFeedback>
                    ) : null}
                  </div>
                </CardBody>
              </Card>
              <Card>
                <CardHeader>
                  <h5 className="card-title mb-0">Has Tablet</h5>
                </CardHeader>
                <CardBody>
                  <div className="mb-3">
                    <div
                      className="form-check form-switch form-switch-lg"
                      dir="ltr"
                    >
                      <Input
                        type="switch"
                        value="true"
                        name="has_tablet"
                        className="form-check-input"
                        id="model-has_tablet-input"
                        onBlur={validation.handleBlur}
                        onChange={validation.handleChange}
                        invalid={
                          validation.errors.has_tablet &&
                          validation.touched.has_tablet
                            ? true
                            : false
                        }
                      />
                    </div>

                    {validation.errors.has_tablet &&
                    validation.touched.has_tablet ? (
                      <FormFeedback type="invalid">
                        {validation.errors.has_tablet}
                      </FormFeedback>
                    ) : null}
                  </div>
                </CardBody>
              </Card>
            </Col>
            {/* /Features */}
          </Row>
        </Form>
      </Container>
    </div>
  );
};

export default EcommerceAddProduct;
