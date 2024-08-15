import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Col,
  Container,
  Input,
  Label,
  Tooltip,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import { getModel as onGetModel } from "../../../slices/thunks";
//Simple bar
import SimpleBar from "simplebar-react";

import BreadCrumb from "../../../Components/Common/BreadCrumb";

import product1 from "../../../assets/images/products/img-1.png";
import product6 from "../../../assets/images/products/img-6.png";
import product8 from "../../../assets/images/products/img-8.png";

import { productDetailsWidgets, reviews } from "../../../common/data/ecommerce";

import { Swiper, SwiperSlide } from "swiper/react";
import classnames from "classnames";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { FreeMode, Navigation, Pagination, Thumbs } from "swiper/modules";
import { Link, useParams } from "react-router-dom";
import { createSelector } from "reselect";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import moment from "moment";

const PricingWidgetList = (props: any) => {
  return (
    <React.Fragment>
      <Col lg={3} sm={6}>
        <div className="p-2 border border-dashed rounded">
          <div className="d-flex align-items-center">
            <div className="avatar-sm me-2">
              <div className="avatar-title rounded bg-transparent text-secondary fs-24">
                <i className={props.pricingDetails.icon}></i>
              </div>
            </div>
            <div className="flex-grow-1">
              <p className="text-muted mb-1">{props.pricingDetails.label} :</p>
              <h5 className="mb-0">{props.pricingDetails.labelDetail}</h5>
            </div>
          </div>
        </div>
      </Col>
    </React.Fragment>
  );
};

