import type Font from "@arcgis/core/symbols/Font.js";
import type TextSymbol from "@arcgis/core/symbols/TextSymbol.js";
import "@esri/calcite-components/dist/components/calcite-block";
import "@esri/calcite-components/dist/components/calcite-input";
import "@esri/calcite-components/dist/components/calcite-input-number";
import "@esri/calcite-components/dist/components/calcite-input-text";
import "@esri/calcite-components/dist/components/calcite-label";
import "@esri/calcite-components/dist/components/calcite-option";
import "@esri/calcite-components/dist/components/calcite-select";
import "@esri/calcite-components/dist/components/calcite-slider";
import "@esri/calcite-components/dist/components/calcite-switch";
import { useEffect, useRef } from "react";
import FontForm from "./FontForm";
import {
  horizontalAlignmentOptions,
  verticalAlignmentOptions,
} from "./lib/constants";
import { blockStyles, labelStyles } from "./lib/styles";

interface Props {
  symbol: TextSymbol;
  handleFontPropertiesChange: (
    value: Partial<Pick<Font, "family" | "style" | "weight">>,
  ) => void;
  handleAngleChange: (value: number) => void;
  handleBackgroundColorChange: (value: string) => void;
  handleBackgroundOpacityChange: (value: number) => void;
  handleBorderLineColorChange: (value: string) => void;
  handleBorderLineOpacityChange: (value: number) => void;
  handleBorderLineSizeChange: (value: string) => void;
  handleColorChange: (value: string) => void;
  handleFontChange: (value: string) => void;
  handleFontDecorationChange: (
    value: InstanceType<typeof Font>["decoration"],
  ) => void;
  handleFontSizeChange: (value: string) => void;
  handleHaloColorChange: (value: string) => void;
  handleHaloSizeChange: (value: string) => void;
  handleHorizontalAlignmentChange: (
    value: InstanceType<typeof TextSymbol>["horizontalAlignment"],
  ) => void;
  handleKerningChange: (value: boolean) => void;
  handleLineHeightChange: (value: string) => void;
  handleLineWidthChange: (value: string) => void;
  handleRotatedChange: (value: boolean) => void;
  handleTextChange: (value: string) => void;
  handleVerticalAlignmentChange: (
    value: InstanceType<typeof TextSymbol>["verticalAlignment"],
  ) => void;
  handleXOffsetChange: (value: string) => void;
  handleYOffsetChange: (value: string) => void;
}

