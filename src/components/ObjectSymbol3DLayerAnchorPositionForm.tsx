import "@esri/calcite-components/dist/components/calcite-input-number";
import "@esri/calcite-components/dist/components/calcite-label";
import type ObjectSymbol3DLayer from "@arcgis/core/symbols/ObjectSymbol3DLayer.js";
import { labelStyles } from "./lib/styles";

interface Props {
  symbolLayer: ObjectSymbol3DLayer;
  layerIndex: number;
  handleObjectSymbol3DLayerAnchorPositionXChange: (
    layerIndex: number,
    value: string,
  ) => void;
  handleObjectSymbol3DLayerAnchorPositionYChange: (
    layerIndex: number,
    value: string,
  ) => void;
  handleObjectSymbol3DLayerAnchorPositionZChange: (
    layerIndex: number,
    value: string,
  ) => void;
}

function ObjectSymbol3DLayerAnchorPositionForm({
  symbolLayer,
  layerIndex,
  handleObjectSymbol3DLayerAnchorPositionXChange,
  handleObjectSymbol3DLayerAnchorPositionYChange,
  handleObjectSymbol3DLayerAnchorPositionZChange,
}: Props): React.ReactElement {
  const anchorPosition = symbolLayer.anchorPosition;

  return (
    <>
      <calcite-label layout="default" style={labelStyles}>
        x
        <calcite-input-number
          label={"anchor position x"}
          oncalciteInputNumberChange={(event) => {
            handleObjectSymbol3DLayerAnchorPositionXChange(
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
          label={"anchor position y"}
          oncalciteInputNumberChange={(event) => {
            handleObjectSymbol3DLayerAnchorPositionYChange(
              layerIndex,
              event.target.value,
            );
          }}
          value={String(anchorPosition?.y ?? 0)}
        ></calcite-input-number>
      </calcite-label>

      <calcite-label layout="default" style={labelStyles}>
        z
        <calcite-input-number
          label={"anchor position z"}
          oncalciteInputNumberChange={(event) => {
            handleObjectSymbol3DLayerAnchorPositionZChange(
              layerIndex,
              event.target.value,
            );
          }}
          value={String(anchorPosition?.z ?? 0)}
        ></calcite-input-number>
      </calcite-label>
    </>
  );
}

export default ObjectSymbol3DLayerAnchorPositionForm;
