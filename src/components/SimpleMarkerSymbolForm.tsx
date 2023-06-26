import type SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol";
import type SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";
import {
  CalciteBlock,
  CalciteInput,
  CalciteInputNumber,
  CalciteInputText,
  CalciteLabel,
  CalciteOption,
  CalciteSelect,
  CalciteSlider
} from "@esri/calcite-components-react";
import React, { useState } from "react";
import SimpleLineSymbolForm from "./SimpleLineSymbolForm";
import { SIMPLE_MARKER_SYMBOL_STYLE_OPTIONS } from "./lib/constants";
import { blockStyles, labelStyles } from "./lib/styles";

interface Props {
  handleAngleChange: (value: number) => void;
  handleColorChange: (value: string) => void;
  handleOutlineCapChange: (value: InstanceType<typeof SimpleLineSymbol>["cap"]) => void;
  handleOutlineColorChange: (value: string) => void;
  handleOutlineJoinChange: (value: InstanceType<typeof SimpleLineSymbol>["join"]) => void;
  handleOutlineMiterLimitChange: (value: string) => void;
  handleOutlineStyleChange: (value: InstanceType<typeof SimpleLineSymbol>["style"]) => void;
  handleOutlineWidthChange: (value: string) => void;
  handlePathChange: (value: string) => void;
  handleSizeChange: (value: string) => void;
  handleStyleChange: (value: InstanceType<typeof SimpleMarkerSymbol>["style"]) => void;
  handleXoffsetChange: (value: string) => void;
  handleYoffsetChange: (value: string) => void;
}

const SimpleMarkerSymbolForm = ({
  handleAngleChange,
  handleColorChange,
  handleOutlineCapChange,
  handleOutlineColorChange,
  handleOutlineJoinChange,
  handleOutlineMiterLimitChange,
  handleOutlineStyleChange,
  handleOutlineWidthChange,
  handlePathChange,
  handleSizeChange,
  handleStyleChange,
  handleXoffsetChange,
  handleYoffsetChange
}: Props) => {
  const [angle, setAngle] = useState(0);
  const [color, setColor] = useState("#007ac2");
  const [path, setPath] = useState("");
  const [size, setSize] = useState("12");
  const [style, setStyle] = useState("circle");
  const [xoffset, setXoffset] = useState("0");
  const [yoffset, setYoffset] = useState("0");

  return (
    <React.Fragment>
      <CalciteLabel layout="default" style={labelStyles}>
        angle
        <CalciteSlider
          labelHandles={true}
          labelTicks={true}
          max={360}
          min={0}
          onCalciteSliderChange={(event) => {
            setAngle(event.target.value as number);
            handleAngleChange(event.target.value as number);
          }}
          step={1}
          ticks={180}
          value={angle}
        ></CalciteSlider>
      </CalciteLabel>
      <CalciteLabel layout="default" style={labelStyles}>
        color
        <CalciteInput
          onCalciteInputInput={(event) => {
            if (event.target.value) {
              setColor(event.target.value.toString());
            }
            handleColorChange(event.target.value as string);
          }}
          type="color"
          value={color}
        />
      </CalciteLabel>
      <CalciteBlock style={blockStyles} collapsible heading={"outline:"}>
        <SimpleLineSymbolForm
          handleCapChange={handleOutlineCapChange}
          handleColorChange={handleOutlineColorChange}
          handleJoinChange={handleOutlineJoinChange}
          handleMiterLimitChange={handleOutlineMiterLimitChange}
          handleStyleChange={handleOutlineStyleChange}
          handleWidthChange={handleOutlineWidthChange}
          showMarker={false}
          solidOnly={true}
        />
      </CalciteBlock>
      <CalciteLabel layout="default" style={labelStyles}>
        size
        <CalciteInputNumber
          label={"size input"}
          min={0}
          onCalciteInputNumberChange={(event) => {
            setSize(event.target.value);
            handleSizeChange(event.target.value);
          }}
          value={size}
        ></CalciteInputNumber>
      </CalciteLabel>
      <CalciteLabel layout="default" style={labelStyles}>
        style
        <CalciteSelect
          label={"style selection"}
          onCalciteSelectChange={(event) => {
            setStyle(event.target.value);
            handleStyleChange(
              event.target.value as InstanceType<typeof SimpleMarkerSymbol>["style"]
            );
          }}
          value={style}
        >
          {SIMPLE_MARKER_SYMBOL_STYLE_OPTIONS.map((option, index) => (
            <CalciteOption key={index}>{option}</CalciteOption>
          ))}
        </CalciteSelect>
      </CalciteLabel>
      {style === "path" && (
        <CalciteLabel layout="default" style={labelStyles}>
          path
          <CalciteInputText
            label={"path input"}
            onCalciteInputTextChange={(event) => {
              setPath(event.target.value);
              handlePathChange(event.target.value);
            }}
            value={path}
          ></CalciteInputText>
        </CalciteLabel>
      )}
      <CalciteLabel layout="default" style={labelStyles}>
        xoffset
        <CalciteInputNumber
          label={"xoffset input"}
          onCalciteInputNumberChange={(event) => {
            setXoffset(event.target.value);
            handleXoffsetChange(event.target.value);
          }}
          value={xoffset}
        ></CalciteInputNumber>
      </CalciteLabel>
      <CalciteLabel layout="default" style={labelStyles}>
        yoffset
        <CalciteInputNumber
          label={"yoffset input"}
          onCalciteInputNumberChange={(event) => {
            setYoffset(event.target.value);
            handleYoffsetChange(event.target.value);
          }}
          value={yoffset}
        ></CalciteInputNumber>
      </CalciteLabel>
    </React.Fragment>
  );
};

export default SimpleMarkerSymbolForm;
