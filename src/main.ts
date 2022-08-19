import { setAssetPath } from "@esri/calcite-components/dist/components";
import "@esri/calcite-components/dist/components/calcite-shell";
import "@esri/calcite-components/dist/components/calcite-shell-panel";
import SimpleLineSymbolPlayground from "./SimpleLineSymbolPlayground";
import "./style.css";

setAssetPath("https://js.arcgis.com/calcite-components/1.0.0-beta.91/assets");

const app = document.querySelector("#app") as HTMLDivElement;

const shell = document.createElement("calcite-shell");
app.appendChild(shell);

const headerDiv = document.createElement("div") as HTMLDivElement;
headerDiv.slot = "header";
shell.appendChild(headerDiv);

const header = document.createElement("header") as HTMLElement;
headerDiv.appendChild(header);

const h1 = document.createElement("h1") as HTMLHeadingElement;
h1.innerText = "Symbol Playground";
header.appendChild(h1);

const propertiesShellPanel = document.createElement(
  "calcite-shell-panel"
) as HTMLCalciteShellPanelElement;
propertiesShellPanel.id = "propertiesShellPanel";
propertiesShellPanel.slot = "panel-end";
propertiesShellPanel.position = "end";
propertiesShellPanel.resizable = true;
propertiesShellPanel.widthScale = "l";
shell.appendChild(propertiesShellPanel);

const viewDiv = document.createElement("div") as HTMLDivElement;
viewDiv.id = "viewDiv";
shell.appendChild(viewDiv);

const simpleLineSymbolPlayground = new SimpleLineSymbolPlayground(
  propertiesShellPanel,
  viewDiv
);
simpleLineSymbolPlayground.init();