function EcommerceProductDetail(props: any) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [ttop, setttop] = useState<boolean>(false);

  const [ssize, setssize] = useState<boolean>(false);
  const [msize, setmsize] = useState<boolean>(false);
  const [lsize, setlsize] = useState<boolean>(false);
  const [xlsize, setxlsize] = useState<boolean>(false);
  const [customActiveTab, setcustomActiveTab] = useState<any>("1");
  const toggleCustom = (tab: any) => {
    if (customActiveTab !== tab) {
      setcustomActiveTab(tab);
    }
  };
  const dispatch: any = useDispatch();
  let id = useParams().id;
  const [model_data, setModel] = useState<any>({
    color: null,
    has_inside_camera: true,
    has_outside_camera: true,
    has_tablet: true,
    height: null,
    model_image: null,
    model_name: null,
    number_of_doors: null,
    width: null,
  });

  const selectModelLoading = createSelector(
    (state: any) => state.Ecommerce,
    (state) => ({
      modelLoading: state.modelLoading,
    })
  );
  const modelLoading: any = useSelector(selectModelLoading);
  const selectModelData = createSelector(
    (state: any) => state.Ecommerce,
    (state) => ({
      model: state.model,
    })
  );
  const modelData = useSelector(selectModelData);
  useEffect(() => {
    dispatch(onGetModel(id));
  }, []);
  useEffect(() => {
    if (modelData.model) {
      setModel({
        color: modelData.model.color,
        has_inside_camera: modelData.model.has_inside_camera,
        has_outside_camera: modelData.model.has_outside_camera,
        has_tablet: modelData.model.has_tablet,
        height: modelData.model.height,
        model_image: modelData.model.model_image,
        model_name: modelData.model.model_name,
        number_of_doors: modelData.model.number_of_doors,
        width: modelData.model.width,
      });
    }
  }, [modelData.model]);
  document.title = "Model Details | Model Dashboard";
  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Model Details" pageTitle="Ecommerce" />

        <Row>
          <Col lg={12}>
            <Card>
              <CardBody>
                <Row className="gx-lg-5">
                  <Col xl={4} md={8} className="mx-auto">
                    <div className="product-img-slider sticky-side-div">
                      <Swiper
                        navigation={true}
                        thumbs={{ swiper: thumbsSwiper }}
                        className="swiper product-thumbnail-slider p-2 rounded bg-light"
                        modules={[Thumbs, Navigation]}
                      >
                        <div className="swiper-wrapper">
                          <SwiperSlide>
                            <img
                              src={modelData.model.model_image}
                              alt=""
                              className="img-fluid d-block"
                            />
                          </SwiperSlide>
                          {/* <SwiperSlide>
                            <img
                              src={product6}
                              alt=""
                              className="img-fluid d-block"
                            />
                          </SwiperSlide>
                          <SwiperSlide>
                            <img
                              src={product1}
                              alt=""
                              className="img-fluid d-block"
                            />
                          </SwiperSlide>
                          <SwiperSlide>
                            <img
                              src={product8}
                              alt=""
                              className="img-fluid d-block"
                            />
                          </SwiperSlide> */}
                        </div>
                      </Swiper>

                      <div className="product-nav-slider mt-2">
                        <Swiper
                          onSwiper={setThumbsSwiper}
                          pagination={{
                            type: "progressbar",
                          }}
                          slidesPerView={4}
                          freeMode={true}
                          watchSlidesProgress={true}
                          spaceBetween={10}
                          className="swiper product-nav-slider mt-2 overflow-hidden"
                          modules={[FreeMode, Pagination]}
                        >
                          <div className="swiper-wrapper">
                            {/* <SwiperSlide className="rounded">
                              <div className="nav-slide-item">
                                <img
                                  src={product8}
                                  alt=""
                                  className="img-fluid d-block rounded"
                                />
                              </div>
                            </SwiperSlide> */}
                           {/* <SwiperSlide>
                              <div className="nav-slide-item">
                                <img
                                  src={product6}
                                  alt=""
                                  className="img-fluid d-block rounded"
                                />
                              </div>
                            </SwiperSlide>
                            <SwiperSlide>
                              <div className="nav-slide-item">
                                <img
                                  src={product1}
                                  alt=""
                                  className="img-fluid d-block rounded"
                                />
                              </div>
                            </SwiperSlide> 
                            <SwiperSlide>
                              <div className="nav-slide-item">
                                <img
                                  src={product8}
                                  alt=""
                                  className="img-fluid d-block rounded"
                                />
                              </div>
                            </SwiperSlide> */}
                          </div>
                        </Swiper>
                      </div>
                    </div>
                  </Col>

                  <Col xl={8}>
                    <div className="mt-xl-0 mt-5">
                      <div className="d-flex">
                        <div className="flex-grow-1">
                          <h5 className="text-capitalize">{modelData.model.model_name}</h5>
                          <div className="hstack gap-3 flex-wrap">
                            <div className="vr"></div>
                            <div className="text-muted">
                              Published :{" "}
                              <span className="text-body fw-medium">
                                {moment(
                                  new Date(modelData.model.createdat)
                                ).format("dd,DD MMM YYYY")}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex-shrink-0">
                          <div>
                            <Tooltip
                              placement="top"
                              isOpen={ttop}
                              target="TooltipTop"
                              toggle={() => {
                                setttop(!ttop);
                              }}
                            >
                              Edit
                            </Tooltip>
                            <a
                              href={`apps-ecommerce-edit-model/${modelData.model.id}`}
                              id="TooltipTop"
                              className="btn btn-light"
                            >
                              <i className="ri-pencil-fill align-bottom"></i>
                            </a>
                          </div>
                        </div>
                      </div>

                      <Row className="mt-4"></Row>

                      <Row>
                        {/* Colors */}
                        <Col xl={6}>
                          <div className=" mt-4">
                            <h5 className="fs-14">Colors :</h5>
                            <div className="d-flex flex-wrap gap-2">
                              <div
                                data-bs-toggle="tooltip"
                                data-bs-trigger="hover"
                                data-bs-placement="top"
                                title="Out of Stock"
                              >
                                <button
                                  type="button"
                                  className="btn avatar-xs p-0 d-flex align-items-center justify-content-center border rounded-circle fs-20 text-primary"
                                  disabled
                                >
                                  <i className="ri-checkbox-blank-circle-fill"></i>
                                </button>
                              </div>
                              <div
                                data-bs-toggle="tooltip"
                                data-bs-trigger="hover"
                                data-bs-placement="top"
                                title="03 Items Available"
                              >
                                <button
                                  type="button"
                                  className="btn avatar-xs p-0 d-flex align-items-center justify-content-center border rounded-circle fs-20 text-secondary"
                                >
                                  <i className="ri-checkbox-blank-circle-fill"></i>
                                </button>
                              </div>
                              <div
                                data-bs-toggle="tooltip"
                                data-bs-trigger="hover"
                                data-bs-placement="top"
                                title="03 Items Available"
                              >
                                <button
                                  type="button"
                                  className="btn avatar-xs p-0 d-flex align-items-center justify-content-center border rounded-circle fs-20 text-success"
                                >
                                  <i className="ri-checkbox-blank-circle-fill"></i>
                                </button>
                              </div>
                              <div
                                data-bs-toggle="tooltip"
                                data-bs-trigger="hover"
                                data-bs-placement="top"
                                title="02 Items Available"
                              >
                                <button
                                  type="button"
                                  className="btn avatar-xs p-0 d-flex align-items-center justify-content-center border rounded-circle fs-20 text-info"
                                >
                                  <i className="ri-checkbox-blank-circle-fill"></i>
                                </button>
                              </div>
                              <div
                                data-bs-toggle="tooltip"
                                data-bs-trigger="hover"
                                data-bs-placement="top"
                                title="01 Items Available"
                              >
                                <button
                                  type="button"
                                  className="btn avatar-xs p-0 d-flex align-items-center justify-content-center border rounded-circle fs-20 text-warning"
                                >
                                  <i className="ri-checkbox-blank-circle-fill"></i>
                                </button>
                              </div>
                              <div
                                data-bs-toggle="tooltip"
                                data-bs-trigger="hover"
                                data-bs-placement="top"
                                title="04 Items Available"
                              >
                                <button
                                  type="button"
                                  className="btn avatar-xs p-0 d-flex align-items-center justify-content-center border rounded-circle fs-20 text-danger"
                                >
                                  <i className="ri-checkbox-blank-circle-fill"></i>
                                </button>
                              </div>
                              <div
                                data-bs-toggle="tooltip"
                                data-bs-trigger="hover"
                                data-bs-placement="top"
                                title="03 Items Available"
                              >
                                <button
                                  type="button"
                                  className="btn avatar-xs p-0 d-flex align-items-center justify-content-center border rounded-circle fs-20 text-light"
                                >
                                  <i className="ri-checkbox-blank-circle-fill"></i>
                                </button>
                              </div>
                              <div
                                data-bs-toggle="tooltip"
                                data-bs-trigger="hover"
                                data-bs-placement="top"
                                title="04 Items Available"
                              >
                                <button
                                  type="button"
                                  className="btn avatar-xs p-0 d-flex align-items-center justify-content-center border rounded-circle fs-20 text-body"
                                >
                                  <i className="ri-checkbox-blank-circle-fill"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        </Col>
                        {/* /Colors */}
                      </Row>

                      <div className="mt-4 text-muted">
                        <h5 className="fs-14">Description :</h5>
                        <p>
                          Tommy Hilfiger men striped pink sweatshirt. Crafted
                          with cotton. Material composition is 100% organic
                          cotton. This is one of the world’s leading designer
                          lifestyle brands and is internationally recognized for
                          celebrating the essence of classic American cool
                          style, featuring preppy with a twist designs.
                        </p>
                      </div>

                      <div className="product-content mt-5">
                        <h5 className="fs-14 mb-3">Model Description :</h5>
                        <Nav tabs className="nav-tabs-custom nav-success">
                          <NavItem>
                            <NavLink
                              style={{ cursor: "pointer" }}
                              className={classnames({
                                active: customActiveTab === "2",
                              })}
                              onClick={() => {
                                toggleCustom("2");
                              }}
                            >
                              Details
                            </NavLink>
                          </NavItem>
                        </Nav>

                        <TabContent
                          activeTab={customActiveTab}
                          className="border border-top-0 p-4"
                          id="nav-tabContent"
                        >
                          <TabPane id="nav-speci" tabId="1">
                            <div className="table-responsive">
                              <table className="table mb-0">
                                <tbody>
                                  <tr>
                                    <th scope="row" style={{ width: "200px" }}>
                                      Number of Doors
                                    </th>
                                    <td>{modelData.model.number_of_doors}</td>
                                  </tr>
                                  <tr>
                                    <th scope="row">Color</th>
                                    <td>Blue</td>
                                  </tr>
                                  <tr>
                                    <th scope="row">Dimensions</th>
                                    <td>
                                      {modelData.model.width}*
                                      {modelData.model.height}(Width*Height)
                                    </td>
                                  </tr>
                                  <tr>
                                    <th scope="row">Has Outside Camera</th>
                                    <td>
                                      <span className="badge bg-light text-body fs-12 fw-bold">
                                        {modelData.model.has_outside_camera ? (
                                          <i className="mdi mdi-check text-success me-1"></i>
                                        ) : (
                                          <i className="mdi mdi-cancel text-danger me-1"></i>
                                        )}
                                      </span>
                                    </td>
                                  </tr>
                                  <tr>
                                    <th scope="row">Has Inside Camera</th>
                                    <td>
                                      <span className="badge bg-light text-body fs-12 fw-medium">
                                        {modelData.model.has_inside_camera ? (
                                          <i className="mdi mdi-check text-success me-1"></i>
                                        ) : (
                                          <i className="mdi mdi-cancel text-danger me-1"></i>
                                        )}
                                      </span>
                                    </td>
                                  </tr>
                                  <tr>
                                    <th scope="row">Has Tablet</th>
                                    <td>
                                      <span className="badge bg-light text-body fs-12 fw-medium">
                                        {modelData.model.has_tablet ? (
                                          <i className="mdi mdi-check text-success me-1"></i>
                                        ) : (
                                          <i className="mdi mdi-cancel text-danger me-1"></i>
                                        )}
                                      </span>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </TabPane>
                          <TabPane id="nav-detail" tabId="2"></TabPane>
                        </TabContent>
                      </div>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default EcommerceProductDetail;
