import type Font from "@arcgis/core/symbols/Font";
import type TextSymbol from "@arcgis/core/symbols/TextSymbol";
import {
  CalciteBlock,
  CalciteInput,
  CalciteInputNumber,
  CalciteInputText,
  CalciteLabel,
  CalciteOption,
  CalciteSelect,
  CalciteSlider,
  CalciteSwitch
} from "@esri/calcite-components-react";
import React, { useState } from "react";
import FontForm from "./FontForm";
import { HORIZONTAL_ALIGNMENT_OPTIONS, VERTICAL_ALIGNMENT_OPTIONS } from "./lib/constants";
import { blockStyles, labelStyles } from "./lib/styles";

interface Props {
  handleAngleChange: (value: number) => void;
  handleBackgroundColorChange: (value: string) => void;
  handleBorderLineColorChange: (value: string) => void;
  handleBorderLineSizeChange: (value: string) => void;
  handleColorChange: (value: string) => void;
  handleFontDecorationChange: (value: InstanceType<typeof Font>["decoration"]) => void;
  handleFontFamilyChange: (value: InstanceType<typeof Font>["family"]) => void;
  handleFontSizeChange: (value: string) => void;
  handleFontStyleChange: (value: InstanceType<typeof Font>["style"]) => void;
  handleFontWeightChange: (value: InstanceType<typeof Font>["weight"]) => void;
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

const TextSymbolForm = ({
  handleAngleChange,
  handleBackgroundColorChange,
  handleBorderLineColorChange,
  handleBorderLineSizeChange,
  handleColorChange,
  handleFontDecorationChange,
  handleFontFamilyChange,
  handleFontSizeChange,
  handleFontStyleChange,
  handleFontWeightChange,
  handleHaloColorChange,
  handleHaloSizeChange,
  handleHorizontalAlignmentChange,
  handleKerningChange,
  handleLineWidthChange,
  handleRotatedChange,
  handleTextChange,
  handleVerticalAlignmentChange,
  handleXOffsetChange,
  handleYOffsetChange
}: Props) => {
  const [angle, setAngle] = useState(0);
  const [backgroundColor, setBackgroundColor] = useState("#000000");
  const [borderLineColor, setBorderLineColor] = useState("#000000");
  const [borderLineSize, setBorderLineSize] = useState("0");
  const [color, setColor] = useState("#007ac2");
  const [haloColor, setHaloColor] = useState("#000000");
  const [haloSize, setHaloSize] = useState("0");
  const [horizontalAlignment, setHorizontalAlignment] = useState("center");
  const [kerning, setKerning] = useState(true);
  const [lineWidth, setLineWidth] = useState("1");
  const [rotated, setRotated] = useState(false);
  const [text, setText] = useState("Hello World!");
  const [verticalAlignment, setVerticalAlignment] = useState("baseline");
  const [xoffset, setXoffset] = useState("0");
  const [yoffset, setYoffset] = useState("0");

  return (
    <React.Fragment>
      <CalciteLabel layout="default" style={labelStyles}>
        angle
        <CalciteSlider
          labelHandles={true}
          labelTicks={true}
          max={360}
          min={0}
          onCalciteSliderChange={(event) => {
            setAngle(event.target.value as number);
            handleAngleChange(event.target.value as number);
          }}
          step={1}
          ticks={180}
          value={angle}
        ></CalciteSlider>
      </CalciteLabel>

      <CalciteLabel layout="default" style={labelStyles}>
        backgroundColor
        <CalciteInput
          onCalciteInputChange={(event) => {
            if (event.target.value) {
              setBackgroundColor(event.target.value.toString());
            }
            handleBackgroundColorChange(event.target.value as string);
          }}
          type="color"
          value={backgroundColor}
        />
      </CalciteLabel>

      <CalciteLabel layout="default" style={labelStyles}>
        borderLineColor
        <CalciteInput
          onCalciteInputChange={(event) => {
            if (event.target.value) {
              setBorderLineColor(event.target.value.toString());
            }
            handleBorderLineColorChange(event.target.value as string);
          }}
          type="color"
          value={borderLineColor}
        />
      </CalciteLabel>

      <CalciteLabel layout="default" style={labelStyles}>
        borderLineSize
        <CalciteInputNumber
          label={"borderLineSize input"}
          min={0}
          onCalciteInputNumberChange={(event) => {
            setBorderLineSize(event.target.value);
            handleBorderLineSizeChange(event.target.value);
          }}
          value={borderLineSize}
        ></CalciteInputNumber>
      </CalciteLabel>

      <CalciteLabel layout="default" style={labelStyles}>
        color
        <CalciteInput
          onCalciteInputChange={(event) => {
            if (event.target.value) {
              setColor(event.target.value.toString());
            }
            handleColorChange(event.target.value as string);
          }}
          type="color"
          value={color}
        />
      </CalciteLabel>

      <CalciteBlock style={blockStyles} collapsible heading={"font"}>
        <FontForm
          handleDecorationChange={handleFontDecorationChange}
          handleFamilyChange={handleFontFamilyChange}
          handleSizeChange={handleFontSizeChange}
          handleStyleChange={handleFontStyleChange}
          handleWeightChange={handleFontWeightChange}
        />
      </CalciteBlock>

      <CalciteLabel layout="default" style={labelStyles}>
        haloColor
        <CalciteInput
          onCalciteInputChange={(event) => {
            if (event.target.value) {
              setHaloColor(event.target.value.toString());
            }
            handleHaloColorChange(event.target.value as string);
          }}
          type="color"
          value={haloColor}
        />
      </CalciteLabel>

      <CalciteLabel layout="default" style={labelStyles}>
        haloSize
        <CalciteInputNumber
          label={"haloSize input"}
          min={0}
          onCalciteInputNumberChange={(event) => {
            setHaloSize(event.target.value);
            handleHaloSizeChange(event.target.value);
          }}
          value={haloSize}
        ></CalciteInputNumber>
      </CalciteLabel>

      <CalciteLabel layout="default" style={labelStyles}>
        horizontalAlignment
        <CalciteSelect
          label={"horizontalAlignment selection"}
          onCalciteSelectChange={(event) => {
            setHorizontalAlignment(event.target.value);
            handleHorizontalAlignmentChange(
              event.target.value as InstanceType<typeof TextSymbol>["horizontalAlignment"]
            );
          }}
          value={horizontalAlignment}
        >
          {HORIZONTAL_ALIGNMENT_OPTIONS.map((option, index) => (
            <CalciteOption key={index}>{option}</CalciteOption>
          ))}
        </CalciteSelect>
      </CalciteLabel>

      <CalciteLabel layout="default" style={labelStyles}>
        kerning
        <CalciteSwitch
          onCalciteSwitchChange={(event) => {
            setKerning(event.target.checked);
            handleKerningChange(event.target.checked);
          }}
          value={kerning}
        ></CalciteSwitch>
      </CalciteLabel>

      <CalciteLabel layout="default" style={labelStyles}>
        lineWidth
        <CalciteInputNumber
          label={"lineWidth input"}
          min={0}
          onCalciteInputNumberChange={(event) => {
            setLineWidth(event.target.value);
            handleLineWidthChange(event.target.value);
          }}
          value={lineWidth}
        ></CalciteInputNumber>
      </CalciteLabel>

      <CalciteLabel layout="default" style={labelStyles}>
        rotated
        <CalciteSwitch
          onCalciteSwitchChange={(event) => {
            setRotated(event.target.checked);
            handleRotatedChange(event.target.checked);
          }}
          value={rotated}
        ></CalciteSwitch>
      </CalciteLabel>

      <CalciteLabel layout="default" style={labelStyles}>
        text
        <CalciteInputText
          label={"text input"}
          onCalciteInputTextChange={(event) => {
            setText(event.target.value);
            handleTextChange(event.target.value);
          }}
          value={text}
        ></CalciteInputText>
      </CalciteLabel>

      <CalciteLabel layout="default" style={labelStyles}>
        verticalAlignment
        <CalciteSelect
          label={"verticalAlignment selection"}
          onCalciteSelectChange={(event) => {
            setVerticalAlignment(event.target.value);
            handleVerticalAlignmentChange(
              event.target.value as InstanceType<typeof TextSymbol>["verticalAlignment"]
            );
          }}
          value={verticalAlignment}
        >
          {VERTICAL_ALIGNMENT_OPTIONS.map((option, index) => (
            <CalciteOption key={index}>{option}</CalciteOption>
          ))}
        </CalciteSelect>
      </CalciteLabel>

      <CalciteLabel layout="default" style={labelStyles}>
        xoffset
        <CalciteInputNumber
          label={"xoffset input"}
          onCalciteInputNumberChange={(event) => {
            setXoffset(event.target.value);
            handleXOffsetChange(event.target.value);
          }}
          value={xoffset}
        ></CalciteInputNumber>
      </CalciteLabel>

      <CalciteLabel layout="default" style={labelStyles}>
        yoffset
        <CalciteInputNumber
          label={"yoffset input"}
          onCalciteInputNumberChange={(event) => {
            setYoffset(event.target.value);
            handleYOffsetChange(event.target.value);
          }}
          value={yoffset}
        ></CalciteInputNumber>
      </CalciteLabel>
    </React.Fragment>
  );
};

export default TextSymbolForm;
