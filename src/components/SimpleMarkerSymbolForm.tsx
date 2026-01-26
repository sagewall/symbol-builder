import type SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol.js";
import type SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol.js";
import "@esri/calcite-components/components/calcite-block";
import "@esri/calcite-components/components/calcite-input";
import "@esri/calcite-components/components/calcite-input-number";
import "@esri/calcite-components/components/calcite-input-text";
import "@esri/calcite-components/components/calcite-label";
import "@esri/calcite-components/components/calcite-select";
import { useState } from "react";
import { simpleMarkerSymbolStyleOptions } from "./lib/constants";
import { blockStyles, labelStyles } from "./lib/styles";
import SimpleLineSymbolForm from "./SimpleLineSymbolForm";

interface Props {
  handleAngleChange: (value: number) => void;
  handleColorChange: (value: string) => void;
  handleOutlineCapChange: (
    value: InstanceType<typeof SimpleLineSymbol>["cap"],
  ) => void;
  handleOutlineColorChange: (value: string) => void;
  handleOutlineJoinChange: (
    value: InstanceType<typeof SimpleLineSymbol>["join"],
  ) => void;
  handleOutlineMiterLimitChange: (value: string) => void;
  handleOutlineStyleChange: (
    value: InstanceType<typeof SimpleLineSymbol>["style"],
  ) => void;
  handleOutlineWidthChange: (value: string) => void;
  handlePathChange: (value: string) => void;
  handleSizeChange: (value: string) => void;
  handleStyleChange: (
    value: InstanceType<typeof SimpleMarkerSymbol>["style"],
  ) => void;
  handleXoffsetChange: (value: string) => void;
  handleYoffsetChange: (value: string) => void;
  scene: boolean;
}

function SimpleMarkerSymbolForm({
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
  handleYoffsetChange,
  scene,
}: Props): React.ReactElement {
  const [angle, setAngle] = useState(0);
  const [color, setColor] = useState("#007ac2");
  const [path, setPath] = useState("");
  const [size, setSize] = useState("12");
  const [style, setStyle] = useState("circle");
  const [xoffset, setXoffset] = useState("0");
  const [yoffset, setYoffset] = useState("0");

  return (
    <>
      <calcite-label layout="default" style={labelStyles}>
        angle
        <calcite-slider
          label-handles
          label-ticks
          max={360}
          min={0}
          oncalciteSliderChange={(event) => {
            setAngle(event.target.value as number);
            handleAngleChange(event.target.value as number);
          }}
          step={1}
          ticks={180}
          value={angle}
        ></calcite-slider>
      </calcite-label>
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
          solidOnly={scene}
        ></SimpleLineSymbolForm>
      </calcite-block>
      <calcite-label layout="default" style={labelStyles}>
        size
        <calcite-input-number
          label={"size input"}
          min={0}
          oncalciteInputNumberChange={(event) => {
            setSize(event.target.value);
            handleSizeChange(event.target.value);
          }}
          value={size}
        ></calcite-input-number>
      </calcite-label>
      <calcite-label layout="default" style={labelStyles}>
        style
        <calcite-select
          label={"style selection"}
          oncalciteSelectChange={(event) => {
            setStyle(event.target.value);
            handleStyleChange(
              event.target.value as InstanceType<
                typeof SimpleMarkerSymbol
              >["style"],
            );
          }}
          value={style}
        >
          {simpleMarkerSymbolStyleOptions.map((option, index) => (
            <calcite-option key={index}>{option}</calcite-option>
          ))}
        </calcite-select>
      </calcite-label>
      {style === "path" && (
        <calcite-label layout="default" style={labelStyles}>
          path
          <calcite-input-text
            label={"path input"}
            oncalciteInputTextChange={(event) => {
              setPath(event.target.value);
              handlePathChange(event.target.value);
            }}
            value={path}
          ></calcite-input-text>
        </calcite-label>
      )}
      <calcite-label layout="default" style={labelStyles}>
        xoffset
        <calcite-input-number
          label={"xoffset input"}
          oncalciteInputNumberChange={(event) => {
            setXoffset(event.target.value);
            handleXoffsetChange(event.target.value);
          }}
          value={xoffset}
        ></calcite-input-number>
      </calcite-label>
      <calcite-label layout="default" style={labelStyles}>
        yoffset
        <calcite-input-number
          label={"yoffset input"}
          oncalciteInputNumberChange={(event) => {
            setYoffset(event.target.value);
            handleYoffsetChange(event.target.value);
          }}
          value={yoffset}
        ></calcite-input-number>
      </calcite-label>
    </>
  );
}

export default SimpleMarkerSymbolForm;
