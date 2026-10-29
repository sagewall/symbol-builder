import type LineSymbolMarker from "@arcgis/core/symbols/LineSymbolMarker.js";
import type SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol.js";
import "@esri/calcite-components/components/calcite-block";
import "@esri/calcite-components/components/calcite-input";
import "@esri/calcite-components/components/calcite-input-number";
import "@esri/calcite-components/components/calcite-label";
import "@esri/calcite-components/components/calcite-option";
import "@esri/calcite-components/components/calcite-select";
import { capOptions, joinOptions, lineStyleOptions } from "./lib/constants";
import { blockStyles, labelStyles } from "./lib/styles";
import LineSymbolMarkerForm from "./LineSymbolMarkerForm";

interface Props {
  symbol: SimpleLineSymbol;
  marker?: LineSymbolMarker;
  handleCapChange: (
    value: InstanceType<typeof SimpleLineSymbol>["cap"],
  ) => void;
  handleColorChange: (value: string) => void;
  handleJoinChange: (
    value: InstanceType<typeof SimpleLineSymbol>["join"],
  ) => void;
  handleMarkerBlockToggle?: (value: HTMLCalciteBlockElement) => void;
  handleMarkerColorChange?: (value: string) => void;
  handleMarkerPlacementChange?: (
    value: InstanceType<typeof LineSymbolMarker>["placement"],
  ) => void;
  handleMarkerStyleChange?: (
    value: InstanceType<typeof LineSymbolMarker>["style"],
  ) => void;
  handleMiterLimitChange: (value: string) => void;
  handleStyleChange: (
    value: InstanceType<typeof SimpleLineSymbol>["style"],
  ) => void;
  handleWidthChange: (value: string) => void;
  showMarker: boolean;
  solidOnly: boolean;
}

function SimpleLineSymbolForm({
  symbol,
  marker,
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
  solidOnly,
}: Props): React.ReactElement {
  const { cap, join, miterLimit, style, width } = symbol;

  let markerBlock;
  let styleBlock;

  if (showMarker && marker) {
    markerBlock = (
      <calcite-block
        style={blockStyles}
        expandable
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
          marker={symbol.marker ?? marker}
          handleColorChange={handleMarkerColorChange}
          handlePlacementChange={handleMarkerPlacementChange}
          handleStyleChange={handleMarkerStyleChange}
        ></LineSymbolMarkerForm>
      </calcite-block>
    );
  } else {
    markerBlock = null;
  }

  if (solidOnly) {
    styleBlock = null;
  } else {
    styleBlock = (
      <calcite-label layout="default" style={labelStyles}>
        style
        <calcite-select
          label={"style selection"}
          oncalciteSelectChange={(event) => {
            handleStyleChange(
              event.target.value as InstanceType<
                typeof SimpleLineSymbol
              >["style"],
            );
          }}
          value={style}
        >
          {lineStyleOptions.map((option, index) => (
            <calcite-option key={index}>{option}</calcite-option>
          ))}
        </calcite-select>
      </calcite-label>
    );
  }

  return (
    <>
      <calcite-label layout="default" style={labelStyles}>
        cap
        <calcite-select
          label={"cap selection"}
          oncalciteSelectChange={(event) => {
            handleCapChange(
              event.target.value as InstanceType<
                typeof SimpleLineSymbol
              >["cap"],
            );
          }}
          value={cap}
        >
          {capOptions.map((option, index) => (
            <calcite-option key={index}>{option}</calcite-option>
          ))}
        </calcite-select>
      </calcite-label>

      <calcite-label layout="default" style={labelStyles}>
        color
        <calcite-input
          oncalciteInputInput={(event) => {
            handleColorChange(event.target.value);
          }}
          type="color"
          value={symbol.color?.toHex() ?? ""}
        ></calcite-input>
      </calcite-label>

      <calcite-label layout="default" style={labelStyles}>
        join
        <calcite-select
          label={"join selection"}
          oncalciteSelectChange={(event) => {
            handleJoinChange(
              event.target.value as InstanceType<
                typeof SimpleLineSymbol
              >["join"],
            );
          }}
          value={join}
        >
          {joinOptions.map((option, index) => (
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
            handleMiterLimitChange(event.target.value);
          }}
          value={String(miterLimit)}
        ></calcite-input-number>
      </calcite-label>

      {styleBlock}

      <calcite-label layout="default" style={labelStyles}>
        width
        <calcite-input-number
          label={"width input"}
          min={0}
          oncalciteInputNumberChange={(event) => {
            handleWidthChange(event.target.value);
          }}
          value={String(width)}
        ></calcite-input-number>
      </calcite-label>
    </>
  );
}

export default SimpleLineSymbolForm;
