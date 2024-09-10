import {
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useMemo, useState } from "react";

const CTOpage = () => {
  const [columnFilters, setColumnFilters] = useState("");
  const [sorting, setSorting] = useState([]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "type",
        header: "Type",
        cell: (props) => <div>{props.getValue()}</div>,
      },
      {
        accessorKey: "app_id",
        header: "",
        cell: (props) => (
          <div>
            <button
              className="hover:text-blue-900"
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
    data: [] || [],
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
    <div>In development</div>
    // <div>
    //   <table>
    //     <thead>
    //       {table.getHeaderGroups().map((headerGroup) => (
    //         <tr key={headerGroup.id} className="bg-gray-100 border ">
    //           {headerGroup.headers.map((header) => (
    //             <td
    //               className="cursor-pointer px-7 py-3"
    //               key={header.id}
    //               onClick={header.column.getToggleSortingHandler()}
    //             >
    //               <div className="flex gap-1 items-center">
    //                 {header.column.columnDef.header}
    //                 {
    //                   {
    //                     asc: <IoIosArrowUp />,
    //                     desc: <IoIosArrowDown />,
    //                   }[header.column.getIsSorted() ?? null]
    //                 }
    //               </div>
    //             </td>
    //           ))}
    //         </tr>
    //       ))}
    //     </thead>
    //     <tbody>

    //     </tbody>
    //   </table>
    // </div>
  );
};

export default CTOpage;
