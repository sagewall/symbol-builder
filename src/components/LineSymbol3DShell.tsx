import Collection from "@arcgis/core/core/Collection";
import Graphic from "@arcgis/core/Graphic";
import LineSymbol3D from "@arcgis/core/symbols/LineSymbol3D";
import LineSymbol3DLayer from "@arcgis/core/symbols/LineSymbol3DLayer";
import PathSymbol3DLayer from "@arcgis/core/symbols/PathSymbol3DLayer";
import {
  CalciteAction,
  CalciteLabel,
  CalcitePanel,
  CalciteShell,
  CalciteShellPanel,
  CalciteSwitch,
} from "@esri/calcite-components-react";
import React, { useRef, useState } from "react";
import { polyline } from "./lib/geometry";
import { formStyles, shellStyles, viewSwitchLabelStyles } from "./lib/styles";
import LineSymbol3DForm from "./LineSymbol3DForm";
import MapView from "./MapView";
import SceneView from "./SceneView";

const LineSymbol3DShell = () => {
  const viewSwitchRef = useRef(null);

  const [lineSymbol3D, setLineSymbol3D] = useState(new LineSymbol3D());

  const lineGraphic = new Graphic({
    geometry: polyline,
    symbol: lineSymbol3D,
  });

  const graphicsCollection = new Collection();
  graphicsCollection.add(lineGraphic);

  const [graphics, setGraphics] =
    useState<Collection<Graphic>>(graphicsCollection);

  const [sceneView, setSceneView] = useState(true);
  let view = <MapView graphics={graphics} />;
  if (sceneView) {
    view = <SceneView graphics={graphics} />;
  }

  const handleSwitchChange = () => {
    if (viewSwitchRef.current) {
      setSceneView((viewSwitchRef.current as HTMLCalciteSwitchElement).checked);
    }
  };

  const updateGraphics = (newLineSymbol3D: LineSymbol3D) => {
    setLineSymbol3D(newLineSymbol3D);

    const newLineGraphic = graphics.getItemAt(0).clone();
    newLineGraphic.symbol = newLineSymbol3D;

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

  const handleCopyJSONClick = () => {
    navigator.clipboard.writeText(
      JSON.stringify(lineSymbol3D.toJSON(), null, 2)
    );
  };

  return (
    <React.Fragment>
      <CalciteShell style={shellStyles}>
        <CalciteShellPanel slot="panel-start" position="start" resizable>
          <CalcitePanel>
            <div slot="header-content">Properties </div>
            <CalciteLabel
              slot="header-actions-end"
              layout="inline"
              style={viewSwitchLabelStyles}
            >
              SceneView
              <CalciteSwitch
                ref={viewSwitchRef}
                onCalciteSwitchChange={handleSwitchChange}
                checked
                disabled
              ></CalciteSwitch>
            </CalciteLabel>

            <div style={formStyles}>
              <LineSymbol3DForm
                updateSymbolLayers={updateSymbolLayers}
              ></LineSymbol3DForm>
            </div>
          </CalcitePanel>

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
            <pre>{JSON.stringify(lineSymbol3D.toJSON(), null, 2)}</pre>
          </CalcitePanel>
        </CalciteShellPanel>
        {view}
      </CalciteShell>
    </React.Fragment>
  );
};

export default LineSymbol3DShell;
