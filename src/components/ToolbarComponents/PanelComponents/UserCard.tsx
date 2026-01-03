import React from "react";
import { Personnel } from "../../../types/appDataTypes";
import {
  DisconnectOutlined,
  DownOutlined,
  MessageFilled,
} from "@ant-design/icons";

const UserCard = ({ personnal }: { personnal: Personnel }) => {
  const { FullName, Role, PhotoURL, MovingStatus, Initials } = personnal;

  return (
    <div className="user-card">
      <div className="user-card-left">
        <img
          src={PhotoURL || "/assets/avatar.png"}
          alt={Initials}
          className="avatar"
        />
      </div>
      <div className="user-card-right">
        <DownOutlined className="down-arrow" />
        <div className="user-info">
          <h4>{FullName}</h4>
          <p>{Role}</p>
        </div>
        <div className="action-buttons">
          <span className={`status-badge ${MovingStatus.toLowerCase()}`}>
            {MovingStatus}
          </span>
          <div className="btn-icon">
            <MessageFilled />
          </div>
          <div className="btn-icon">
            <DisconnectOutlined />
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(UserCard);
