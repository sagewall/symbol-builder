import type Font from "@arcgis/core/symbols/Font";
import type TextSymbol from "@arcgis/core/symbols/TextSymbol";
import "@esri/calcite-components/dist/components/calcite-block";
import "@esri/calcite-components/dist/components/calcite-input";
import "@esri/calcite-components/dist/components/calcite-input-number";
import "@esri/calcite-components/dist/components/calcite-input-text";
import "@esri/calcite-components/dist/components/calcite-label";
import "@esri/calcite-components/dist/components/calcite-option";
import "@esri/calcite-components/dist/components/calcite-select";
import "@esri/calcite-components/dist/components/calcite-slider";
import "@esri/calcite-components/dist/components/calcite-switch";
import { useState } from "react";
import {
  HORIZONTAL_ALIGNMENT_OPTIONS,
  VERTICAL_ALIGNMENT_OPTIONS,
} from "../lib/constants";
import { blockStyles, labelStyles } from "../lib/styles";
import FontForm from "./FontForm";

interface Props {
  handleAngleChange: (value: number) => void;
  handleBackgroundColorChange: (value: string) => void;
  handleBorderLineColorChange: (value: string) => void;
  handleBorderLineSizeChange: (value: string) => void;
  handleColorChange: (value: string) => void;
  handleFontChange: (value: string) => void;
  handleFontDecorationChange: (
    value: InstanceType<typeof Font>["decoration"]
  ) => void;
  handleFontSizeChange: (value: string) => void;
  handleHaloColorChange: (value: string) => void;
  handleHaloSizeChange: (value: string) => void;
  handleHorizontalAlignmentChange: (
    value: InstanceType<typeof TextSymbol>["horizontalAlignment"]
  ) => void;
  handleKerningChange: (value: boolean) => void;
  handleLineWidthChange: (value: string) => void;
  handleRotatedChange: (value: boolean) => void;
  handleTextChange: (value: string) => void;
  handleVerticalAlignmentChange: (
    value: InstanceType<typeof TextSymbol>["verticalAlignment"]
  ) => void;
  handleXOffsetChange: (value: string) => void;
  handleYOffsetChange: (value: string) => void;
}

