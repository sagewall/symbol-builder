import "@esri/calcite-components/dist/components/calcite-input-number";
import "@esri/calcite-components/dist/components/calcite-label";
import { useState } from "react";
import { labelStyles } from "./lib/styles";

interface Props {
  layerIndex: number;
  handleObjectSymbol3DLayerAnchorPositionXChange: (layerIndex: number, value: string) => void;
  handleObjectSymbol3DLayerAnchorPositionYChange: (layerIndex: number, value: string) => void;
  handleObjectSymbol3DLayerAnchorPositionZChange: (layerIndex: number, value: string) => void;
}

function ObjectSymbol3DLayerAnchorPositionForm({
  layerIndex,
  handleObjectSymbol3DLayerAnchorPositionXChange,
  handleObjectSymbol3DLayerAnchorPositionYChange,
  handleObjectSymbol3DLayerAnchorPositionZChange,
}: Props): React.ReactElement {
  const [anchorPosition, setAnchorPosition] = useState({
    x: "0",
    y: "0",
    z: "0",
  });

  return (
    <>
      <calcite-label layout="default" style={labelStyles}>
        x
        <calcite-input-number
          label={"anchor position x"}
          oncalciteInputNumberChange={(event) => {
            setAnchorPosition({ ...anchorPosition, x: event.target.value });
            handleObjectSymbol3DLayerAnchorPositionXChange(layerIndex, event.target.value);
          }}
          value={anchorPosition.x}></calcite-input-number>
      </calcite-label>

      <calcite-label layout="default" style={labelStyles}>
        y
        <calcite-input-number
          label={"anchor position y"}
          oncalciteInputNumberChange={(event) => {
            setAnchorPosition({ ...anchorPosition, y: event.target.value });
            handleObjectSymbol3DLayerAnchorPositionYChange(layerIndex, event.target.value);
          }}
          value={anchorPosition.y}></calcite-input-number>
      </calcite-label>

      <calcite-label layout="default" style={labelStyles}>
        z
        <calcite-input-number
          label={"anchor position z"}
          oncalciteInputNumberChange={(event) => {
            setAnchorPosition({ ...anchorPosition, z: event.target.value });
            handleObjectSymbol3DLayerAnchorPositionZChange(layerIndex, event.target.value);
          }}
          value={anchorPosition.z}></calcite-input-number>
      </calcite-label>
    </>
  );
}

export default ObjectSymbol3DLayerAnchorPositionForm;
