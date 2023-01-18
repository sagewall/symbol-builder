import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import PictureFillSymbolPage from "./pages/PictureFillSymbolPage";
import IndexPage from "./pages";
import { setAssetPath } from "@esri/calcite-components/dist/components";
import "@esri/calcite-components/dist/calcite/calcite.css";
import "@arcgis/core/assets/esri/themes/dark/main.css";
import PictureMarkerSymbolPage from "./pages/PictureMarkerSymbolPage";
import PointSymbol3DPage from "./pages/PointSymbol3DPage";
import SimpleFillSymbolPage from "./pages/SimpleFillSymbolPage";
import SimpleLineSymbolPage from "./pages/SimpleLineSymbolPage";
import SimpleMarkerSymbolPage from "./pages/SimpleMarkerSymbolPage";
import TextSymbolPage from "./pages/TextSymbolPage";

setAssetPath("https://js.arcgis.com/calcite-components/1.0.0-beta.99/assets");

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <IndexPage></IndexPage>,
      },
      {
        path: "picture-fill-symbol",
        element: <PictureFillSymbolPage />,
      },
      {
        path: "picture-marker-symbol",
        element: <PictureMarkerSymbolPage />,
      },
      {
        path: "point-symbol-3d",
        element: <PointSymbol3DPage />,
      },
      {
        path: "simple-fill-symbol",
        element: <SimpleFillSymbolPage />,
      },
      {
        path: "simple-line-symbol",
        element: <SimpleLineSymbolPage />,
      },
      {
        path: "simple-marker-symbol",
        element: <SimpleMarkerSymbolPage />,
      },
      {
        path: "text-symbol",
        element: <TextSymbolPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);