import type MapViewType from "@arcgis/core/views/MapView";
import {
  Emergency,
  EvacuationZone,
  Personnel,
  SafetyAsset,
} from "../../../types/appDataTypes";

import fetchData from "../../../API/fetchData";
import MapView from "@arcgis/core/views/MapView";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import Graphic from "@arcgis/core/Graphic";
import Polygon from "@arcgis/core/geometry/Polygon";
import Point from "@arcgis/core/geometry/Point";
import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";
import CIMSymbol from "@arcgis/core/symbols/CIMSymbol";
import PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol";

export const LAYER_IDS = {
  evacuationZone: "evacuation-zones-layer",
  personnel: "personnel-layer",
  safetyAsset: "safety-assets-layer",
};

export const loadEmergencyData = async (
  view: MapViewType | null,
  activeEmergency: Emergency
) => {
  try {
    const fetchPromises: [
      Promise<EvacuationZone[]>,
      Promise<Personnel[]>,
      Promise<SafetyAsset[]>
    ] = [
      fetchData<EvacuationZone[]>("/data/evacuationZones.json"),
      fetchData<Personnel[]>("/data/personnel.json"),
      fetchData<SafetyAsset[]>("/data/safetyAssets.json"),
    ];

    let [evacuationZone, personnel, safetyAsset] = await Promise.all(
      fetchPromises
    );

    if (evacuationZone?.length) {
      evacuationZone = evacuationZone.filter(
        (el) => el.EmergencyID === activeEmergency.EmergencyID
      );
    }

    if (personnel?.length) {
      personnel = personnel.filter(
        (el) => el.EmergencyID === activeEmergency.EmergencyID
      );
    }

    if (safetyAsset?.length) {
      safetyAsset = safetyAsset.filter(
        (el) => el.EmergencyID === activeEmergency.EmergencyID
      );
    }
    return { evacuationZone, personnel, safetyAsset };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      evacuationZone: [],
      personnel: [],
      safetyAsset: [],
    };
  }
};

export const addDataToMap = async (
  view: MapViewType | null,
  evacuationZones: EvacuationZone[],
  personnel: Personnel[],
  safetyAsset: SafetyAsset[]
) => {
  let allGraphics: Graphic[] = [];
  //evacuationZone
  const evacuationLayer = getOrCreateLayer(
    view,
    LAYER_IDS.evacuationZone,
    "Evacuation Zones"
  );
  if (evacuationLayer && evacuationZones.length) {
    evacuationLayer.removeAll();
    let graphics: Graphic[] = createEvacuationZonesGraphics(evacuationZones);
    evacuationLayer.addMany(graphics);
    allGraphics = allGraphics.concat(graphics);
  }

  //Personnel
  const personnelLayer = getOrCreateLayer(
    view,
    LAYER_IDS.personnel,
    "Employees"
  );
  if (personnelLayer && personnel.length) {
    personnelLayer.removeAll();
    let graphics: Graphic[] = createPersonnelGraphics(personnel);
    personnelLayer.addMany(graphics);
    allGraphics = allGraphics.concat(graphics);
  }

  // Safety Assets
  const assetsLayer = getOrCreateLayer(
    view,
    LAYER_IDS.safetyAsset,
    "safety Assets"
  );
  if (assetsLayer && safetyAsset.length) {
    assetsLayer.removeAll();
    let graphics: Graphic[] = createSafetyAssetsGraphics(safetyAsset);
    assetsLayer.addMany(graphics);
    allGraphics = allGraphics.concat(graphics);
  }

  view?.goTo({
    target: allGraphics,
    animate: true,
    easing: "ease-in",
  });
};

const getOrCreateLayer = (
  view: MapView | null,
  layerId: string,
  title?: string
): GraphicsLayer => {
  let layer = view?.map?.findLayerById(layerId) as GraphicsLayer;

  if (!layer) {
    layer = new GraphicsLayer({ id: layerId, title: title });
    view?.map?.add(layer);
  }

  return layer;
};

