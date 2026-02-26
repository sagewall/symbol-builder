import type Graphic from "@arcgis/core/Graphic.js";
import type Collection from "@arcgis/core/core/Collection.js";
import Point from "@arcgis/core/geometry/Point.js";
import "@arcgis/map-components/components/arcgis-scene";
import "@esri/calcite-components/components/calcite-button";
import { useRef } from "react";

interface SceneViewProps {
  graphics?: Collection<Graphic>;
}

function Scene({ graphics }: SceneViewProps): React.ReactElement {
  const viewElement = useRef<HTMLArcgisSceneElement>(null);

  const handleArcgisViewReadyChange = (event: CustomEvent<void>): void => {
    (event.target as HTMLArcgisSceneElement).center = new Point({
      longitude: -117.1957098,
      latitude: 34.0564505,
    });
    (event.target as HTMLArcgisSceneElement).view.zoom = 17;
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
        <calcite-button
          iconStart="zoom-to-object"
          slot="top-right"
          onClick={async () => {
            await viewElement.current?.goTo(
              viewElement.current.graphics?.toArray(),
            );
          }}
        >
          Zoom to Graphics
        </calcite-button>
      </arcgis-scene>
    </>
  );
}

export default Scene;
