import React, { useEffect, useState } from "react";
import { Personnel } from "../../../types/appDataTypes";

type propsType = {
  personnel: Personnel[];
};
const HeadCountCard = ({ personnel }: propsType) => {
  const [evacuatedCount, setEvacuatedCount] = useState<number>(0);

  useEffect(() => {
    setEvacuatedCount(
      personnel.filter((el: Personnel) => el.Status === 1).length
    );
  }, [personnel]);

  return (
    <div className="card headcount-card">
      <p className="label">Total Headcount</p>
      <h1 className="count">{personnel.length}</h1>
      <div className="custom-progress-container">
        <div className="evacuated-part" style={{ width: `${50}%` }} />
        <div className="not-evacuated-part" />
      </div>
      <div className="stats-table">
        <div className="stat-row">
          <div className="label-group">
            <div className="ring green"></div>
            <span>Evacuated</span>
          </div>
          <span className="number">{evacuatedCount}</span>
          <span className="percent">
            {((evacuatedCount / (personnel.length || 1)) * 100).toFixed(1)}%
          </span>
        </div>

        <div className="stat-row">
          <div className="label-group">
            <div className="ring red"></div>
            <span>Not - Evacuated</span>
          </div>
          <span className="number">
            {personnel.length > 0 ? personnel.length - evacuatedCount : 0}
          </span>
          <span className="percent">
            {(
              ((personnel.length > 0 ? personnel.length - evacuatedCount : 0) /
                (personnel.length || 1)) *
              100
            ).toFixed(1)}
            %
          </span>
        </div>
      </div>
    </div>
  );
};

export default React.memo(HeadCountCard);
