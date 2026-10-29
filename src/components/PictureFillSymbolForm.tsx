import type PictureFillSymbol from "@arcgis/core/symbols/PictureFillSymbol.js";
import type SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol.js";
import "@esri/calcite-components/components/calcite-block";
import "@esri/calcite-components/components/calcite-input-number";
import "@esri/calcite-components/components/calcite-input-text";
import "@esri/calcite-components/components/calcite-label";
import { blockStyles, labelStyles } from "./lib/styles";
import SimpleLineSymbolForm from "./SimpleLineSymbolForm";

interface Props {
  symbol: PictureFillSymbol;
  handleHeightChange: (value: string) => void;
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
  handleUrlChange: (value: string) => void;
  handleWidthChange: (value: string) => void;
  handleXOffsetChange: (value: string) => void;
  handleXScaleChange: (value: string) => void;
  handleYOffsetChange: (value: string) => void;
  handleYScaleChange: (value: string) => void;
}

function PictureFillSymbolForm({
  symbol,
  handleHeightChange,
  handleOutlineCapChange,
  handleOutlineColorChange,
  handleOutlineJoinChange,
  handleOutlineMiterLimitChange,
  handleOutlineStyleChange,
  handleOutlineWidthChange,
  handleUrlChange,
  handleWidthChange,
  handleXOffsetChange,
  handleXScaleChange,
  handleYOffsetChange,
  handleYScaleChange,
}: Props): React.ReactElement {
  const { height, url, width, xoffset, xscale, yoffset, yscale } = symbol;

  return (
    <>
      <calcite-label layout="default" style={labelStyles}>
        height
        <calcite-input-number
          label={"height input"}
          min={0}
          oncalciteInputNumberChange={(event) => {
            handleHeightChange(event.target.value);
          }}
          value={String(height)}
        ></calcite-input-number>
      </calcite-label>

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
        url
        <calcite-input-text
          label={"url input"}
          oncalciteInputTextChange={(event) => {
            handleUrlChange(event.target.value);
          }}
          value={url ?? ""}
        ></calcite-input-text>
      </calcite-label>

      <calcite-label layout="default" style={labelStyles}>
        xoffset
        <calcite-input-number
          label={"xoffset input"}
          oncalciteInputNumberChange={(event) => {
            handleXOffsetChange(event.target.value);
          }}
          value={String(xoffset)}
        ></calcite-input-number>
      </calcite-label>

      <calcite-label layout="default" style={labelStyles}>
        yoffset
        <calcite-input-number
          label={"yoffset input"}
          oncalciteInputNumberChange={(event) => {
            handleYOffsetChange(event.target.value);
          }}
          value={String(yoffset)}
        ></calcite-input-number>
      </calcite-label>

      <calcite-label layout="default" style={labelStyles}>
        xscale
        <calcite-input-number
          label={"xscale input"}
          min={0}
          oncalciteInputNumberChange={(event) => {
            handleXScaleChange(event.target.value);
          }}
          value={String(xscale)}
        ></calcite-input-number>
      </calcite-label>

      <calcite-label layout="default" style={labelStyles}>
        yscale
        <calcite-input-number
          label={"yscale input"}
          min={0}
          oncalciteInputNumberChange={(event) => {
            handleYScaleChange(event.target.value);
          }}
          value={String(yscale)}
        ></calcite-input-number>
      </calcite-label>
    </>
  );
}

export default PictureFillSymbolForm;
