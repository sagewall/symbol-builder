import "@arcgis/core/assets/esri/themes/light/main.css";
import Collection from "@arcgis/core/core/Collection";
import Graphic from "@arcgis/core/Graphic";
import Layer from "@arcgis/core/layers/Layer";
import ArcMapView from "@arcgis/core/views/MapView";
import React, { useEffect, useRef, useState } from "react";

const viewStyles = {
  height: "100%",
  width: "100%"
};

interface MapViewProps {
  graphics?: Collection<Graphic>;
  layers?: Collection<Layer>;
}

const MapView = ({ graphics, layers }: MapViewProps) => {
  if (typeof window !== "undefined") {
    const viewDivRef = useRef(document.createElement("div"));

    const [view, setView] = useState<ArcMapView | null>(null);

    useEffect(() => {
      if (viewDivRef.current) {
        const loadMapView = async () => {
          const { createMapView } = await import("./lib/mapview");
          setView(await createMapView(viewDivRef.current as HTMLDivElement, graphics, layers));
        };
        loadMapView();

        return () => {
          view && view.destroy();
        };
      }
    }, []);

    useEffect(() => {
      if (view) {
        const loadGraphics = async () => {
          if (graphics) {
            view.graphics = graphics;
          }
        };

        const loadLayers = async () => {
          if (layers) {
            view.map.layers = layers;
          }
        };

        loadGraphics();
        loadLayers();
      }
    }, [view, graphics, layers]);

    return (
      <React.Fragment>
        <div style={viewStyles} ref={viewDivRef}></div>
      </React.Fragment>
    );
  } else {
    return <React.Fragment />;
  }
};

export default MapView;
