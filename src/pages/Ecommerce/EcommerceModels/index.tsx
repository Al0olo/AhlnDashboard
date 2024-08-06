import React, { useEffect, useState, useMemo } from "react";

import {
  Container,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  Nav,
  NavItem,
  NavLink,
  UncontrolledCollapse,
  Row,
  Card,
  CardHeader,
  Col,
} from "reactstrap";
import classnames from "classnames";

// RangeSlider
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";
import DeleteModal from "../../../Components/Common/DeleteModal";

import BreadCrumb from "../../../Components/Common/BreadCrumb";
import TableContainer from "../../../Components/Common/TableContainer";
import { Rating, Published, Price, GetValid } from "./EcommerceModelCol";
//Import data
import { modelsData } from "../../../common/data";

//Import actions
import { getModels as onGetModels, deleteModels } from "../../../slices/thunks";
import { isEmpty } from "lodash";
import Select from "react-select";

//redux
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { createSelector } from "reselect";



const EcommerceModels = (props: any) => {
  const dispatch: any = useDispatch();

  const selectModelData = createSelector(
    (state: any) => state.Ecommerce,
    (state) => ({
      models: state.models,
    })
  );
  // Inside your component
  const { models } = useSelector(selectModelData);

  const [modelList, setModelList] = useState<any>([]);
  const [model, setModel] = useState<any>(null);

  useEffect(() => {
      dispatch(onGetModels());
  }, []);

  useEffect(() => {
    setModelList(models.data);
  }, [models]);

  useEffect(() => {
    if (!isEmpty(models)) setModelList(models);
  }, [models]);
  //delete order
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [deleteModalMulti, setDeleteModalMulti] = useState<boolean>(false);

  const onClickDelete = (model: any) => {
    setModel(model);
    setDeleteModal(true);
  };

  const handleDeleteModel = () => {
    if (model) {
      dispatch(deleteModels(model.id));
      setDeleteModal(false);
    }
  };

  const [dele, setDele] = useState(0);

  // Displat Delete Button
  const displayDelete = () => {
    const ele = document.querySelectorAll(".productCheckBox:checked");
    const del = document.getElementById("selection-element") as HTMLElement;
    setDele(ele.length);
    if (ele.length === 0) {
      del.style.display = "none";
    } else {
      del.style.display = "block";
    }
  };

  // Delete Multiple
  const deleteMultiple = () => {
    const ele = document.querySelectorAll(".productCheckBox:checked");
    const del = document.getElementById("selection-element") as HTMLElement;
    ele.forEach((element: any) => {
      dispatch(deleteModels(element.value));
      setTimeout(() => {
        toast.clearWaitingQueue();
      }, 3000);
      del.style.display = "none";
    });
  };

  const columns = useMemo(
    () => [
      {
        header: "#",
        accessorKey: "id",
        enableColumnFilter: false,
        enableSorting: false,
        cell: (cell: any) => {
          return (
            <input
              type="checkbox"
              className="productCheckBox form-check-input"
              value={cell.getValue()}
              onClick={() => displayDelete()}
            />
          );
        },
      },
      {
        header: "Model",
        accessorKey: "model_name",
        enableColumnFilter: false,
        cell: (cell: any) => (
          <>
            <div className="d-flex align-items-center">
              <div className="flex-shrink-0 me-3">
                <div className="avatar-sm bg-light rounded p-1">
                  <img
                    src={cell.row.original.model_image}
                    alt=""
                    className="img-fluid d-block"
                  />
                </div>
              </div>
              <div className="flex-grow-1">
                <h5 className="fs-14 mb-1">
                  <Link
                    to="/apps-ecommerce-model-details"
                    className="text-body"
                  >
                    {" "}
                    {cell.getValue()}
                  </Link>
                </h5>
               
              </div>
            </div>
          </>
        ),
      },
      {
        header: "No. of doors",
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
        header: "Outside camera",
        accessorKey: "has_outside_camera",
        enableColumnFilter: false,
        cell: (cell: any) => {
          return <GetValid {...cell} />;
        },
      },
      {
        header: "Inside camera",
        accessorKey: "has_inside_camera",
        enableColumnFilter: false,
        cell: (cell: any) => {
          return <GetValid {...cell} />;
        },
      },
      {
        header: "Has Table",
        accessorKey: "has_tablet",
        enableColumnFilter: false,
        cell: (cell: any) => {
          return <GetValid {...cell} />;
        },
      },
      {
        header: "Published",
        accessorKey: "createdat",
        enableColumnFilter: false,
        cell: (cell: any) => {
          return <Published {...cell} />;
        },
      },
      {
        header: "Action",
        cell: (cell: any) => {
          
          return (
            <UncontrolledDropdown>
              <DropdownToggle
                href="#"
                className="btn btn-soft-secondary btn-sm"
                tag="button"
              >
                <i className="ri-more-fill" />
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-end">
                <DropdownItem href="apps-ecommerce-product-details">
                  <i className="ri-eye-fill align-bottom me-2 text-muted"></i>{" "}
                  View
                </DropdownItem>

                <DropdownItem href={`apps-ecommerce-edit-model/${cell.row.original.id}`} >
                  <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>{" "}
                  Edit
                </DropdownItem>

                <DropdownItem divider />
                <DropdownItem
                  href="#"
                  onClick={() => {
                    const modelData = cell.row.original;
                    onClickDelete(modelData);
                  }}
                >
                  <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>{" "}
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          );
        },
      },
    ],
    []
  );
  document.title = "Models | Ahln Dashboard ";
  return (
    <div className="page-content">
      <ToastContainer closeButton={false} limit={1} />

      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteModel}
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
      <Container fluid>
        <BreadCrumb title="Models" pageTitle="Ecommerce" />

        <Row>
          {/* ///Acko to Remove */}
          {/* filter */}
          {/* ///Acko to Remove ENs*/}
          <Col xl={12} lg={12}>
            <div>
              <Card>
                <div className="card-header border-0">
                  <Row className=" align-items-center">
                    {/* <Col>
                      <Nav
                        className="nav-tabs-custom card-header-tabs border-bottom-0"
                        role="tablist"
                      >
                        <NavItem>
                          <NavLink
                            className={classnames(
                              { active: activeTab === "1" },
                              "fw-semibold"
                            )}
                            onClick={() => {
                              toggleTab("1", "all");
                            }}
                            href="#"
                          >
                            All{" "}
                            <span className="badge bg-danger-subtle text-danger align-middle rounded-pill ms-1">
                              12
                            </span>
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={classnames(
                              { active: activeTab === "2" },
                              "fw-semibold"
                            )}
                            onClick={() => {
                              toggleTab("2", "published");
                            }}
                            href="#"
                          >
                            Published{" "}
                            <span className="badge bg-danger-subtle text-danger align-middle rounded-pill ms-1">
                              5
                            </span>
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={classnames(
                              { active: activeTab === "3" },
                              "fw-semibold"
                            )}
                            onClick={() => {
                              toggleTab("3", "draft");
                            }}
                            href="#"
                          >
                            Draft
                          </NavLink>
                        </NavItem>
                      </Nav>
                    </Col> */}
                    <div className="col-auto">
                      <div id="selection-element">
                        <div className="my-n1 d-flex align-items-center text-muted">
                          Select{" "}
                          <div
                            id="select-content"
                            className="text-body fw-semibold px-1"
                          >
                            {dele}
                          </div>{" "}
                          Result{" "}
                          <button
                            type="button"
                            className="btn btn-link link-danger p-0 ms-3"
                            onClick={() => setDeleteModalMulti(true)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </Row>
                </div>
                <div className="card-body pt-0">
                  
                  {modelList && modelList.length > 0 ? (
                    <TableContainer
                      columns={columns}
                      data={modelList || [models]}
                      isGlobalFilter={true}
                      customPageSize={10}
                      divClass="table-responsive mb-1"
                      tableClass="mb-0 align-middle table-borderless"
                      theadClass="table-light text-muted"
                      isProductsFilter={true}
                      SearchPlaceholder="Search Models..."
                    />
                  ) : (
                    <div className="py-4 text-center">
                      <div>
                        <i className="ri-search-line display-5 text-success"></i>
                      </div>

                      <div className="mt-4">
                        <h5>Sorry! No Result Found</h5>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default EcommerceModels;
