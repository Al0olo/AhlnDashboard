import React, { useEffect, useMemo } from "react";
import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";
//redux
import { useDispatch } from "react-redux";
import TableContainer from "../../../Components/Common/TableContainer";
import { GetBoxesImagesAction } from "../../../slices/thunks";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../../Components/Common/Loader";
import moment from "moment";
import { useAppSelector } from "redux-hooks";

const BoxImagesData = () => {
  const dispatch: any = useDispatch();

  const { boxImgesList, error, loading } = useAppSelector(
    (state) => state.BoxImages
  );
  useEffect(() => {
    dispatch(GetBoxesImagesAction());
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
        header: "Box ID",
        accessorKey: "box_id",
        enableColumnFilter: false,
      },

      {
        header: "Created At",
        accessorKey: "createdat",
        enableColumnFilter: false,
        cell: (cell: any) => moment(cell.getValue()).format("DD MMMM, YYYY"),
      },
      {
        header: "Delivery Package ID",
        accessorKey: "delivery_package_id",
        enableColumnFilter: false,
      },
      {
        header: "Image Link",
        accessorKey: "image",
        enableColumnFilter: false,
        cell: (cell: any) => (
          <a href={cell.getValue()} rel="noreferrer" target="_blank">
            {cell.getValue()}
          </a>
        ),
      },
    ],
    []
  );

  return (
    <React.Fragment>
      <Row>
        <Col lg={12}>
          <Card>
            <CardHeader className="border-0">
              <div className="d-flex align-items-center">
                <h5 className="card-user_id mb-0 flex-grow-1">Box Images</h5>
              </div>
            </CardHeader>
            <CardBody className="pt-0">
              {loading ? (
                <Loader error={error} />
              ) : (
                <TableContainer
                  columns={columns}
                  data={boxImgesList}
                  isGlobalFilter={true}
                  customPageSize={50}
                  divClass="table-responsive table-card mb-3"
                  tableClass="align-middle table-nowrap mb-0"
                  SearchPlaceholder="Search for userBox details or something..."
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

export default BoxImagesData;
