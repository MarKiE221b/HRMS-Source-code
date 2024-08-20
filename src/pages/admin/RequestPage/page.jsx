import React, { useEffect, useMemo, useState } from "react";
import Table from "../../../components/admin/Table";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";

import { getAllApplications, updateEmployeeLeaveRD } from "../../../api";
import StatusTimeline from "../../../components/admin/StatusTimeline";
import TableButton from "../../../components/admin/TableButton";
import ComplyModal from "../../../components/admin/ComplyModal";

const RequestPage = () => {
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState("");

  const {
    data: allApplications,
    isFetching: loadApp,
    refetch,
  } = getAllApplications();

  const { mutate: submitStatus, status, data } = updateEmployeeLeaveRD();

  const columns = useMemo(
    () => [
      {
        accessorKey: "full_name",
        header: "Name",
        cell: (props) => <div>{props.getValue()}</div>,
      },
      {
        accessorKey: "type",
        header: "Type",
        cell: (props) => <div>{props.getValue()}</div>,
      },
      {
        accessorKey: "no_days",
        header: "No. Days",
        cell: (props) => <div>{props.getValue()}</div>,
      },
      {
        accessorKey: "inclusive_dates",
        header: "Dates",
        cell: (props) => <div>{props.getValue()}</div>,
      },
      {
        accessorKey: "details",
        header: "Details",
        cell: (props) => <div>{props.getValue()}</div>,
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: (props) => (
          <StatusTimeline status={props.table} row={props.row} />
        ),
      },
      {
        accessorKey: "btnAction",
        header: "",
        cell: (props) => (
          <TableButton
            table={props.table}
            row={props.row}
            setShowModal={setShowModal}
            setId={setId}
          />
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: allApplications || [],
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: "includesString",
  });

  useEffect(() => {
    if (data?.status === 200) {
      if (
        data?.data.message === "Leave and credit updated successfully" ||
        data?.data.message === "Declined Status"
      ) {
        refetch();
      }
    }
  }, [status === "success"]);

  return (
    <div>
      <Table
        table={table}
        load={loadApp}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      <ComplyModal
        showModal={showModal}
        setShowModal={setShowModal}
        id={id}
        submitStatus={submitStatus}
      />
    </div>
  );
};

export default RequestPage;
