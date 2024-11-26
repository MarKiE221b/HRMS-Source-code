import React, { useMemo, useState } from "react";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import PdfViewModal from "./PdfViewModal";

import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { getLeaveFormPdf, getLedgerPerEmployee, getPdf } from "../../api";

const LedgerTable = ({ emp_id }) => {
  const [columnFilters, setColumnFilters] = useState("");
  const [sorting, setSorting] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);

  const { data: ledger, isFetching } = getLedgerPerEmployee(emp_id);
  const { mutate: pdfView, data: pdfFile, isPending } = getPdf();
  const {
    mutate: pdfLeaveView,
    data: pdfLeaveFile,
    isPending: pdfLeaveIsPending,
  } = getLeaveFormPdf();

  const columns = useMemo(
    () => [
      {
        accessorKey: "period",
        header: "PERIOD",
        cell: (props) => <div>{props.getValue()}</div>,
      },
      {
        accessorKey: "particulars",
        header: "PARTICULARS",
        cell: (props) => <div>{props.getValue()}</div>,
      },
      {
        accessorKey: "vacation_earned",
        header: "EARNED (Day/s)",
        cell: (props) => <div>{props.getValue()}</div>,
      },
      {
        accessorKey: "vacation_AUpay",
        header: "ABSENCE UNDERTIME W/PAY (Day/s)",
        cell: (props) => <div>{props.getValue()}</div>,
      },
      {
        accessorKey: "vacation_balance",
        header: "BALANCE (Day/s)",
        cell: (props) => <div>{props.getValue()}</div>,
      },
      {
        accessorKey: "vacation_AUwopay",
        header: "ABSENCE UNDERTIME W/O PAY (Day/s)",
        cell: (props) => <div>{props.getValue()}</div>,
      },
      {
        accessorKey: "sick_earned",
        header: "EARNED (Day/s)",
        cell: (props) => <div>{props.getValue()}</div>,
      },
      {
        accessorKey: "sick_AUpay",
        header: "ABSENCE UNDERTIME W/PAY (Day/s)",
        cell: (props) => <div>{props.getValue()}</div>,
      },
      {
        accessorKey: "sick_balance",
        header: "BALANCE (Day/s)",
        cell: (props) => <div>{props.getValue()}</div>,
      },
      {
        accessorKey: "sick_AUwopay",
        header: "ABSENCE UNDERTIME W/O PAY (Day/s)",
        cell: (props) => <div>{props.getValue()}</div>,
      },
      {
        accessorKey: "CTO_earned",
        header: "EARNED (Day/s)",
        cell: (props) => <div>{props.getValue()}</div>,
      },
      {
        accessorKey: "CTO_consumed",
        header: "CONSUMED (Day/s)",
        cell: (props) => <div>{props.getValue()}</div>,
      },
      {
        accessorKey: "CTO_balance",
        header: "BALANCE (Day/s)",
        cell: (props) => <div>{props.getValue()}</div>,
      },
      {
        accessorKey: "certificate_id",
        header: "REFERENCE ROMO NO.",
        cell: (props) => (
          <div>
            {
              <button
                className="hover:underline hover:text-blue-900"
                type="button"
                onClick={() => {
                  setShowModal(true);
                  pdfView({ id: props.getValue() });
                }}
              >
                {props.getValue()}
              </button>
            }
          </div>
        ),
      },
      {
        accessorKey: "document_id",
        header: "LEAVE DOCUMENT",
        cell: (props) => (
          <div>
            {
              <button
                className="hover:underline hover:text-blue-900"
                type="button"
                onClick={() => {
                  setShowModal2(true);
                  pdfLeaveView({ id: props.getValue() });
                }}
              >
                {props.getValue()}
              </button>
            }
          </div>
        ),
      },
      {
        accessorKey: "remarks",
        header: "REMARKS",
        cell: (props) => <div>{props.getValue()}</div>,
      },
    ],
    []
  );

  const table = useReactTable({
    data: ledger ? ledger : [],
    columns,
    state: {
      sorting: sorting,
      globalFilter: columnFilters,
    },
    getCoreRowModel: getCoreRowModel(), // Pass the hook reference directly, not a call to it
    getFilteredRowModel: getFilteredRowModel(), // Same here
    getSortedRowModel: getSortedRowModel(), // And here
    onGlobalFilterChange: setColumnFilters,
    onSortingChange: setSorting,
  });
  return isFetching ? (
    <div>Loading...</div>
  ) : (
    <>
      <PdfViewModal
        showModal={showModal}
        setShowModal={setShowModal}
        pdfFile={pdfFile}
        load={isPending}
      />
      <PdfViewModal
        showModal={showModal2}
        setShowModal={setShowModal2}
        pdfFile={pdfLeaveFile}
        load={pdfLeaveIsPending}
      />
      <div className="text-xs max-h-[600px] overflow-y-auto">
        <table className="w-full">
          <thead className="bg-white sticky top-0 z-10">
            <tr className="border">
              <td className="px-7 py-3"></td>
              <td className="px-7 py-3"></td>
              <td colSpan={4} className="text-center bg-green-300 px-7 py-3">
                VACATION LEAVE
              </td>
              <td colSpan={4} className="text-center bg-purple-300 px-7 py-3">
                SICK LEAVE
              </td>
              <td colSpan={4} className="text-center bg-blue-300 px-7 py-3">
                CTO
              </td>
              <td className="px-7 py-3"></td>
            </tr>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="bg-gray-100 border">
                {headerGroup.headers.map((header) => (
                  <td
                    className="cursor-pointer px-7 py-3"
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex gap-1 items-center">
                      {header.column.columnDef.header}
                      {
                        {
                          asc: <IoIosArrowUp />,
                          desc: <IoIosArrowDown />,
                        }[header.column.getIsSorted() ?? null]
                      }
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows?.map((row) => (
              <tr className="h-10 hover:bg-gray-100" key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td className="px-7 border" key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default LedgerTable;
