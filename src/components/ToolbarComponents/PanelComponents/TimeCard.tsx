import React, { useEffect, useMemo, useState } from "react";
import { RootState } from "../../../Redux/store";
import { useSelector } from "react-redux";
import { ClockCircleOutlined } from "@ant-design/icons";
import { minutesToHMS } from "../../../API/utils";

const UserCard = () => {
  const activeEmergency = useSelector(
    (state: RootState) => state.emergencies.activeEmergency
  );

  let time = useMemo(async () => {
    let { hours, minutes, seconds } = minutesToHMS(
      activeEmergency?.EstimatedEvacMinutes || 0
    );
    return `${hours}h ${minutes}m`;
  }, [activeEmergency]);
  return (
    <div className="card time-card">
      <div className="icon-box">
        <ClockCircleOutlined />
      </div>

      <div className="time-info">
        <span className="label">Est Evacuation Time</span>
        <h2 className="time-value">{time}</h2>
      </div>
    </div>
  );
};

export default React.memo(UserCard);
