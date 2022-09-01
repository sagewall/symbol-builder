import Collection from "@arcgis/core/core/Collection";
import Graphic from "@arcgis/core/Graphic";
import ArcSceneView from "@arcgis/core/views/SceneView";
import { useEffect, useRef, useState } from "react";
import createSceneView from "../lib/sceneview";
import "./MapView.css";

interface SceneViewProps {
  graphics: Collection<Graphic>;
}

const SceneView = ({ graphics }: SceneViewProps) => {
  const viewDivRef = useRef(document.createElement("div"));

  const [view, setView] = useState<ArcSceneView | null>(null);

  useEffect(() => {
    if (viewDivRef.current) {
      setView(createSceneView(viewDivRef.current as HTMLDivElement, graphics));
      return () => {
        view && view.destroy();
      };
    }
  }, []);

  useEffect(() => {
    if (view) {
      view.graphics = graphics;
    }
  }, [view, graphics]);

  return <div className="viewDiv" ref={viewDivRef}></div>;
};

export default SceneView;
