import Collection from "@arcgis/core/core/Collection";
import Graphic from "@arcgis/core/Graphic";
import ArcSceneView from "@arcgis/core/views/SceneView";
import { useEffect, useRef, useState } from "react";

import "./MapView.css";

interface SceneViewProps {
  graphics: Collection<Graphic>;
}

const SceneView = ({ graphics }: SceneViewProps) => {
  const viewDivRef = useRef(document.createElement("div"));

  const [view, setView] = useState<ArcSceneView | null>(null);

  useEffect(() => {
    if (viewDivRef.current) {
      const loadSceneView = async () => {
        const { createSceneView } = await import("../lib/sceneview");
        setView(
          await createSceneView(viewDivRef.current as HTMLDivElement, graphics)
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
        const { goToGraphics } = await import("../lib/sceneview");
        view.graphics = graphics;
        goToGraphics();
      };
      loadGraphics();
    }
  }, [view, graphics]);

  return <div className="viewDiv" ref={viewDivRef}></div>;
};

export default SceneView;
