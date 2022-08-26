import "@esri/calcite-components";
import "@esri/calcite-components/dist/calcite/calcite.css";
import { setAssetPath } from "@esri/calcite-components/dist/components";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

setAssetPath("https://js.arcgis.com/calcite-components/1.0.0-beta.92/assets");

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App header="Symbol Playground" footer="Beta" />
  </React.StrictMode>
);
