import { CalciteLabel, CalciteOption, CalciteSelect } from "@esri/calcite-components-react";
import React, { useState } from "react";
import {
  ESRI_2D_POINT_SYMBOLS_STYLE_NAME_OPTIONS,
  WEB_STYLE_SYMBOLS_2D_STYLE_OPTIONS
} from "./lib/constants";
import { labelStyles } from "./lib/styles";

interface Props {
  handleNameChange: (value: string) => void;
  handleStyleNameChange: (value: string) => void;
}

const TextSymbolForm = ({ handleNameChange, handleStyleNameChange }: Props) => {
  const [styleName, setStyleName] = useState("Esri2DPointSymbolsStyle");
  const [name, setName] = useState("extent-hollow-gray");

  return (
    <React.Fragment>
      <CalciteLabel layout="default" style={labelStyles}>
        name
        <CalciteSelect
          label={"name selection"}
          onCalciteSelectChange={(event) => {
            setName(event.target.value);
            handleNameChange(event.target.value);
          }}
          value={name}
        >
          {ESRI_2D_POINT_SYMBOLS_STYLE_NAME_OPTIONS.map((option, index) => (
            <CalciteOption key={index}>{option}</CalciteOption>
          ))}
        </CalciteSelect>
      </CalciteLabel>

      <CalciteLabel layout="default" style={labelStyles}>
        styleName
        <CalciteSelect
          label={"styleName selection"}
          onCalciteSelectChange={(event) => {
            setStyleName(event.target.value);
            handleStyleNameChange(event.target.value);
          }}
          value={styleName}
        >
          {WEB_STYLE_SYMBOLS_2D_STYLE_OPTIONS.map((option, index) => (
            <CalciteOption key={index}>{option}</CalciteOption>
          ))}
        </CalciteSelect>
      </CalciteLabel>
    </React.Fragment>
  );
};

export default TextSymbolForm;
