import type SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol.js";
import type SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol.js";
import "@esri/calcite-components/dist/components/calcite-block";
import "@esri/calcite-components/dist/components/calcite-input";
import "@esri/calcite-components/dist/components/calcite-label";
import "@esri/calcite-components/dist/components/calcite-option";
import "@esri/calcite-components/dist/components/calcite-select";
import { fillOptions } from "./lib/constants";
import { blockStyles, labelStyles } from "./lib/styles";
import SimpleLineSymbolForm from "./SimpleLineSymbolForm";

interface Props {
  symbol: SimpleFillSymbol;
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
  handleStyleChange: (
    value: InstanceType<typeof SimpleFillSymbol>["style"],
  ) => void;
}

function SimpleFillSymbolForm({
  symbol,
  handleColorChange,
  handleOutlineCapChange,
  handleOutlineColorChange,
  handleOutlineJoinChange,
  handleOutlineMiterLimitChange,
  handleOutlineStyleChange,
  handleOutlineWidthChange,
  handleStyleChange,
}: Props): React.ReactElement {
  return (
    <>
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
            solidOnly={false}
          ></SimpleLineSymbolForm>
        </calcite-block>
      )}

      <calcite-label layout="default" style={labelStyles}>
        style
        <calcite-select
          label={"style selection"}
          oncalciteSelectChange={(event) => {
            handleStyleChange(
              event.target.value as InstanceType<
                typeof SimpleFillSymbol
              >["style"],
            );
          }}
          value={symbol.style}
        >
          {fillOptions.map((option, index) => (
            <calcite-option key={index}>{option}</calcite-option>
          ))}
        </calcite-select>
      </calcite-label>
    </>
  );
}

export default SimpleFillSymbolForm;