const createEvacuationZonesGraphics = (
  evacuationZones: EvacuationZone[]
): Graphic[] => {
  let graphics: Graphic[] = [];
  evacuationZones.forEach((zone: EvacuationZone) => {
    const polygon = new Polygon(zone.geometry);

    let color: number[] =
      zone.ZoneType === "Danger"
        ? [242, 102, 102]
        : zone.ZoneType === "Warning"
        ? [239, 210, 34]
        : [60, 186, 1];

    const symbol = new SimpleFillSymbol({
      color: [...color, 0.25],
      outline: {
        color: [...color, 1],
        style: "short-dash",
        width: 2,
      },
    });

    graphics.push(
      new Graphic({
        geometry: polygon,
        symbol,
      })
    );
  });

  return graphics;
};

const createPersonnelGraphics = (personnel: Personnel[]): Graphic[] => {
  let colors = {
    Evacuated: "#52a46d",
    Still: "#a48a52",
    Moving: "#e12323",
    default: "#e12323",
  };
  let graphics: Graphic[] = [];

  const lineLength = 30;
  const halfLength = lineLength / 2;

  personnel.forEach((person) => {
    const point = new Point(person.geometry);
    const finalX = `-${lineLength}px`;
    const finalY = `${lineLength}px`;

    // 1. Line
    graphics.push(
      new Graphic({
        geometry: point,
        symbol: {
          type: "simple-marker",
          style: "path",
          path: `M 0,0 L -${lineLength},-${lineLength}`,
          color: "white",
          size: `${lineLength}px`,
          xoffset: `-${halfLength}px`,
          yoffset: `${halfLength}px`,
          outline: { color: "white", width: 2 },
        },
      })
    );

    // outer dot
    graphics.push(
      new Graphic({
        geometry: point,
        symbol: {
          type: "simple-marker",
          style: "circle",
          color: "white",
          size: "8px",
          outline: { color: "white", width: 1 },
        },
      })
    );

    //inner dot
    graphics.push(
      new Graphic({
        geometry: point,
        symbol: {
          type: "simple-marker",
          style: "circle",
          color: "#44555b",
          size: "4px",
        },
      })
    );

    // picture frame
    graphics.push(
      new Graphic({
        geometry: point,
        symbol: {
          type: "simple-marker",
          size: "40px",
          color: person.PhotoURL ? [0, 0, 0, 0] : "#44555b", // Transparent if photo exists
          xoffset: finalX,
          yoffset: finalY,
          outline: {
            color: colors[person.MovingStatus] || colors.default,
            width: 3,
          },
        },
      })
    );

    if (person.PhotoURL) {
      //add picture
      graphics.push(
        new Graphic({
          geometry: point,
          symbol: {
            type: "picture-marker",
            url: person.PhotoURL,
            width: "32px",
            height: "32px",
            xoffset: finalX,
            yoffset: finalY,
          },
        })
      );
      // to mask the picture (hide edges)
      graphics.push(
        new Graphic({
          geometry: point,
          symbol: {
            type: "simple-marker",
            size: "40px",
            color: [0, 0, 0, 0],
            xoffset: finalX,
            yoffset: finalY,
            outline: {
              color: colors[person.MovingStatus] || colors.default,
              width: 3,
            },
          },
        })
      );
    } else {
      // add initial
      graphics.push(
        new Graphic({
          geometry: point,
          symbol: {
            type: "text",
            color: "white",
            text: person.Initials || "N/A",
            font: { size: 10, weight: "bold", family: "sans-serif" },
            xoffset: finalX,
            yoffset: finalY,
            verticalAlignment: "middle",
            horizontalAlignment: "center",
          },
        })
      );
    }
  });

  return graphics;
};

const createSafetyAssetsGraphics = (safetyAsset: SafetyAsset[]): Graphic[] => {
  let graphics: Graphic[] = [];
  safetyAsset.forEach((asset) => {
    const point = new Point(asset.geometry);

    let icon: string | null = null;
    switch (asset.AssetType) {
      case "assembly":
        icon = "Assembly-point.png";
        break;
      case "exit":
        icon = "Exit.png";
        break;
      case "extinguisher":
        icon = "fire-extinguisher.png";
        break;
      case "firstaid":
        icon = "First-aid-kit.png";
        break;
      case "shower":
        icon = "Emergency-Shower.png";
        break;
    }
    const symbol = new PictureMarkerSymbol({
      url: `/assets/${icon}`,
      width: "25px",
      height: "25px",
    });

    graphics.push(
      new Graphic({
        geometry: point,
        symbol,
        attributes: asset,
      })
    );
  });

  return graphics;
};
