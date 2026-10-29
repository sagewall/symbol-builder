import Color from "@arcgis/core/Color.js";
import Font from "@arcgis/core/symbols/Font.js";
import TextSymbol from "@arcgis/core/symbols/TextSymbol.js";
import "@esri/calcite-components/dist/components/calcite-panel";
import "@esri/calcite-components/dist/components/calcite-shell";
import "@esri/calcite-components/dist/components/calcite-shell-panel";
import "@esri/calcite-components/dist/components/calcite-tab";
import "@esri/calcite-components/dist/components/calcite-tab-nav";
import "@esri/calcite-components/dist/components/calcite-tab-title";
import "@esri/calcite-components/dist/components/calcite-tabs";
import { useRef, useState } from "react";
import Map from "./Map";
import TextSymbolCDNPanel from "./TextSymbolCDNPanel";
import TextSymbolESMPanel from "./TextSymbolESMPanel";
import TextSymbolForm from "./TextSymbolForm";
import TextSymbolJSONPanel from "./TextSymbolJSONPanel";
import { point } from "./lib/geometry";
import { useSymbolPreview } from "./lib/useSymbolPreview";
import {
  formStyles,
  shellPanelStyles,
  shellStyles,
  tabNavStyles,
} from "./lib/styles";
import type { FontData } from "./lib/types";

