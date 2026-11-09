import "@esri/calcite-components/components/calcite-input-number";
import "@esri/calcite-components/components/calcite-label";
import type IconSymbol3DLayer from "@arcgis/core/symbols/IconSymbol3DLayer.js";
import { labelStyles } from "./lib/styles";

interface Props {
  symbolLayer: IconSymbol3DLayer;
  layerIndex: number;
  handleIconSymbol3DLayerAnchorPositionXChange: (
    layerIndex: number,
    value: string,
  ) => void;
  handleIconSymbol3DLayerAnchorPositionYChange: (
    layerIndex: number,
    value: string,
  ) => void;
}

function IconSymbol3DLayerForm({
  symbolLayer,
  layerIndex,
  handleIconSymbol3DLayerAnchorPositionXChange,
  handleIconSymbol3DLayerAnchorPositionYChange,
}: Props): React.ReactElement {
  const anchorPosition = symbolLayer.anchorPosition;

  return (
    <>
      <calcite-label layout="default" style={labelStyles}>
        x
        <calcite-input-number
          label={"x anchor position"}
          oncalciteInputNumberChange={(event) => {
            handleIconSymbol3DLayerAnchorPositionXChange(
              layerIndex,
              event.target.value,
            );
          }}
          value={String(anchorPosition?.x ?? 0)}
        ></calcite-input-number>
      </calcite-label>

      <calcite-label layout="default" style={labelStyles}>
        y
        <calcite-input-number
          label={"y anchor position"}
          oncalciteInputNumberChange={(event) => {
            handleIconSymbol3DLayerAnchorPositionYChange(
              layerIndex,
              event.target.value,
            );
          }}
          value={String(anchorPosition?.y ?? 0)}
        ></calcite-input-number>
      </calcite-label>
    </>
  );
}

export default IconSymbol3DLayerForm;
