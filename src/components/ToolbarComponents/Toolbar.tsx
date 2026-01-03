import React from "react";
import {
  LockOutlined,
  EnvironmentOutlined,
  ExclamationCircleOutlined,
  LineChartOutlined,
  MobileOutlined,
  BarChartOutlined,
  SettingOutlined,
  SoundOutlined,
} from "@ant-design/icons";

type iconType = {
  id: string;
  icon: React.ReactNode;
  disabled?: boolean;
};

type propsType = {
  onSelect: (id: string) => void;
};

const icons: iconType[] = [
  { id: "lock", icon: <LockOutlined />, disabled: true },
  { id: "map", icon: <EnvironmentOutlined /> },
  { id: "alert", icon: <ExclamationCircleOutlined />, disabled: true },
  { id: "line", icon: <LineChartOutlined />, disabled: true },
  { id: "mobile", icon: <MobileOutlined />, disabled: true },
  { id: "bar", icon: <BarChartOutlined />, disabled: true },
  { id: "settings", icon: <SettingOutlined />, disabled: true },
];

const Toolbar = ({ onSelect }: propsType) => {
  return (
    <div className="toolbar">
      <div className="top-section">
        {icons.map((icon: iconType) => (
          <ToolbarIcon onSelect={onSelect} {...icon} />
        ))}
      </div>
      <div className="bottom-section">
        <ToolbarIcon
          onSelect={onSelect}
          id="megaphone"
          icon={<SoundOutlined />}
          disabled={true}
        />
      </div>
    </div>
  );
};

const ToolbarIcon = ({
  id,
  icon,
  disabled,
  onSelect,
}: iconType & propsType) => (
  <div
    className={`toolbar-icon ${disabled ? "disabled" : ""}`}
    key={id}
    onClick={() => onSelect(id)}
  >
    {icon}
  </div>
);

export default React.memo(Toolbar);
