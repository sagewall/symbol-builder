import Graphic from "@arcgis/core/Graphic";
import Collection from "@arcgis/core/core/Collection";
import LineSymbol3D from "@arcgis/core/symbols/LineSymbol3D";
import type LineSymbol3DLayer from "@arcgis/core/symbols/LineSymbol3DLayer";
import type PathSymbol3DLayer from "@arcgis/core/symbols/PathSymbol3DLayer";
import "@esri/calcite-components/components/calcite-panel";
import "@esri/calcite-components/components/calcite-shell";
import "@esri/calcite-components/components/calcite-shell-panel";
import "@esri/calcite-components/components/calcite-tab";
import "@esri/calcite-components/components/calcite-tab-nav";
import "@esri/calcite-components/components/calcite-tab-title";
import "@esri/calcite-components/components/calcite-tabs";
import { useState } from "react";
import { polyline } from "../lib/geometry";
import {
  formStyles,
  shellPanelStyles,
  shellStyles,
  tabNavStyles,
} from "../lib/styles";
import Header from "./Header";
import LineSymbol3DCDNPanel from "./LineSymbol3DCDNPanel";
import LineSymbol3DESMPanel from "./LineSymbol3DESMPanel";
import LineSymbol3DForm from "./LineSymbol3DForm";
import LineSymbol3DJSONPanel from "./LineSymbol3DJSONPanel";
import Scene from "./Scene";

function LineSymbol3DShell() {
  const [lineSymbol3D, setLineSymbol3D] = useState(new LineSymbol3D());

  const lineGraphic = new Graphic({
    geometry: polyline,
    symbol: lineSymbol3D,
  });

  const graphicsCollection = new Collection();
  graphicsCollection.add(lineGraphic);

  const [graphics, setGraphics] =
    useState<Collection<Graphic>>(graphicsCollection);

  const viewElement = <Scene graphics={graphics}></Scene>;

  const updateGraphics = (newLineSymbol3D: LineSymbol3D) => {
    setLineSymbol3D(newLineSymbol3D);

    const newLineGraphic = graphics.getItemAt(0)?.clone();
    if (newLineGraphic) {
      newLineGraphic.symbol = newLineSymbol3D;
    }

    const newGraphics = new Collection();
    newGraphics.add(newLineGraphic);
    setGraphics(newGraphics);
  };

  const updateSymbolLayers = (
    symbolLayers: Collection<LineSymbol3DLayer | PathSymbol3DLayer>
  ) => {
    const newLineSymbol3D = lineSymbol3D.clone();
    newLineSymbol3D.symbolLayers.removeAll();
    newLineSymbol3D.symbolLayers.addMany(symbolLayers);
    updateGraphics(newLineSymbol3D);
  };

  return (
    <>
      <calcite-shell style={shellStyles}>
        <Header title="LineSymbol3D" backButton></Header>
        <calcite-shell-panel slot="panel-start" position="start" resizable>
          <calcite-panel>
            <div slot="header-content">Properties </div>
            <div style={formStyles}>
              <LineSymbol3DForm
                updateSymbolLayers={updateSymbolLayers}
              ></LineSymbol3DForm>
            </div>
          </calcite-panel>
        </calcite-shell-panel>

        <calcite-shell-panel
          slot="panel-end"
          position="end"
          resizable
          style={shellPanelStyles}
        >
          <calcite-panel>
            <calcite-tabs>
              <calcite-tab-nav slot="title-group" style={tabNavStyles}>
                <calcite-tab-title>ESM</calcite-tab-title>
                <calcite-tab-title>CDN</calcite-tab-title>
                <calcite-tab-title>JSON</calcite-tab-title>
              </calcite-tab-nav>
              <calcite-tab>
                <LineSymbol3DESMPanel
                  lineSymbol3D={lineSymbol3D}
                ></LineSymbol3DESMPanel>
              </calcite-tab>
              <calcite-tab>
                <LineSymbol3DCDNPanel
                  lineSymbol3D={lineSymbol3D}
                ></LineSymbol3DCDNPanel>
              </calcite-tab>
              <calcite-tab>
                <LineSymbol3DJSONPanel
                  lineSymbol3D={lineSymbol3D}
                ></LineSymbol3DJSONPanel>
              </calcite-tab>
            </calcite-tabs>
          </calcite-panel>
        </calcite-shell-panel>
        {viewElement}
      </calcite-shell>
    </>
  );
}

export default LineSymbol3DShell;
