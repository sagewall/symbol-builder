import Color from "@arcgis/core/Color";
import Graphic from "@arcgis/core/Graphic";
import Collection from "@arcgis/core/core/Collection";
import type IconSymbol3DLayer from "@arcgis/core/symbols/IconSymbol3DLayer";
import type ObjectSymbol3DLayer from "@arcgis/core/symbols/ObjectSymbol3DLayer";
import PointSymbol3D from "@arcgis/core/symbols/PointSymbol3D";
import type TextSymbol3DLayer from "@arcgis/core/symbols/TextSymbol3DLayer";
import LineCallout3D from "@arcgis/core/symbols/callouts/LineCallout3D";
import Symbol3DVerticalOffset from "@arcgis/core/symbols/support/Symbol3DVerticalOffset";
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
import PointSymbol3DAMDPanel from "./PointSymbol3DAMDPanel";
import PointSymbol3DESMPanel from "./PointSymbol3DESMPanel";
import PointSymbol3DForm from "./PointSymbol3DForm";
import PointSymbol3DJSONPanel from "./PointSymbol3DJSONPanel";
import SceneView from "./SceneView";
import { point } from "./lib/geometry";
import { formStyles, shellStyles, tabNavStyles } from "./lib/styles";

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

  const view = <SceneView graphics={graphics} />;

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
      <CalciteShell style={shellStyles}>
        <Header title="PointSymbol3D"></Header>
        <CalciteShellPanel slot="panel-start" position="start" resizable>
          <CalcitePanel>
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
          </CalcitePanel>
        </CalciteShellPanel>

        <CalciteShellPanel slot="panel-end" position="end" resizable widthScale="l">
          <CalcitePanel>
            <CalciteTabs>
              <CalciteTabNav slot="title-group" style={tabNavStyles}>
                <CalciteTabTitle>ESM</CalciteTabTitle>
                <CalciteTabTitle>AMD</CalciteTabTitle>
                <CalciteTabTitle>JSON</CalciteTabTitle>
              </CalciteTabNav>
              <CalciteTab>
                <PointSymbol3DESMPanel pointSymbol3D={pointSymbol3D} />
              </CalciteTab>
              <CalciteTab>
                <PointSymbol3DAMDPanel pointSymbol3D={pointSymbol3D} />
              </CalciteTab>
              <CalciteTab>
                <PointSymbol3DJSONPanel pointSymbol3D={pointSymbol3D} />
              </CalciteTab>
            </CalciteTabs>
          </CalcitePanel>
        </CalciteShellPanel>
        {view}
      </CalciteShell>
    </React.Fragment>
  );
};

export default PointSymbol3DShell;
