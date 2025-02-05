import "@arcgis/map-components/components/arcgis-map";
import "@arcgis/map-components/components/arcgis-placement";
import "@arcgis/map-components/components/arcgis-scene";
import "@esri/calcite-components/components/calcite-action";
import "@esri/calcite-components/components/calcite-alert";
import "@esri/calcite-components/components/calcite-block";
import "@esri/calcite-components/components/calcite-button";
import "@esri/calcite-components/components/calcite-card";
import "@esri/calcite-components/components/calcite-card-group";
import "@esri/calcite-components/components/calcite-chip";
import "@esri/calcite-components/components/calcite-input";
import "@esri/calcite-components/components/calcite-input-number";
import "@esri/calcite-components/components/calcite-input-text";
import "@esri/calcite-components/components/calcite-label";
import "@esri/calcite-components/components/calcite-list";
import "@esri/calcite-components/components/calcite-list-item";
import "@esri/calcite-components/components/calcite-navigation";
import "@esri/calcite-components/components/calcite-option";
import "@esri/calcite-components/components/calcite-panel";
import "@esri/calcite-components/components/calcite-select";
import "@esri/calcite-components/components/calcite-shell";
import "@esri/calcite-components/components/calcite-shell-panel";
import "@esri/calcite-components/components/calcite-slider";
import "@esri/calcite-components/components/calcite-switch";
import "@esri/calcite-components/components/calcite-tab";
import "@esri/calcite-components/components/calcite-tab-nav";
import "@esri/calcite-components/components/calcite-tab-title";
import "@esri/calcite-components/components/calcite-tabs";
import "@esri/calcite-components/components/calcite-tooltip";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import "./index.css";
import IndexPage from "./pages";
import CIMSymbolPage from "./pages/cim-symbol";
import LineSymbol3DPage from "./pages/line-symbol-3d";
import MeshSymbol3DPage from "./pages/mesh-symbol-3d";
import PictureFillSymbolPage from "./pages/picture-fill-symbol";
import PictureMarkerSymbolPage from "./pages/picture-marker-symbol";
import PointSymbol3DPage from "./pages/point-symbol-3d";
import PolygonSymbol3DPage from "./pages/polygon-symbol-3d";
import SimpleFillSymbolPage from "./pages/simple-fill-symbol";
import SimpleLineSymbolPage from "./pages/simple-line-symbol";
import SimpleMarkerSymbolPage from "./pages/simple-marker-symbol";
import TextSymbolPage from "./pages/text-symbol";
import WebStyleSymbolPage from "./pages/web-style-symbol";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App></App>,
      children: [
        {
          path: "/",
          element: <IndexPage></IndexPage>
        },
        {
          path: "cim-symbol",
          element: <CIMSymbolPage></CIMSymbolPage>
        },
        {
          path: "line-symbol-3d",
          element: <LineSymbol3DPage></LineSymbol3DPage>
        },
        {
          path: "mesh-symbol-3d",
          element: <MeshSymbol3DPage></MeshSymbol3DPage>
        },
        {
          path: "picture-fill-symbol",
          element: <PictureFillSymbolPage></PictureFillSymbolPage>
        },
        {
          path: "picture-marker-symbol",
          element: <PictureMarkerSymbolPage></PictureMarkerSymbolPage>
        },
        {
          path: "point-symbol-3d",
          element: <PointSymbol3DPage></PointSymbol3DPage>
        },
        {
          path: "polygon-symbol-3d",
          element: <PolygonSymbol3DPage></PolygonSymbol3DPage>
        },
        {
          path: "simple-fill-symbol",
          element: <SimpleFillSymbolPage></SimpleFillSymbolPage>
        },
        {
          path: "simple-line-symbol",
          element: <SimpleLineSymbolPage></SimpleLineSymbolPage>
        },
        {
          path: "simple-marker-symbol",
          element: <SimpleMarkerSymbolPage></SimpleMarkerSymbolPage>
        },
        {
          path: "text-symbol",
          element: <TextSymbolPage></TextSymbolPage>
        },
        {
          path: "web-style-symbol",
          element: <WebStyleSymbolPage></WebStyleSymbolPage>
        }
      ]
    }
  ],
  { basename: import.meta.env.VITE_BASE_NAME }
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
