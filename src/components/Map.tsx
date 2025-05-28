import type Graphic from "@arcgis/core/Graphic";
import type Collection from "@arcgis/core/core/Collection";
import Point from "@arcgis/core/geometry/Point";
import type { ArcgisMapCustomEvent } from "@arcgis/map-components";
import React, { useRef } from "react";

interface MapProps {
  graphics?: Collection<Graphic>;
}

const Map = ({ graphics }: MapProps) => {
  const viewElement = useRef<HTMLArcgisMapElement>(null);

  const handleArcgisViewReadyChange = (event: ArcgisMapCustomEvent<void>) => {
    event.target.center = new Point({ longitude: -117.1957098, latitude: 34.0564505 });
    event.target.zoom = 18;
  };

  return (
    <React.Fragment>
      <arcgis-map
        basemap="gray-vector"
        graphics={graphics}
        onarcgisViewReadyChange={(event) => {
          handleArcgisViewReadyChange(event);
        }}
        ref={viewElement}
      >
        <arcgis-placement position="top-right">
          <calcite-action
            icon="zoom-to-object"
            scale="s"
            text="Zoom to Graphics"
            textEnabled
            onClick={() => {
              viewElement.current?.goTo(viewElement.current.graphics);
            }}
          ></calcite-action>
        </arcgis-placement>
      </arcgis-map>
    </React.Fragment>
  );
};

export default Map;
