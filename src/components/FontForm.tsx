import {
  CalciteInputNumber,
  CalciteLabel,
  CalciteOption,
  CalciteSelect
} from "@esri/calcite-components-react";
import React, { useState } from "react";
import {
  FONT_DECORATION_OPTIONS,
  FONT_FAMILY_OPTIONS,
  FONT_STYLE_OPTIONS,
  FONT_WEIGHT_OPTIONS
} from "./lib/constants";
import { labelStyles } from "./lib/styles";
import { FontDecoration, FontFamily, FontStyle, FontWeight } from "./lib/types";

interface Props {
  handleDecorationChange: (value: FontDecoration) => void;
  handleFamilyChange: (value: FontFamily) => void;
  handleSizeChange: (value: string) => void;
  handleStyleChange: (value: FontStyle) => void;
  handleWeightChange: (value: FontWeight) => void;
}

const FontForm = ({
  handleDecorationChange,
  handleFamilyChange,
  handleSizeChange,
  handleStyleChange,
  handleWeightChange
}: Props) => {
  const [decoration, setDecoration] = useState("none");
  const [family, setFamily] = useState("Arial");
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
            handleDecorationChange(event.target.value as FontDecoration);
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
        <CalciteSelect
          label={"font family selection"}
          onCalciteSelectChange={(event) => {
            setFamily(event.target.value);
            handleFamilyChange(event.target.value as FontFamily);
          }}
          value={family}
        >
          {FONT_FAMILY_OPTIONS.map((option, index) => (
            <CalciteOption key={index}>{option}</CalciteOption>
          ))}
        </CalciteSelect>
      </CalciteLabel>

      <CalciteLabel layout="default" style={labelStyles}>
        size
        <CalciteInputNumber
          label={"font size input"}
          min={0}
          onCalciteInputNumberChange={(event) => {
            setSize(event.target.value);
            handleSizeChange(event.target.value);
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
            handleStyleChange(event.target.value as FontStyle);
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
            handleWeightChange(event.target.value as FontWeight);
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
