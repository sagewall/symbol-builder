import type SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol";
import type SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol";
import React, { useState } from "react";
import SimpleLineSymbolForm from "./SimpleLineSymbolForm";
import { FILL_OPTIONS } from "./lib/constants";
import { blockStyles, labelStyles } from "./lib/styles";

interface Props {
  handleColorChange: (value: string) => void;
  handleOutlineCapChange: (value: InstanceType<typeof SimpleLineSymbol>["cap"]) => void;
  handleOutlineColorChange: (value: string) => void;
  handleOutlineJoinChange: (value: InstanceType<typeof SimpleLineSymbol>["join"]) => void;
  handleOutlineMiterLimitChange: (value: string) => void;
  handleOutlineStyleChange: (value: InstanceType<typeof SimpleLineSymbol>["style"]) => void;
  handleOutlineWidthChange: (value: string) => void;
  handleStyleChange: (value: InstanceType<typeof SimpleFillSymbol>["style"]) => void;
}

const SimpleFillSymbolForm = ({
  handleColorChange,
  handleOutlineCapChange,
  handleOutlineColorChange,
  handleOutlineJoinChange,
  handleOutlineMiterLimitChange,
  handleOutlineStyleChange,
  handleOutlineWidthChange,
  handleStyleChange
}: Props) => {
  const [color, setColor] = useState("#007ac2");
  const [style, setStyle] = useState("solid");

  return (
    <React.Fragment>
      <calcite-label layout="default" style={labelStyles}>
        color
        <calcite-input
          oncalciteInputInput={(event) => {
            if (event.target.value) {
              setColor(event.target.value.toString());
            }
            handleColorChange(event.target.value as string);
          }}
          type="color"
          value={color}
        ></calcite-input>
      </calcite-label>

      <calcite-block style={blockStyles} collapsible heading={"outline:"}>
        <SimpleLineSymbolForm
          handleCapChange={handleOutlineCapChange}
          handleColorChange={handleOutlineColorChange}
          handleJoinChange={handleOutlineJoinChange}
          handleMiterLimitChange={handleOutlineMiterLimitChange}
          handleStyleChange={handleOutlineStyleChange}
          handleWidthChange={handleOutlineWidthChange}
          showMarker={false}
          solidOnly={false}
        ></SimpleLineSymbolForm>
      </calcite-block>

      <calcite-label layout="default" style={labelStyles}>
        style
        <calcite-select
          label={"style selection"}
          oncalciteSelectChange={(event) => {
            setStyle(event.target.value);
            handleStyleChange(event.target.value as InstanceType<typeof SimpleFillSymbol>["style"]);
          }}
          value={style}
        >
          {FILL_OPTIONS.map((option, index) => (
            <calcite-option key={index}>{option}</calcite-option>
          ))}
        </calcite-select>
      </calcite-label>
    </React.Fragment>
  );
};

export default SimpleFillSymbolForm;
