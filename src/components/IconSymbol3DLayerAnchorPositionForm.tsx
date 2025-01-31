import React, { useState } from "react";
import { labelStyles } from "./lib/styles";

interface Props {
  layerIndex: number;
  handleIconSymbol3DLayerAnchorPositionXChange: (layerIndex: number, value: string) => void;
  handleIconSymbol3DLayerAnchorPositionYChange: (layerIndex: number, value: string) => void;
}

const IconSymbol3DLayerForm = ({
  layerIndex,
  handleIconSymbol3DLayerAnchorPositionXChange,
  handleIconSymbol3DLayerAnchorPositionYChange
}: Props) => {
  const [anchorPosition, setAnchorPosition] = useState({ x: "0", y: "0" });

  return (
    <React.Fragment>
      <calcite-label layout="default" style={labelStyles}>
        x
        <calcite-input-number
          label={"x anchor position"}
          oncalciteInputNumberChange={(event) => {
            setAnchorPosition({ ...anchorPosition, x: event.target.value });
            handleIconSymbol3DLayerAnchorPositionXChange(layerIndex, event.target.value);
          }}
          value={anchorPosition.x}
        ></calcite-input-number>
      </calcite-label>

      <calcite-label layout="default" style={labelStyles}>
        y
        <calcite-input-number
          label={"y anchor position"}
          oncalciteInputNumberChange={(event) => {
            setAnchorPosition({ ...anchorPosition, y: event.target.value });
            handleIconSymbol3DLayerAnchorPositionYChange(layerIndex, event.target.value);
          }}
          value={anchorPosition.y}
        ></calcite-input-number>
      </calcite-label>
    </React.Fragment>
  );
};

export default IconSymbol3DLayerForm;
