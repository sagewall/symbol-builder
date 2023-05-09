import type Graphic from "@arcgis/core/Graphic";
import "@arcgis/core/assets/esri/themes/light/main.css";
import type Collection from "@arcgis/core/core/Collection";
import type ArcMapView from "@arcgis/core/views/MapView";
import React, { createElement, useEffect, useRef, useState } from "react";

const viewStyles = {
  height: "100%",
  width: "100%"
};

interface MapViewProps {
  graphics?: Collection<Graphic>;
}

const MapView = ({ graphics }: MapViewProps) => {
  const isSSR = typeof window === "undefined";

  const viewDivRef = useRef(createElement("div") as unknown as HTMLDivElement);

  const [view, setView] = useState<ArcMapView | null>(null);

  useEffect(() => {
    if (viewDivRef.current) {
      const loadMapView = async () => {
        const { createMapView } = await import("./lib/mapview");
        setView(await createMapView(viewDivRef.current as HTMLDivElement, graphics));
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
          await view.when();
          view.goTo(graphics).catch((error) => {
            if (error.name !== "AbortError") {
              console.error(error);
            }
          });
        }
      };
      loadGraphics();
    }
  }, [view, graphics]);

  return (
    <React.Fragment>{!isSSR && <div style={viewStyles} ref={viewDivRef}></div>}</React.Fragment>
  );
};

export default MapView;
