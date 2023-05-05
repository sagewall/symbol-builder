import Graphic from "@arcgis/core/Graphic";
import Collection from "@arcgis/core/core/Collection";
import LineSymbol3D from "@arcgis/core/symbols/LineSymbol3D";
import LineSymbol3DLayer from "@arcgis/core/symbols/LineSymbol3DLayer";
import PathSymbol3DLayer from "@arcgis/core/symbols/PathSymbol3DLayer";
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
import LineSymbol3DAMDPanel from "./LineSymbol3DAMDPanel";
import LineSymbol3DESMPanel from "./LineSymbol3DESMPanel";
import LineSymbol3DForm from "./LineSymbol3DForm";
import LineSymbol3DJSONPanel from "./LineSymbol3DJSONPanel";
import { polyline } from "./lib/geometry";
import { formStyles, shellStyles, tabsStyles } from "./lib/styles";

const SceneViewLazy = React.lazy(() => import("./SceneView"));

const LineSymbol3DShell = () => {
  const isSSR = typeof window === "undefined";

  const [lineSymbol3D, setLineSymbol3D] = useState(new LineSymbol3D());

  const lineGraphic = new Graphic({
    geometry: polyline,
    symbol: lineSymbol3D
  });

  const graphicsCollection = new Collection();
  graphicsCollection.add(lineGraphic);

  const [graphics, setGraphics] = useState<Collection<Graphic>>(graphicsCollection);

  const view = <SceneViewLazy graphics={graphics} />;

  const updateGraphics = (newLineSymbol3D: LineSymbol3D) => {
    setLineSymbol3D(newLineSymbol3D);

    const newLineGraphic = graphics.getItemAt(0).clone();
    newLineGraphic.symbol = newLineSymbol3D;

    const newGraphics = new Collection();
    newGraphics.add(newLineGraphic);
    setGraphics(newGraphics);
  };

  const updateSymbolLayers = (symbolLayers: Collection<LineSymbol3DLayer | PathSymbol3DLayer>) => {
    const newLineSymbol3D = lineSymbol3D.clone();
    newLineSymbol3D.symbolLayers.removeAll();
    newLineSymbol3D.symbolLayers.addMany(symbolLayers);
    updateGraphics(newLineSymbol3D);
  };

  return (
    <React.Fragment>
      <CalciteShell style={shellStyles}>
        <Header title="LineSymbol3D"></Header>
        <CalciteShellPanel slot="panel-start" position="start" resizable>
          <CalcitePanel>
            <div slot="header-content">Properties </div>
            <div style={formStyles}>
              <LineSymbol3DForm updateSymbolLayers={updateSymbolLayers}></LineSymbol3DForm>
            </div>
          </CalcitePanel>
        </CalciteShellPanel>

        <CalciteShellPanel slot="panel-end" position="end" resizable widthScale="l">
          <CalcitePanel>
            <CalciteTabs style={tabsStyles}>
              <CalciteTabNav slot="title-group">
                <CalciteTabTitle>ESM</CalciteTabTitle>
                <CalciteTabTitle>AMD</CalciteTabTitle>
                <CalciteTabTitle>JSON</CalciteTabTitle>
              </CalciteTabNav>
              <CalciteTab>
                <LineSymbol3DESMPanel lineSymbol3D={lineSymbol3D} />
              </CalciteTab>
              <CalciteTab>
                <LineSymbol3DAMDPanel lineSymbol3D={lineSymbol3D} />
              </CalciteTab>
              <CalciteTab>
                <LineSymbol3DJSONPanel lineSymbol3D={lineSymbol3D} />
              </CalciteTab>
            </CalciteTabs>
          </CalcitePanel>
        </CalciteShellPanel>
        {!isSSR && <React.Suspense fallback={<div />}>{view}</React.Suspense>}
      </CalciteShell>
    </React.Fragment>
  );
};

export default LineSymbol3DShell;
