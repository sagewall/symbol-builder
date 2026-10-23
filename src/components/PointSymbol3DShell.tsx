import Color from "@arcgis/core/Color.js";
import type Collection from "@arcgis/core/core/Collection.js";
import type IconSymbol3DLayer from "@arcgis/core/symbols/IconSymbol3DLayer.js";
import type ObjectSymbol3DLayer from "@arcgis/core/symbols/ObjectSymbol3DLayer.js";
import PointSymbol3D from "@arcgis/core/symbols/PointSymbol3D.js";
import type TextSymbol3DLayer from "@arcgis/core/symbols/TextSymbol3DLayer.js";
import LineCallout3D from "@arcgis/core/symbols/callouts/LineCallout3D.js";
import Symbol3DVerticalOffset from "@arcgis/core/symbols/support/Symbol3DVerticalOffset.js";
import "@esri/calcite-components/components/calcite-panel";
import "@esri/calcite-components/components/calcite-shell";
import "@esri/calcite-components/components/calcite-shell-panel";
import "@esri/calcite-components/components/calcite-tab";
import "@esri/calcite-components/components/calcite-tab-nav";
import "@esri/calcite-components/components/calcite-tab-title";
import "@esri/calcite-components/components/calcite-tabs";
import { useState } from "react";
import PointSymbol3DCDNPanel from "./PointSymbol3DCDNPanel";
import PointSymbol3DESMPanel from "./PointSymbol3DESMPanel";
import PointSymbol3DForm from "./PointSymbol3DForm";
import PointSymbol3DJSONPanel from "./PointSymbol3DJSONPanel";
import Scene from "./Scene";
import { point } from "./lib/geometry";
import { useSymbolPreview } from "./lib/useSymbolPreview";
import {
  formStyles,
  shellPanelStyles,
  shellStyles,
  tabNavStyles,
} from "./lib/styles";

function PointSymbol3DShell(): React.ReactElement {
  const [lineCallout3D, setLineCallout3D] = useState(
    new LineCallout3D({ size: 1 }),
  );

  const [symbol3DVerticalOffset, setSymbol3DVerticalOffset] = useState(
    new Symbol3DVerticalOffset({
      maxWorldLength: 100,
      minWorldLength: 0,
      screenLength: 0,
    }),
  );

  const [pointSymbol3D, setPointSymbol3D] = useState(
    new PointSymbol3D({
      callout: lineCallout3D,
      verticalOffset: symbol3DVerticalOffset,
    }),
  );

  const { graphics, updatePreview } = useSymbolPreview(point, pointSymbol3D);

  const viewElement = <Scene graphics={graphics}></Scene>;

  const updateGraphics = (newPointSymbol3D: PointSymbol3D): void => {
    setPointSymbol3D(newPointSymbol3D);
    updatePreview(newPointSymbol3D);
  };

  const handleCalloutColorChange = (currentColor: string): void => {
    const newLineCallout3D = lineCallout3D.clone();
    newLineCallout3D.color = new Color(currentColor);
    setLineCallout3D(newLineCallout3D);

    const newPointSymbol3D = pointSymbol3D.clone();
    newPointSymbol3D.callout = newLineCallout3D;
    updateGraphics(newPointSymbol3D);
  };

  const handleCalloutSizeChange = (currentSize: string): void => {
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
    >,
  ): void => {
    const newPointSymbol3D = pointSymbol3D.clone();
    newPointSymbol3D.symbolLayers.removeAll();
    newPointSymbol3D.symbolLayers.addMany(symbolLayers);
    updateGraphics(newPointSymbol3D);
  };

  const handleVerticalOffsetMaxWorldLengthChange = (
    currentMaxWorldLength: string,
  ): void => {
    const newSymbol3DVerticalOffset = symbol3DVerticalOffset.clone();
    newSymbol3DVerticalOffset.maxWorldLength = Number(currentMaxWorldLength);
    setSymbol3DVerticalOffset(newSymbol3DVerticalOffset);

    const newPointSymbol3D = pointSymbol3D.clone();
    newPointSymbol3D.verticalOffset = newSymbol3DVerticalOffset;
    updateGraphics(newPointSymbol3D);
  };

  const handleVerticalOffsetMinWorldLengthChange = (
    currentMinWorldLength: string,
  ): void => {
    const newSymbol3DVerticalOffset = symbol3DVerticalOffset.clone();
    newSymbol3DVerticalOffset.minWorldLength = Number(currentMinWorldLength);
    setSymbol3DVerticalOffset(newSymbol3DVerticalOffset);

    const newPointSymbol3D = pointSymbol3D.clone();
    newPointSymbol3D.verticalOffset = newSymbol3DVerticalOffset;
    updateGraphics(newPointSymbol3D);
  };

  const handleVerticalOffsetScreenLengthChange = (
    currentScreenLength: string,
  ): void => {
    const newSymbol3DVerticalOffset = symbol3DVerticalOffset.clone();
    newSymbol3DVerticalOffset.screenLength = Number(currentScreenLength);
    setSymbol3DVerticalOffset(newSymbol3DVerticalOffset);

    const newPointSymbol3D = pointSymbol3D.clone();
    newPointSymbol3D.verticalOffset = newSymbol3DVerticalOffset;
    updateGraphics(newPointSymbol3D);
  };

  return (
    <>
      <calcite-shell style={shellStyles}>
        <calcite-shell-panel slot="panel-start" resizable>
          <calcite-panel>
            <div slot="header-content">Properties </div>
            <div style={formStyles}>
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
                <PointSymbol3DESMPanel
                  pointSymbol3D={pointSymbol3D}
                ></PointSymbol3DESMPanel>
              </calcite-tab>
              <calcite-tab>
                <PointSymbol3DCDNPanel
                  pointSymbol3D={pointSymbol3D}
                ></PointSymbol3DCDNPanel>
              </calcite-tab>
              <calcite-tab>
                <PointSymbol3DJSONPanel
                  pointSymbol3D={pointSymbol3D}
                ></PointSymbol3DJSONPanel>
              </calcite-tab>
            </calcite-tabs>
          </calcite-panel>
        </calcite-shell-panel>
        {viewElement}
      </calcite-shell>
    </>
  );
}

export default PointSymbol3DShell;
