import React, { Fragment, useEffect, useState } from "react";
import { Card, CardBody, Col, Row, Table } from "reactstrap";
import { Link } from "react-router-dom";

import {
  Column,
  Table as ReactTable,
  ColumnFiltersState,
  FilterFn,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";

import { rankItem } from "@tanstack/match-sorter-utils";

import {
  ProductsGlobalFilter,
  ModelGlobalFilter,
  CustomersGlobalFilter,
  OrderGlobalFilter,
  ContactsGlobalFilter,
  CompaniesGlobalFilter,
  LeadsGlobalFilter,
  CryptoOrdersGlobalFilter,
  InvoiceListGlobalSearch,
  TicketsListGlobalFilter,
  NFTRankingGlobalFilter,
  TaskListGlobalFilter,
} from "../../Components/Common/GlobalSearchFilter";

// Column Filter
const Filter = ({
  column,
}: {
  column: Column<any, unknown>;
  table: ReactTable<any>;
}) => {
  const columnFilterValue = column.getFilterValue();

  return (
    <>
      <DebouncedInput
        type="text"
        value={(columnFilterValue ?? "") as string}
        onChange={(value) => column.setFilterValue(value)}
        placeholder="Search..."
        className="w-36 border shadow rounded"
        list={column.id + "list"}
      />
      <div className="h-1" />
    </>
  );
};

// Global Filter
const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [debounce, onChange, value]);

  return (
    <div className="form-group">
      <input
      {...props}
      value={value}
      id="search-bar-0"
      className="form-control search col-md-4"
      onChange={(e) => setValue(e.target.value)}
    />
    </div>
  );
};

interface TableContainerProps {
  modelName?: any;
  columns?: any;
  data?: any;
  isGlobalFilter?: any;
  isProductsFilter?: any;
  isModelFilter?: any;
  isCustomerFilter?: any;
  isOrderFilter?: any;
  isContactsFilter?: any;
  isCompaniesFilter?: any;
  isLeadsFilter?: any;
  isCryptoOrdersFilter?: any;
  isInvoiceListFilter?: any;
  isTicketsListFilter?: any;
  isNFTRankingFilter?: any;
  isTaskListFilter?: any;
  handleTaskClick?: any;
  customPageSize?: any;
  tableClass?: any;
  theadClass?: any;
  trClass?: any;
  thClass?: any;
  divClass?: any;
  SearchPlaceholder?: any;
  handleLeadClick?: any;
  handleCompanyClick?: any;
  handleContactClick?: any;
  handleTicketClick?: any;
}

