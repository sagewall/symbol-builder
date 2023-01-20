import {
  CalciteBlock,
  CalciteInputNumber,
  CalciteInputText,
  CalciteLabel,
  CalciteOption,
  CalciteSelect,
} from "@esri/calcite-components-react";
import "@esri/calcite-components/dist/components/calcite-block";
import "@esri/calcite-components/dist/components/calcite-color-picker";
import "@esri/calcite-components/dist/components/calcite-input-number";
import "@esri/calcite-components/dist/components/calcite-input-text";
import "@esri/calcite-components/dist/components/calcite-label";
import "@esri/calcite-components/dist/components/calcite-option";
import "@esri/calcite-components/dist/components/calcite-select";
import "@esri/calcite-components/dist/components/calcite-slider";
import "@esri/calcite-components/dist/components/calcite-switch";
import React, { useState } from "react";
import FontForm from "./FontForm";
import { blockStyles, labelStyles } from "./lib/styles";
import {
  FontDecoration,
  FontStyle,
  FontWeight,
  HorizontalAlignment,
  VerticalAlignment,
} from "./lib/types";

interface Props {
  layerIndex: number;
  handleTextSymbol3DLayerBackgroundChange: (
    value: string,
    layerIndex: number
  ) => void;
  handleFontDecorationChange: (
    value: FontDecoration,
    layerIndex: number | undefined
  ) => void;
  handleFontFamilyChange: (
    value: string,
    layerIndex: number | undefined
  ) => void;
  handleFontSizeChange: (value: string, layerIndex: number | undefined) => void;
  handleFontStyleChange: (
    value: FontStyle | undefined,
    layerIndex: number | undefined
  ) => void;
  handleFontWeightChange: (
    value: FontWeight | undefined,
    layerIndex: number | undefined
  ) => void;
  handleHorizontalAlignmentChange: (
    value: HorizontalAlignment,
    layerIndex: number
  ) => void;
  handleLineHeightChange: (value: string, layerIndex: number) => void;
  handleTextChange: (value: string, layerIndex: number) => void;
  handleVerticalAlignmentChange: (
    value: VerticalAlignment,
    layerIndex: number
  ) => void;
}

const TextSymbol3DLayerForm = ({
  handleFontDecorationChange,
  handleFontFamilyChange,
  handleFontSizeChange,
  handleFontStyleChange,
  handleFontWeightChange,
  handleHorizontalAlignmentChange,
  handleLineHeightChange,
  handleTextChange,
  handleVerticalAlignmentChange,
  layerIndex,
}: Props) => {
  const horizontalAlignmentOptions = ["center", "right", "left"];
  const verticalAlignmentOptions = ["baseline", "top", "middle", "bottom"];

  const [horizontalAlignment, setHorizontalAlignment] = useState("center");
  const [lineHeight, setLineHeight] = useState("1");
  const [text, setText] = useState("Hello World!");
  const [verticalAlignment, setVerticalAlignment] = useState("baseline");

  return (
    <React.Fragment>
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
        horizontalAlignment
        <CalciteSelect
          label={"horizontalAlignment selection"}
          onCalciteSelectChange={(event) => {
            setHorizontalAlignment(event.target.value);
            handleHorizontalAlignmentChange(
              event.target.value as HorizontalAlignment,
              layerIndex
            );
          }}
          value={horizontalAlignment}
        >
          {horizontalAlignmentOptions.map((option, index) => (
            <CalciteOption key={index}>{option}</CalciteOption>
          ))}
        </CalciteSelect>
      </CalciteLabel>

      <CalciteLabel layout="default" style={labelStyles}>
        lineHeight
        <CalciteInputNumber
          label={"lineHeight input"}
          min={0}
          onCalciteInputNumberChange={(event) => {
            setLineHeight(event.target.value);
            handleLineHeightChange(event.target.value, layerIndex);
          }}
          value={lineHeight}
        ></CalciteInputNumber>
      </CalciteLabel>

      <CalciteLabel layout="default" style={labelStyles}>
        text
        <CalciteInputText
          label={"text input"}
          onCalciteInputTextChange={(event) => {
            setText(event.target.value);
            handleTextChange(event.target.value, layerIndex);
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
              event.target.value as VerticalAlignment,
              layerIndex
            );
          }}
          value={verticalAlignment}
        >
          {verticalAlignmentOptions.map((option, index) => (
            <CalciteOption key={index}>{option}</CalciteOption>
          ))}
        </CalciteSelect>
      </CalciteLabel>
    </React.Fragment>
  );
};

export default TextSymbol3DLayerForm;
