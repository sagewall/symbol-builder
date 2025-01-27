import Color from "@arcgis/core/Color";
import Graphic from "@arcgis/core/Graphic";
import Collection from "@arcgis/core/core/Collection";
import type IconSymbol3DLayer from "@arcgis/core/symbols/IconSymbol3DLayer";
import type ObjectSymbol3DLayer from "@arcgis/core/symbols/ObjectSymbol3DLayer";
import PointSymbol3D from "@arcgis/core/symbols/PointSymbol3D";
import type TextSymbol3DLayer from "@arcgis/core/symbols/TextSymbol3DLayer";
import LineCallout3D from "@arcgis/core/symbols/callouts/LineCallout3D";
import Symbol3DVerticalOffset from "@arcgis/core/symbols/support/Symbol3DVerticalOffset";
import React, { useState } from "react";
import Header from "./Header";
import PointSymbol3DAMDPanel from "./PointSymbol3DAMDPanel";
import PointSymbol3DESMPanel from "./PointSymbol3DESMPanel";
import PointSymbol3DForm from "./PointSymbol3DForm";
import PointSymbol3DJSONPanel from "./PointSymbol3DJSONPanel";
import SceneView from "./SceneView";
import { point } from "./lib/geometry";
import { formStyles, shellPanelStyles, shellStyles, tabNavStyles } from "./lib/styles";

const PointSymbol3DShell = () => {
  const [lineCallout3D, setLineCallout3D] = useState(new LineCallout3D({ size: 1 }));

  const [symbol3DVerticalOffset, setSymbol3DVerticalOffset] = useState(
    new Symbol3DVerticalOffset({
      maxWorldLength: 100,
      minWorldLength: 0,
      screenLength: 0
    })
  );

  const [pointSymbol3D, setPointSymbol3D] = useState(
    new PointSymbol3D({
      callout: lineCallout3D,
      verticalOffset: symbol3DVerticalOffset
    })
  );

  const pointGraphic = new Graphic({
    geometry: point,
    symbol: pointSymbol3D
  });

  const graphicsCollection = new Collection();
  graphicsCollection.add(pointGraphic);

  const [graphics, setGraphics] = useState<Collection<Graphic>>(graphicsCollection);

  const view = <SceneView graphics={graphics}></SceneView>;

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
    symbolLayers: Collection<IconSymbol3DLayer | ObjectSymbol3DLayer | TextSymbol3DLayer>
  ) => {
    const newPointSymbol3D = pointSymbol3D.clone();
    newPointSymbol3D.symbolLayers.removeAll();
    newPointSymbol3D.symbolLayers.addMany(symbolLayers);
    updateGraphics(newPointSymbol3D);
  };

  const handleVerticalOffsetMaxWorldLengthChange = (currentMaxWorldLength: string) => {
    const newSymbol3DVerticalOffset = symbol3DVerticalOffset.clone();
    newSymbol3DVerticalOffset.maxWorldLength = Number(currentMaxWorldLength);
    setSymbol3DVerticalOffset(newSymbol3DVerticalOffset);

    const newPointSymbol3D = pointSymbol3D.clone();
    newPointSymbol3D.verticalOffset = newSymbol3DVerticalOffset;
    updateGraphics(newPointSymbol3D);
  };

  const handleVerticalOffsetMinWorldLengthChange = (currentMinWorldLength: string) => {
    const newSymbol3DVerticalOffset = symbol3DVerticalOffset.clone();
    newSymbol3DVerticalOffset.minWorldLength = Number(currentMinWorldLength);
    setSymbol3DVerticalOffset(newSymbol3DVerticalOffset);

    const newPointSymbol3D = pointSymbol3D.clone();
    newPointSymbol3D.verticalOffset = newSymbol3DVerticalOffset;
    updateGraphics(newPointSymbol3D);
  };

  const handleVerticalOffsetScreenLengthChange = (currentScreenLength: string) => {
    const newSymbol3DVerticalOffset = symbol3DVerticalOffset.clone();
    newSymbol3DVerticalOffset.screenLength = Number(currentScreenLength);
    setSymbol3DVerticalOffset(newSymbol3DVerticalOffset);

    const newPointSymbol3D = pointSymbol3D.clone();
    newPointSymbol3D.verticalOffset = newSymbol3DVerticalOffset;
    updateGraphics(newPointSymbol3D);
  };

  return (
    <React.Fragment>
      <calcite-shell style={shellStyles}>
        <Header title="PointSymbol3D" backButton></Header>
        <calcite-shell-panel slot="panel-start" position="start" resizable>
          <calcite-panel>
            <div slot="header-content">Properties </div>
            <div style={formStyles}>
              <PointSymbol3DForm
                handleCalloutColorChange={handleCalloutColorChange}
                handleCalloutSizeChange={handleCalloutSizeChange}
                handleVerticalOffsetMaxWorldLengthChange={handleVerticalOffsetMaxWorldLengthChange}
                handleVerticalOffsetMinWorldLengthChange={handleVerticalOffsetMinWorldLengthChange}
                handleVerticalOffsetScreenLengthChange={handleVerticalOffsetScreenLengthChange}
                updateSymbolLayers={updateSymbolLayers}
              ></PointSymbol3DForm>
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
                <PointSymbol3DESMPanel pointSymbol3D={pointSymbol3D}></PointSymbol3DESMPanel>
              </calcite-tab>
              <calcite-tab>
                <PointSymbol3DAMDPanel pointSymbol3D={pointSymbol3D}></PointSymbol3DAMDPanel>
              </calcite-tab>
              <calcite-tab>
                <PointSymbol3DJSONPanel pointSymbol3D={pointSymbol3D}></PointSymbol3DJSONPanel>
              </calcite-tab>
            </calcite-tabs>
          </calcite-panel>
        </calcite-shell-panel>
        {view}
      </calcite-shell>
    </React.Fragment>
  );
};

export default PointSymbol3DShell;
