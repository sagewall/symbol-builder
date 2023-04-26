import type Font from "@arcgis/core/symbols/Font";
import {
  CalciteInputNumber,
  CalciteLabel,
  CalciteOption,
  CalciteSelect
} from "@esri/calcite-components-react";
import React, { useState } from "react";
import { FONTS, FONT_DECORATION_OPTIONS } from "./lib/constants";
import { labelStyles } from "./lib/styles";

interface Props {
  handleDecorationChange: (value: InstanceType<typeof Font>["decoration"]) => void;
  handleFontChange: (value: string) => void;
  handleSizeChange: (value: string) => void;
}

const FontForm = ({ handleDecorationChange, handleFontChange, handleSizeChange }: Props) => {
  const [decoration, setDecoration] = useState("none");
  const [font, setFont] = useState("Arial Regular");
  const [size, setSize] = useState("12");

  return (
    <React.Fragment>
      <CalciteLabel layout="default" style={labelStyles}>
        <CalciteSelect
          label={"font selection"}
          onCalciteSelectChange={(event) => {
            setFont(event.target.value);
            handleFontChange(event.target.value);
          }}
          value={font}
        >
          {FONTS.map((option, index) => (
            <CalciteOption key={index} value={JSON.stringify(option)}>
              {option.name}
            </CalciteOption>
          ))}
        </CalciteSelect>
      </CalciteLabel>

      <CalciteLabel layout="default" style={labelStyles}>
        decoration
        <CalciteSelect
          label={"font decoration selection"}
          onCalciteSelectChange={(event) => {
            setDecoration(event.target.value);
            handleDecorationChange(event.target.value as InstanceType<typeof Font>["decoration"]);
          }}
          value={decoration}
        >
          {FONT_DECORATION_OPTIONS.map((option, index) => (
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
    </React.Fragment>
  );
};

export default FontForm;
