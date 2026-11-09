import "@esri/calcite-components/components/calcite-input-number";
import "@esri/calcite-components/components/calcite-label";
import type Symbol3DVerticalOffset from "@arcgis/core/symbols/support/Symbol3DVerticalOffset.js";
import { labelStyles } from "./lib/styles";

interface Props {
  value: Symbol3DVerticalOffset;
  handleMaxWorldLengthChange: (value: string) => void;
  handleMinWorldLengthChange: (value: string) => void;
  handleScreenLengthChange: (value: string) => void;
}

function PointSymbol3DVerticalOffsetForm({
  value,
  handleMaxWorldLengthChange,
  handleMinWorldLengthChange,
  handleScreenLengthChange,
}: Props): React.ReactElement {
  return (
    <>
      <calcite-label layout="default" style={labelStyles}>
        maxWorldLength
        <calcite-input-number
          label={"maxWorldLength input"}
          min={0}
          oncalciteInputNumberChange={(event) => {
            handleMaxWorldLengthChange(event.target.value);
          }}
          value={
            value.maxWorldLength == null ? "" : String(value.maxWorldLength)
          }
        ></calcite-input-number>
      </calcite-label>

      <calcite-label layout="default" style={labelStyles}>
        minWorldLength
        <calcite-input-number
          label={"minWorldLength input"}
          min={0}
          oncalciteInputNumberChange={(event) => {
            handleMinWorldLengthChange(event.target.value);
          }}
          value={String(value.minWorldLength)}
        ></calcite-input-number>
      </calcite-label>

      <calcite-label layout="default" style={labelStyles}>
        screenLength
        <calcite-input-number
          label={"screenLength input"}
          min={0}
          oncalciteInputNumberChange={(event) => {
            handleScreenLengthChange(event.target.value);
          }}
          value={String(value.screenLength)}
        ></calcite-input-number>
      </calcite-label>
    </>
  );
}

export default PointSymbol3DVerticalOffsetForm;
