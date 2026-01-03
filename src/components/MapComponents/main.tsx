import React, { useEffect, useRef, useState } from "react";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import "@arcgis/core/assets/esri/themes/dark/main.css";
import Header from "./HeaderComponents/main";
import type MapViewType from "@arcgis/core/views/MapView";
import Graphic from "@arcgis/core/Graphic";

const MapComponent = () => {
  const mapDivRef = useRef<any>(null);
  const [view, setView] = useState<MapViewType | null>(null);
  const [hoverData, setHoverData] = useState<{
    x: number;
    y: number;
    text: string;
  } | null>(null);

  useEffect(() => {
    if (!mapDivRef.current) return;

    const map = new Map({
      basemap: "dark-gray",
    });

    const mapView = new MapView({
      container: mapDivRef.current,
      map,
      center: [54.37, 24.47],
      zoom: 10,
      ui: { components: ["zoom"] },
    });

    mapView.ui.move("zoom", "bottom-right");
    mapDivRef.current = mapView;

    mapView.when(() => {
      setView(mapView);
      mapView.on("pointer-move", (event) => {
        mapView.hitTest(event).then((response) => {
          // Check if we hit a graphic
          if (response.results?.length) {
            const graphic: any = response.results.find(
              (result) =>
                result.type === "graphic" &&
                result.layer?.title === "safety Assets"
            );

            if (graphic) {
              setHoverData({
                x: event.x,
                y: event.y,
                text: graphic.graphic.attributes.Name,
              });
            } else {
              setHoverData(null);
            }
          }
        });
      });
    });

    return () => {
      mapView.destroy();
      mapDivRef.current = null;
    };
  }, []);

  return (
    <>
      <div
        ref={mapDivRef}
        style={{
          width: "calc(100vw - 60px)",
          height: "100vh",
          margin: 0,
          padding: 0,
        }}
      />
      <Header view={view} />
      {hoverData && (
        <div
          className="assets-tooltip"
          style={{
            left: hoverData.x + 15, // Offset from cursor
            top: hoverData.y - 25,
          }}
        >
          <span>{hoverData.text}</span>
        </div>
      )}
    </>
  );
};

export default React.memo(MapComponent);
