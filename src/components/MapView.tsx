import type Graphic from "@arcgis/core/Graphic";
import type Collection from "@arcgis/core/core/Collection";
import type ArcMapView from "@arcgis/core/views/MapView";
import React, { useEffect, useRef, useState } from "react";

const viewStyles = {
  height: "100%",
  width: "100%"
};

interface MapViewProps {
  graphics?: Collection<Graphic>;
}

const MapView = ({ graphics }: MapViewProps) => {
  const viewDivRef = useRef<HTMLDivElement>(null);

  const [mounted, setMounted] = useState(true);
  const [view, setView] = useState<ArcMapView | null>(null);

  useEffect(() => {
    if (viewDivRef.current) {
      const loadMapView = async () => {
        const { createMapView } = await import("./lib/mapview");
        setView(await createMapView(viewDivRef.current as HTMLDivElement, graphics));
      };
      loadMapView();

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

export default MapView;
