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
import { blockStyles, labelStyles } from "./lib/styles";
import {
  FontDecoration,
  FontStyle,
  FontWeight,
  HorizontalAlignment,
  VerticalAlignment,
} from "./lib/types";
import TextSymbol3DLayerBackgroundForm from "./TextSymbol3DLayerBackgroundForm";
import TextSymbol3DLayerFontForm from "./TextSymbol3DLayerFontForm";
import TextSymbol3DLayerHaloForm from "./TextSymbol3DLayerHaloForm";
import TextSymbol3DLayerMaterialForm from "./TextSymbol3DLayerMaterialForm";

interface Props {
  layerIndex: number;
  handleTextSymbol3DLayerBackgroundColorChange: (
    layerIndex: number,
    value: string
  ) => void;
  handleTextSymbol3DLayerFontDecorationChange: (
    layerIndex: number,
    value: FontDecoration
  ) => void;
  handleTextSymbol3DLayerFontFamilyChange: (
    layerIndex: number,
    value: string
  ) => void;
  handleTextSymbol3DLayerFontSizeChange: (
    layerIndex: number,
    value: string
  ) => void;
  handleTextSymbol3DLayerFontStyleChange: (
    layerIndex: number,
    value: FontStyle
  ) => void;
  handleTextSymbol3DLayerFontWeightChange: (
    layerIndex: number,
    value: FontWeight
  ) => void;
  handleTextSymbol3DLayerHaloColorChange: (
    layerIndex: number,
    value: string
  ) => void;
  handleTextSymbol3DLayerHaloSizeChange: (
    layerIndex: number,
    value: string
  ) => void;
  handleHorizontalAlignmentChange: (
    layerIndex: number,
    value: HorizontalAlignment
  ) => void;
  handleLineHeightChange: (layerIndex: number, value: string) => void;
  handleTextSymbol3DLayerMaterialColorChange: (
    layerIndex: number,
    value: string
  ) => void;
  handleTextChange: (layerIndex: number, value: string) => void;
  handleVerticalAlignmentChange: (
    layerIndex: number,
    value: VerticalAlignment
  ) => void;
}

const TextSymbol3DLayerForm = ({
  handleTextSymbol3DLayerBackgroundColorChange,
  handleTextSymbol3DLayerFontDecorationChange,
  handleTextSymbol3DLayerFontFamilyChange,
  handleTextSymbol3DLayerFontSizeChange,
  handleTextSymbol3DLayerFontStyleChange,
  handleTextSymbol3DLayerFontWeightChange,
  handleTextSymbol3DLayerHaloColorChange,
  handleTextSymbol3DLayerHaloSizeChange,
  handleHorizontalAlignmentChange,
  handleLineHeightChange,
  handleTextSymbol3DLayerMaterialColorChange,
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
        <TextSymbol3DLayerFontForm
          layerIndex={layerIndex}
          handleDecorationChange={handleTextSymbol3DLayerFontDecorationChange}
          handleFamilyChange={handleTextSymbol3DLayerFontFamilyChange}
          handleSizeChange={handleTextSymbol3DLayerFontSizeChange}
          handleStyleChange={handleTextSymbol3DLayerFontStyleChange}
          handleWeightChange={handleTextSymbol3DLayerFontWeightChange}
        />
      </CalciteBlock>

      <TextSymbol3DLayerHaloForm
        layerIndex={layerIndex}
        handleColorChange={handleTextSymbol3DLayerHaloColorChange}
        handleSizeChange={handleTextSymbol3DLayerHaloSizeChange}
      ></TextSymbol3DLayerHaloForm>

      <CalciteLabel layout="default" style={labelStyles}>
        horizontalAlignment
        <CalciteSelect
          label={"horizontalAlignment selection"}
          onCalciteSelectChange={(event) => {
            setHorizontalAlignment(event.target.value);
            handleHorizontalAlignmentChange(
              layerIndex,
              event.target.value as HorizontalAlignment
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
            handleLineHeightChange(layerIndex, event.target.value);
          }}
          value={lineHeight}
        ></CalciteInputNumber>
      </CalciteLabel>

      <TextSymbol3DLayerMaterialForm
        layerIndex={layerIndex}
        handleColorChange={handleTextSymbol3DLayerMaterialColorChange}
      ></TextSymbol3DLayerMaterialForm>

      <CalciteLabel layout="default" style={labelStyles}>
        text
        <CalciteInputText
          label={"text input"}
          onCalciteInputTextChange={(event) => {
            setText(event.target.value);
            handleTextChange(layerIndex, event.target.value);
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
              layerIndex,
              event.target.value as VerticalAlignment
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
