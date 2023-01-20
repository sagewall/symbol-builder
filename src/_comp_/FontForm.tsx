import {
  CalciteInputNumber,
  CalciteInputText,
  CalciteLabel,
  CalciteOption,
  CalciteSelect,
} from "@esri/calcite-components-react";
import "@esri/calcite-components/dist/components/calcite-input-number";
import "@esri/calcite-components/dist/components/calcite-input-text";
import "@esri/calcite-components/dist/components/calcite-label";
import "@esri/calcite-components/dist/components/calcite-option";
import "@esri/calcite-components/dist/components/calcite-select";
import React, { useState } from "react";
import { labelStyles } from "./lib/styles";
import { FontDecoration, FontStyle, FontWeight } from "./lib/types";

interface Props {
  handleDecorationChange: (value: FontDecoration, layerIndex?: number) => void;
  handleFamilyChange: (value: string, layerIndex?: number) => void;
  handleSizeChange: (value: string, layerIndex?: number) => void;
  handleStyleChange: (value: FontStyle, layerIndex?: number) => void;
  handleWeightChange: (value: FontWeight, layerIndex?: number) => void;
  layerIndex?: number;
}

const FontForm = ({
  handleDecorationChange,
  handleFamilyChange,
  handleSizeChange,
  handleStyleChange,
  handleWeightChange,
  layerIndex,
}: Props) => {
  const fontDecorationOptions = ["none", "underline", "line-through"];
  const fontStyleOptions = ["normal", "italic", "oblique"];
  const fontWeightOptions = ["normal", "bold", "bolder", "lighter"];

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
            layerIndex
              ? handleDecorationChange(
                  event.target.value as FontDecoration,
                  layerIndex
                )
              : handleDecorationChange(event.target.value as FontDecoration);
          }}
          value={decoration}
        >
          {fontDecorationOptions.map((option, index) => (
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
            layerIndex
              ? handleFamilyChange(event.target.value, layerIndex)
              : handleFamilyChange(event.target.value);
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
            layerIndex
              ? handleSizeChange(event.target.value, layerIndex)
              : handleSizeChange(event.target.value);
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
            layerIndex
              ? handleStyleChange(event.target.value as FontStyle, layerIndex)
              : handleStyleChange(event.target.value as FontStyle);
          }}
          value={style}
        >
          {fontStyleOptions.map((option, index) => (
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
            layerIndex
              ? handleWeightChange(event.target.value as FontWeight, layerIndex)
              : handleWeightChange(event.target.value as FontWeight);
          }}
          value={weight}
        >
          {fontWeightOptions.map((option, index) => (
            <CalciteOption key={index}>{option}</CalciteOption>
          ))}
        </CalciteSelect>
      </CalciteLabel>
    </React.Fragment>
  );
};

export default FontForm;
