import "@arcgis/core/assets/esri/themes/light/main.css";
import Collection from "@arcgis/core/core/Collection";
import Graphic from "@arcgis/core/Graphic";
import Layer from "@arcgis/core/layers/Layer";
import ArcSceneView from "@arcgis/core/views/SceneView";
import React, { useEffect, useRef, useState } from "react";

const viewStyles = {
  height: "100%",
  width: "100%",
};

interface SceneViewProps {
  graphics?: Collection<Graphic>;
  layers?: Collection<Layer>;
}

const SceneView = ({ graphics, layers }: SceneViewProps) => {
  if (typeof window !== "undefined") {
    const viewDivRef = useRef(document.createElement("div"));

    const [view, setView] = useState<ArcSceneView | null>(null);

    useEffect(() => {
      if (viewDivRef.current) {
        const loadSceneView = async () => {
          const { createSceneView } = await import("./lib/sceneview");
          setView(
            await createSceneView(
              viewDivRef.current as HTMLDivElement,
              graphics,
              layers
            )
          );
        };
        loadSceneView();

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
              if (error.name != "AbortError") {
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
                if (error.name != "AbortError") {
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
  } else {
    return <React.Fragment />;
  }
};

export default SceneView;
