import Graphic from "@arcgis/core/Graphic";
import Collection from "@arcgis/core/core/Collection";
import type FillSymbol3DLayer from "@arcgis/core/symbols/FillSymbol3DLayer";
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
import SceneView from "./SceneView";
import { mesh } from "./lib/geometry";
import { formStyles, shellPanelStyles, shellStyles, tabNavStyles } from "./lib/styles";

const MeshSymbol3DShell = () => {
  const [meshSymbol3D, setMeshSymbol3D] = useState(new MeshSymbol3D());

  const meshGraphic = new Graphic({
    geometry: mesh,
    symbol: meshSymbol3D
  });

  const graphicsCollection = new Collection();
  graphicsCollection.add(meshGraphic);

  const [graphics, setGraphics] = useState<Collection<Graphic>>(graphicsCollection);

  const view = <SceneView graphics={graphics} />;

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
        <Header title="MeshSymbol3D" backButton></Header>
        <CalciteShellPanel slot="panel-start" position="start" resizable>
          <CalcitePanel>
            <div slot="header-content">Properties </div>
            <div style={formStyles}>
              <MeshSymbol3DForm updateSymbolLayers={updateSymbolLayers}></MeshSymbol3DForm>
            </div>
          </CalcitePanel>
        </CalciteShellPanel>

        <CalciteShellPanel slot="panel-end" position="end" resizable style={shellPanelStyles}>
          <CalcitePanel>
            <CalciteTabs>
              <CalciteTabNav slot="title-group" style={tabNavStyles}>
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
        {view}
      </CalciteShell>
    </React.Fragment>
  );
};

export default MeshSymbol3DShell;
