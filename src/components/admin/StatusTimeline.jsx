import React from "react";
import { Timeline } from "flowbite-react";
import { RxCross2 } from "react-icons/rx";
import { MdOutlinePending } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
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
        {/* OIC */}
        <Timeline.Item>
          <Timeline.Point
            icon={
              filterStatusData?.OICStatus !== "Pending"
                ? filterStatusData?.OICStatus === "Approved"
                  ? FaCheck
                  : RxCross2
                : MdOutlinePending
            }
          />
          <Timeline.Content>
            <Timeline.Time>
              {filterStatusData?.OICStatusDate?.split("T")[0]}
            </Timeline.Time>
            <Timeline.Title>"Chief Administrative Officer"</Timeline.Title>
            <Timeline.Body>{filterStatusData?.OICStatus}</Timeline.Body>
          </Timeline.Content>
        </Timeline.Item>

        {/* CEPS */}
        {filterStatusData?.division === "Technical" && (
          <Timeline.Item>
            <Timeline.Point
              icon={
                filterStatusData?.CEPSStatus !== "Pending"
                  ? filterStatusData?.CEPSStatus === "Approved"
                    ? FaCheck
                    : RxCross2
                  : MdOutlinePending
              }
            />
            <Timeline.Content>
              <Timeline.Time>
                {filterStatusData?.CEPSStatusDate?.split("T")[0]}
              </Timeline.Time>
              <Timeline.Title>
                Chief Education Program Specialist
              </Timeline.Title>
              <Timeline.Body>{filterStatusData?.CEPSStatus}</Timeline.Body>
            </Timeline.Content>
          </Timeline.Item>
        )}

        {/* RD */}
        <Timeline.Item>
          <Timeline.Point
            icon={
              filterStatusData?.approvedStatus !== "Pending"
                ? filterStatusData?.approvedStatus === "Approved"
                  ? FaCheck
                  : RxCross2
                : MdOutlinePending
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
