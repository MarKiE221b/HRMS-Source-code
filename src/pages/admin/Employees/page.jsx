import React, { useMemo } from "react";
import { getEmployeesList } from "../../../api";
import Table from "../../../components/admin/Table";

const Employees = () => {
  const { data: employees, isFetching: loadApp } = getEmployeesList();

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
    ],
    []
  );
  return (
    <div>
      <Table columns={columns} data={employees} load={loadApp} />
    </div>
  );
};

export default Employees;
