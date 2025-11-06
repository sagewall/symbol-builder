import type Graphic from "@arcgis/core/Graphic";
import type Collection from "@arcgis/core/core/Collection";
import Point from "@arcgis/core/geometry/Point";
import type { ArcgisMapCustomEvent } from "@arcgis/map-components";
import "@arcgis/map-components/components/arcgis-map";
import "@esri/calcite-components/components/calcite-action";
import { useRef } from "react";

interface MapProps {
  graphics?: Collection<Graphic>;
}

function Map({ graphics }: MapProps) {
  const viewElement = useRef<HTMLArcgisMapElement>(null);

  const handleArcgisViewReadyChange = (event: ArcgisMapCustomEvent<void>) => {
    event.target.center = new Point({
      longitude: -117.1957098,
      latitude: 34.0564505,
    });
    event.target.zoom = 18;
  };

  return (
    <>
      <arcgis-map
        basemap="gray-vector"
        graphics={graphics}
        onarcgisViewReadyChange={(event) => {
          handleArcgisViewReadyChange(event);
        }}
        ref={viewElement}
      >
        <calcite-action
          icon="zoom-to-object"
          scale="s"
          slot="top-right"
          text="Zoom to Graphics"
          text-enabled
          onClick={() => {
            viewElement.current?.goTo(viewElement.current.graphics);
          }}
        ></calcite-action>
      </arcgis-map>
    </>
  );
}

export default Map;
