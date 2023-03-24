import {
  CalciteInputNumber,
  CalciteInputText,
  CalciteLabel,
  CalciteOption,
  CalciteSelect
} from "@esri/calcite-components-react";
import React, { useState } from "react";
import { FONT_DECORATION_OPTIONS, FONT_STYLE_OPTIONS, FONT_WEIGHT_OPTIONS } from "./lib/constants";
import { labelStyles } from "./lib/styles";
import { FontDecoration, FontStyle, FontWeight } from "./lib/types";

interface Props {
  layerIndex: number;
  handleDecorationChange: (layerIndex: number, value: FontDecoration) => void;
  handleFamilyChange: (layerIndex: number, value: string) => void;
  handleSizeChange: (layerIndex: number, value: string) => void;
  handleStyleChange: (layerIndex: number, value: FontStyle) => void;
  handleWeightChange: (layerIndex: number, value: FontWeight) => void;
}

const FontForm = ({
  layerIndex,
  handleDecorationChange,
  handleFamilyChange,
  handleSizeChange,
  handleStyleChange,
  handleWeightChange
}: Props) => {
  const [decoration, setDecoration] = useState("none");
  const [family, setFamily] = useState("serif");
  const [size, setSize] = useState("12");
  const [style, setStyle] = useState("normal");
  const [weight, setWeight] = useState("normal");

  return (
    <React.Fragment>
      <CalciteLabel layout="default" style={labelStyles}>
        decoration
        <CalciteSelect
          label={"font decoration selection"}
          onCalciteSelectChange={(event) => {
            setDecoration(event.target.value);
            handleDecorationChange(layerIndex, event.target.value as FontDecoration);
          }}
          value={decoration}
        >
          {FONT_DECORATION_OPTIONS.map((option, index) => (
            <CalciteOption key={index}>{option}</CalciteOption>
          ))}
        </CalciteSelect>
      </CalciteLabel>

      <CalciteLabel layout="default" style={labelStyles}>
        family
        <CalciteInputText
          label={"font family input"}
          onCalciteInputTextChange={(event) => {
            setFamily(event.target.value);
            handleFamilyChange(layerIndex, event.target.value);
          }}
          value={family}
        ></CalciteInputText>
      </CalciteLabel>

      <CalciteLabel layout="default" style={labelStyles}>
        size
        <CalciteInputNumber
          label={"font size input"}
          min={0}
          onCalciteInputNumberChange={(event) => {
            setSize(event.target.value);
            handleSizeChange(layerIndex, event.target.value);
          }}
          value={size}
        ></CalciteInputNumber>
      </CalciteLabel>

      <CalciteLabel layout="default" style={labelStyles}>
        style
        <CalciteSelect
          label={"font style selection"}
          onCalciteSelectChange={(event) => {
            setStyle(event.target.value);
            handleStyleChange(layerIndex, event.target.value as FontStyle);
          }}
          value={style}
        >
          {FONT_STYLE_OPTIONS.map((option, index) => (
            <CalciteOption key={index}>{option}</CalciteOption>
          ))}
        </CalciteSelect>
      </CalciteLabel>

      <CalciteLabel layout="default" style={labelStyles}>
        weight
        <CalciteSelect
          label={"font weight selection"}
          onCalciteSelectChange={(event) => {
            setWeight(event.target.value);
            handleWeightChange(layerIndex, event.target.value as FontWeight);
          }}
          value={weight}
        >
          {FONT_WEIGHT_OPTIONS.map((option, index) => (
            <CalciteOption key={index}>{option}</CalciteOption>
          ))}
        </CalciteSelect>
      </CalciteLabel>
    </React.Fragment>
  );
};

export default FontForm;