function TextSymbolForm({
  symbol,
  handleFontPropertiesChange,
  handleAngleChange,
  handleBackgroundColorChange,
  handleBackgroundOpacityChange,
  handleBorderLineColorChange,
  handleBorderLineOpacityChange,
  handleBorderLineSizeChange,
  handleColorChange,
  handleFontChange,
  handleFontDecorationChange,
  handleFontSizeChange,
  handleHaloColorChange,
  handleHaloSizeChange,
  handleHorizontalAlignmentChange,
  handleKerningChange,
  handleLineHeightChange,
  handleLineWidthChange,
  handleRotatedChange,
  handleTextChange,
  handleVerticalAlignmentChange,
  handleXOffsetChange,
  handleYOffsetChange,
}: Props): React.ReactElement {
  const lineHeightInput = useRef<HTMLCalciteInputNumberElement>(null);
  useEffect(() => {
    // SDK normalization can leave the prop unchanged after the input changes.
    if (lineHeightInput.current) {
      lineHeightInput.current.value = String(symbol.lineHeight);
    }
  }, [symbol]);

  const {
    angle,
    font,
    horizontalAlignment,
    kerning,
    rotated,
    text,
    verticalAlignment,
  } = symbol;

  return (
    <>
      <calcite-label layout="default" style={labelStyles}>
        text
        <calcite-input-text
          label={"text input"}
          oncalciteInputTextChange={(event) => {
            handleTextChange(event.target.value);
          }}
          value={text}
        ></calcite-input-text>
      </calcite-label>

      <calcite-label layout="default" style={labelStyles}>
        angle
        <calcite-slider
          labelHandles={true}
          labelTicks={true}
          max={360}
          min={0}
          oncalciteSliderChange={(event) => {
            handleAngleChange(event.target.value as number);
          }}
          step={1}
          ticks={180}
          value={angle}
        ></calcite-slider>
      </calcite-label>

      <calcite-label layout="default" style={labelStyles}>
        backgroundColor
        <calcite-input
          oncalciteInputInput={(event) => {
            handleBackgroundColorChange(event.target.value);
          }}
          type="color"
          value={symbol.backgroundColor?.toHex() ?? ""}
        ></calcite-input>
      </calcite-label>

      <calcite-label layout="default" style={labelStyles}>
        backgroundColor opacity
        <calcite-slider
          labelHandles={true}
          max={1}
          min={0}
          oncalciteSliderChange={(event) => {
            handleBackgroundOpacityChange(event.target.value as number);
          }}
          step={0.01}
          value={symbol.backgroundColor?.a ?? 0}
        ></calcite-slider>
      </calcite-label>

      <calcite-label layout="default" style={labelStyles}>
        borderLineColor
        <calcite-input
          oncalciteInputInput={(event) => {
            handleBorderLineColorChange(event.target.value);
          }}
          type="color"
          value={symbol.borderLineColor?.toHex() ?? ""}
        ></calcite-input>
      </calcite-label>

      <calcite-label layout="default" style={labelStyles}>
        borderLineColor opacity
        <calcite-slider
          labelHandles={true}
          max={1}
          min={0}
          oncalciteSliderChange={(event) => {
            handleBorderLineOpacityChange(event.target.value as number);
          }}
          step={0.01}
          value={symbol.borderLineColor?.a ?? 0}
        ></calcite-slider>
      </calcite-label>

      <calcite-label layout="default" style={labelStyles}>
        borderLineSize
        <calcite-input-number
          label={"borderLineSize input"}
          min={0}
          oncalciteInputNumberChange={(event) => {
            handleBorderLineSizeChange(event.target.value);
          }}
          value={
            symbol.borderLineSize == null ? "" : String(symbol.borderLineSize)
          }
        ></calcite-input-number>
      </calcite-label>

      <calcite-label layout="default" style={labelStyles}>
        color
        <calcite-input
          oncalciteInputInput={(event) => {
            handleColorChange(event.target.value);
          }}
          type="color"
          value={symbol.color?.toHex() ?? ""}
        ></calcite-input>
      </calcite-label>

      <calcite-block style={blockStyles} expandable heading={"font"}>
        <FontForm
          font={font}
          handlePropertiesChange={handleFontPropertiesChange}
          handleDecorationChange={handleFontDecorationChange}
          handleFontChange={handleFontChange}
          handleSizeChange={handleFontSizeChange}
        ></FontForm>
      </calcite-block>

      <calcite-label layout="default" style={labelStyles}>
        haloColor
        <calcite-input
          oncalciteInputInput={(event) => {
            handleHaloColorChange(event.target.value);
          }}
          type="color"
          value={symbol.haloColor?.toHex() ?? ""}
        ></calcite-input>
      </calcite-label>

      <calcite-label layout="default" style={labelStyles}>
        haloSize
        <calcite-input-number
          label={"haloSize input"}
          min={0}
          oncalciteInputNumberChange={(event) => {
            handleHaloSizeChange(event.target.value);
          }}
          value={symbol.haloSize == null ? "" : String(symbol.haloSize)}
        ></calcite-input-number>
      </calcite-label>

      <calcite-label layout="default" style={labelStyles}>
        horizontalAlignment
        <calcite-select
          label={"horizontalAlignment selection"}
          oncalciteSelectChange={(event) => {
            handleHorizontalAlignmentChange(
              event.target.value as InstanceType<
                typeof TextSymbol
              >["horizontalAlignment"],
            );
          }}
          value={horizontalAlignment}
        >
          {horizontalAlignmentOptions.map((option, index) => (
            <calcite-option key={index}>{option}</calcite-option>
          ))}
        </calcite-select>
      </calcite-label>

      <calcite-label layout="default" style={labelStyles}>
        verticalAlignment
        <calcite-select
          label={"verticalAlignment selection"}
          oncalciteSelectChange={(event) => {
            handleVerticalAlignmentChange(
              event.target.value as InstanceType<
                typeof TextSymbol
              >["verticalAlignment"],
            );
          }}
          value={verticalAlignment}
        >
          {verticalAlignmentOptions.map((option, index) => (
            <calcite-option key={index}>{option}</calcite-option>
          ))}
        </calcite-select>
      </calcite-label>

      <calcite-label layout="default" style={labelStyles}>
        kerning
        <calcite-switch
          checked={kerning}
          oncalciteSwitchChange={(event) => {
            handleKerningChange(event.target.checked);
          }}
        ></calcite-switch>
      </calcite-label>

      <calcite-label layout="default" style={labelStyles}>
        lineHeight
        <calcite-input-number
          ref={lineHeightInput}
          label="lineHeight input"
          min={0.1}
          max={4}
          step={0.1}
          oncalciteInputNumberChange={(event) => {
            handleLineHeightChange(event.target.value);
          }}
          value={String(symbol.lineHeight)}
        ></calcite-input-number>
      </calcite-label>

      <calcite-label layout="default" style={labelStyles}>
        lineWidth
        <calcite-input-number
          label={"lineWidth input"}
          min={0}
          oncalciteInputNumberChange={(event) => {
            handleLineWidthChange(event.target.value);
          }}
          value={String(symbol.lineWidth)}
        ></calcite-input-number>
      </calcite-label>

      <calcite-label layout="default" style={labelStyles}>
        rotated
        <calcite-switch
          checked={rotated}
          oncalciteSwitchChange={(event) => {
            handleRotatedChange(event.target.checked);
          }}
        ></calcite-switch>
      </calcite-label>

      <calcite-label layout="default" style={labelStyles}>
        xoffset
        <calcite-input-number
          label={"xoffset input"}
          oncalciteInputNumberChange={(event) => {
            handleXOffsetChange(event.target.value);
          }}
          value={String(symbol.xoffset)}
        ></calcite-input-number>
      </calcite-label>

      <calcite-label layout="default" style={labelStyles}>
        yoffset
        <calcite-input-number
          label={"yoffset input"}
          oncalciteInputNumberChange={(event) => {
            handleYOffsetChange(event.target.value);
          }}
          value={String(symbol.yoffset)}
        ></calcite-input-number>
      </calcite-label>
    </>
  );
}

export default TextSymbolForm;
