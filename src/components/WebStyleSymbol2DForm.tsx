import {
  CalciteCombobox,
  CalciteComboboxItem,
  CalciteInputText,
  CalciteLabel,
  CalciteOption,
  CalciteSelect
} from "@esri/calcite-components-react";
import React, { useState } from "react";
import {
  ESRI_2D_POINT_SYMBOLS_STYLE_NAME_OPTIONS,
  WEB_STYLE_SYMBOLS_2D_STYLE_OPTIONS
} from "./lib/constants";
import { labelStyles } from "./lib/styles";

interface Props {
  handleNameChange: (value: string) => void;
  handleStyleNameChange: (value: string) => void;
  handleStyleUrlChange: (value: string) => void;
}

const WebStyleSymbol2DForm = ({
  handleNameChange,
  handleStyleNameChange,
  handleStyleUrlChange
}: Props) => {
  const [name, setName] = useState("extent-hollow-gray");
  const [styleName, setStyleName] = useState("Esri2DPointSymbolsStyle");
  const [styleUrl, setStyleUrl] = useState("");

  return (
    <React.Fragment>
      <CalciteLabel layout="default" style={labelStyles}>
        name
        <CalciteCombobox
          allowCustomValues={true}
          label={"name selection"}
          onCalciteComboboxChange={(event) => {
            setName(event.target.value as string);
            handleNameChange(event.target.value as string);
          }}
          selectionMode={"single"}
          value={name}
        >
          {ESRI_2D_POINT_SYMBOLS_STYLE_NAME_OPTIONS.map((option, index) => (
            <CalciteComboboxItem
              key={index}
              textLabel={option}
              value={option}
            ></CalciteComboboxItem>
          ))}
        </CalciteCombobox>
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

      <CalciteLabel layout="default" style={labelStyles}>
        styleUrl
        <CalciteInputText
          label={"url input"}
          onCalciteInputTextChange={(event) => {
            setStyleUrl(event.target.value);
            handleStyleUrlChange(event.target.value);
          }}
          value={styleUrl}
        ></CalciteInputText>
      </CalciteLabel>
    </React.Fragment>
  );
};

export default WebStyleSymbol2DForm;
