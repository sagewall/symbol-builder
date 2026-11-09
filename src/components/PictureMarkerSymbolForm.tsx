import type PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol.js";
import "@esri/calcite-components/components/calcite-input-number";
import "@esri/calcite-components/components/calcite-input-text";
import "@esri/calcite-components/components/calcite-label";
import "@esri/calcite-components/components/calcite-slider";
import { labelStyles } from "./lib/styles";

interface Props {
  symbol: PictureMarkerSymbol;
  handleAngleChange: (value: number) => void;
  handleHeightChange: (value: string) => void;
  handleUrlChange: (value: string) => void;
  handleWidthChange: (value: string) => void;
  handleXoffsetChange: (value: string) => void;
  handleYoffsetChange: (value: string) => void;
}

function PictureMarkerSymbolForm({
  symbol,
  handleAngleChange,
  handleHeightChange,
  handleUrlChange,
  handleWidthChange,
  handleXoffsetChange,
  handleYoffsetChange,
}: Props): React.ReactElement {
  const { angle, height, url, width, xoffset, yoffset } = symbol;

  return (
    <>
      <calcite-label layout="default" style={labelStyles}>
        angle
        <calcite-slider
          labelHandles={true}
          labelTicks={true}
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

export default PictureMarkerSymbolForm;
