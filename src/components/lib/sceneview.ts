import Basemap from "@arcgis/core/Basemap";
import type Graphic from "@arcgis/core/Graphic";
import ArcMap from "@arcgis/core/Map";
import Viewpoint from "@arcgis/core/Viewpoint";
import type Collection from "@arcgis/core/core/Collection";
import VectorTileLayer from "@arcgis/core/layers/VectorTileLayer";
import ArcSceneView from "@arcgis/core/views/SceneView";
import BasemapGallery from "@arcgis/core/widgets/BasemapGallery";
import LocalBasemapsSource from "@arcgis/core/widgets/BasemapGallery/support/LocalBasemapsSource";
import Expand from "@arcgis/core/widgets/Expand";
import { targetGeometry } from "./geometry";

const blankBasemapVectorTileLayer = new VectorTileLayer({
  portalItem: {
    id: "da7c2aa6b22a439fae31294413b5bc62"
  }
});

const blankBasemap = new Basemap({
  baseLayers: [blankBasemapVectorTileLayer],
  thumbnailUrl:
    "https://jsapi.maps.arcgis.com/sharing/rest/content/items/da7c2aa6b22a439fae31294413b5bc62/info/thumbnail/thumbnail1660688993675.png",
  title: "Blank"
});

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

const localBasemapsSource = new LocalBasemapsSource({
  basemaps: [
    blankBasemap,
    Basemap.fromId("satellite"),
    Basemap.fromId("hybrid"),
    Basemap.fromId("dark-gray-vector"),
    Basemap.fromId("gray-vector"),
    Basemap.fromId("streets-vector"),
    Basemap.fromId("streets-night-vector"),
    Basemap.fromId("streets-navigation-vector"),
    Basemap.fromId("topo-vector"),
    Basemap.fromId("streets-relief-vector")
  ]
});

const basemapGallery = new BasemapGallery({
  view,
  source: localBasemapsSource
});

const basemapGalleryExpand = new Expand({
  view,
  content: basemapGallery
});

view.ui.add(basemapGalleryExpand, {
  position: "top-left"
});

export const createSceneView = async (parentElement: HTMLDivElement, graphics?: Collection<Graphic>) => {
  view.container = parentElement;
  view.viewpoint = viewpoint;
  view.graphics = graphics as Collection<Graphic>;
  return view;
};
