import React, { useState } from "react";
import {
  CaretDownOutlined,
  CaretUpOutlined,
  HistoryOutlined,
} from "@ant-design/icons";
import "./styles.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/store";
import EmergencyDropdownPanel from "./EmergencyDropdownPanel";

const EmergencyDropdown = () => {
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const activeEmergency = useSelector(
    (state: RootState) => state.emergencies.activeEmergency
  );
  return (
    <div className="emergency-container">
      <div
        className="dropdown-trigger"
        onClick={() => setIsDropdownActive(!isDropdownActive)}
      >
        <div className="trigger-left">
          <HistoryOutlined className="history-icon" />
          <span className="emergency-title">
            {activeEmergency ? activeEmergency.Name : "Emergency Name"}
          </span>
        </div>
        {isDropdownActive ? (
          <CaretUpOutlined className="caret" />
        ) : (
          <CaretDownOutlined className="caret" />
        )}
      </div>

      {isDropdownActive && (
        <EmergencyDropdownPanel setIsDropdownActive={setIsDropdownActive} />
      )}
    </div>
  );
};

export default React.memo(EmergencyDropdown);
