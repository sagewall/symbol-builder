import type SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol.js";
import type SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol.js";
import "@esri/calcite-components/components/calcite-block";
import "@esri/calcite-components/components/calcite-input";
import "@esri/calcite-components/components/calcite-input-number";
import "@esri/calcite-components/components/calcite-input-text";
import "@esri/calcite-components/components/calcite-label";
import "@esri/calcite-components/components/calcite-select";
import { simpleMarkerSymbolStyleOptions } from "./lib/constants";
import { blockStyles, labelStyles } from "./lib/styles";
import SimpleLineSymbolForm from "./SimpleLineSymbolForm";

interface Props {
  symbol: SimpleMarkerSymbol;
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
  symbol,
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
  const { angle, path, size, style, xoffset, yoffset } = symbol;

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
            handleColorChange(event.target.value);
          }}
          type="color"
          value={symbol.color?.toHex() ?? ""}
        ></calcite-input>
      </calcite-label>
      {symbol.outline && (
        <calcite-block style={blockStyles} expandable heading={"outline:"}>
          <SimpleLineSymbolForm
            symbol={symbol.outline}
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
      )}
      <calcite-label layout="default" style={labelStyles}>
        size
        <calcite-input-number
          label={"size input"}
          min={0}
          oncalciteInputNumberChange={(event) => {
            handleSizeChange(event.target.value);
          }}
          value={String(size)}
        ></calcite-input-number>
      </calcite-label>
      <calcite-label layout="default" style={labelStyles}>
        style
        <calcite-select
          label={"style selection"}
          oncalciteSelectChange={(event) => {
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
              handlePathChange(event.target.value);
            }}
            value={path ?? ""}
          ></calcite-input-text>
        </calcite-label>
      )}
      <calcite-label layout="default" style={labelStyles}>
        xoffset
        <calcite-input-number
          label={"xoffset input"}
          oncalciteInputNumberChange={(event) => {
            handleXoffsetChange(event.target.value);
          }}
          value={String(xoffset)}
        ></calcite-input-number>
      </calcite-label>
      <calcite-label layout="default" style={labelStyles}>
        yoffset
        <calcite-input-number
          label={"yoffset input"}
          oncalciteInputNumberChange={(event) => {
            handleYoffsetChange(event.target.value);
          }}
          value={String(yoffset)}
        ></calcite-input-number>
      </calcite-label>
    </>
  );
}

export default SimpleMarkerSymbolForm;
