import "@esri/calcite-components/components/calcite-input";
import "@esri/calcite-components/components/calcite-label";
import { labelStyles } from "./lib/styles";

interface Props {
  colorValue: string;
  layerIndex: number;
  handleColorChange: (layerIndex: number, value: string) => void;
}

function TextSymbol3DLayerBackgroundForm({
  colorValue,
  layerIndex,
  handleColorChange,
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
    </>
  );
}

export default TextSymbol3DLayerBackgroundForm;
