import React, { useMemo, useState } from "react";

// library
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

// api
import { getLedger } from "../../../api";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { TiArrowBack } from "react-icons/ti";
import { useNavigate, useParams } from "react-router-dom";

const LedgerPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: ledger } = getLedger();
  const [columnFilters, setColumnFilters] = useState("");
  const [sorting, setSorting] = useState([]);

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
        header: "EARNED",
        cell: (props) => <div>{props.getValue()}</div>,
      },
      {
        accessorKey: "vacation_AUpay",
        header: "ABSENCE UNDERTIME W/PAY",
        cell: (props) => (
          <div>{props.getValue() !== 0 ? props.getValue() : ""}</div>
        ),
      },
      {
        accessorKey: "vacation_balance",
        header: "BALANCE",
        cell: (props) => <div>{props.getValue()}</div>,
      },
      {
        accessorKey: "vacation_AUwopay",
        header: "ABSENCE UNDERTIME W/O PAY",
        cell: (props) => <div>{props.getValue() !== 0 ? props.getValue() : ""}</div>,
      },
      {
        accessorKey: "sick_earned",
        header: "EARNED",
        cell: (props) => <div>{props.getValue()}</div>,
      },
      {
        accessorKey: "sick_AUpay",
        header: "ABSENCE UNDERTIME W/PAY",
        cell: (props) => <div>{props.getValue() !== 0 ? props.getValue() : ""}</div>,
      },
      {
        accessorKey: "sick_balance",
        header: "BALANCE",
        cell: (props) => <div>{props.getValue()}</div>,
      },
      {
        accessorKey: "sick_AUwopay",
        header: "ABSENCE UNDERTIME W/O PAY",
        cell: (props) => <div>{props.getValue() !== 0 ? props.getValue() : ""}</div>,
      },
      {
        accessorKey: "earned",
        header: "EARNED",
        cell: (props) => <div>{props.getValue()}</div>,
      },
      {
        accessorKey: "consumed",
        header: "CONSUMED",
        cell: (props) => <div>{props.getValue()}</div>,
      },
      {
        accessorKey: "balance",
        header: "BALANCE",
        cell: (props) => <div>{props.getValue() !== null ? props.getValue() : 0}</div>,
      },
      {
        accessorKey: "ref_no",
        header: "REFERENCE ROMO NO.",
        cell: (props) => <div>{props.getValue()}</div>,
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
    data: ledger || [],
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

  return (
    <div className="bg-white shadow-sm p-8">
      <div className="mb-2">
        <button
          type="button"
          className="inline-block rounded px-2 pb-2 pt-2.5 text-sm hover:underline font-medium uppercase leading-normal text-primary hover:text-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700"
          onClick={() => navigate(`/user/${id}`)}
        >
          <p className="flex items-center gap-2">
            <TiArrowBack /> GO BACK
          </p>
        </button>
      </div>
      <div className="text-sm max-h-[1000px] overflow-y-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-white border">
              <td className=" px-7 py-3"></td>
              <td className=" px-7 py-3"></td>
              <td colSpan={4} className="text-center bg-green-300 px-7 py-3">
                VACATION LEAVE
              </td>
              <td colSpan={4} className="text-center bg-purple-300 px-7 py-3">
                SICK LEAVE
              </td>
              <td colSpan={4} className="text-center bg-blue-300 px-7 py-3">
                CTO
              </td>
              <td className=" px-7 py-3"></td>
            </tr>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="bg-gray-100 border ">
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
    </div>
  );
};

export default LedgerPage;
