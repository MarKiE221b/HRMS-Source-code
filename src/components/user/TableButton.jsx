import React from "react";

const TableButton = ({ table, row, setShowModal, setId, userUnit }) => {
  const filterStatusData =
    table
      ?.getRowModel()
      .flatRows.map((data, index) =>
        index === row.index ? data.original : undefined
      )
      .filter((id) => id !== undefined)[0] || {};

  return (
    <>
      {userUnit === "Chief Administrative Officer" &&
        (filterStatusData.OICStatus === "Pending" ? (
          <button
            type="button"
            className="inline-block rounded-full bg-info px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#54b4d3] transition duration-150 ease-in-out hover:bg-info-600 hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:bg-info-600 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-info-700 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(84,180,211,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)]"
            onClick={() => {
              setId(filterStatusData.app_id);
              setShowModal(true);
            }}
          >
            FOR APPROVAL
          </button>
        ) : filterStatusData.OICStatus === "Declined" ? (
          <p className="text-center font-semibold">Declined</p>
        ) : (
          <p className="text-center font-semibold">Approved</p>
        ))}

      {userUnit === "Chief Education Program Specialist" &&
        (filterStatusData.OICStatus === "Approved" &&
        filterStatusData.CEPSStatus === "Pending" ? (
          <button
            type="button"
            className="inline-block rounded-full bg-info px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#54b4d3] transition duration-150 ease-in-out hover:bg-info-600 hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:bg-info-600 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-info-700 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(84,180,211,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)]"
            onClick={() => {
              setId(filterStatusData.app_id);
              setShowModal(true);
            }}
          >
            FOR APPROVAL
          </button>
        ) : filterStatusData.OICStatus === "Declined" ||
          filterStatusData.CEPSStatus === "Declined" ? (
          <p className="text-center font-semibold">Declined</p>
        ) : (
          <p className="text-center font-semibold">Pending</p>
        ))}
    </>
  );
};

export default TableButton;
