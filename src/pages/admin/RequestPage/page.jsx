import React, { useMemo } from "react";
import Table from "../../../components/admin/Table";
import { getAllApplications } from "../../../api";

const RequestPage = () => {
  const { data: allApplications, isFetching: loadApp } = getAllApplications();

  const columns = useMemo(
    () => [
      {
        id: "full_name",
        header: "Employee",
        accessorKey: "full_name",
        cell: (info) => info.getValue(),
      },
      {
        id: "type",
        header: "Leave",
        accessorKey: "type",
        cell: (info) => info.getValue(),
      },
      {
        id: "no_days",
        header: "No. Days",
        accessorKey: "no_days",
        cell: (info) => info.getValue(),
      },
      {
        id: "inclusive_dates",
        header: "Inclusive Dates",
        accessorKey: "inclusive_dates",
        cell: (info) => info.getValue(),
      },
    ],
    []
  );

  return (
    <div>
      <Table columns={columns} data={allApplications} load={loadApp} />
    </div>
  );
};

export default RequestPage;
