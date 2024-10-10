import React, { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";

import {
  getAllApplications,
  getLeaveFormPdf,
  getUploadLeaveForms,
  leaveApplicationForm,
} from "../../../api";
import { FaRegFileAlt } from "react-icons/fa";
import { Tooltip } from "flowbite-react";
import StatusTimeline from "../../../components/admin/StatusTimeline";
import LeaveFormModal from "../../../components/user/LeaveFormModal";
import UploadLeaveModal from "../../../components/admin/UploadLeaveModal";
import Table from "../../../components/admin/Table";
import LeaveUploadTable from "../../../components/admin/LeaveUploadTable";
import PdfViewModal from "./../../../components/admin/PdfViewModal";

const RequestPage = () => {
  const { data: allApplications, isFetching: loadApp } = getAllApplications();
  const { data: uploadLeaveFormsData, isFetching: isFetchingLeaveForms } =
    getUploadLeaveForms();

  const { mutate: pdfView, data: pdfFile, isPending } = getLeaveFormPdf();

  // pdf view Modal
  const [pdfViewModal, setPdfViewModal] = useState(false);

  // system modal
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [leaveFormModal, setLeaveFormModal] = useState(false);

  // leave upload modal
  const [leaveUploadSorting, setLeaveUploadSorting] = useState([]);
  const [leaveUploadGlobalFilter, setLeaveUploadGlobalFilter] = useState("");
  const [uploadLeaveModal, setUploadLeaveModal] = useState(false);

  const { mutate: postLeave, data: applicationData } = leaveApplicationForm();

  // system leave application
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
        accessorKey: "app_id",
        header: "",
        cell: (props) => (
          <div className="flex items-center justify-center">
            <button
              type="button"
              onClick={() => {
                postLeave({ id: props.getValue() });
                setLeaveFormModal(true);
              }}
            >
              <Tooltip content="View Application Form">
                <FaRegFileAlt size="25px" />
              </Tooltip>
            </button>
          </div>
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

  // Leave application upload
  const leaveUploadColumn = useMemo(
    () => [
      {
        accessorKey: "full_name",
        header: "Name",
        cell: (props) => <div>{props.getValue()}</div>,
      },
      {
        accessorKey: "period",
        header: "Period",
        cell: (props) => <div>{props.getValue()}</div>,
      },
      {
        accessorKey: "particulars",
        header: "Particulars",
        cell: (props) => <div>{props.getValue()}</div>,
      },
      {
        accessorKey: "document_id",
        header: "Leave Form",
        cell: (props) => (
          <div>
            {
              <button
                className="hover:underline hover:text-blue-900"
                type="button"
                onClick={() => {
                  setPdfViewModal(true);
                  pdfView({ id: props.getValue() });
                }}
              >
                {props.getValue()}
              </button>
            }
          </div>
        ),
      },
    ],
    []
  );

  const leaveUploadTable = useReactTable({
    data: uploadLeaveFormsData?.values || [],
    columns: leaveUploadColumn,
    state: {
      sorting: leaveUploadSorting,
      globalFilter: leaveUploadGlobalFilter,
    },
    onSortingChange: setLeaveUploadSorting,
    onGlobalFilterChange: setLeaveUploadGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: "includesString",
  });

  return (
    <div className="max-h-full overflow-y-auto">
      <PdfViewModal
        showModal={pdfViewModal}
        setShowModal={setPdfViewModal}
        pdfFile={pdfFile}
        load={isPending}
      />
      <UploadLeaveModal
        showModal={uploadLeaveModal}
        setShowModal={setUploadLeaveModal}
      />
      <LeaveFormModal
        data={applicationData?.data}
        showModal={leaveFormModal}
        setShowModal={setLeaveFormModal}
      />
      <div className="flex flex-col gap-5">
        <Table
          table={table}
          load={loadApp}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
          tableLabel="System Leave Application List"
        />

        <LeaveUploadTable
          table={leaveUploadTable}
          load={isFetchingLeaveForms}
          globalFilter={leaveUploadGlobalFilter}
          setGlobalFilter={setLeaveUploadGlobalFilter}
          setUploadLeaveModal={setUploadLeaveModal}
          tableLabel="Leave Upload List"
        />
      </div>
    </div>
  );
};

export default RequestPage;
