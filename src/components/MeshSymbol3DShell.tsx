import type Collection from "@arcgis/core/core/Collection.js";
import type FillSymbol3DLayer from "@arcgis/core/symbols/FillSymbol3DLayer.js";
import MeshSymbol3D from "@arcgis/core/symbols/MeshSymbol3D.js";
import "@esri/calcite-components/components/calcite-panel";
import "@esri/calcite-components/components/calcite-shell";
import "@esri/calcite-components/components/calcite-shell-panel";
import "@esri/calcite-components/components/calcite-tab";
import "@esri/calcite-components/components/calcite-tab-nav";
import "@esri/calcite-components/components/calcite-tab-title";
import "@esri/calcite-components/components/calcite-tabs";
import { useState } from "react";
import MeshSymbol3DCDNPanel from "./MeshSymbol3DCDNPanel";
import MeshSymbol3DESMPanel from "./MeshSymbol3DESMPanel";
import MeshSymbol3DForm from "./MeshSymbol3DForm";
import MeshSymbol3DJSONPanel from "./MeshSymbol3DJSONPanel";
import Scene from "./Scene";
import { mesh } from "./lib/geometry";
import { useSymbolPreview } from "./lib/useSymbolPreview";
import {
  formStyles,
  shellPanelStyles,
  shellStyles,
  tabNavStyles,
} from "./lib/styles";

function MeshSymbol3DShell(): React.ReactElement {
  const [meshSymbol3D, setMeshSymbol3D] = useState(new MeshSymbol3D());

  const { graphics, updatePreview } = useSymbolPreview(mesh, meshSymbol3D);

  const viewElement = <Scene graphics={graphics}></Scene>;

  const updateGraphics = (newMeshSymbol3D: MeshSymbol3D): void => {
    setMeshSymbol3D(newMeshSymbol3D);
    updatePreview(newMeshSymbol3D);
  };

  const updateSymbolLayers = (
    symbolLayers: Collection<FillSymbol3DLayer>,
  ): void => {
    const newMeshSymbol3D = meshSymbol3D.clone();
    newMeshSymbol3D.symbolLayers.removeAll();
    newMeshSymbol3D.symbolLayers.addMany(symbolLayers);
    updateGraphics(newMeshSymbol3D);
  };

  return (
    <>
      <calcite-shell style={shellStyles}>
        <calcite-shell-panel slot="panel-start" resizable>
          <calcite-panel>
            <div slot="header-content">Properties </div>
            <div style={formStyles}>
              <MeshSymbol3DForm
                symbolLayers={meshSymbol3D.symbolLayers}
                updateSymbolLayers={updateSymbolLayers}
              ></MeshSymbol3DForm>
            </div>
          </calcite-panel>
        </calcite-shell-panel>

        <calcite-shell-panel
          slot="panel-end"
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
                <MeshSymbol3DESMPanel
                  meshSymbol3D={meshSymbol3D}
                ></MeshSymbol3DESMPanel>
              </calcite-tab>
              <calcite-tab>
                <MeshSymbol3DCDNPanel
                  meshSymbol3D={meshSymbol3D}
                ></MeshSymbol3DCDNPanel>
              </calcite-tab>
              <calcite-tab>
                <MeshSymbol3DJSONPanel
                  meshSymbol3D={meshSymbol3D}
                ></MeshSymbol3DJSONPanel>
              </calcite-tab>
            </calcite-tabs>
          </calcite-panel>
        </calcite-shell-panel>
        {viewElement}
      </calcite-shell>
    </>
  );
}

export default MeshSymbol3DShell;
