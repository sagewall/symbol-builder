import type Graphic from "@arcgis/core/Graphic";
import type Collection from "@arcgis/core/core/Collection";
import type ArcSceneView from "@arcgis/core/views/SceneView";
import React, { useEffect, useRef, useState } from "react";

const viewStyles = {
  height: "100%",
  width: "100%"
};

interface SceneViewProps {
  graphics?: Collection<Graphic>;
}

const SceneView = ({ graphics }: SceneViewProps) => {
  const viewDivRef = useRef<HTMLDivElement>(null);

  const [mounted, setMounted] = useState(true);
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
    setMounted(true);
  }, [view]);

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

  return (
    <React.Fragment>{mounted && <div style={viewStyles} ref={viewDivRef}></div>}</React.Fragment>
  );
};

export default SceneView;
