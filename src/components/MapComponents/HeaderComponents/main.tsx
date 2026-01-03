import React, { Activity, useEffect, useState } from "react";
import {
  AppstoreOutlined,
  FireOutlined,
  SearchOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import "./styles.scss";
import type MapViewType from "@arcgis/core/views/MapView";
import Layerlist from "./Layerlist";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../Redux/store";
import { setEvacuationZones } from "../../../Redux/Slices/evacuationZonesSlice";
import { setPersonnel } from "../../../Redux/Slices/personnelSlice";
import { setSafetyAssets } from "../../../Redux/Slices/safetyAssetsSlice";
import EmergencyDropdown from "./EmergencyDropdown";
type propsType = {
  view: MapViewType | null;
};

const Header = ({ view }: propsType) => {
  const [layerListActive, setLayerListActive] = useState<Boolean>(false);

  const activeEmergency = useSelector(
    (state: RootState) => state.emergencies.activeEmergency
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (activeEmergency != null && view != null) {
      const loadData = async () => {
        const module = await import("./utils");
        let { evacuationZone, personnel, safetyAsset } =
          await module.loadEmergencyData(view, activeEmergency);

        if (evacuationZone?.length) {
          dispatch(setEvacuationZones(evacuationZone));
        }
        if (personnel?.length) {
          dispatch(setPersonnel(personnel));
        }
        if (safetyAsset?.length) {
          dispatch(setSafetyAssets(safetyAsset));
        }
        module.addDataToMap(view, evacuationZone, personnel, safetyAsset);
      };

      loadData();
    }
  }, [activeEmergency, view]);

  return (
    <div className="header-bar">
      <div className="header-left">
        <span className="header-title">Emergency Broadcast</span>
        <div className="nav-splitter" />
        <div className="header-select">
          <label>
            <span>Refining:</span>
            <select>
              <option>RR1</option> <option>RR2</option> <option>RR3</option>
            </select>
          </label>
        </div>
        <div className="nav-splitter" />
        <EmergencyDropdown />
      </div>
      <div className="header-right">
        <FireOutlined className="header-icon disabled" />
        <ShareAltOutlined className="header-icon disabled" />
        <div className="header-search">
          <SearchOutlined /> <input type="text" placeholder="Search..." />
        </div>
        <AppstoreOutlined
          className={`header-icon ${layerListActive ? "active" : ""}`}
          onClick={() => {
            setLayerListActive((prev) => !prev);
          }}
        />
        {
          <Activity mode={layerListActive ? "visible" : "hidden"}>
            <Layerlist view={view} />
          </Activity>
        }
      </div>
    </div>
  );
};

export default React.memo(Header);
