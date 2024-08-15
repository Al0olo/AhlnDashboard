import React, { useEffect, useMemo, useState, useCallback } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledDropdown,
} from "reactstrap";
//redux
import { useSelector, useDispatch } from "react-redux";
import TableContainer from "../../../Components/Common/TableContainer";
import {
  GetAuditTrailAction,
  DeleteAuditTrailAction,
  GetOneAuditTrailAction,
} from "../../../slices/thunks";

// Formik
import * as Yup from "yup";
import { useFormik } from "formik";

import DeleteModal from "../../../Components/Common/DeleteModal";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../../Components/Common/Loader";
import { createSelector } from "reselect";
import moment from "moment";

const AuditTrailData = () => {
  const dispatch: any = useDispatch();
  const selectLayoutState = (state: any) => state.AuditTrail;

  const selectLayoutProperties = createSelector(selectLayoutState, (state) => ({
    auditTrailList: state.data,
    isauditTrailSuccess: state.isauditTrailSuccess,
    error: state.error,
    loader: state.loading,
  }));

  // Inside your component
  const { auditTrailList, isauditTrailSuccess, error, loader } = useSelector(
    selectLayoutProperties
  );

  const [auditTrail, setAuditTrail] = useState<any>([]);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [deleteModalMulti, setDeleteModalMulti] = useState<boolean>(false);

  // Delete Data
  const onClickDelete = (auditTrail: any) => {
    setAuditTrail(auditTrail);
    setDeleteModal(true);
  };

  const handleDeleteauditTrail = async () => {
    if (auditTrail) {
      const result = await dispatch(DeleteAuditTrailAction(auditTrail.id));
      if (result && result.payload) {
        await dispatch(GetAuditTrailAction());
      }
      setDeleteModal(false);
    }
  };

  // Get Data

  useEffect(() => {
    dispatch(GetAuditTrailAction());
  }, [dispatch]);

  // Checked All
  const checkedAll = useCallback(() => {
    const checkall: any = document.getElementById("checkauditTrailAll");
    const ele = document.querySelectorAll(".auditTrailCheckauditTrail");

    if (checkall.checked) {
      ele.forEach((ele: any) => {
        ele.checked = true;
      });
    } else {
      ele.forEach((ele: any) => {
        ele.checked = false;
      });
    }
    deleteCheckauditTrail();
  }, []);

  // Delete Multiple
  const [selectedCheckauditTrailDelete, setSelectedCheckauditTrailDelete] =
    useState<any>([]);
  const [isMultiDeleteButton, setIsMultiDeleteButton] =
    useState<boolean>(false);

  const deleteMultiple = () => {
    const checkall: any = document.getElementById("checkauditTrailAll");
    selectedCheckauditTrailDelete.forEach((element: any) => {
      dispatch(DeleteAuditTrailAction(element.id));
      setTimeout(() => {
        toast.clearWaitingQueue();
      }, 3000);
    });
    setIsMultiDeleteButton(false);
    checkall.checked = false;
  };

  const deleteCheckauditTrail = () => {
    const ele = document.querySelectorAll(".auditTrailCheckauditTrail:checked");
    ele?.length > 0
      ? setIsMultiDeleteButton(true)
      : setIsMultiDeleteButton(false);
    setSelectedCheckauditTrailDelete(ele);
  };

  const columns = useMemo(
    () => [
      {
        header: (
          <input
            type="checkauditTrail"
            id="checkauditTrailAll"
            className="form-check-input"
            onClick={() => checkedAll()}
          />
        ),
        cell: (cell: any) => (
          <input
            type="checkauditTrail"
            className="auditTrailCheckauditTrail form-check-input"
            value={cell.getValue()}
            onChange={() => deleteCheckauditTrail()}
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
        header: "User ID",
        accessorKey: "user_id",
        enableColumnFilter: false,
      },
      {
        header: "Action",
        accessorKey: "action",
        enableColumnFilter: false,
      },
      {
        header: "Message",
        accessorKey: "message",
        enableColumnFilter: false,
      },
      {
        header: "Created At",
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
                <DropdownItem href="/apps-auditTrail-details">
                  <i className="ri-eye-fill align-bottom me-2 text-muted"></i>{" "}
                  View
                </DropdownItem>
              </li>
              <li>
                <DropdownItem
                  className="remove-item-btn"
                  data-bs-toggle="modal"
                  href="#deleteOrder"
                  onClick={() => {
                    const auditTrailData = cell.row.original;
                    onClickDelete(auditTrailData);
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
          onDeleteClick={handleDeleteauditTrail}
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
                <h5 className="card-title mb-0 flex-grow-1">Audit Trail</h5>
                <div className="flex-shrink-0">
                  <div className="d-flex flex-wrap gap-2">
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
                  data={auditTrailList}
                  isGlobalFilter={true}
                  customPageSize={50}
                  divClass="table-responsive table-card mb-3"
                  tableClass="align-middle table-nowrap mb-0"
                  SearchPlaceholder="Search for auditTrail details or something..."
                />
              )}
              <ToastContainer closeButton={false} limit={1} />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default AuditTrailData;
