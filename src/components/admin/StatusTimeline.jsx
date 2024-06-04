import React from "react";
import { Timeline } from "flowbite-react";
import { RxCross2 } from "react-icons/rx";
import { MdOutlinePending } from "react-icons/md";
const StatusTimeline = ({ status, row }) => {
  const filterStatusData =
    status
      ?.getRowModel()
      .flatRows.map((data, index) =>
        index === row.index ? data.original : undefined
      )
      .filter((id) => id !== undefined)[0] || {};

  return (
    <div className="mb-5 mt-8">
      <Timeline horizontal>
        <Timeline.Item>
          <Timeline.Point
            icon={
              filterStatusData?.notedStatus === "Pending"
                ? MdOutlinePending
                : RxCross2
            }
          />
          <Timeline.Content>
            <Timeline.Time>
              {filterStatusData?.notedDateModified?.split("T")[0]}
            </Timeline.Time>
            <Timeline.Title>Chief Administrative Officer</Timeline.Title>
            <Timeline.Body>{filterStatusData?.notedStatus}</Timeline.Body>
          </Timeline.Content>
        </Timeline.Item>
        <Timeline.Item>
          <Timeline.Point
            icon={
              filterStatusData?.approvedStatus === "Pending"
                ? MdOutlinePending
                : RxCross2
            }
          />
          <Timeline.Content>
            <Timeline.Time>
              {filterStatusData?.approvedDateModified?.split("T")[0]}
            </Timeline.Time>
            <Timeline.Title>Regional Director</Timeline.Title>
            <Timeline.Body>{filterStatusData?.approvedStatus}</Timeline.Body>
          </Timeline.Content>
        </Timeline.Item>
      </Timeline>
    </div>
  );
};

export default StatusTimeline;
