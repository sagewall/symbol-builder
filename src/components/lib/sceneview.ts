import type Graphic from "@arcgis/core/Graphic";
import ArcMap from "@arcgis/core/Map";
import Viewpoint from "@arcgis/core/Viewpoint";
import type Collection from "@arcgis/core/core/Collection";
import ArcSceneView from "@arcgis/core/views/SceneView";
import { targetGeometry } from "./geometry";

const map = new ArcMap({
  basemap: "gray-vector"
});

const viewpoint = new Viewpoint({
  targetGeometry: targetGeometry.extent.expand(2)
});

const view = new ArcSceneView({
  map,
  viewpoint
});

const zoomToGraphicsAction = document.createElement("calcite-action");
zoomToGraphicsAction.icon = "zoom-to-object";
zoomToGraphicsAction.text = "Zoom to Graphics";
zoomToGraphicsAction.textEnabled = true;
zoomToGraphicsAction.scale = "s";
zoomToGraphicsAction.addEventListener("click", () => {
  view.goTo(view.graphics);
});
view.ui.add(zoomToGraphicsAction, "top-right");

export const createSceneView = async (parentElement: HTMLDivElement, graphics?: Collection<Graphic>) => {
  view.container = parentElement;
  view.viewpoint = viewpoint;
  view.graphics = graphics as Collection<Graphic>;
  return view;
};
