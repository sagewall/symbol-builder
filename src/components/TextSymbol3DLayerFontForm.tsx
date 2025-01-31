import type Font from "@arcgis/core/symbols/Font";
import React, { useState } from "react";
import { FONT_DECORATION_OPTIONS, FONT_STYLE_OPTIONS, FONT_WEIGHT_OPTIONS } from "./lib/constants";
import { labelStyles } from "./lib/styles";

interface Props {
  layerIndex: number;
  handleDecorationChange: (
    layerIndex: number,
    value: InstanceType<typeof Font>["decoration"]
  ) => void;
  handleFamilyChange: (layerIndex: number, value: string) => void;
  handleSizeChange: (layerIndex: number, value: string) => void;
  handleStyleChange: (layerIndex: number, value: InstanceType<typeof Font>["style"]) => void;
  handleWeightChange: (layerIndex: number, value: InstanceType<typeof Font>["weight"]) => void;
}

const TextSymbol3DLayerFontForm = ({
  layerIndex,
  handleDecorationChange,
  handleFamilyChange,
  handleSizeChange,
  handleStyleChange,
  handleWeightChange
}: Props) => {
  const [decoration, setDecoration] = useState("none");
  const [family, setFamily] = useState("sans-serif");
  const [size, setSize] = useState("9");
  const [style, setStyle] = useState("normal");
  const [weight, setWeight] = useState("normal");

  return (
    <React.Fragment>
      <calcite-label layout="default" style={labelStyles}>
        decoration
        <calcite-select
          label={"font decoration selection"}
          oncalciteSelectChange={(event) => {
            setDecoration(event.target.value);
            handleDecorationChange(
              layerIndex,
              event.target.value as InstanceType<typeof Font>["decoration"]
            );
          }}
          value={decoration}
        >
          {FONT_DECORATION_OPTIONS.map((option, index) => (
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
            handleStyleChange(layerIndex, event.target.value as InstanceType<typeof Font>["style"]);
          }}
          value={style}
        >
          {FONT_STYLE_OPTIONS.map((option, index) => (
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
              event.target.value as InstanceType<typeof Font>["weight"]
            );
          }}
          value={weight}
        >
          {FONT_WEIGHT_OPTIONS.map((option, index) => (
            <calcite-option key={index}>{option}</calcite-option>
          ))}
        </calcite-select>
      </calcite-label>
    </React.Fragment>
  );
};

export default TextSymbol3DLayerFontForm;
