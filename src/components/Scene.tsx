import type Graphic from "@arcgis/core/Graphic";
import type Collection from "@arcgis/core/core/Collection";
import Point from "@arcgis/core/geometry/Point";
import type { ArcgisSceneCustomEvent } from "@arcgis/map-components";
import React, { useRef } from "react";

interface SceneViewProps {
  graphics?: Collection<Graphic>;
}

const Scene = ({ graphics }: SceneViewProps) => {
  const viewElement = useRef<HTMLArcgisSceneElement>(null);

  const handleArcgisViewReadyChange = (event: ArcgisSceneCustomEvent<void>) => {
    event.target.center = new Point({ longitude: -117.1957098, latitude: 34.0564505 });
    event.target.view.zoom = 17;
  };

  return (
    <React.Fragment>
      <arcgis-scene
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
      </arcgis-scene>
    </React.Fragment>
  );
};

export default Scene;
