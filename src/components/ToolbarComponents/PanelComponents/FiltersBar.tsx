import React from "react";
import { Personnel } from "../../../types/appDataTypes";

type propsType = {
  personnel: Personnel[];
  selectValue: string | null;
  setSelectValue: (val: string) => void;
  searchBarValue: string | null;
  setSearchBarValue: (val: string | null) => void;
};
const FiltersBar = ({
  selectValue,
  setSelectValue,
  searchBarValue,
  setSearchBarValue,
}: propsType) => {
  return (
    <div className="tracer-header">
      <h3>Evacuation Tracer</h3>
      <div className="filter-bar">
        <select
          className="filter-select"
          value={selectValue || "all"}
          onChange={(e) => setSelectValue(e.target.value)}
        >
          <option value="all">All users</option>
          <option value="Moving">Moving</option>
          <option value="Still">Still</option>
          <option value="Evacuated">Evacuated</option>
        </select>
        <input
          type="text"
          className="search-input"
          placeholder="Search..."
          value={searchBarValue || ""}
          onChange={(e) => setSearchBarValue(e.target.value)}
        />
      </div>
    </div>
  );
};
export default React.memo(FiltersBar);