function TextSymbolForm({
  handleAngleChange,
  handleBackgroundColorChange,
  handleBorderLineColorChange,
  handleBorderLineSizeChange,
  handleColorChange,
  handleFontChange,
  handleFontDecorationChange,
  handleFontSizeChange,
  handleHaloColorChange,
  handleHaloSizeChange,
  handleHorizontalAlignmentChange,
  handleKerningChange,
  handleLineWidthChange,
  handleRotatedChange,
  handleTextChange,
  handleVerticalAlignmentChange,
  handleXOffsetChange,
  handleYOffsetChange,
}: Props) {
  const [angle, setAngle] = useState(0);
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [borderLineColor, setBorderLineColor] = useState("#ffffff");
  const [borderLineSize, setBorderLineSize] = useState("0");
  const [color, setColor] = useState("#000000");
  const [haloColor, setHaloColor] = useState("#ffffff");
  const [haloSize, setHaloSize] = useState("0");
  const [horizontalAlignment, setHorizontalAlignment] = useState("center");
  const [kerning, setKerning] = useState(false);
  const [lineWidth, setLineWidth] = useState("1");
  const [rotated, setRotated] = useState(false);
  const [text, setText] = useState("Hello World!");
  const [verticalAlignment, setVerticalAlignment] = useState("baseline");
  const [xoffset, setXoffset] = useState("0");
  const [yoffset, setYoffset] = useState("0");

  return (
    <>
      <calcite-label layout="default" style={labelStyles}>
        text
        <calcite-input-text
          label={"text input"}
          oncalciteInputTextChange={(event) => {
            setText(event.target.value);
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
            setAngle(event.target.value as number);
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
            if (event.target.value) {
              setBackgroundColor(event.target.value.toString());
            }
            handleBackgroundColorChange(event.target.value as string);
          }}
          type="color"
          value={backgroundColor}
        ></calcite-input>
      </calcite-label>

      <calcite-label layout="default" style={labelStyles}>
        borderLineColor
        <calcite-input
          oncalciteInputInput={(event) => {
            if (event.target.value) {
              setBorderLineColor(event.target.value.toString());
            }
            handleBorderLineColorChange(event.target.value as string);
          }}
          type="color"
          value={borderLineColor}
        ></calcite-input>
      </calcite-label>

      <calcite-label layout="default" style={labelStyles}>
        borderLineSize
        <calcite-input-number
          label={"borderLineSize input"}
          min={0}
          oncalciteInputNumberChange={(event) => {
            setBorderLineSize(event.target.value);
            handleBorderLineSizeChange(event.target.value);
          }}
          value={borderLineSize}
        ></calcite-input-number>
      </calcite-label>

      <calcite-label layout="default" style={labelStyles}>
        color
        <calcite-input
          oncalciteInputInput={(event) => {
            if (event.target.value) {
              setColor(event.target.value.toString());
            }
            handleColorChange(event.target.value as string);
          }}
          type="color"
          value={color}
        ></calcite-input>
      </calcite-label>

      <calcite-block style={blockStyles} collapsible heading={"font"}>
        <FontForm
          handleDecorationChange={handleFontDecorationChange}
          handleFontChange={handleFontChange}
          handleSizeChange={handleFontSizeChange}
        ></FontForm>
      </calcite-block>

      <calcite-label layout="default" style={labelStyles}>
        haloColor
        <calcite-input
          oncalciteInputInput={(event) => {
            if (event.target.value) {
              setHaloColor(event.target.value.toString());
            }
            handleHaloColorChange(event.target.value as string);
          }}
          type="color"
          value={haloColor}
        ></calcite-input>
      </calcite-label>

      <calcite-label layout="default" style={labelStyles}>
        haloSize
        <calcite-input-number
          label={"haloSize input"}
          min={0}
          oncalciteInputNumberChange={(event) => {
            setHaloSize(event.target.value);
            handleHaloSizeChange(event.target.value);
          }}
          value={haloSize}
        ></calcite-input-number>
      </calcite-label>

      <calcite-label layout="default" style={labelStyles}>
        horizontalAlignment
        <calcite-select
          label={"horizontalAlignment selection"}
          oncalciteSelectChange={(event) => {
            setHorizontalAlignment(event.target.value);
            handleHorizontalAlignmentChange(
              event.target.value as InstanceType<
                typeof TextSymbol
              >["horizontalAlignment"]
            );
          }}
          value={horizontalAlignment}
        >
          {HORIZONTAL_ALIGNMENT_OPTIONS.map((option, index) => (
            <calcite-option key={index}>{option}</calcite-option>
          ))}
        </calcite-select>
      </calcite-label>

      <calcite-label layout="default" style={labelStyles}>
        verticalAlignment
        <calcite-select
          label={"verticalAlignment selection"}
          oncalciteSelectChange={(event) => {
            setVerticalAlignment(event.target.value);
            handleVerticalAlignmentChange(
              event.target.value as InstanceType<
                typeof TextSymbol
              >["verticalAlignment"]
            );
          }}
          value={verticalAlignment}
        >
          {VERTICAL_ALIGNMENT_OPTIONS.map((option, index) => (
            <calcite-option key={index}>{option}</calcite-option>
          ))}
        </calcite-select>
      </calcite-label>

      <calcite-label layout="default" style={labelStyles}>
        kerning
        <calcite-switch
          oncalciteSwitchChange={(event) => {
            setKerning(event.target.checked);
            handleKerningChange(event.target.checked);
          }}
          value={kerning}
        ></calcite-switch>
      </calcite-label>

      <calcite-label layout="default" style={labelStyles}>
        lineWidth
        <calcite-input-number
          label={"lineWidth input"}
          min={0}
          oncalciteInputNumberChange={(event) => {
            setLineWidth(event.target.value);
            handleLineWidthChange(event.target.value);
          }}
          value={lineWidth}
        ></calcite-input-number>
      </calcite-label>

      <calcite-label layout="default" style={labelStyles}>
        rotated
        <calcite-switch
          oncalciteSwitchChange={(event) => {
            setRotated(event.target.checked);
            handleRotatedChange(event.target.checked);
          }}
          value={rotated}
        ></calcite-switch>
      </calcite-label>

      <calcite-label layout="default" style={labelStyles}>
        xoffset
        <calcite-input-number
          label={"xoffset input"}
          oncalciteInputNumberChange={(event) => {
            setXoffset(event.target.value);
            handleXOffsetChange(event.target.value);
          }}
          value={xoffset}
        ></calcite-input-number>
      </calcite-label>

      <calcite-label layout="default" style={labelStyles}>
        yoffset
        <calcite-input-number
          label={"yoffset input"}
          oncalciteInputNumberChange={(event) => {
            setYoffset(event.target.value);
            handleYOffsetChange(event.target.value);
          }}
          value={yoffset}
        ></calcite-input-number>
      </calcite-label>
    </>
  );
}

export default TextSymbolForm;
