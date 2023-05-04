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
  ESRI_ICONS_STYLE_NAME_OPTIONS,
  ESRI_INFRASTRUCTURE_STYLE_NAME_OPTIONS,
  ESRI_REALISTIC_SIGNS_AND_SIGNALS_STYLE_NAME_OPTIONS,
  ESRI_REALISTIC_STREET_SCENE_STYLE_NAME_OPTIONS,
  ESRI_REALISTIC_TRANSPORTATION_STYLE_NAME_OPTIONS,
  ESRI_REALISTIC_TREES_STYLE_NAME_OPTIONS,
  ESRI_RECREATION_STYLE_NAME_OPTIONS,
  ESRI_THEMATIC_SHAPES_STYLE_NAME_OPTIONS,
  ESRI_THEMATIC_TREES_STYLE_NAME_OPTIONS,
  WEB_STYLE_SYMBOLS_3D_STYLE_OPTIONS
} from "./lib/constants";
import { labelStyles } from "./lib/styles";

interface Props {
  handleNameChange: (value: string) => void;
  handleStyleNameChange: (value: string) => void;
  handleCustomStyleChange: (styleUrl: string, name: string) => void;
}

const WebStyleSymbolForm = ({
  handleNameChange,
  handleStyleNameChange,
  handleCustomStyleChange
}: Props) => {
  const [customName, setCustomName] = useState("");
  const [name, setName] = useState("Accessibility");
  const [names, setNames] = useState(ESRI_ICONS_STYLE_NAME_OPTIONS);
  const [styleName, setStyleName] = useState("EsriIconsStyle");
  const [styleUrl, setStyleUrl] = useState("");

  const handleSubmit = () => {
    handleCustomStyleChange(styleUrl, customName);
  };

  const handleTabChange = (event: CustomEvent) => {
    const tabNav = event.target as HTMLCalciteTabNavElement;
    if (tabNav.selectedTitle.tab !== "custom") {
      setName("");
    } else {
      handleStyleNameChange(styleName);
    }
  };

  const updateNames = (styleName: string) => {
    switch (styleName) {
      case "EsriIconsStyle":
        setNames(ESRI_ICONS_STYLE_NAME_OPTIONS);
        setName(ESRI_ICONS_STYLE_NAME_OPTIONS[0]);
        break;

      case "EsriInfrastructureStyle":
        setNames(ESRI_INFRASTRUCTURE_STYLE_NAME_OPTIONS);
        setName(ESRI_INFRASTRUCTURE_STYLE_NAME_OPTIONS[0]);
        break;

      case "EsriRealisticSignsandSignalsStyle":
        setNames(ESRI_REALISTIC_SIGNS_AND_SIGNALS_STYLE_NAME_OPTIONS);
        setName(ESRI_REALISTIC_SIGNS_AND_SIGNALS_STYLE_NAME_OPTIONS[0]);
        break;

      case "EsriRealisticStreetSceneStyle":
        setNames(ESRI_REALISTIC_STREET_SCENE_STYLE_NAME_OPTIONS);
        setName(ESRI_REALISTIC_STREET_SCENE_STYLE_NAME_OPTIONS[0]);
        break;

      case "EsriRealisticTransportationStyle":
        setNames(ESRI_REALISTIC_TRANSPORTATION_STYLE_NAME_OPTIONS);
        setName(ESRI_REALISTIC_TRANSPORTATION_STYLE_NAME_OPTIONS[0]);
        break;

      case "EsriRealisticTreesStyle":
        setNames(ESRI_REALISTIC_TREES_STYLE_NAME_OPTIONS);
        setName(ESRI_REALISTIC_TREES_STYLE_NAME_OPTIONS[0]);
        break;

      case "EsriRecreationStyle":
        setNames(ESRI_RECREATION_STYLE_NAME_OPTIONS);
        setName(ESRI_RECREATION_STYLE_NAME_OPTIONS[0]);
        break;

      case "EsriThematicShapesStyle":
        setNames(ESRI_THEMATIC_SHAPES_STYLE_NAME_OPTIONS);
        setName(ESRI_THEMATIC_SHAPES_STYLE_NAME_OPTIONS[0]);
        break;

      case "EsriThematicTreesStyle":
        setNames(ESRI_THEMATIC_TREES_STYLE_NAME_OPTIONS);
        setName(ESRI_THEMATIC_TREES_STYLE_NAME_OPTIONS[0]);
        break;

      default:
        setNames(ESRI_ICONS_STYLE_NAME_OPTIONS);
        setName(ESRI_ICONS_STYLE_NAME_OPTIONS[0]);
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
              {names.map((option, index) => (
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
                updateNames(event.target.value);
              }}
              value={styleName}
            >
              {WEB_STYLE_SYMBOLS_3D_STYLE_OPTIONS.map((option, index) => (
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

export default WebStyleSymbolForm;
