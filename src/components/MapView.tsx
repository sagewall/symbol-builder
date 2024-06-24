import type Graphic from "@arcgis/core/Graphic";
import type Collection from "@arcgis/core/core/Collection";
import Point from "@arcgis/core/geometry/Point";
import type ArcMapView from "@arcgis/core/views/MapView";
import type { ArcgisMapCustomEvent } from "@arcgis/map-components";
import { ArcgisMap, ArcgisPlacement } from "@arcgis/map-components-react";
import { CalciteAction } from "@esri/calcite-components-react";
import React, { useEffect, useState } from "react";

const viewStyles = {
  height: "100%",
  width: "100%"
};

interface MapViewProps {
  graphics?: Collection<Graphic>;
}

const MapView = ({ graphics }: MapViewProps) => {
  const isSSR = typeof window === "undefined";

  const [view, setView] = useState<ArcMapView | null>(null);

  useEffect(() => {
    if (view) {
      const loadGraphics = async () => {
        if (graphics) {
          view.graphics = graphics;
        }
      };
      loadGraphics();
    }
  }, [view, graphics]);

  const handleArcgisViewReadyChange = (event: ArcgisMapCustomEvent<void>) => {
    const { view } = event.target;
    if (view) {
      view.center = new Point({ longitude: -117.1957098, latitude: 34.0564505 });
      view.zoom = 18;
      setView(view);
    }
  };

  return (
    <React.Fragment>
      {!isSSR && (
        <ArcgisMap
          basemap="gray-vector"
          onArcgisViewReadyChange={(event) => {
            handleArcgisViewReadyChange(event);
          }}
          style={viewStyles}
        >
          <ArcgisPlacement position="top-right">
            <CalciteAction
              icon="zoom-to-object"
              scale="s"
              text="Zoom to Graphics"
              textEnabled
              onClick={() => {
                view?.goTo(view.graphics);
              }}
            ></CalciteAction>
          </ArcgisPlacement>
        </ArcgisMap>
      )}
    </React.Fragment>
  );
};

export default MapView;
