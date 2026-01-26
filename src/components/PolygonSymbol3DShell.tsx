import Graphic from "@arcgis/core/Graphic.js";
import Collection from "@arcgis/core/core/Collection.js";
import type ExtrudeSymbol3DLayer from "@arcgis/core/symbols/ExtrudeSymbol3DLayer.js";
import type FillSymbol3DLayer from "@arcgis/core/symbols/FillSymbol3DLayer.js";
import type IconSymbol3DLayer from "@arcgis/core/symbols/IconSymbol3DLayer.js";
import type ObjectSymbol3DLayer from "@arcgis/core/symbols/ObjectSymbol3DLayer.js";
import PolygonSymbol3D from "@arcgis/core/symbols/PolygonSymbol3D.js";
import type WaterSymbol3DLayer from "@arcgis/core/symbols/WaterSymbol3DLayer.js";
import "@esri/calcite-components/dist/components/calcite-panel";
import "@esri/calcite-components/dist/components/calcite-shell";
import "@esri/calcite-components/dist/components/calcite-shell-panel";
import "@esri/calcite-components/dist/components/calcite-tab";
import "@esri/calcite-components/dist/components/calcite-tab-nav";
import "@esri/calcite-components/dist/components/calcite-tab-title";
import "@esri/calcite-components/dist/components/calcite-tabs";
import { useState } from "react";
import PolygonSymbol3DCDNPanel from "./PolygonSymbol3DCDNPanel";
import PolygonSymbol3DESMPanel from "./PolygonSymbol3DESMPanel";
import PolygonSymbol3DForm from "./PolygonSymbol3DForm";
import PolygonSymbol3DJSONPanel from "./PolygonSymbol3DJSONPanel";
import Scene from "./Scene";
import { polygon } from "./lib/geometry";
import { formStyles, shellPanelStyles, shellStyles, tabNavStyles } from "./lib/styles";

function PolygonSymbol3DShell(): React.ReactElement {
  const [polygonSymbol3D, setPolygonSymbol3D] = useState(new PolygonSymbol3D());

  const polygonGraphic = new Graphic({
    geometry: polygon,
    symbol: polygonSymbol3D,
  });

  const graphicsCollection = new Collection();
  graphicsCollection.add(polygonGraphic);

  const [graphics, setGraphics] = useState<Collection<Graphic>>(graphicsCollection);

  const viewElement = <Scene graphics={graphics}></Scene>;

  const updateGraphics = (newPolygonSymbol3D: PolygonSymbol3D): void => {
    setPolygonSymbol3D(newPolygonSymbol3D);

    const newPolygonGraphic = graphics.getItemAt(0)?.clone();
    if (newPolygonGraphic) {
      newPolygonGraphic.symbol = newPolygonSymbol3D;
    }

    const newGraphics = new Collection();
    newGraphics.add(newPolygonGraphic);
    setGraphics(newGraphics);
  };

  const updateSymbolLayers = (
    symbolLayers: Collection<
      ExtrudeSymbol3DLayer | FillSymbol3DLayer | IconSymbol3DLayer | ObjectSymbol3DLayer | WaterSymbol3DLayer
    >,
  ): void => {
    const newPolygonSymbol3D = polygonSymbol3D.clone();
    newPolygonSymbol3D.symbolLayers.removeAll();
    newPolygonSymbol3D.symbolLayers.addMany(symbolLayers);
    updateGraphics(newPolygonSymbol3D);
  };

  return (
    <>
      <calcite-shell style={shellStyles}>
        <calcite-shell-panel slot="panel-start" position="start" resizable>
          <calcite-panel>
            <div slot="header-content">Properties </div>
            <div style={formStyles}>
              <PolygonSymbol3DForm updateSymbolLayers={updateSymbolLayers}></PolygonSymbol3DForm>
            </div>
          </calcite-panel>
        </calcite-shell-panel>

        <calcite-shell-panel slot="panel-end" position="end" resizable style={shellPanelStyles}>
          <calcite-panel>
            <calcite-tabs>
              <calcite-tab-nav slot="title-group" style={tabNavStyles}>
                <calcite-tab-title>ESM</calcite-tab-title>
                <calcite-tab-title>CDN</calcite-tab-title>
                <calcite-tab-title>JSON</calcite-tab-title>
              </calcite-tab-nav>
              <calcite-tab>
                <PolygonSymbol3DESMPanel polygonSymbol3D={polygonSymbol3D}></PolygonSymbol3DESMPanel>
              </calcite-tab>
              <calcite-tab>
                <PolygonSymbol3DCDNPanel polygonSymbol3D={polygonSymbol3D}></PolygonSymbol3DCDNPanel>
              </calcite-tab>
              <calcite-tab>
                <PolygonSymbol3DJSONPanel polygonSymbol3D={polygonSymbol3D}></PolygonSymbol3DJSONPanel>
              </calcite-tab>
            </calcite-tabs>
          </calcite-panel>
        </calcite-shell-panel>
        {viewElement}
      </calcite-shell>
    </>
  );
}

export default PolygonSymbol3DShell;
