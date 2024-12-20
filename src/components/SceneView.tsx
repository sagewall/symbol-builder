import type Graphic from "@arcgis/core/Graphic";
import type Collection from "@arcgis/core/core/Collection";
import Point from "@arcgis/core/geometry/Point";
import type { ArcgisSceneCustomEvent } from "@arcgis/map-components";
import { ArcgisPlacement, ArcgisScene } from "@arcgis/map-components-react";
import { CalciteAction } from "@esri/calcite-components-react";
import React, { useEffect, useRef, useState } from "react";

const viewStyles = {
  height: "100%",
  width: "100%"
};

interface SceneViewProps {
  graphics?: Collection<Graphic>;
}

const SceneView = ({ graphics }: SceneViewProps) => {
  const [mounted, setMounted] = useState(true);

  const arcgisScene = useRef<HTMLArcgisSceneElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleArcgisViewReadyChange = (event: ArcgisSceneCustomEvent<void>) => {
    event.target.center = new Point({ longitude: -117.1957098, latitude: 34.0564505 });
    event.target.view.zoom = 17;
  };

  return (
    <React.Fragment>
      {mounted && (
        <ArcgisScene
          basemap="gray-vector"
          graphics={graphics}
          onArcgisViewReadyChange={(event) => {
            handleArcgisViewReadyChange(event);
          }}
          ref={arcgisScene}
          style={viewStyles}
        >
          <ArcgisPlacement position="top-right">
            <CalciteAction
              icon="zoom-to-object"
              scale="s"
              text="Zoom to Graphics"
              textEnabled
              onClick={() => {
                arcgisScene.current?.goTo(arcgisScene.current.graphics);
              }}
            ></CalciteAction>
          </ArcgisPlacement>
        </ArcgisScene>
      )}
    </React.Fragment>
  );
};

export default SceneView;
