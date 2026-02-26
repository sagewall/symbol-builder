import type Font from "@arcgis/core/symbols/Font.js";
import "@esri/calcite-components/components/calcite-input-number";
import "@esri/calcite-components/components/calcite-input-text";
import "@esri/calcite-components/components/calcite-label";
import "@esri/calcite-components/components/calcite-option";
import "@esri/calcite-components/components/calcite-select";
import { useState } from "react";
import {
  fontDecorationOptions,
  fontStyleOptions,
  fontWeightOptions,
} from "./lib/constants";
import { labelStyles } from "./lib/styles";

interface Props {
  layerIndex: number;
  handleDecorationChange: (
    layerIndex: number,
    value: InstanceType<typeof Font>["decoration"],
  ) => void;
  handleFamilyChange: (layerIndex: number, value: string) => void;
  handleSizeChange: (layerIndex: number, value: string) => void;
  handleStyleChange: (
    layerIndex: number,
    value: InstanceType<typeof Font>["style"],
  ) => void;
  handleWeightChange: (
    layerIndex: number,
    value: InstanceType<typeof Font>["weight"],
  ) => void;
}

function TextSymbol3DLayerFontForm({
  layerIndex,
  handleDecorationChange,
  handleFamilyChange,
  handleSizeChange,
  handleStyleChange,
  handleWeightChange,
}: Props): React.ReactElement {
  const [decoration, setDecoration] = useState("none");
  const [family, setFamily] = useState("sans-serif");
  const [size, setSize] = useState("9");
  const [style, setStyle] = useState("normal");
  const [weight, setWeight] = useState("normal");

  return (
    <>
      <calcite-label layout="default" style={labelStyles}>
        decoration
        <calcite-select
          label={"font decoration selection"}
          oncalciteSelectChange={(event) => {
            setDecoration(event.target.value);
            handleDecorationChange(
              layerIndex,
              event.target.value as InstanceType<typeof Font>["decoration"],
            );
          }}
          value={decoration}
        >
          {fontDecorationOptions.map((option, index) => (
            <calcite-option key={index}>{option}</calcite-option>
          ))}
        </calcite-select>
      </calcite-label>

      <calcite-label layout="default" style={labelStyles}>
        family
        <calcite-input-text
          label={"font family input"}
          oncalciteInputTextChange={(event) => {
            setFamily(event.target.value);
            handleFamilyChange(layerIndex, event.target.value);
          }}
          value={family}
        ></calcite-input-text>
      </calcite-label>

      <calcite-label layout="default" style={labelStyles}>
        size
        <calcite-input-number
          label={"font size input"}
          min={0}
          oncalciteInputNumberChange={(event) => {
            setSize(event.target.value);
            handleSizeChange(layerIndex, event.target.value);
          }}
          value={size}
        ></calcite-input-number>
      </calcite-label>

      <calcite-label layout="default" style={labelStyles}>
        style
        <calcite-select
          label={"font style selection"}
          oncalciteSelectChange={(event) => {
            setStyle(event.target.value);
            handleStyleChange(
              layerIndex,
              event.target.value as InstanceType<typeof Font>["style"],
            );
          }}
          value={style}
        >
          {fontStyleOptions.map((option, index) => (
            <calcite-option key={index}>{option}</calcite-option>
          ))}
        </calcite-select>
      </calcite-label>

      <calcite-label layout="default" style={labelStyles}>
        weight
        <calcite-select
          label={"font weight selection"}
          oncalciteSelectChange={(event) => {
            setWeight(event.target.value);
            handleWeightChange(
              layerIndex,
              event.target.value as InstanceType<typeof Font>["weight"],
            );
          }}
          value={weight}
        >
          {fontWeightOptions.map((option, index) => (
            <calcite-option key={index}>{option}</calcite-option>
          ))}
        </calcite-select>
      </calcite-label>
    </>
  );
}

export default TextSymbol3DLayerFontForm;
