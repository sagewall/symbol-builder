import type Graphic from "@arcgis/core/Graphic";
import type Collection from "@arcgis/core/core/Collection";
import Point from "@arcgis/core/geometry/Point";
import type { ArcgisSceneCustomEvent } from "@arcgis/map-components";
import "@arcgis/map-components/components/arcgis-scene";
import "@esri/calcite-components/components/calcite-action";
import { useEffect, useRef } from "react";

interface SceneViewProps {
  graphics?: Collection<Graphic>;
}

function Scene({ graphics }: SceneViewProps) {
  const viewElement = useRef<HTMLArcgisSceneElement>(null);

  useEffect(() => {
    if (viewElement.current && graphics) {
      viewElement.current.graphics = graphics;
    }
  }, [graphics]);

  const handleArcgisViewReadyChange = (event: ArcgisSceneCustomEvent<void>) => {
    event.target.center = new Point({
      longitude: -117.1957098,
      latitude: 34.0564505,
    });
    event.target.view.zoom = 17;
  };

  return (
    <>
      <arcgis-scene
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
      </arcgis-scene>
    </>
  );
}

export default Scene;
