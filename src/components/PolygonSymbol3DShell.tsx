import Graphic from "@arcgis/core/Graphic";
import Collection from "@arcgis/core/core/Collection";
import type ExtrudeSymbol3DLayer from "@arcgis/core/symbols/ExtrudeSymbol3DLayer";
import type FillSymbol3DLayer from "@arcgis/core/symbols/FillSymbol3DLayer";
import type IconSymbol3DLayer from "@arcgis/core/symbols/IconSymbol3DLayer";
import type LineSymbol3DLayer from "@arcgis/core/symbols/LineSymbol3DLayer";
import type ObjectSymbol3DLayer from "@arcgis/core/symbols/ObjectSymbol3DLayer";
import PolygonSymbol3D from "@arcgis/core/symbols/PolygonSymbol3D";
import type TextSymbol3DLayer from "@arcgis/core/symbols/TextSymbol3DLayer";
import type WaterSymbol3DLayer from "@arcgis/core/symbols/WaterSymbol3DLayer";
import {
  CalcitePanel,
  CalciteShell,
  CalciteShellPanel,
  CalciteTab,
  CalciteTabNav,
  CalciteTabTitle,
  CalciteTabs
} from "@esri/calcite-components-react";
import React, { useState } from "react";
import Header from "./Header";
import PolygonSymbol3DAMDPanel from "./PolygonSymbol3DAMDPanel";
import PolygonSymbol3DESMPanel from "./PolygonSymbol3DESMPanel";
import PolygonSymbol3DForm from "./PolygonSymbol3DForm";
import PolygonSymbol3DJSONPanel from "./PolygonSymbol3DJSONPanel";
import SceneView from "./SceneView";
import { polygon } from "./lib/geometry";
import { formStyles, shellPanelStyles, shellStyles, tabNavStyles } from "./lib/styles";

const PolygonSymbol3DShell = () => {
  const [polygonSymbol3D, setPolygonSymbol3D] = useState(new PolygonSymbol3D());

  const polygonGraphic = new Graphic({
    geometry: polygon,
    symbol: polygonSymbol3D
  });

  const graphicsCollection = new Collection();
  graphicsCollection.add(polygonGraphic);

  const [graphics, setGraphics] = useState<Collection<Graphic>>(graphicsCollection);

  const view = <SceneView graphics={graphics} />;

  const updateGraphics = (newPolygonSymbol3D: PolygonSymbol3D) => {
    setPolygonSymbol3D(newPolygonSymbol3D);

    const newPolygonGraphic = graphics.getItemAt(0).clone();
    newPolygonGraphic.symbol = newPolygonSymbol3D;

    const newGraphics = new Collection();
    newGraphics.add(newPolygonGraphic);
    setGraphics(newGraphics);
  };

  const updateSymbolLayers = (
    symbolLayers: Collection<
      | FillSymbol3DLayer
      | ExtrudeSymbol3DLayer
      | WaterSymbol3DLayer
      | LineSymbol3DLayer
      | IconSymbol3DLayer
      | ObjectSymbol3DLayer
      | TextSymbol3DLayer
    >
  ) => {
    const newPolygonSymbol3D = polygonSymbol3D.clone();
    newPolygonSymbol3D.symbolLayers.removeAll();
    newPolygonSymbol3D.symbolLayers.addMany(symbolLayers);
    updateGraphics(newPolygonSymbol3D);
  };

  return (
    <React.Fragment>
      <CalciteShell style={shellStyles}>
        <Header title="PolygonSymbol3D" backButton></Header>
        <CalciteShellPanel slot="panel-start" position="start" resizable>
          <CalcitePanel>
            <div slot="header-content">Properties </div>
            <div style={formStyles}>
              <PolygonSymbol3DForm updateSymbolLayers={updateSymbolLayers}></PolygonSymbol3DForm>
            </div>
          </CalcitePanel>
        </CalciteShellPanel>

        <CalciteShellPanel
          slot="panel-end"
          position="end"
          resizable
          style={shellPanelStyles}
          widthScale="l"
        >
          <CalcitePanel>
            <CalciteTabs>
              <CalciteTabNav slot="title-group" style={tabNavStyles}>
                <CalciteTabTitle>ESM</CalciteTabTitle>
                <CalciteTabTitle>AMD</CalciteTabTitle>
                <CalciteTabTitle>JSON</CalciteTabTitle>
              </CalciteTabNav>
              <CalciteTab>
                <PolygonSymbol3DESMPanel polygonSymbol3D={polygonSymbol3D} />
              </CalciteTab>
              <CalciteTab>
                <PolygonSymbol3DAMDPanel polygonSymbol3D={polygonSymbol3D} />
              </CalciteTab>
              <CalciteTab>
                <PolygonSymbol3DJSONPanel polygonSymbol3D={polygonSymbol3D} />
              </CalciteTab>
            </CalciteTabs>
          </CalcitePanel>
        </CalciteShellPanel>
        {view}
      </CalciteShell>
    </React.Fragment>
  );
};

export default PolygonSymbol3DShell;
