import Graphic from "@arcgis/core/Graphic";
import Collection from "@arcgis/core/core/Collection";
import FillSymbol3DLayer from "@arcgis/core/symbols/FillSymbol3DLayer";
import MeshSymbol3D from "@arcgis/core/symbols/MeshSymbol3D.js";
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
import MeshSymbol3DAMDPanel from "./MeshSymbol3DAMDPanel";
import MeshSymbol3DESMPanel from "./MeshSymbol3DESMPanel";
import MeshSymbol3DForm from "./MeshSymbol3DForm";
import MeshSymbol3DJSONPanel from "./MeshSymbol3DJSONPanel";
import { mesh } from "./lib/geometry";
import { formStyles, shellStyles, tabsStyles } from "./lib/styles";

const SceneViewLazy = React.lazy(() => import("./SceneView"));

const MeshSymbol3DShell = () => {
  const isSSR = typeof window === "undefined";
  const [meshSymbol3D, setMeshSymbol3D] = useState(new MeshSymbol3D());

  const meshGraphic = new Graphic({
    geometry: mesh,
    symbol: meshSymbol3D
  });

  const graphicsCollection = new Collection();
  graphicsCollection.add(meshGraphic);

  const [graphics, setGraphics] = useState<Collection<Graphic>>(graphicsCollection);

  const view = <SceneViewLazy graphics={graphics} />;

  const updateGraphics = (newMeshSymbol3D: MeshSymbol3D) => {
    setMeshSymbol3D(newMeshSymbol3D);

    const newPolygonGraphic = graphics.getItemAt(0).clone();
    newPolygonGraphic.symbol = newMeshSymbol3D;

    const newGraphics = new Collection();
    newGraphics.add(newPolygonGraphic);
    setGraphics(newGraphics);
  };

  const updateSymbolLayers = (symbolLayers: Collection<FillSymbol3DLayer>) => {
    const newMeshSymbol3D = meshSymbol3D.clone();
    newMeshSymbol3D.symbolLayers.removeAll();
    newMeshSymbol3D.symbolLayers.addMany(symbolLayers);
    updateGraphics(newMeshSymbol3D);
  };

  return (
    <React.Fragment>
      <CalciteShell style={shellStyles}>
        <Header title="MeshSymbol3D"></Header>
        <CalciteShellPanel slot="panel-start" position="start" resizable>
          <CalcitePanel>
            <div slot="header-content">Properties </div>
            <div style={formStyles}>
              <MeshSymbol3DForm updateSymbolLayers={updateSymbolLayers}></MeshSymbol3DForm>
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
                <MeshSymbol3DESMPanel meshSymbol3D={meshSymbol3D} />
              </CalciteTab>
              <CalciteTab>
                <MeshSymbol3DAMDPanel meshSymbol3D={meshSymbol3D} />
              </CalciteTab>
              <CalciteTab>
                <MeshSymbol3DJSONPanel meshSymbol3D={meshSymbol3D} />
              </CalciteTab>
            </CalciteTabs>
          </CalcitePanel>
        </CalciteShellPanel>
        {!isSSR && <React.Suspense fallback={<div />}>{view}</React.Suspense>}
      </CalciteShell>
    </React.Fragment>
  );
};

export default MeshSymbol3DShell;
