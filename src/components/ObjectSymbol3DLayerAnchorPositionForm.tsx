import { CalciteInputNumber, CalciteLabel } from "@esri/calcite-components-react";
import React, { useState } from "react";
import { labelStyles } from "./lib/styles";
import { ObjectSymbol3DLayerAnchor } from "./lib/types";

interface Props {
  layerIndex: number;
  handleObjectSymbol3DLayerAnchorPositionXChange: (
    layerIndex: number,
    value: ObjectSymbol3DLayerAnchor
  ) => void;
  handleObjectSymbol3DLayerAnchorPositionYChange: (layerIndex: number, value: string) => void;
  handleObjectSymbol3DLayerAnchorPositionZChange: (layerIndex: number, value: string) => void;
}

const ObjectSymbol3DLayerAnchorPositionForm = ({
  layerIndex,
  handleObjectSymbol3DLayerAnchorPositionXChange,
  handleObjectSymbol3DLayerAnchorPositionYChange,
  handleObjectSymbol3DLayerAnchorPositionZChange
}: Props) => {
  const [anchorPosition, setAnchorPosition] = useState({
    x: "0",
    y: "0",
    z: "0"
  });

  return (
    <React.Fragment>
      <CalciteLabel layout="default" style={labelStyles}>
        x
        <CalciteInputNumber
          label={"anchor position x"}
          onCalciteInputNumberChange={(event) => {
            setAnchorPosition({ ...anchorPosition, x: event.target.value });
            handleObjectSymbol3DLayerAnchorPositionXChange(
              layerIndex,
              event.target.value as ObjectSymbol3DLayerAnchor
            );
          }}
          value={anchorPosition.x}
        ></CalciteInputNumber>
      </CalciteLabel>

      <CalciteLabel layout="default" style={labelStyles}>
        y
        <CalciteInputNumber
          label={"anchor position y"}
          onCalciteInputNumberChange={(event) => {
            setAnchorPosition({ ...anchorPosition, y: event.target.value });
            handleObjectSymbol3DLayerAnchorPositionYChange(layerIndex, event.target.value);
          }}
          value={anchorPosition.y}
        ></CalciteInputNumber>
      </CalciteLabel>

      <CalciteLabel layout="default" style={labelStyles}>
        z
        <CalciteInputNumber
          label={"anchor position z"}
          onCalciteInputNumberChange={(event) => {
            setAnchorPosition({ ...anchorPosition, z: event.target.value });
            handleObjectSymbol3DLayerAnchorPositionZChange(layerIndex, event.target.value);
          }}
          value={anchorPosition.z}
        ></CalciteInputNumber>
      </CalciteLabel>
    </React.Fragment>
  );
};

export default ObjectSymbol3DLayerAnchorPositionForm;
