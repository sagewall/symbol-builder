import type LineSymbolMarker from "@arcgis/core/symbols/LineSymbolMarker";
import type SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol";
import {
  CalciteBlock,
  CalciteInput,
  CalciteInputNumber,
  CalciteLabel,
  CalciteOption,
  CalciteSelect
} from "@esri/calcite-components-react";
import React, { useEffect, useState } from "react";
import LineSymbolMarkerForm from "./LineSymbolMarkerForm";
import { CAP_OPTIONS, JOIN_OPTIONS, LINE_STYLE_OPTIONS } from "./lib/constants";
import { blockStyles, labelStyles } from "./lib/styles";

interface Props {
  handleCapChange: (value: InstanceType<typeof SimpleLineSymbol>["cap"]) => void;
  handleColorChange: (value: string) => void;
  handleJoinChange: (value: InstanceType<typeof SimpleLineSymbol>["join"]) => void;
  handleMarkerBlockToggle?: (value: HTMLCalciteBlockElement) => void;
  handleMarkerColorChange?: (value: string) => void;
  handleMarkerPlacementChange?: (value: InstanceType<typeof LineSymbolMarker>["placement"]) => void;
  handleMarkerStyleChange?: (value: InstanceType<typeof LineSymbolMarker>["style"]) => void;
  handleMiterLimitChange: (value: string) => void;
  handleStyleChange: (value: InstanceType<typeof SimpleLineSymbol>["style"]) => void;
  handleWidthChange: (value: string) => void;
  showMarker: boolean;
  solidOnly: boolean;
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
  solidOnly
}: Props) => {
  const [cap, setCap] = useState("round");
  const [color, setColor] = useState("#007ac2");
  const [join, setJoin] = useState("round");
  const [miterLimit, setMiterLimit] = useState("1");
  const [style, setStyle] = useState("solid");
  const [width, setWidth] = useState("1");

  let markerBlock;
  let styleBlock;

  useEffect(() => {
    if (solidOnly) {
      setStyle("solid");
      handleStyleChange("solid");
    }
  }, [solidOnly]);

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

  if (solidOnly) {
    styleBlock = <React.Fragment />;
  } else {
    styleBlock = (
      <CalciteLabel layout="default" style={labelStyles}>
        style
        <CalciteSelect
          label={"style selection"}
          onCalciteSelectChange={(event) => {
            setStyle(event.target.value);
            handleStyleChange(event.target.value as InstanceType<typeof SimpleLineSymbol>["style"]);
          }}
          value={style}
        >
          {LINE_STYLE_OPTIONS.map((option, index) => (
            <CalciteOption key={index}>{option}</CalciteOption>
          ))}
        </CalciteSelect>
      </CalciteLabel>
    );
  }

  return (
    <React.Fragment>
      <CalciteLabel layout="default" style={labelStyles}>
        cap
        <CalciteSelect
          label={"cap selection"}
          onCalciteSelectChange={(event) => {
            setCap(event.target.value);
            handleCapChange(event.target.value as InstanceType<typeof SimpleLineSymbol>["cap"]);
          }}
          value={cap}
        >
          {CAP_OPTIONS.map((option, index) => (
            <CalciteOption key={index}>{option}</CalciteOption>
          ))}
        </CalciteSelect>
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

      <CalciteLabel layout="default" style={labelStyles}>
        join
        <CalciteSelect
          label={"join selection"}
          onCalciteSelectChange={(event) => {
            setJoin(event.target.value);
            handleJoinChange(event.target.value as InstanceType<typeof SimpleLineSymbol>["join"]);
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

      {styleBlock}

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
