import {
  CalciteBlock,
  CalciteColorPicker,
  CalciteLabel,
  CalciteOption,
  CalciteSelect,
} from "@esri/calcite-components-react";
import "@esri/calcite-components/dist/components/calcite-block";
import "@esri/calcite-components/dist/components/calcite-color-picker";
import "@esri/calcite-components/dist/components/calcite-label";
import "@esri/calcite-components/dist/components/calcite-option";
import "@esri/calcite-components/dist/components/calcite-select";
import React, { useState } from "react";
import { blockStyles, labelStyles } from "./lib/styles";
import {
  SimpleFillSymbolStyleOption,
  SimpleLineSymbolCapOption,
  SimpleLineSymbolJoinOption,
  SimpleLineSymbolStyleOption,
} from "./lib/types";
import SimpleLineSymbolForm from "./SimpleLineSymbolForm";

interface Props {
  handleColorChange: (value: string) => void;
  handleOutlineCapChange: (value: SimpleLineSymbolCapOption) => void;
  handleOutlineColorChange: (value: string) => void;
  handleOutlineJoinChange: (value: SimpleLineSymbolJoinOption) => void;
  handleOutlineMiterLimitChange: (value: string) => void;
  handleOutlineStyleChange: (value: SimpleLineSymbolStyleOption) => void;
  handleOutlineWidthChange: (value: string) => void;
  handleStyleChange: (value: SimpleFillSymbolStyleOption) => void;
}

const SimpleFillSymbolForm = ({
  handleColorChange,
  handleOutlineCapChange,
  handleOutlineColorChange,
  handleOutlineJoinChange,
  handleOutlineMiterLimitChange,
  handleOutlineStyleChange,
  handleOutlineWidthChange,
  handleStyleChange,
}: Props) => {
  const styleOptions = [
    "solid",
    "backward-diagonal",
    "cross",
    "diagonal-cross",
    "forward-diagonal",
    "horizontal",
    "none",
    "vertical",
  ];

  const [color, setColor] = useState("#007ac2");
  const [style, setStyle] = useState("solid");

  return (
    <React.Fragment>
      <CalciteBlock style={blockStyles} collapsible heading={"color"}>
        <CalciteLabel layout="default" style={labelStyles}>
          color
          <CalciteColorPicker
            onCalciteColorPickerChange={(event) => {
              if (event.target.value) {
                setColor(event.target.value.toString());
              }
              handleColorChange(event.target.value as string);
            }}
            value={color}
          ></CalciteColorPicker>
        </CalciteLabel>
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
            handleStyleChange(
              event.target.value as SimpleFillSymbolStyleOption
            );
          }}
          value={style}
        >
          {styleOptions.map((option, index) => (
            <CalciteOption key={index}>{option}</CalciteOption>
          ))}
        </CalciteSelect>
      </CalciteLabel>
    </React.Fragment>
  );
};

export default SimpleFillSymbolForm;
