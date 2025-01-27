import type LineSymbolMarker from "@arcgis/core/symbols/LineSymbolMarker";
import type SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol";
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
      <calcite-block
        style={blockStyles}
        collapsible
        heading={"marker"}
        oncalciteBlockClose={(event) => {
          if (handleMarkerBlockToggle) {
            handleMarkerBlockToggle(event.target);
          }
        }}
        oncalciteBlockOpen={(event) => {
          if (handleMarkerBlockToggle) {
            handleMarkerBlockToggle(event.target);
          }
        }}
      >
        <LineSymbolMarkerForm
          handleColorChange={handleMarkerColorChange}
          handlePlacementChange={handleMarkerPlacementChange}
          handleStyleChange={handleMarkerStyleChange}
        ></LineSymbolMarkerForm>
      </calcite-block>
    );
  } else {
    markerBlock = <React.Fragment></React.Fragment>;
  }

  if (solidOnly) {
    styleBlock = <React.Fragment></React.Fragment>;
  } else {
    styleBlock = (
      <calcite-label layout="default" style={labelStyles}>
        style
        <calcite-select
          label={"style selection"}
          oncalciteSelectChange={(event) => {
            setStyle(event.target.value);
            handleStyleChange(event.target.value as InstanceType<typeof SimpleLineSymbol>["style"]);
          }}
          value={style}
        >
          {LINE_STYLE_OPTIONS.map((option, index) => (
            <calcite-option key={index}>{option}</calcite-option>
          ))}
        </calcite-select>
      </calcite-label>
    );
  }

  return (
    <React.Fragment>
      <calcite-label layout="default" style={labelStyles}>
        cap
        <calcite-select
          label={"cap selection"}
          oncalciteSelectChange={(event) => {
            setCap(event.target.value);
            handleCapChange(event.target.value as InstanceType<typeof SimpleLineSymbol>["cap"]);
          }}
          value={cap}
        >
          {CAP_OPTIONS.map((option, index) => (
            <calcite-option key={index}>{option}</calcite-option>
          ))}
        </calcite-select>
      </calcite-label>

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

      <calcite-label layout="default" style={labelStyles}>
        join
        <calcite-select
          label={"join selection"}
          oncalciteSelectChange={(event) => {
            setJoin(event.target.value);
            handleJoinChange(event.target.value as InstanceType<typeof SimpleLineSymbol>["join"]);
          }}
          value={join}
        >
          {JOIN_OPTIONS.map((option, index) => (
            <calcite-option key={index}>{option}</calcite-option>
          ))}
        </calcite-select>
      </calcite-label>

      {markerBlock}

      <calcite-label layout="default" style={labelStyles}>
        miterLimit
        <calcite-input-number
          label={"miterLimit input"}
          min={0}
          oncalciteInputNumberChange={(event) => {
            setMiterLimit(event.target.value);
            handleMiterLimitChange(event.target.value);
          }}
          value={miterLimit}
        ></calcite-input-number>
      </calcite-label>

      {styleBlock}

      <calcite-label layout="default" style={labelStyles}>
        width
        <calcite-input-number
          label={"width input"}
          min={0}
          oncalciteInputNumberChange={(event) => {
            setWidth(event.target.value);
            handleWidthChange(event.target.value);
          }}
          value={width}
        ></calcite-input-number>
      </calcite-label>
    </React.Fragment>
  );
};

export default SimpleLineSymbolForm;
