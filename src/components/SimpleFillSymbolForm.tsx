import {
  CalciteBlock,
  CalciteColorPicker,
  CalciteLabel,
  CalciteOption,
  CalciteSelect
} from "@esri/calcite-components-react";
import React, { useState } from "react";
import { FILL_OPTIONS } from "./lib/constants";
import { blockStyles, labelStyles } from "./lib/styles";
import { Cap, Fill, Join, LineStyle } from "./lib/types";
import SimpleLineSymbolForm from "./SimpleLineSymbolForm";

interface Props {
  handleColorChange: (value: string) => void;
  handleOutlineCapChange: (value: Cap) => void;
  handleOutlineColorChange: (value: string) => void;
  handleOutlineJoinChange: (value: Join) => void;
  handleOutlineMiterLimitChange: (value: string) => void;
  handleOutlineStyleChange: (value: LineStyle) => void;
  handleOutlineWidthChange: (value: string) => void;
  handleStyleChange: (value: Fill) => void;
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
      <CalciteBlock style={blockStyles} collapsible heading={"color"}>
        <CalciteColorPicker
          onCalciteColorPickerChange={(event) => {
            if (event.target.value) {
              setColor(event.target.value.toString());
            }
            handleColorChange(event.target.value as string);
          }}
          allowEmpty
          hideChannels
          hideSaved
          scale="s"
          value={color}
        ></CalciteColorPicker>
      </CalciteBlock>

      <CalciteBlock style={blockStyles} collapsible heading={"outline:"}>
        <SimpleLineSymbolForm
          handleCapChange={handleOutlineCapChange}
          handleColorChange={handleOutlineColorChange}
          handleJoinChange={handleOutlineJoinChange}
          handleMiterLimitChange={handleOutlineMiterLimitChange}
          handleStyleChange={handleOutlineStyleChange}
          handleWidthChange={handleOutlineWidthChange}
          showMarker={false}
        />
      </CalciteBlock>

      <CalciteLabel layout="default" style={labelStyles}>
        style
        <CalciteSelect
          label={"style selection"}
          onCalciteSelectChange={(event) => {
            setStyle(event.target.value);
            handleStyleChange(event.target.value as Fill);
          }}
          value={style}
        >
          {FILL_OPTIONS.map((option, index) => (
            <CalciteOption key={index}>{option}</CalciteOption>
          ))}
        </CalciteSelect>
      </CalciteLabel>
    </React.Fragment>
  );
};

export default SimpleFillSymbolForm;
