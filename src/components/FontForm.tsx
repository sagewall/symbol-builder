import type Font from "@arcgis/core/symbols/Font";
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
      <calcite-label layout="default" style={labelStyles}>
        <calcite-select
          label={"font selection"}
          oncalciteSelectChange={(event) => {
            setFont(event.target.value);
            handleFontChange(event.target.value);
          }}
          value={font}
        >
          {FONTS.map((option, index) => (
            <calcite-option key={index} value={JSON.stringify(option)}>
              {option.name}
            </calcite-option>
          ))}
        </calcite-select>
      </calcite-label>

      <calcite-label layout="default" style={labelStyles}>
        decoration
        <calcite-select
          label={"font decoration selection"}
          oncalciteSelectChange={(event) => {
            setDecoration(event.target.value);
            handleDecorationChange(event.target.value as InstanceType<typeof Font>["decoration"]);
          }}
          value={decoration}
        >
          {FONT_DECORATION_OPTIONS.map((option, index) => (
            <calcite-option key={index}>{option}</calcite-option>
          ))}
        </calcite-select>
      </calcite-label>

      <calcite-label layout="default" style={labelStyles}>
        size
        <calcite-input-number
          label={"font size input"}
          min={0}
          oncalciteInputNumberChange={(event) => {
            setSize(event.target.value);
            handleSizeChange(event.target.value);
          }}
          value={size}
        ></calcite-input-number>
      </calcite-label>
    </React.Fragment>
  );
};

export default FontForm;
