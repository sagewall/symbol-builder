import type Graphic from "@arcgis/core/Graphic";
import type Collection from "@arcgis/core/core/Collection";
import Point from "@arcgis/core/geometry/Point";
import type { ArcgisMapCustomEvent } from "@arcgis/map-components";
import { ArcgisMap, ArcgisPlacement } from "@arcgis/map-components-react";
import { CalciteAction } from "@esri/calcite-components-react";
import React, { useEffect, useRef, useState } from "react";

const viewStyles = {
  height: "100%",
  width: "100%"
};

interface MapViewProps {
  graphics?: Collection<Graphic>;
}

const MapView = ({ graphics }: MapViewProps) => {
  const [mounted, setMounted] = useState(true);

  const arcgisMap = useRef<HTMLArcgisMapElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleArcgisViewReadyChange = (event: ArcgisMapCustomEvent<void>) => {
    event.target.center = new Point({ longitude: -117.1957098, latitude: 34.0564505 });
    event.target.zoom = 18;
  };

  return (
    <React.Fragment>
      {mounted && (
        <ArcgisMap
          basemap="gray-vector"
          graphics={graphics}
          onArcgisViewReadyChange={(event) => {
            handleArcgisViewReadyChange(event);
          }}
          ref={arcgisMap}
          style={viewStyles}
        >
          <ArcgisPlacement position="top-right">
            <CalciteAction
              icon="zoom-to-object"
              scale="s"
              text="Zoom to Graphics"
              textEnabled
              onClick={() => {
                arcgisMap.current?.goTo(arcgisMap.current.graphics);
              }}
            ></CalciteAction>
          </ArcgisPlacement>
        </ArcgisMap>
      )}
    </React.Fragment>
  );
};

export default MapView;
