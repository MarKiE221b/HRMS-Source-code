import React, { useMemo, useState } from "react";

// library
import { useNavigate } from "react-router-dom";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button, Label } from "flowbite-react";

import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { TiArrowBack } from "react-icons/ti";

import { getCTOLedger } from "../../../api";
import CtoUploadModal from "../../../components/admin/CtoUploadModal";

const CTO = () => {
  const navigate = useNavigate();

  const { data: ctoLedger } = getCTOLedger();
  const [showModal, setShowModal] = useState(false);
  const [columnFilters, setColumnFilters] = useState("");
  const [sorting, setSorting] = useState([]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "fullname",
        header: "Employee",
        cell: (props) => <div>{props.getValue()}</div>,
      },
      {
        accessorKey: "period",
        header: "Period",
        cell: (props) => <div>{props.getValue()}</div>,
      },
      {
        accessorKey: "CTO_earned",
        header: "Earned CTO",
        cell: (props) => (
          <div>{props.getValue() !== 0 ? props.getValue() : ""}</div>
        ),
      },
      {
        accessorKey: "certificate_id",
        header: "ROMO No.",
        cell: (props) => <div>{props.getValue()}</div>,
      },
      {
        accessorKey: "date_uploaded",
        header: "Date",
        cell: (props) => <div>{props.getValue()?.split("T")[0]}</div>,
      },
    ],
    []
  );

  const table = useReactTable({
    data: ctoLedger || [],
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
    <>
      {/* Modal */}
      <CtoUploadModal showModal={showModal} setShowModal={setShowModal} />

      {/* Main Body */}
      <div className=" bg-white h-full shadow-sm p-8">
        {/* Go back button */}
        <div className="mb-2">
          <button
            type="button"
            className="inline-block rounded px-2 pb-2 pt-2.5 text-sm hover:underline font-medium uppercase leading-normal text-primary hover:text-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700"
            onClick={() => navigate("/admin/dashboard")}
          >
            <p className="flex items-center gap-2">
              <TiArrowBack /> GO BACK
            </p>
          </button>
        </div>

        {/* File upload */}
        <div className="mb-5">
          <div className="mb-2 block">
            <Label htmlFor="upload-btn" value="Upload CTO ROMO File" />
          </div>
          <Button
            id="upload-btn"
            color="blue"
            size="sm"
            onClick={() => setShowModal(true)}
          >
            Upload
          </Button>
        </div>

        {/* Table */}
        <div className="text-xs max-h-[600px] overflow-y-auto">
          <table className="w-full">
            <thead>
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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CTO;
