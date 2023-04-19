import Color from "@arcgis/core/Color";
import Graphic from "@arcgis/core/Graphic";
import Collection from "@arcgis/core/core/Collection";
import Font from "@arcgis/core/symbols/Font";
import TextSymbol from "@arcgis/core/symbols/TextSymbol";
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
import MapView from "./MapView";
import TextSymbolAMDPanel from "./TextSymbolAMDPanel";
import TextSymbolESMPanel from "./TextSymbolESMPanel";
import TextSymbolForm from "./TextSymbolForm";
import TextSymbolJSONPanel from "./TextSymbolJSONPanel";
import { point } from "./lib/geometry";
import { formStyles, shellStyles, tabsStyles } from "./lib/styles";
import {
  FontDecoration,
  FontFamily,
  FontStyle,
  FontWeight,
  HorizontalAlignment,
  VerticalAlignment
} from "./lib/types";

const TextSymbolShell = () => {
  const [font, setFont] = useState(new Font({ family: "Arial", size: 12 }));

  const [textSymbol, setTextSymbol] = useState(
    new TextSymbol({
      backgroundColor: [255, 255, 255, 0],
      borderLineColor: [0, 0, 0, 0],
      borderLineSize: undefined,
      font,
      haloColor: "#ffffff",
      haloSize: 0,
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

  const view = <MapView graphics={graphics} />;

  const updateGraphics = (newTextSymbol: TextSymbol) => {
    setTextSymbol(newTextSymbol);

    const newPointGraphic = graphics.getItemAt(0).clone();
    newPointGraphic.symbol = newTextSymbol;

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

  const handleFontDecorationChange = (currentFontDecoration: FontDecoration) => {
    const newTextSymbol = textSymbol.clone();
    newTextSymbol.font.decoration = currentFontDecoration as FontDecoration;
    setFont(newTextSymbol.font);
    updateGraphics(newTextSymbol);
  };

  const handleFontFamilyChange = (currentFontFamily: FontFamily) => {
    const newTextSymbol = textSymbol.clone();
    newTextSymbol.font.family = currentFontFamily;
    setFont(newTextSymbol.font);
    updateGraphics(newTextSymbol);
  };

  const handleFontSizeChange = (currentFontSize: string) => {
    const newTextSymbol = textSymbol.clone();
    newTextSymbol.font.size = Number(currentFontSize);
    setFont(newTextSymbol.font);
    updateGraphics(newTextSymbol);
  };

  const handleFontStyleChange = (currentFontStyle: FontStyle) => {
    const newTextSymbol = textSymbol.clone();
    newTextSymbol.font.style = currentFontStyle as FontStyle;
    setFont(newTextSymbol.font);
    updateGraphics(newTextSymbol);
  };

  const handleFontWeightChange = (currentFontWeight: FontWeight) => {
    const newTextSymbol = textSymbol.clone();
    newTextSymbol.font.weight = currentFontWeight as FontWeight;
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

  const handleHorizontalAlignmentChange = (currentHorizontalAlignment: HorizontalAlignment) => {
    const newTextSymbol = textSymbol.clone();
    newTextSymbol.horizontalAlignment = currentHorizontalAlignment as HorizontalAlignment;
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

  const handleVerticalAlignmentChange = (currentVerticalAlignment: VerticalAlignment) => {
    const newTextSymbol = textSymbol.clone();
    newTextSymbol.verticalAlignment = currentVerticalAlignment as VerticalAlignment;
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
      <CalciteShell style={shellStyles}>
        <Header title="TextSymbol"></Header>
        <CalciteShellPanel slot="panel-start" position="start" resizable>
          <CalcitePanel>
            <div slot="header-content">Properties </div>
            <div style={formStyles}>
              <TextSymbolForm
                handleAngleChange={handleAngleChange}
                handleBackgroundColorChange={handleBackgroundColorChange}
                handleBorderLineColorChange={handleBorderLineColorChange}
                handleBorderLineSizeChange={handleBorderLineSizeChange}
                handleColorChange={handleColorChange}
                handleFontDecorationChange={handleFontDecorationChange}
                handleFontFamilyChange={handleFontFamilyChange}
                handleFontSizeChange={handleFontSizeChange}
                handleFontStyleChange={handleFontStyleChange}
                handleFontWeightChange={handleFontWeightChange}
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
              />
            </div>
          </CalcitePanel>
        </CalciteShellPanel>

        <CalciteShellPanel slot="panel-end" position="end" resizable widthScale="l">
          <CalcitePanel>
            <CalciteTabs style={tabsStyles}>
              <CalciteTabNav slot="title-group">
                <CalciteTabTitle>ESM</CalciteTabTitle>
                <CalciteTabTitle>AMD</CalciteTabTitle>
                <CalciteTabTitle>JSON</CalciteTabTitle>
              </CalciteTabNav>
              <CalciteTab>
                <TextSymbolESMPanel textSymbol={textSymbol} />
              </CalciteTab>
              <CalciteTab>
                <TextSymbolAMDPanel textSymbol={textSymbol} />
              </CalciteTab>
              <CalciteTab>
                <TextSymbolJSONPanel textSymbol={textSymbol} />
              </CalciteTab>
            </CalciteTabs>
          </CalcitePanel>
        </CalciteShellPanel>
        {view}
      </CalciteShell>
    </React.Fragment>
  );
};

export default TextSymbolShell;
