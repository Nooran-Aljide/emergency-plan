import "./styles.scss";
import { useState } from "react";
import Toolbar from "./Toolbar";
import Panel from "./PanelComponents/Panel";
import { motion } from "framer-motion";

export default function ToolBar() {
  const [activeTool, setActiveTool] = useState<string | null>(null);
  return (
    <div className="toolbar-container">
      <Toolbar onSelect={setActiveTool} />
      {activeTool != null && (
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: !!activeTool ? 0 : "-100%" }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="panel"
        >
          <Panel onClose={() => setActiveTool(null)} />
        </motion.div>
      )}
    </div>
  );
}
