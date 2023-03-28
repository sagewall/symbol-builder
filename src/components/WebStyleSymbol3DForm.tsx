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
  handleStyleUrlChange: (value: string) => void;
}

const TextSymbolForm = ({
  handleNameChange,
  handleStyleNameChange,
  handleStyleUrlChange
}: Props) => {
  const [name, setName] = useState("Accessibility");
  const [names, setNames] = useState(ESRI_ICONS_STYLE_NAME_OPTIONS);
  const [styleName, setStyleName] = useState("EsriIconsStyle");
  const [styleUrl, setStyleUrl] = useState("");

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
      <CalciteLabel layout="default" style={labelStyles}>
        name
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
            {names.map((option, index) => (
              <CalciteComboboxItem
                key={index}
                textLabel={option}
                value={option}
              ></CalciteComboboxItem>
            ))}
          </CalciteCombobox>
        </CalciteLabel>
      </CalciteLabel>

      <CalciteLabel layout="default" style={labelStyles}>
        styleName
        <CalciteSelect
          label={"styleName selection"}
          onCalciteSelectChange={(event) => {
            updateNames(event.target.value);
            setStyleName(event.target.value);
            setStyleUrl("");
            handleStyleNameChange(event.target.value);
          }}
          value={styleName}
        >
          {WEB_STYLE_SYMBOLS_3D_STYLE_OPTIONS.map((option, index) => (
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

export default TextSymbolForm;
