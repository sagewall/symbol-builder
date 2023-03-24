import {
  CalciteBlock,
  CalciteColorPicker,
  CalciteInputNumber,
  CalciteLabel,
  CalciteOption,
  CalciteSelect
} from "@esri/calcite-components-react";
import React, { useState } from "react";
import { CAP_OPTIONS, JOIN_OPTIONS, LINE_STYLE_OPTIONS } from "./lib/constants";
import { blockStyles, labelStyles } from "./lib/styles";
import { MarkerPlacement, LineStyleMarker3DStyle, Cap, Join, LineStyle } from "./lib/types";
import LineSymbolMarkerForm from "./LineSymbolMarkerForm";

interface Props {
  handleCapChange: (value: Cap) => void;
  handleColorChange: (value: string) => void;
  handleJoinChange: (value: Join) => void;
  handleMarkerBlockToggle?: (value: HTMLCalciteBlockElement) => void;
  handleMarkerColorChange?: (value: string) => void;
  handleMarkerPlacementChange?: (value: MarkerPlacement) => void;
  handleMarkerStyleChange?: (value: LineStyleMarker3DStyle) => void;
  handleMiterLimitChange: (value: string) => void;
  handleStyleChange: (value: LineStyle) => void;
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
  showMarker
}: Props) => {
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
            handleCapChange(event.target.value as Cap);
          }}
          value={cap}
        >
          {CAP_OPTIONS.map((option, index) => (
            <CalciteOption key={index}>{option}</CalciteOption>
          ))}
        </CalciteSelect>
      </CalciteLabel>
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
      <CalciteLabel layout="default" style={labelStyles}>
        join
        <CalciteSelect
          label={"join selection"}
          onCalciteSelectChange={(event) => {
            setJoin(event.target.value);
            handleJoinChange(event.target.value as Join);
          }}
          value={join}
        >
          {JOIN_OPTIONS.map((option, index) => (
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
            handleStyleChange(event.target.value as LineStyle);
          }}
          value={style}
        >
          {LINE_STYLE_OPTIONS.map((option, index) => (
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
