import type Graphic from "@arcgis/core/Graphic";
import ArcMap from "@arcgis/core/Map";
import Viewpoint from "@arcgis/core/Viewpoint";
import type Collection from "@arcgis/core/core/Collection";
import ArcMapView from "@arcgis/core/views/MapView";
import { targetGeometry } from "./geometry";

const map = new ArcMap({
  basemap: "gray-vector"
});

const viewpoint = new Viewpoint({
  targetGeometry: targetGeometry.extent.expand(2)
});

const view = new ArcMapView({
  map,
  viewpoint
});

export const createMapView = async (parentElement: HTMLDivElement, graphics?: Collection<Graphic>) => {
  view.container = parentElement;
  view.graphics = graphics as Collection<Graphic>;
  return view;
};
