import {
  CalciteBlock,
  CalciteColorPicker,
  CalciteInputNumber,
  CalciteLabel,
  CalciteOption,
  CalciteSelect,
} from "@esri/calcite-components-react";
import "@esri/calcite-components/dist/components/calcite-block";
import "@esri/calcite-components/dist/components/calcite-color-picker";
import "@esri/calcite-components/dist/components/calcite-input-number";
import "@esri/calcite-components/dist/components/calcite-label";
import "@esri/calcite-components/dist/components/calcite-option";
import "@esri/calcite-components/dist/components/calcite-select";
import React, { useState } from "react";
import { blockStyles, labelStyles } from "../lib/styles";
import LineSymbolMarkerForm from "./LineSymbolMarkerForm";
import {
  SimpleLineSymbolCapOption,
  SimpleLineSymbolJoinOption,
  SimpleLineSymbolStyleOption,
} from "../lib/types";

interface Props {
  handleCapChange: (value: SimpleLineSymbolCapOption) => void;
  handleColorChange: (value: string) => void;
  handleJoinChange: (value: SimpleLineSymbolJoinOption) => void;
  handleMarkerBlockToggle?: (value: HTMLCalciteBlockElement) => void;
  handleMarkerColorChange?: (value: string) => void;
  handleMarkerPlacementChange?: (value: string) => void;
  handleMarkerStyleChange?: (value: string) => void;
  handleMiterLimitChange: (value: string) => void;
  handleStyleChange: (value: SimpleLineSymbolStyleOption) => void;
  handleWidthChange: (value: string) => void;
  showMarker: boolean;
}

const SimpleLineSymbolForm = ({
  handleCapChange,
  handleColorChange,
  handleJoinChange,
  handleMarkerBlockToggle,
  handleMarkerColorChange,
  handleMarkerPlacementChange,
  handleMarkerStyleChange,
  handleMiterLimitChange,
  handleStyleChange,
  handleWidthChange,
  showMarker,
}: Props) => {
  const capOptions = ["round", "butt", "square"];
  const joinOptions = ["round", "miter", "bevel"];
  const styleOptions = [
    "solid",
    "dash",
    "dash-dot",
    "dot",
    "long-dash",
    "long-dash-dot",
    "long-dash-dot-dot",
    "none",
    "short-dash",
    "short-dash-dot",
    "short-dash-dot-dot",
    "short-dot",
  ];

  const [cap, setCap] = useState("round");
  const [color, setColor] = useState("#007ac2");
  const [join, setJoin] = useState("round");
  const [miterLimit, setMiterLimit] = useState("1");
  const [style, setStyle] = useState("solid");
  const [width, setWidth] = useState("1");

  let markerBlock;
  if (showMarker) {
    markerBlock = (
      <CalciteBlock
        style={blockStyles}
        collapsible
        heading={"marker"}
        onCalciteBlockToggle={(event) => {
          if (handleMarkerBlockToggle) {
            handleMarkerBlockToggle(event.target);
          }
        }}
      >
        <LineSymbolMarkerForm
          handleColorChange={handleMarkerColorChange}
          handlePlacementChange={handleMarkerPlacementChange}
          handleStyleChange={handleMarkerStyleChange}
        />
      </CalciteBlock>
    );
  } else {
    markerBlock = <React.Fragment />;
  }

  return (
    <React.Fragment>
      <CalciteLabel layout="default" style={labelStyles}>
        cap
        <CalciteSelect
          label={"cap selection"}
          onCalciteSelectChange={(event) => {
            setCap(event.target.value);
            handleCapChange(event.target.value as SimpleLineSymbolCapOption);
          }}
          value={cap}
        >
          {capOptions.map((option, index) => (
            <CalciteOption key={index}>{option}</CalciteOption>
          ))}
        </CalciteSelect>
      </CalciteLabel>
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
      <CalciteLabel layout="default" style={labelStyles}>
        join
        <CalciteSelect
          label={"join selection"}
          onCalciteSelectChange={(event) => {
            setJoin(event.target.value);
            handleJoinChange(event.target.value as SimpleLineSymbolJoinOption);
          }}
          value={join}
        >
          {joinOptions.map((option, index) => (
            <CalciteOption key={index}>{option}</CalciteOption>
          ))}
        </CalciteSelect>
      </CalciteLabel>

      {markerBlock}

      <CalciteLabel layout="default" style={labelStyles}>
        miterLimit
        <CalciteInputNumber
          label={"miterLimit input"}
          min={0}
          onCalciteInputNumberChange={(event) => {
            setMiterLimit(event.target.value);
            handleMiterLimitChange(event.target.value);
          }}
          value={miterLimit}
        ></CalciteInputNumber>
      </CalciteLabel>
      <CalciteLabel layout="default" style={labelStyles}>
        style
        <CalciteSelect
          label={"style selection"}
          onCalciteSelectChange={(event) => {
            setStyle(event.target.value);
            handleStyleChange(
              event.target.value as SimpleLineSymbolStyleOption
            );
          }}
          value={style}
        >
          {styleOptions.map((option, index) => (
            <CalciteOption key={index}>{option}</CalciteOption>
          ))}
        </CalciteSelect>
      </CalciteLabel>
      <CalciteLabel layout="default" style={labelStyles}>
        width
        <CalciteInputNumber
          label={"width input"}
          min={0}
          onCalciteInputNumberChange={(event) => {
            setWidth(event.target.value);
            handleWidthChange(event.target.value);
          }}
          value={width}
        ></CalciteInputNumber>
      </CalciteLabel>
    </React.Fragment>
  );
};

export default SimpleLineSymbolForm;