function TextSymbolShell(): React.ReactElement {
  const [font, setFont] = useState(
    new Font({ family: "Abril Fatface", size: 12 }),
  );

  const [textSymbol, setTextSymbol] = useState(
    new TextSymbol({
      backgroundColor: [255, 255, 255, 0],
      borderLineColor: [255, 255, 255, 0],
      borderLineSize: 0,
      font,
      haloColor: "#ffffff",
      haloSize: 0,
      kerning: false,
      text: "Hello World!",
    }),
  );

  const symbolRef = useRef(textSymbol);
  const { graphics, updatePreview } = useSymbolPreview(point, textSymbol);

  const viewElement = <Map graphics={graphics}></Map>;

  const updateGraphics = (newTextSymbol: TextSymbol): void => {
    symbolRef.current = newTextSymbol;
    setTextSymbol(newTextSymbol);
    updatePreview(newTextSymbol);
  };

  const handleAngleChange = (currentAngle: number): void => {
    const newTextSymbol = symbolRef.current.clone();
    newTextSymbol.angle = currentAngle;
    updateGraphics(newTextSymbol);
  };

  const handleBackgroundColorChange = (
    currentBackgroundColor: string,
  ): void => {
    const newTextSymbol = symbolRef.current.clone();
    const color = new Color(currentBackgroundColor);
    color.a = newTextSymbol.backgroundColor?.a ?? 1;
    newTextSymbol.backgroundColor = color;
    updateGraphics(newTextSymbol);
  };

  const handleBackgroundOpacityChange = (currentOpacity: number): void => {
    const newTextSymbol = symbolRef.current.clone();
    const color = newTextSymbol.backgroundColor?.clone() ?? new Color("#ffffff");
    color.a = currentOpacity;
    newTextSymbol.backgroundColor = color;
    updateGraphics(newTextSymbol);
  };

  const handleBorderLineColorChange = (
    currentBorderLineColor: string,
  ): void => {
    const newTextSymbol = symbolRef.current.clone();
    const color = new Color(currentBorderLineColor);
    color.a = newTextSymbol.borderLineColor?.a ?? 1;
    newTextSymbol.borderLineColor = color;
    updateGraphics(newTextSymbol);
  };

  const handleBorderLineOpacityChange = (currentOpacity: number): void => {
    const newTextSymbol = symbolRef.current.clone();
    const color =
      newTextSymbol.borderLineColor?.clone() ?? new Color("#ffffff");
    color.a = currentOpacity;
    newTextSymbol.borderLineColor = color;
    updateGraphics(newTextSymbol);
  };

  const handleBorderLineSizeChange = (currentBorderLineSize: string): void => {
    const newTextSymbol = symbolRef.current.clone();
    newTextSymbol.borderLineSize = Number(currentBorderLineSize);
    updateGraphics(newTextSymbol);
  };

  const handleColorChange = (currentColor: string): void => {
    const newTextSymbol = symbolRef.current.clone();
    newTextSymbol.color = new Color(currentColor);
    updateGraphics(newTextSymbol);
  };

  const handleFontChange = (currentFontData: string): void => {
    const currentFontDataObject = JSON.parse(currentFontData) as FontData;
    const newTextSymbol = symbolRef.current.clone();
    newTextSymbol.font.family = currentFontDataObject.font.family;
    newTextSymbol.font.style = currentFontDataObject.font.style;
    newTextSymbol.font.weight = currentFontDataObject.font.weight;
    setFont(newTextSymbol.font);
    updateGraphics(newTextSymbol);
  };

  const handleFontPropertiesChange = (
    value: Partial<Pick<Font, "family" | "style" | "weight">>,
  ) => {
    const next = symbolRef.current.clone();
    next.font.set(value);
    setFont(next.font);
    updateGraphics(next);
  };

  const handleFontDecorationChange = (
    currentFontDecoration: InstanceType<typeof Font>["decoration"],
  ): void => {
    const newTextSymbol = symbolRef.current.clone();
    newTextSymbol.font.decoration = currentFontDecoration;
    setFont(newTextSymbol.font);
    updateGraphics(newTextSymbol);
  };

  const handleFontSizeChange = (currentFontSize: string): void => {
    const newTextSymbol = symbolRef.current.clone();
    newTextSymbol.font.size = Number(currentFontSize);
    setFont(newTextSymbol.font);
    updateGraphics(newTextSymbol);
  };

  const handleHaloColorChange = (currentHaloColor: string): void => {
    const newTextSymbol = symbolRef.current.clone();
    newTextSymbol.haloColor = new Color(currentHaloColor);
    updateGraphics(newTextSymbol);
  };

  const handleHaloSizeChange = (currentHaloSize: string): void => {
    const newTextSymbol = symbolRef.current.clone();
    newTextSymbol.haloSize = Number(currentHaloSize);
    updateGraphics(newTextSymbol);
  };

  const handleHorizontalAlignmentChange = (
    currentHorizontalAlignment: InstanceType<
      typeof TextSymbol
    >["horizontalAlignment"],
  ): void => {
    const newTextSymbol = symbolRef.current.clone();
    newTextSymbol.horizontalAlignment = currentHorizontalAlignment;
    updateGraphics(newTextSymbol);
  };

  const handleKerningChange = (currentKerning: boolean): void => {
    const newTextSymbol = symbolRef.current.clone();
    newTextSymbol.kerning = currentKerning;
    updateGraphics(newTextSymbol);
  };

  const handleLineHeightChange = (value: string): void => {
    const newTextSymbol = symbolRef.current.clone();
    newTextSymbol.lineHeight = Number(value);
    updateGraphics(newTextSymbol);
  };

  const handleLineWidthChange = (currentLineWidth: string): void => {
    const newTextSymbol = symbolRef.current.clone();
    newTextSymbol.lineWidth = Number(currentLineWidth);
    updateGraphics(newTextSymbol);
  };

  const handleRotatedChange = (currentRotated: boolean): void => {
    const newTextSymbol = symbolRef.current.clone();
    newTextSymbol.rotated = currentRotated;
    updateGraphics(newTextSymbol);
  };

  const handleTextChange = (currentText: string): void => {
    const newTextSymbol = symbolRef.current.clone();
    newTextSymbol.text = currentText;
    updateGraphics(newTextSymbol);
  };

  const handleVerticalAlignmentChange = (
    currentVerticalAlignment: InstanceType<
      typeof TextSymbol
    >["verticalAlignment"],
  ): void => {
    const newTextSymbol = symbolRef.current.clone();
    newTextSymbol.verticalAlignment = currentVerticalAlignment;
    updateGraphics(newTextSymbol);
  };

  const handleXOffsetChange = (currentXOffset: string): void => {
    const newTextSymbol = symbolRef.current.clone();
    newTextSymbol.xoffset = Number(currentXOffset);
    updateGraphics(newTextSymbol);
  };

  const handleYOffsetChange = (currentYOffset: string): void => {
    const newTextSymbol = symbolRef.current.clone();
    newTextSymbol.yoffset = Number(currentYOffset);
    updateGraphics(newTextSymbol);
  };

  return (
    <>
      <calcite-shell style={shellStyles}>
        <calcite-shell-panel slot="panel-start" resizable>
          <calcite-panel>
            <div slot="header-content">Properties </div>
            <div style={formStyles}>
              <TextSymbolForm
                font={textSymbol.font}
                lineWidth={String(textSymbol.lineWidth)}
                backgroundOpacity={textSymbol.backgroundColor?.a ?? 1}
                borderLineOpacity={textSymbol.borderLineColor?.a ?? 1}
                handleFontPropertiesChange={handleFontPropertiesChange}
                handleAngleChange={handleAngleChange}
                handleBackgroundColorChange={handleBackgroundColorChange}
                handleBackgroundOpacityChange={handleBackgroundOpacityChange}
                handleBorderLineColorChange={handleBorderLineColorChange}
                handleBorderLineOpacityChange={handleBorderLineOpacityChange}
                handleBorderLineSizeChange={handleBorderLineSizeChange}
                handleColorChange={handleColorChange}
                handleFontChange={handleFontChange}
                handleFontDecorationChange={handleFontDecorationChange}
                handleFontSizeChange={handleFontSizeChange}
                handleHaloColorChange={handleHaloColorChange}
                handleHaloSizeChange={handleHaloSizeChange}
                handleHorizontalAlignmentChange={
                  handleHorizontalAlignmentChange
                }
                handleKerningChange={handleKerningChange}
                handleLineHeightChange={handleLineHeightChange}
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
                <TextSymbolESMPanel
                  textSymbol={textSymbol}
                ></TextSymbolESMPanel>
              </calcite-tab>
              <calcite-tab>
                <TextSymbolCDNPanel
                  textSymbol={textSymbol}
                ></TextSymbolCDNPanel>
              </calcite-tab>
              <calcite-tab>
                <TextSymbolJSONPanel
                  textSymbol={textSymbol}
                ></TextSymbolJSONPanel>
              </calcite-tab>
            </calcite-tabs>
          </calcite-panel>
        </calcite-shell-panel>
        {viewElement}
      </calcite-shell>
    </>
  );
}

export default TextSymbolShell;
