import {
  CalciteButton,
  CalciteInputText,
  CalciteLabel,
  CalciteOption,
  CalciteSelect,
  CalciteTab,
  CalciteTabNav,
  CalciteTabs,
  CalciteTabTitle
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
  handleCustomStyleChange: (styleUrl: string, name: string) => void;
}

const WebStyleSymbol2DForm = ({
  handleNameChange,
  handleStyleNameChange,
  handleCustomStyleChange
}: Props) => {
  const [customName, setCustomName] = useState("");
  const [name, setName] = useState("extent-hollow-gray");
  const [styleName, setStyleName] = useState("Esri2DPointSymbolsStyle");
  const [styleUrl, setStyleUrl] = useState("");

  const handleSubmit = () => {
    handleCustomStyleChange(styleUrl, customName);
  };

  const handleTabChange = (event: CustomEvent) => {
    const tabNav = event.target as HTMLCalciteTabNavElement;
    if (tabNav.selectedTitle.tab !== "custom") {
      setName("");
    } else {
      setStyleName("Esri2DPointSymbolsStyle");
      setName("extent-hollow-gray");
      handleStyleNameChange(styleName);
    }
  };

  return (
    <React.Fragment>
      <CalciteTabs>
        <CalciteTabNav slot="title-group" onCalciteTabChange={handleTabChange}>
          <CalciteTabTitle tab="standard">Standard</CalciteTabTitle>
          <CalciteTabTitle tab="custom">Custom</CalciteTabTitle>
        </CalciteTabNav>
        <CalciteTab tab="standard">
          <CalciteLabel layout="default" style={labelStyles}>
            name
            <CalciteSelect
              label={"name selection"}
              onCalciteSelectChange={(event) => {
                setName(event.target.value as string);
                handleNameChange(event.target.value as string);
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
        </CalciteTab>
        <CalciteTab tab="custom">
          <CalciteLabel layout="default" style={labelStyles}>
            name
            <CalciteInputText
              label={"name input"}
              onCalciteInputTextChange={(event) => {
                setCustomName(event.target.value);
              }}
              value={customName}
            ></CalciteInputText>
          </CalciteLabel>

          <CalciteLabel layout="default" style={labelStyles}>
            styleUrl
            <CalciteInputText
              label={"url input"}
              onCalciteInputTextChange={(event) => {
                setStyleUrl(event.target.value);
              }}
              value={styleUrl}
            ></CalciteInputText>
          </CalciteLabel>
          <CalciteButton onClick={() => handleSubmit()}>Submit</CalciteButton>
        </CalciteTab>
      </CalciteTabs>
    </React.Fragment>
  );
};

export default WebStyleSymbol2DForm;
