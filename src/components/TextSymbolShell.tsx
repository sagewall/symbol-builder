import Color from "@arcgis/core/Color";
import Graphic from "@arcgis/core/Graphic";
import Collection from "@arcgis/core/core/Collection";
import Font from "@arcgis/core/symbols/Font";
import TextSymbol from "@arcgis/core/symbols/TextSymbol";
import React, { useState } from "react";
import Header from "./Header";
import MapView from "./MapView";
import TextSymbolAMDPanel from "./TextSymbolAMDPanel";
import TextSymbolESMPanel from "./TextSymbolESMPanel";
import TextSymbolForm from "./TextSymbolForm";
import TextSymbolJSONPanel from "./TextSymbolJSONPanel";
import { point } from "./lib/geometry";
import { formStyles, shellPanelStyles, shellStyles, tabNavStyles } from "./lib/styles";
import type { FontData } from "./lib/types";

const TextSymbolShell = () => {
  const [font, setFont] = useState(new Font({ family: "Abril Fatface", size: 12 }));

  const [textSymbol, setTextSymbol] = useState(
    new TextSymbol({
      backgroundColor: [255, 255, 255, 0],
      borderLineColor: [255, 255, 255, 0],
      borderLineSize: undefined,
      font,
      haloColor: "#ffffff",
      haloSize: 0,
      kerning: false,
      text: "Hello World!"
    })
  );

  const pointGraphic = new Graphic({
    geometry: point,
    symbol: textSymbol
  });

  const graphicsCollection = new Collection();
  graphicsCollection.add(pointGraphic);

  const [graphics, setGraphics] = useState<Collection<Graphic>>(graphicsCollection);

  const view = <MapView graphics={graphics}></MapView>;

  const updateGraphics = (newTextSymbol: TextSymbol) => {
    setTextSymbol(newTextSymbol);

    const newPointGraphic = graphics.getItemAt(0)?.clone();
    if (newPointGraphic) {
      newPointGraphic.symbol = newTextSymbol;
    }
    const newGraphics = new Collection();
    newGraphics.add(newPointGraphic);
    setGraphics(newGraphics);
  };

  const handleAngleChange = (currentAngle: number) => {
    const newTextSymbol = textSymbol.clone();
    newTextSymbol.angle = Number(currentAngle);
    updateGraphics(newTextSymbol);
  };

  const handleBackgroundColorChange = (currentBackgroundColor: string) => {
    const newTextSymbol = textSymbol.clone();
    newTextSymbol.backgroundColor = new Color(currentBackgroundColor);
    updateGraphics(newTextSymbol);
  };

  const handleBorderLineColorChange = (currentBorderLineColor: string) => {
    const newTextSymbol = textSymbol.clone();
    newTextSymbol.borderLineColor = new Color(currentBorderLineColor);
    updateGraphics(newTextSymbol);
  };

  const handleBorderLineSizeChange = (currentBorderLineSize: string) => {
    const newTextSymbol = textSymbol.clone();
    newTextSymbol.borderLineSize = Number(currentBorderLineSize);
    updateGraphics(newTextSymbol);
  };

  const handleColorChange = (currentColor: string) => {
    const newTextSymbol = textSymbol.clone();
    newTextSymbol.color = new Color(currentColor);
    updateGraphics(newTextSymbol);
  };

  const handleFontChange = (currentFontData: string) => {
    const currentFontDataObject = JSON.parse(currentFontData) as FontData;
    const newTextSymbol = textSymbol.clone();
    newTextSymbol.font.family = currentFontDataObject.font.family;
    newTextSymbol.font.style = currentFontDataObject.font.style;
    newTextSymbol.font.weight = currentFontDataObject.font.weight;
    setFont(newTextSymbol.font);
    updateGraphics(newTextSymbol);
  };

  const handleFontDecorationChange = (
    currentFontDecoration: InstanceType<typeof Font>["decoration"]
  ) => {
    const newTextSymbol = textSymbol.clone();
    newTextSymbol.font.decoration = currentFontDecoration;
    setFont(newTextSymbol.font);
    updateGraphics(newTextSymbol);
  };

  const handleFontSizeChange = (currentFontSize: string) => {
    const newTextSymbol = textSymbol.clone();
    newTextSymbol.font.size = Number(currentFontSize);
    setFont(newTextSymbol.font);
    updateGraphics(newTextSymbol);
  };

  const handleHaloColorChange = (currentHaloColor: string) => {
    const newTextSymbol = textSymbol.clone();
    newTextSymbol.haloColor = new Color(currentHaloColor);
    updateGraphics(newTextSymbol);
  };

  const handleHaloSizeChange = (currentHaloSize: string) => {
    const newTextSymbol = textSymbol.clone();
    newTextSymbol.haloSize = Number(currentHaloSize);
    updateGraphics(newTextSymbol);
  };

  const handleHorizontalAlignmentChange = (
    currentHorizontalAlignment: InstanceType<typeof TextSymbol>["horizontalAlignment"]
  ) => {
    const newTextSymbol = textSymbol.clone();
    newTextSymbol.horizontalAlignment = currentHorizontalAlignment;
    updateGraphics(newTextSymbol);
  };

  const handleKerningChange = (currentKerning: boolean) => {
    const newTextSymbol = textSymbol.clone();
    newTextSymbol.kerning = currentKerning;
    updateGraphics(newTextSymbol);
  };

  const handleLineWidthChange = (currentLineWidth: string) => {
    const newTextSymbol = textSymbol.clone();
    newTextSymbol.lineWidth = Number(currentLineWidth);
    updateGraphics(newTextSymbol);
  };

  const handleRotatedChange = (currentRotated: boolean) => {
    const newTextSymbol = textSymbol.clone();
    newTextSymbol.rotated = currentRotated;
    updateGraphics(newTextSymbol);
  };

  const handleTextChange = (currentText: string) => {
    const newTextSymbol = textSymbol.clone();
    newTextSymbol.text = currentText;
    updateGraphics(newTextSymbol);
  };

  const handleVerticalAlignmentChange = (
    currentVerticalAlignment: InstanceType<typeof TextSymbol>["verticalAlignment"]
  ) => {
    const newTextSymbol = textSymbol.clone();
    newTextSymbol.verticalAlignment = currentVerticalAlignment;
    updateGraphics(newTextSymbol);
  };

  const handleXOffsetChange = (currentXOffset: string) => {
    const newTextSymbol = textSymbol.clone();
    newTextSymbol.xoffset = Number(currentXOffset);
    updateGraphics(newTextSymbol);
  };

  const handleYOffsetChange = (currentYOffset: string) => {
    const newTextSymbol = textSymbol.clone();
    newTextSymbol.yoffset = Number(currentYOffset);
    updateGraphics(newTextSymbol);
  };

  return (
    <React.Fragment>
      <calcite-shell style={shellStyles}>
        <Header title="TextSymbol" backButton></Header>
        <calcite-shell-panel slot="panel-start" position="start" resizable>
          <calcite-panel>
            <div slot="header-content">Properties </div>
            <div style={formStyles}>
              <TextSymbolForm
                handleAngleChange={handleAngleChange}
                handleBackgroundColorChange={handleBackgroundColorChange}
                handleBorderLineColorChange={handleBorderLineColorChange}
                handleBorderLineSizeChange={handleBorderLineSizeChange}
                handleColorChange={handleColorChange}
                handleFontChange={handleFontChange}
                handleFontDecorationChange={handleFontDecorationChange}
                handleFontSizeChange={handleFontSizeChange}
                handleHaloColorChange={handleHaloColorChange}
                handleHaloSizeChange={handleHaloSizeChange}
                handleHorizontalAlignmentChange={handleHorizontalAlignmentChange}
                handleKerningChange={handleKerningChange}
                handleLineWidthChange={handleLineWidthChange}
                handleRotatedChange={handleRotatedChange}
                handleTextChange={handleTextChange}
                handleVerticalAlignmentChange={handleVerticalAlignmentChange}
                handleXOffsetChange={handleXOffsetChange}
                handleYOffsetChange={handleYOffsetChange}
              ></TextSymbolForm>
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
                <TextSymbolESMPanel textSymbol={textSymbol}></TextSymbolESMPanel>
              </calcite-tab>
              <calcite-tab>
                <TextSymbolAMDPanel textSymbol={textSymbol}></TextSymbolAMDPanel>
              </calcite-tab>
              <calcite-tab>
                <TextSymbolJSONPanel textSymbol={textSymbol}></TextSymbolJSONPanel>
              </calcite-tab>
            </calcite-tabs>
          </calcite-panel>
        </calcite-shell-panel>
        {view}
      </calcite-shell>
    </React.Fragment>
  );
};

export default TextSymbolShell;
