import "@arcgis/core/assets/esri/themes/light/main.css";
import Collection from "@arcgis/core/core/Collection";
import Graphic from "@arcgis/core/Graphic";
import Layer from "@arcgis/core/layers/Layer";
import ArcMapView from "@arcgis/core/views/MapView";
import React, { useEffect, useRef, useState } from "react";

const viewStyles = {
  height: "100%",
  width: "100%",
};

interface MapViewProps {
  graphics?: Collection<Graphic>;
  layers?: Collection<Layer>;
}

const MapView = ({ graphics, layers }: MapViewProps) => {
  const viewDivRef = useRef(document.createElement("div"));

  const [view, setView] = useState<ArcMapView | null>(null);

  useEffect(() => {
    if (viewDivRef.current) {
      const loadMapView = async () => {
        const { createMapView } = await import("./lib/mapview");
        setView(
          await createMapView(
            viewDivRef.current as HTMLDivElement,
            graphics,
            layers
          )
        );
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
            if (error.name != "view:goto-interrupted") {
              console.error(error);
            }
          });
        }
      };

      const loadLayers = async () => {
        if (layers) {
          view.map.layers = layers;
          await view.when();
          if (!graphics) {
            view.goTo(layers).catch((error) => {
              if (error.name != "view:goto-interrupted") {
                console.error(error);
              }
            });
          }
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
};

export default MapView;