const TableContainer = ({
  modelName,
  columns,
  data,
  isGlobalFilter,
  isProductsFilter,
  isModelFilter,
  isCustomerFilter,
  isOrderFilter,
  isContactsFilter,
  isCompaniesFilter,
  isLeadsFilter,
  isCryptoOrdersFilter,
  isInvoiceListFilter,
  isTicketsListFilter,
  isNFTRankingFilter,
  isTaskListFilter,
  customPageSize,
  tableClass,
  theadClass,
  trClass,
  thClass,
  divClass,
  SearchPlaceholder,
}: TableContainerProps) => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
    const itemRank = rankItem(row.getValue(columnId), value);
    addMeta({
      itemRank,
    });
    return itemRank.passed;
  };

  const table = useReactTable({
    columns,
    data,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      columnFilters,
      globalFilter,
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const {
    getHeaderGroups,
    getRowModel,
    getCanPreviousPage,
    getCanNextPage,
    getPageOptions,
    setPageIndex,
    nextPage,
    previousPage,
    setPageSize,
    getState,
  } = table;

  useEffect(() => {
    Number(customPageSize) && setPageSize(Number(customPageSize));
  }, [customPageSize, setPageSize]);

  return (
    <Fragment>
      {isGlobalFilter && (
        <Row className="mb-3 w-100 ms-0">
          <Card id={modelName} className="p-0 border-0">
            <div className="card-body pt-0">
              <div className="ahln-filter-div">
                <CardBody className="border  border-0">
                  <form className="col-md-12">
                    <Row className="">
                      <Col>
                        <div
                          className={
                            isProductsFilter ||
                            isModelFilter ||
                            isContactsFilter ||
                            isCompaniesFilter ||
                            isNFTRankingFilter
                              ? "search-box me-2 mb-2 d-inline-block"
                              : "search-box me-2 mb-2 d-inline-block col-12"
                          }
                        >
                          <DebouncedInput
                            value={globalFilter ?? ""}
                            onChange={(value) => setGlobalFilter(String(value))}
                            placeholder={SearchPlaceholder}
                          />
                          <i className="bx bx-search-alt search-icon"></i>
                        </div>
                      </Col>
                      {isModelFilter && <ModelGlobalFilter />}
                      {isProductsFilter && <ProductsGlobalFilter />}
                      {isCustomerFilter && <CustomersGlobalFilter />}
                      {isOrderFilter && <OrderGlobalFilter />}
                      {isContactsFilter && <ContactsGlobalFilter />}
                      {isCompaniesFilter && <CompaniesGlobalFilter />}
                      {isLeadsFilter && <LeadsGlobalFilter />}
                      {isCryptoOrdersFilter && <CryptoOrdersGlobalFilter />}
                      {isInvoiceListFilter && <InvoiceListGlobalSearch />}
                      {isTicketsListFilter && <TicketsListGlobalFilter />}
                      {isNFTRankingFilter && <NFTRankingGlobalFilter />}
                      {isTaskListFilter && <TaskListGlobalFilter />}
                    </Row>
                  </form>
                </CardBody>
              </div>
            </div>
          </Card>
        </Row>
      )}

      <Card id={modelName} className="">
        <div className="card-body  w-100 tbl-card">
          <div>
            <div className={divClass +"  tbl-light"}>
              <Table hover className={tableClass +" tbl-ahln round-3 mb-0"}>
                <thead>
                  {getHeaderGroups().map((headerGroup: any) => (
                    <tr className={trClass} key={headerGroup.id}>
                      {headerGroup.headers.map((header: any) => (
                        <th
                          key={header.id}
                          className={thClass}
                          {...{
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {header.isPlaceholder ? null : (
                            <React.Fragment>
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                              {{
                                asc: " ",
                                desc: " ",
                              }[header.column.getIsSorted() as string] ?? null}
                              {header.column.getCanFilter() ? (
                                <div>
                                  <Filter
                                    column={header.column}
                                    table={table}
                                  />
                                </div>
                              ) : null}
                            </React.Fragment>
                          )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>

                <tbody>
                  {getRowModel().rows.map((row: any) => {
                    return (
                      <tr key={row.id}>
                        {row.getVisibleCells().map((cell: any) => {
                          return (
                            <td key={cell.id} className="text-muted">
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </Card>
      <Card id={modelName}>
        <div className="card-body pt-0">
          <div>
            <Row className="align-items-center mt-2 g-3 text-center text-sm-start">
              <div className="col-sm">
                <div className="text-muted">
                  Showing<span className="fw-semibold ms-1">{data.length}</span>{" "}
                  of{" "}
                  <span className="fw-semibold">
                    {getState().pagination.pageSize}
                  </span>{" "}
                  Results
                </div>
              </div>
              <div className="col-sm-auto">
                <ul className="pagination pagination-separated pagination-md justify-content-center justify-content-sm-start mb-0">
                  <li
                    className={
                      !getCanPreviousPage() ? "page-item disabled" : "page-item"
                    }
                  >
                    <Link to="#" className="page-link" onClick={previousPage}>
                      Previous
                    </Link>
                  </li>
                  {getPageOptions().map((item: any, key: number) => (
                    <React.Fragment key={key}>
                      <li className="page-item">
                        <Link
                          to="#"
                          className={
                            getState().pagination.pageIndex === item
                              ? "page-link active"
                              : "page-link"
                          }
                          onClick={() => setPageIndex(item)}
                        >
                          {item + 1}
                        </Link>
                      </li>
                    </React.Fragment>
                  ))}
                  <li
                    className={
                      !getCanNextPage() ? "page-item disabled" : "page-item"
                    }
                  >
                    <Link to="#" className="page-link" onClick={nextPage}>
                      Next
                    </Link>
                  </li>
                </ul>
              </div>
            </Row>
          </div>
        </div>
      </Card>
    </Fragment>
  );
};

export default TableContainer;
