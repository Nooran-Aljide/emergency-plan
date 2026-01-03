import { CloseOutlined, UserOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import HeadCountCard from "./HeadCountCard";
import TimeCard from "./TimeCard";
import FiltersBar from "./FiltersBar";
import UserCard from "./UserCard";

import "./styles.scss";
import { RootState } from "../../../Redux/store";
import { useSelector } from "react-redux";
import { Personnel } from "../../../types/appDataTypes";
import { useDebounce } from "../../../hooks/useDebounce";
type propsType = {
  onClose: () => void;
};

const Panel = ({ onClose }: propsType) => {
  const [filteredPersonnal, setFilteredPersonnal] = useState<Personnel[]>([]);
  const [selectValue, setSelectValue] = useState<string>("all");
  const [searchBarValue, setSearchBarValue] = useState<string | null>(null);
  const debouncedSearchValue = useDebounce(searchBarValue || "", 200);

  const personnel: Personnel[] = useSelector(
    (state: RootState) => state.personnel.items
  );

  useEffect(() => {
    let newPersonnal: Personnel[] = JSON.parse(JSON.stringify(personnel));
    if (selectValue && selectValue !== "all") {
      newPersonnal = newPersonnal.filter(
        (el: Personnel) => el.MovingStatus === selectValue
      );
    }

    if (debouncedSearchValue) {
      const term = debouncedSearchValue.trim().toUpperCase();
      newPersonnal = newPersonnal.filter((el: Personnel) =>
        el.FullName.toUpperCase().includes(term)
      );
    }
    setFilteredPersonnal(newPersonnal);
  }, [personnel, selectValue, debouncedSearchValue]);

  return (
    <>
      <div className="static-section">
        <CloseOutlined id="close-panel-icon" onClick={onClose} />
        <div className="main-header">
          <UserOutlined id="user-icon" /> Evacuation
        </div>

        <HeadCountCard personnel={personnel} />
        <TimeCard />

        <FiltersBar
          personnel={personnel}
          selectValue={selectValue}
          setSelectValue={setSelectValue}
          searchBarValue={searchBarValue}
          setSearchBarValue={setSearchBarValue}
        />
      </div>

      <div className="user-list-section">
        {filteredPersonnal.map((personnal, index) => (
          <UserCard key={personnal.PersonID} personnal={personnal} />
        ))}
      </div>
    </>
  );
};

export default React.memo(Panel);
