import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import Loading from "../loading/Loading";
import { Label, TextInput } from "flowbite-react";

import { IoMdSearch } from "react-icons/io";
import {
  FaLongArrowAltDown,
  FaLongArrowAltUp,
  FaArrowsAltV,
} from "react-icons/fa";

const GlobalFilter = ({ globalFilter, setGlobalFilter }) => {
  return (
    <div className="max-w-md">
      <div className="mb-2 block">
        <Label htmlFor="search" value="Search" />
      </div>
      <TextInput
        value={globalFilter || ""}
        onChange={(e) => setGlobalFilter(e.target.value)}
        id="search"
        type="text"
        icon={IoMdSearch}
        placeholder="Search..."
        required
      />
    </div>
  );
};

const Table = ({ columns, data, load }) => {
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
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
    <div className="flex-grow rounded-lg bg-white text-left shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 w-full">
      <div className="border-b-2 border-neutral-100 px-6 py-3 dark:border-neutral-600 dark:text-neutral-50">
        Employees Lists
      </div>
      {load ? (
        <Loading />
      ) : (
        <div className="p-6">
          {/* table */}
          <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  {/* Global Search */}
                  <GlobalFilter
                    globalFilter={globalFilter}
                    setGlobalFilter={setGlobalFilter}
                  />
                  <div className="max-h-[500px] overflow-y-auto">
                    <table className="min-w-full text-left text-sm font-light">
                      <thead className="bg-white font-medium">
                        {table.getHeaderGroups().map((headerGroup) => (
                          <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                              <th
                                key={header.id}
                                scope="col"
                                className="px-6 py-4"
                              >
                                {header.isPlaceholder ? null : (
                                  <div>
                                    {flexRender(
                                      header.column.columnDef.header,
                                      header.getContext()
                                    )}
                                    <button
                                      onClick={header.column.getToggleSortingHandler()}
                                      className="ml-2"
                                    >
                                      {header.column.getIsSorted() ? (
                                        header.column.getIsSorted() ===
                                        "desc" ? (
                                          <FaLongArrowAltDown />
                                        ) : (
                                          <FaLongArrowAltUp />
                                        )
                                      ) : (
                                        <FaArrowsAltV />
                                      )}
                                    </button>
                                  </div>
                                )}
                              </th>
                            ))}
                          </tr>
                        ))}
                      </thead>
                      <tbody>
                        {table.getRowModel().rows.map((row) => (
                          <tr
                            key={row.id}
                            className="bg-neutral-100 hover:bg-neutral-200 duration-300 ease-in-out"
                          >
                            {row.getVisibleCells().map((cell) => (
                              <td
                                key={cell.id}
                                className="whitespace-nowrap px-6 py-4 font-medium"
                              >
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
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Table;
