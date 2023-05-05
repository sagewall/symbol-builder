import Graphic from "@arcgis/core/Graphic";
import "@arcgis/core/assets/esri/themes/light/main.css";
import Collection from "@arcgis/core/core/Collection";
import ArcSceneView from "@arcgis/core/views/SceneView";
import React, { createElement, useEffect, useRef, useState } from "react";

const viewStyles = {
  height: "100%",
  width: "100%"
};

interface SceneViewProps {
  graphics?: Collection<Graphic>;
}

const SceneView = ({ graphics }: SceneViewProps) => {
  const isSSR = typeof window === "undefined";

  const viewDivRef = useRef(createElement("div") as unknown as HTMLDivElement);

  const [view, setView] = useState<ArcSceneView | null>(null);

  useEffect(() => {
    if (viewDivRef.current) {
      const loadSceneView = async () => {
        const { createSceneView } = await import("./lib/sceneview");
        setView(await createSceneView(viewDivRef.current as HTMLDivElement, graphics));
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
            if (error.name !== "AbortError") {
              console.error(error);
            }
          });
        }
      };
      loadGraphics();
    }
  }, [view, graphics]);

  return (
    <React.Fragment>{!isSSR && <div style={viewStyles} ref={viewDivRef}></div>}</React.Fragment>
  );
};

export default SceneView;
