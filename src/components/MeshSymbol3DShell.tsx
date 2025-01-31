import Graphic from "@arcgis/core/Graphic";
import Collection from "@arcgis/core/core/Collection";
import type FillSymbol3DLayer from "@arcgis/core/symbols/FillSymbol3DLayer";
import MeshSymbol3D from "@arcgis/core/symbols/MeshSymbol3D.js";
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

  const view = <SceneView graphics={graphics}></SceneView>;

  const updateGraphics = (newMeshSymbol3D: MeshSymbol3D) => {
    setMeshSymbol3D(newMeshSymbol3D);

    const newPolygonGraphic = graphics.getItemAt(0)?.clone();
    if (newPolygonGraphic) {
      newPolygonGraphic.symbol = newMeshSymbol3D;
    }
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
      <calcite-shell style={shellStyles}>
        <Header title="MeshSymbol3D" backButton></Header>
        <calcite-shell-panel slot="panel-start" position="start" resizable>
          <calcite-panel>
            <div slot="header-content">Properties </div>
            <div style={formStyles}>
              <MeshSymbol3DForm updateSymbolLayers={updateSymbolLayers}></MeshSymbol3DForm>
            </div>
          </calcite-panel>
        </calcite-shell-panel>

        <calcite-shell-panel slot="panel-end" position="end" resizable style={shellPanelStyles}>
          <calcite-panel>
            <calcite-tabs>
              <calcite-tab-nav slot="title-group" style={tabNavStyles}>
                <calcite-tab-title>ESM</calcite-tab-title>
                <calcite-tab-title>AMD</calcite-tab-title>
                <calcite-tab-title>JSON</calcite-tab-title>
              </calcite-tab-nav>
              <calcite-tab>
                <MeshSymbol3DESMPanel meshSymbol3D={meshSymbol3D}></MeshSymbol3DESMPanel>
              </calcite-tab>
              <calcite-tab>
                <MeshSymbol3DAMDPanel meshSymbol3D={meshSymbol3D}></MeshSymbol3DAMDPanel>
              </calcite-tab>
              <calcite-tab>
                <MeshSymbol3DJSONPanel meshSymbol3D={meshSymbol3D}></MeshSymbol3DJSONPanel>
              </calcite-tab>
            </calcite-tabs>
          </calcite-panel>
        </calcite-shell-panel>
        {view}
      </calcite-shell>
    </React.Fragment>
  );
};

export default MeshSymbol3DShell;
