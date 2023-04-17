import Graphic from "@arcgis/core/Graphic";
import Collection from "@arcgis/core/core/Collection";
import FillSymbol3DLayer from "@arcgis/core/symbols/FillSymbol3DLayer";
import MeshSymbol3D from "@arcgis/core/symbols/MeshSymbol3D.js";
import {
  CalciteAction,
  CalcitePanel,
  CalciteShell,
  CalciteShellPanel
} from "@esri/calcite-components-react";
import React, { useState } from "react";
import Header from "./Header";
import MeshSymbol3DForm from "./MeshSymbol3DForm";
import SceneView from "./SceneView";
import { mesh } from "./lib/geometry";
import { formStyles, jsonStyles, shellStyles } from "./lib/styles";

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

  const handleCopyJSONClick = () => {
    navigator.clipboard.writeText(JSON.stringify(meshSymbol3D.toJSON(), null, 2));
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

        <CalciteShellPanel slot="panel-end" position="end" resizable>
          <CalcitePanel>
            <div slot="header-content">JSON</div>
            <CalciteAction
              icon="copy-to-clipboard"
              label="Copy code to clipboard"
              text="Copy JSON"
              textEnabled
              slot="header-actions-end"
              onClick={handleCopyJSONClick}
            ></CalciteAction>
            <pre style={jsonStyles}>{JSON.stringify(meshSymbol3D.toJSON(), null, 2)}</pre>
          </CalcitePanel>
        </CalciteShellPanel>
        {view}
      </CalciteShell>
    </React.Fragment>
  );
};

export default MeshSymbol3DShell;
