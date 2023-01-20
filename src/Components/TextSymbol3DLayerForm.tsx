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
import TextSymbol3DLayerBackgroundForm from "./TextSymbol3DLayerBackgroundForm";

interface Props {
  layerIndex: number;
  handleTextSymbol3DLayerBackgroundColorChange: (
    value: string,
    layerIndex: number
  ) => void;
  handleTextSymbol3DLayerFontDecorationChange: (
    value: FontDecoration,
    layerIndex: number | undefined
  ) => void;
  handleTextSymbol3DLayerFontFamilyChange: (
    value: string,
    layerIndex: number | undefined
  ) => void;
  handleTextSymbol3DLayerFontSizeChange: (
    value: string,
    layerIndex: number | undefined
  ) => void;
  handleTextSymbol3DLayerFontStyleChange: (
    value: FontStyle | undefined,
    layerIndex: number | undefined
  ) => void;
  handleTextSymbol3DLayerFontWeightChange: (
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
  handleTextSymbol3DLayerBackgroundColorChange,
  handleTextSymbol3DLayerFontDecorationChange,
  handleTextSymbol3DLayerFontFamilyChange,
  handleTextSymbol3DLayerFontSizeChange,
  handleTextSymbol3DLayerFontStyleChange,
  handleTextSymbol3DLayerFontWeightChange,
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
      <TextSymbol3DLayerBackgroundForm
        layerIndex={layerIndex}
        handleColorChange={handleTextSymbol3DLayerBackgroundColorChange}
      ></TextSymbol3DLayerBackgroundForm>

      <CalciteBlock style={blockStyles} collapsible heading={"font"}>
        <FontForm
          handleDecorationChange={handleTextSymbol3DLayerFontDecorationChange}
          handleFamilyChange={handleTextSymbol3DLayerFontFamilyChange}
          handleSizeChange={handleTextSymbol3DLayerFontSizeChange}
          handleStyleChange={handleTextSymbol3DLayerFontStyleChange}
          handleWeightChange={handleTextSymbol3DLayerFontWeightChange}
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
