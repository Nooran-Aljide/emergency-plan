// LayerListPanel.tsx
import React, { useEffect, useState } from "react";
import type MapViewType from "@arcgis/core/views/MapView";

type propsType = {
  view: MapViewType | null;
};

type LayerInfo = {
  id: string;
  title: string;
  visible: boolean;
};

const Layerlist = ({ view }: propsType) => {
  const [layers, setLayers] = useState<LayerInfo[]>([]);

  useEffect(() => {
    if (!view) return;

    const mapLayers = view?.map?.layers.toArray() || [];
    const layerData: LayerInfo[] = mapLayers.map((layer) => ({
      id: layer.id,
      title: layer.title || layer.id,
      visible: layer.visible,
    }));

    setLayers(layerData);
  }, [view]);

  const toggleVisibility = (id: string) => {
    const layer = view?.map?.layers.find((l) => l.id === id);
    if (layer) {
      layer.visible = !layer.visible;
      setLayers((prev) =>
        prev.map((l) => (l.id === id ? { ...l, visible: !l.visible } : l))
      );
    }
  };

  return (
    <div className="layer-list-panel">
      <h3>Layers</h3>
      <ul>
        {layers.length > 0 ? (
          layers.map((layer) => (
            <li key={layer.title || layer.id}>
              <label>
                <input
                  type="checkbox"
                  checked={layer.visible}
                  onChange={() => toggleVisibility(layer.id)}
                />
                {layer.title}
              </label>
            </li>
          ))
        ) : (
          <div className="no-layers-msg">No available Layers on the map</div>
        )}
      </ul>
    </div>
  );
};

export default React.memo(Layerlist);
