import Collection from "@arcgis/core/core/Collection";
import Graphic from "@arcgis/core/Graphic";
import ArcMapView from "@arcgis/core/views/MapView";
import { useEffect, useRef, useState } from "react";
import createMapView from "../lib/mapview";
import "./MapView.css";

interface MapViewProps {
  graphics: Collection<Graphic>;
}

const MapView = ({ graphics }: MapViewProps) => {
  const viewDivRef = useRef(document.createElement("div"));

  const [view, setView] = useState<ArcMapView | null>(null);

  useEffect(() => {
    if (viewDivRef.current) {
      setView(createMapView(viewDivRef.current as HTMLDivElement, graphics));
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

export default MapView;
