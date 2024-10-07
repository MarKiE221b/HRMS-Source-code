import React, { useMemo, useState } from "react";
import { getEmployeesList } from "../../../api";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";

import Table from "../../../components/admin/Table";
import EModifyModal from "../../../components/admin/EModifyModal";

const ModifyButton = ({ table, row, setTableRowData, setShowModal }) => {
  const initialId = table.getRowModel().flatRows.map((data, index) => {
    if (index === row.index) return data.original;
  });

  const filterId = initialId.filter((id) => id !== undefined);

  return (
    <button
      type="button"
      className="inline-block rounded-full bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
      onClick={() => {
        setTableRowData(filterId);
        setShowModal(true);
      }}
    >
      Modify
    </button>
  );
};

const Employees = () => {
  const { data: employees, isFetching: loadApp } = getEmployeesList();
  const [tableRowData, setTableRowData] = useState();
  const [showModal, setShowModal] = useState(false);

  const columns = useMemo(
    () => [
      {
        id: "emp_id",
        header: "ID",
        accessorKey: "emp_id",
        cell: (info) => info.getValue(),
      },
      {
        id: "full_name",
        header: "Name",
        accessorKey: "full_name",
        cell: (info) => info.getValue(),
      },
      {
        id: "unit",
        header: "Unit",
        accessorKey: "unit",
        cell: (info) => info.getValue(),
      },
      {
        id: "division",
        header: "Division",
        accessorKey: "division",
        cell: (info) => info.getValue(),
      },
      {
        id: "modify",
        header: "",
        accessorKey: "modButton",
        cell: (props) => (
          <div className="flex justify-center items-center py-2">
            <ModifyButton
              table={props.table}
              row={props.row}
              setTableRowData={setTableRowData}
              setShowModal={setShowModal}
            />
          </div>
        ),
      },
    ],
    []
  );

  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data: employees || [],
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: "includesString",
  });

  return (
    <>
      <EModifyModal
        tableRowData={tableRowData}
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <Table
        table={table}
        load={loadApp}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
    </>
  );
};

export default Employees;
