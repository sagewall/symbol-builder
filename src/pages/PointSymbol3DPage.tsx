import Color from "@arcgis/core/Color";
import Collection from "@arcgis/core/core/Collection";
import Point from "@arcgis/core/geometry/Point";
import Graphic from "@arcgis/core/Graphic";
import LineCallout3D from "@arcgis/core/symbols/callouts/LineCallout3D";
import IconSymbol3DLayer from "@arcgis/core/symbols/IconSymbol3DLayer";
import ObjectSymbol3DLayer from "@arcgis/core/symbols/ObjectSymbol3DLayer";
import PointSymbol3D from "@arcgis/core/symbols/PointSymbol3D";
import Symbol3DVerticalOffset from "@arcgis/core/symbols/support/Symbol3DVerticalOffset";
import TextSymbol3DLayer from "@arcgis/core/symbols/TextSymbol3DLayer";
import {
  CalciteAction,
  CalciteLabel,
  CalcitePanel,
  CalciteShell,
  CalciteShellPanel,
  CalciteSwitch,
} from "@esri/calcite-components-react";
import React, { useRef, useState } from "react";
import {
  formStyles,
  shellStyles,
  viewSwitchLabelStyles,
} from "../components/lib/styles";
import MapView from "../components/MapView";
import PointSymbol3DForm from "../components/PointSymbol3DForm";
import SceneView from "../components/SceneView";

const PointSymbol3DPage = () => {
  const viewSwitchRef = useRef(null);

  const [lineCallout3D, setLineCallout3D] = useState(
    new LineCallout3D({ size: 1 })
  );
  const [symbol3DVerticalOffset, setSymbol3DVerticalOffset] = useState(
    new Symbol3DVerticalOffset({
      maxWorldLength: 100,
      minWorldLength: 0,
      screenLength: 0,
    })
  );
  const [pointSymbol3D, setPointSymbol3D] = useState(
    new PointSymbol3D({
      callout: lineCallout3D,
      verticalOffset: symbol3DVerticalOffset,
    })
  );

  const point = new Point({
    latitude: 40.2,
    longitude: -105.1,
  });

  const pointGraphic = new Graphic({
    geometry: point,
    symbol: pointSymbol3D,
  });

  const graphicsCollection = new Collection();
  graphicsCollection.add(pointGraphic);

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

  const updateGraphics = (newPointSymbol3D: PointSymbol3D) => {
    setPointSymbol3D(newPointSymbol3D);

    const newPointGraphic = graphics.getItemAt(0).clone();
    newPointGraphic.symbol = newPointSymbol3D;

    const newGraphics = new Collection();
    newGraphics.add(newPointGraphic);
    setGraphics(newGraphics);
  };

  const handleCalloutColorChange = (currentColor: string) => {
    const newLineCallout3D = lineCallout3D.clone();
    newLineCallout3D.color = new Color(currentColor);
    setLineCallout3D(newLineCallout3D);

    const newPointSymbol3D = pointSymbol3D.clone();
    newPointSymbol3D.callout = newLineCallout3D;
    updateGraphics(newPointSymbol3D);
  };

  const handleCalloutSizeChange = (currentSize: string) => {
    const newLineCallout3D = lineCallout3D.clone();
    newLineCallout3D.size = Number(currentSize);
    setLineCallout3D(newLineCallout3D);

    const newPointSymbol3D = pointSymbol3D.clone();
    newPointSymbol3D.callout = newLineCallout3D;
    updateGraphics(newPointSymbol3D);
  };

  const updateSymbolLayers = (
    symbolLayers: Collection<
      IconSymbol3DLayer | ObjectSymbol3DLayer | TextSymbol3DLayer
    >
  ) => {
    const newPointSymbol3D = pointSymbol3D.clone();
    newPointSymbol3D.symbolLayers.removeAll();
    newPointSymbol3D.symbolLayers.addMany(symbolLayers);
    updateGraphics(newPointSymbol3D);
  };

  const handleVerticalOffsetMaxWorldLengthChange = (
    currentMaxWorldLength: string
  ) => {
    const newSymbol3DVerticalOffset = symbol3DVerticalOffset.clone();
    newSymbol3DVerticalOffset.maxWorldLength = Number(currentMaxWorldLength);
    setSymbol3DVerticalOffset(newSymbol3DVerticalOffset);

    const newPointSymbol3D = pointSymbol3D.clone();
    newPointSymbol3D.verticalOffset = newSymbol3DVerticalOffset;
    updateGraphics(newPointSymbol3D);
  };

  const handleVerticalOffsetMinWorldLengthChange = (
    currentMinWorldLength: string
  ) => {
    const newSymbol3DVerticalOffset = symbol3DVerticalOffset.clone();
    newSymbol3DVerticalOffset.minWorldLength = Number(currentMinWorldLength);
    setSymbol3DVerticalOffset(newSymbol3DVerticalOffset);

    const newPointSymbol3D = pointSymbol3D.clone();
    newPointSymbol3D.verticalOffset = newSymbol3DVerticalOffset;
    updateGraphics(newPointSymbol3D);
  };

  const handleVerticalOffsetScreenLengthChange = (
    currentScreenLength: string
  ) => {
    const newSymbol3DVerticalOffset = symbol3DVerticalOffset.clone();
    newSymbol3DVerticalOffset.screenLength = Number(currentScreenLength);
    setSymbol3DVerticalOffset(newSymbol3DVerticalOffset);

    const newPointSymbol3D = pointSymbol3D.clone();
    newPointSymbol3D.verticalOffset = newSymbol3DVerticalOffset;
    updateGraphics(newPointSymbol3D);
  };

  const handleCopyJSONClick = () => {
    navigator.clipboard.writeText(
      JSON.stringify(pointSymbol3D.toJSON(), null, 2)
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

            <form style={formStyles}>
              <PointSymbol3DForm
                handleCalloutColorChange={handleCalloutColorChange}
                handleCalloutSizeChange={handleCalloutSizeChange}
                handleVerticalOffsetMaxWorldLengthChange={
                  handleVerticalOffsetMaxWorldLengthChange
                }
                handleVerticalOffsetMinWorldLengthChange={
                  handleVerticalOffsetMinWorldLengthChange
                }
                handleVerticalOffsetScreenLengthChange={
                  handleVerticalOffsetScreenLengthChange
                }
                updateSymbolLayers={updateSymbolLayers}
              ></PointSymbol3DForm>
            </form>
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
            <pre>{JSON.stringify(pointSymbol3D.toJSON(), null, 2)}</pre>
          </CalcitePanel>
        </CalciteShellPanel>
        {view}
      </CalciteShell>
    </React.Fragment>
  );
};

export default PointSymbol3DPage;
