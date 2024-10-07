import React from "react";
import { flexRender } from "@tanstack/react-table";
import Loading from "../loading/Loading";
import { Label, TextInput } from "flowbite-react";

import { IoIosArrowDown, IoIosArrowUp, IoMdSearch } from "react-icons/io";

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

const Table = ({ load, globalFilter, setGlobalFilter, table }) => {
  return (
    <div className="max-h-full overflow-y-auto rounded-lg bg-white text-left shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
      <div className="border-b-2 border-neutral-100 px-6 py-3 dark:border-neutral-600 dark:text-neutral-50">
        Employees Lists
      </div>
      {load ? (
        <Loading />
      ) : (
        <div className="p-6 flex flex-col">
          {/* Search Bar */}
          <GlobalFilter
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
          {/* Table */}
          <div className="flex-grow mt-5 max-h-[600px] overflow-y-auto">
            <table className="w-full text-sm">
              <thead>
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
      )}
    </div>
  );
};
export default Table;
