import React, { useEffect, useMemo, useState } from "react";
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
import { useDispatch } from "react-redux";
import TableContainer from "../../../Components/Common/TableContainer";
import {
  GetAuditTrailAction,
  DeleteAuditTrailAction,
} from "../../../slices/thunks";

import DeleteModal from "../../../Components/Common/DeleteModal";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../../Components/Common/Loader";
import moment from "moment";
import { useAppSelector } from "redux-hooks";

const AuditTrailData = () => {
  const dispatch: any = useDispatch();
  const { auditTrailList, loading, error } = useAppSelector(
    (state) => state.AuditTrail
  );

  const [auditTrail, setAuditTrail] = useState<any>([]);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  // Delete Data
  const onClickDelete = (auditTrail: any) => {
    setAuditTrail(auditTrail);
    setDeleteModal(true);
  };

  const handleDeleteauditTrail = async () => {
    if (auditTrail) {
      await dispatch(DeleteAuditTrailAction(auditTrail.id)).then(
        (result: any) => {
          if (result.type === "auditTrail/delete/fulfilled") {
            toast.success("AuditTrail Deleted Successfully", {
              autoClose: 3000,
            });
          } else {
            toast.error(`Error ${result.payload}`, { autoClose: 3000 });
          }
        }
      );
      setDeleteModal(false);
    }
  };

  // Get Data

  useEffect(() => {
    dispatch(GetAuditTrailAction());
  }, [dispatch]);

  const columns = useMemo(
    () => [
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
    []
  );

  return (
    <React.Fragment>
      <Row>
        <DeleteModal
          show={deleteModal}
          onDeleteClick={handleDeleteauditTrail}
          onCloseClick={() => setDeleteModal(false)}
        />

        <Col lg={12}>
          <Card>
            <CardHeader className="border-0">
              <div className="d-flex align-items-center">
                <h5 className="card-title mb-0 flex-grow-1">Audit Trail</h5>
              </div>
            </CardHeader>
            <CardBody className="pt-0">
              {loading ? (
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
