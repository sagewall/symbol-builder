import { CalciteInputNumber, CalciteLabel } from "@esri/calcite-components-react";
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
      <CalciteLabel layout="default" style={labelStyles}>
        x
        <CalciteInputNumber
          label={"x anchor position"}
          onCalciteInputNumberChange={(event) => {
            setAnchorPosition({ ...anchorPosition, x: event.target.value });
            handleIconSymbol3DLayerAnchorPositionXChange(layerIndex, event.target.value);
          }}
          value={anchorPosition.x}
        ></CalciteInputNumber>
      </CalciteLabel>

      <CalciteLabel layout="default" style={labelStyles}>
        y
        <CalciteInputNumber
          label={"y anchor position"}
          onCalciteInputNumberChange={(event) => {
            setAnchorPosition({ ...anchorPosition, y: event.target.value });
            handleIconSymbol3DLayerAnchorPositionYChange(layerIndex, event.target.value);
          }}
          value={anchorPosition.y}
        ></CalciteInputNumber>
      </CalciteLabel>
    </React.Fragment>
  );
};

export default IconSymbol3DLayerForm;
