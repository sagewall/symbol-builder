import Basemap from "@arcgis/core/Basemap";
import Collection from "@arcgis/core/core/Collection";
import Graphic from "@arcgis/core/Graphic";
import Layer from "@arcgis/core/layers/Layer";
import VectorTileLayer from "@arcgis/core/layers/VectorTileLayer";
import ArcMap from "@arcgis/core/Map";
import ArcMapView from "@arcgis/core/views/MapView";
import BasemapGallery from "@arcgis/core/widgets/BasemapGallery";
import LocalBasemapsSource from "@arcgis/core/widgets/BasemapGallery/support/LocalBasemapsSource";
import Expand from "@arcgis/core/widgets/Expand";

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
  basemap: blankBasemap
});

const view = new ArcMapView({
  map
});

const localBasemapsSource = new LocalBasemapsSource({
  basemaps: [
    blankBasemap,
    Basemap.fromId("satellite"),
    Basemap.fromId("hybrid"),
    Basemap.fromId("oceans"),
    Basemap.fromId("osm"),
    Basemap.fromId("terrain"),
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

export const createMapView = async (
  parentElement: HTMLDivElement,
  graphics?: Collection<Graphic>,
  layers?: Collection<Layer>
) => {
  view.container = parentElement;
  view.graphics = graphics as Collection<Graphic>;
  map.layers = layers as Collection<Layer>;
  return view;
};
