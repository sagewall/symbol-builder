import "@esri/calcite-components/components/calcite-input";
import "@esri/calcite-components/components/calcite-input-number";
import "@esri/calcite-components/components/calcite-label";
import { labelStyles } from "./lib/styles";

interface Props {
  colorValue: string;
  sizeValue: number;
  layerIndex: number;
  handleColorChange: (layerIndex: number, value: string) => void;
  handleSizeChange: (layerIndex: number, value: string) => void;
}

function TextSymbol3DLayerHaloForm({
  colorValue,
  sizeValue,
  layerIndex,
  handleColorChange,
  handleSizeChange,
}: Props): React.ReactElement {
  return (
    <>
      <calcite-label layout="default" style={labelStyles}>
        color
        <calcite-input
          oncalciteInputInput={(event) => {
            if (!event.target.value) return;
            handleColorChange(layerIndex, event.target.value);
          }}
          type="color"
          value={colorValue}
        ></calcite-input>
      </calcite-label>

      <calcite-label layout="default" style={labelStyles}>
        size
        <calcite-input-number
          label={"size input"}
          min={0}
          oncalciteInputNumberChange={(event) => {
            handleSizeChange(layerIndex, event.target.value);
          }}
          value={String(sizeValue)}
        ></calcite-input-number>
      </calcite-label>
    </>
  );
}

export default TextSymbol3DLayerHaloForm;
