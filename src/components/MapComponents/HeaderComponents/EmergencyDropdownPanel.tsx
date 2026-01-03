import React, { useEffect, useState } from "react";
import {
  DeleteOutlined,
  EditOutlined,
  FireFilled,
  PauseOutlined,
} from "@ant-design/icons";
import "./styles.scss";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../Redux/store";
import { setActiveEmergency } from "../../../Redux/Slices/emergenciesSlice";
import { Emergency } from "../../../types/appDataTypes";
import { minutesToHMS } from "../../../API/utils";
import { useDebounce } from "../../../hooks/useDebounce";

const EmergencyDropdownPanel = ({
  setIsDropdownActive,
}: {
  setIsDropdownActive: (val: boolean) => void;
}) => {
  const dispatch = useDispatch();
  const [selectValue, setSelectValue] = useState<string>("all");
  const [searchBarValue, setSearchBarValue] = useState<string | null>(null);
  const debouncedSearchValue = useDebounce(searchBarValue || "", 200);

  const emergencies = useSelector(
    (state: RootState) => state.emergencies.items
  );
  const [filteredEmergencies, setfilteredEmergencies] = useState<Emergency[]>(
    []
  );

  useEffect(() => {
    let newEmerginces: Emergency[] = JSON.parse(JSON.stringify(emergencies));
    if (selectValue && selectValue !== "all") {
      newEmerginces = newEmerginces.filter(
        (el: Emergency) => el.Status === selectValue
      );
    }

    if (debouncedSearchValue) {
      const term = debouncedSearchValue.trim().toUpperCase();
      newEmerginces = newEmerginces.filter((el: Emergency) =>
        el.Name.toUpperCase().includes(term)
      );
    }
    setfilteredEmergencies(newEmerginces);
  }, [emergencies, selectValue, debouncedSearchValue]);

  return (
    <div className="dropdown-menu">
      <div className="menu-filters">
        <select
          className="status-select"
          onChange={(e) => setSelectValue(e.target.value)}
        >
          <option value="all">All</option>
          <option value="Active">Active</option>
          <option value="Paused">Paused</option>
        </select>
        <input
          type="text"
          className="menu-search"
          placeholder="Search..."
          onChange={(e) => setSearchBarValue(e.target.value)}
        />
      </div>

      <div className="emergency-items">
        {filteredEmergencies.map((emergency: Emergency) => {
          let { hours, minutes, seconds } = minutesToHMS(
            emergency.EstimatedEvacMinutes || 0
          );
          return (
            <div
              key={emergency.EmergencyID}
              className="emergency-item"
              onClick={() => {
                dispatch(setActiveEmergency(emergency));
                setIsDropdownActive(false);
              }}
            >
              <div className="item-main">
                <FireFilled className="fire-icon" />
                <div className="item-text">
                  <div className="name-row">
                    <span>{emergency.Name}</span>
                    <EditOutlined className="edit-icon" />
                  </div>
                  <span className="timer">
                    {hours}:{minutes}:{seconds}
                  </span>
                </div>
              </div>
              <div className="item-actions">
                <PauseOutlined className="action-icon" />
                <DeleteOutlined className="action-icon" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default React.memo(EmergencyDropdownPanel);
