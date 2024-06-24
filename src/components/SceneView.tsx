import type Graphic from "@arcgis/core/Graphic";
import type Collection from "@arcgis/core/core/Collection";
import Point from "@arcgis/core/geometry/Point";
import type ArcSceneView from "@arcgis/core/views/SceneView";
import type { ArcgisSceneCustomEvent } from "@arcgis/map-components";
import { ArcgisPlacement, ArcgisScene } from "@arcgis/map-components-react";
import { CalciteAction } from "@esri/calcite-components-react";
import React, { useEffect, useState } from "react";

const viewStyles = {
  height: "100%",
  width: "100%"
};

interface SceneViewProps {
  graphics?: Collection<Graphic>;
}

const SceneView = ({ graphics }: SceneViewProps) => {
  const isSSR = typeof window === "undefined";

  const [view, setView] = useState<ArcSceneView | null>(null);

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

  const handleArcgisViewReadyChange = (event: ArcgisSceneCustomEvent<void>) => {
    const { view } = event.target;
    if (view) {
      view.center = new Point({ longitude: -117.1957098, latitude: 34.0564505 });
      view.scale = 2257;
      setView(view);
    }
  };

  return (
    <React.Fragment>
      {!isSSR && (
        <ArcgisScene
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
        </ArcgisScene>
      )}
    </React.Fragment>
  );
};

export default SceneView;
