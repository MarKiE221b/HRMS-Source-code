import React, { useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import TableButton from "../../../components/user/TableButton";
import ComplyModal from "../../../components/user/ComplyModal";
import StatusTimeline from "../../../components/user/StatusTimeline";

import {
  getEmployeesApplication,
  updateEmployeeLeaveOIC,
  userInfoApi,
} from "../../../api";

import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

const EmployeeRequestPage = () => {
  const queryClient = useQueryClient();

  const [id, setId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [columnFilters, setColumnFilters] = useState("");
  const [sorting, setSorting] = useState([]);

  const { data: userData } = userInfoApi();
  const { data: employeesApplication } = getEmployeesApplication(
    userData?.unit
  );

  const { mutate: submitStatus, status } = updateEmployeeLeaveOIC();

  const columns2 = useMemo(
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

  const table2 = useReactTable({
    data: employeesApplication || [],
    columns: columns2,
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

  if (status.match("success")) {
    queryClient.invalidateQueries({
      queryKey: ["getemployeesapplicationkey"],
    });
  }
  return (
    <>
      <ComplyModal
        showModal={showModal}
        setShowModal={setShowModal}
        id={id}
        submitStatus={submitStatus}
      />

      {/* Technical Content */}
      {userData?.unit === "Chief Education Program Specialist" && (
        <div className="flex-grow bg-white text-left shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 w-full p-5">
          <div className="border-b-2 border-neutral-100 px-6 py-3 dark:border-neutral-600 dark:text-neutral-50">
            Employees Requests for Chief Education Program Specialist
          </div>

          <div className="pt-5 bg-white">
            <div className="text-sm max-h-[500px] overflow-y-auto">
              <table className="w-full">
                <thead>
                  {table2.getHeaderGroups().map((headerGroup) => (
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
                  {table2.getRowModel().rows?.map((row) => (
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
        </div>
      )}

      {/* Admin Content */}

      {userData?.unit === "Chief Administrative Officer" && (
        <div className="flex-grow bg-white text-left shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 w-full p-5">
          <div className="border-b-2 border-neutral-100 px-6 py-3 dark:border-neutral-600 dark:text-neutral-50">
            Employees Requests for Chief Administrative Officer
          </div>

          <div className="pt-5 bg-white">
            <div className="text-sm max-h-[500px] overflow-y-auto">
              <table className="w-full">
                <thead>
                  {table2.getHeaderGroups().map((headerGroup) => (
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
                  {table2.getRowModel().rows?.map((row) => (
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
        </div>
      )}
    </>
  );
};

export default EmployeeRequestPage;
