import React from "react";
import { Timeline } from "flowbite-react";
import { RxCross2 } from "react-icons/rx";
const StatusTimeline = () => {
  return (
    <div className="mb-5 mt-8">
      <Timeline horizontal>
        <Timeline.Item>
          <Timeline.Point icon={RxCross2} />
          <Timeline.Content>
            <Timeline.Time>May 24, 2024</Timeline.Time>
            <Timeline.Title>Chief Administrative Officer</Timeline.Title>
            <Timeline.Body>Pending</Timeline.Body>
          </Timeline.Content>
        </Timeline.Item>
        <Timeline.Item>
          <Timeline.Point icon={RxCross2} />
          <Timeline.Content>
            <Timeline.Time>May 24, 2024</Timeline.Time>
            <Timeline.Title>Regional Director</Timeline.Title>
            <Timeline.Body>Pending</Timeline.Body>
          </Timeline.Content>
        </Timeline.Item>
      </Timeline>
    </div>
  );
};

export default StatusTimeline;
