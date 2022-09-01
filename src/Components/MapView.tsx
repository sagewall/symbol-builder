import Collection from "@arcgis/core/core/Collection";
import Graphic from "@arcgis/core/Graphic";
import ArcMapView from "@arcgis/core/views/MapView";
import { useEffect, useRef, useState } from "react";
import { goToGraphics } from "../lib/mapview";
import "./MapView.css";

interface MapViewProps {
  graphics: Collection<Graphic>;
}

const MapView = ({ graphics }: MapViewProps) => {
  const viewDivRef = useRef(document.createElement("div"));

  const [view, setView] = useState<ArcMapView | null>(null);

  useEffect(() => {
    if (viewDivRef.current) {
      const loadMapView = async () => {
        const { createMapView } = await import("../lib/mapview");
        setView(
          await createMapView(viewDivRef.current as HTMLDivElement, graphics)
        );
      };
      loadMapView();

      return () => {
        view && view.destroy();
      };
    }
  }, []);

  useEffect(() => {
    if (view) {
      const loadGraphics = async () => {
        const { goToGraphics } = await import("../lib/mapview");
        view.graphics = graphics;
        goToGraphics();
      };
      loadGraphics();
    }
  }, [view, graphics]);

  return <div className="viewDiv" ref={viewDivRef}></div>;
};

export default MapView;
