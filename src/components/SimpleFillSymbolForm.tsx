import type SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol.js";
import type SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol.js";
import "@esri/calcite-components/dist/components/calcite-block";
import "@esri/calcite-components/dist/components/calcite-input";
import "@esri/calcite-components/dist/components/calcite-label";
import "@esri/calcite-components/dist/components/calcite-option";
import "@esri/calcite-components/dist/components/calcite-select";
import { useState } from "react";
import { fillOptions } from "./lib/constants";
import { blockStyles, labelStyles } from "./lib/styles";
import SimpleLineSymbolForm from "./SimpleLineSymbolForm";

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

function SimpleFillSymbolForm({
  handleColorChange,
  handleOutlineCapChange,
  handleOutlineColorChange,
  handleOutlineJoinChange,
  handleOutlineMiterLimitChange,
  handleOutlineStyleChange,
  handleOutlineWidthChange,
  handleStyleChange,
}: Props): React.ReactElement {
  const [color, setColor] = useState("#007ac2");
  const [style, setStyle] = useState("solid");

  return (
    <>
      <calcite-label layout="default" style={labelStyles}>
        color
        <calcite-input
          oncalciteInputInput={(event) => {
            if (event.target.value) {
              setColor(event.target.value);
            }
            handleColorChange(event.target.value);
          }}
          type="color"
          value={color}></calcite-input>
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
          solidOnly={false}></SimpleLineSymbolForm>
      </calcite-block>

      <calcite-label layout="default" style={labelStyles}>
        style
        <calcite-select
          label={"style selection"}
          oncalciteSelectChange={(event) => {
            setStyle(event.target.value);
            handleStyleChange(event.target.value as InstanceType<typeof SimpleFillSymbol>["style"]);
          }}
          value={style}>
          {fillOptions.map((option, index) => (
            <calcite-option key={index}>{option}</calcite-option>
          ))}
        </calcite-select>
      </calcite-label>
    </>
  );
}

export default SimpleFillSymbolForm;
