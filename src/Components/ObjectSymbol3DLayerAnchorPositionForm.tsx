import {
  CalciteBlock,
  CalciteInputNumber,
  CalciteLabel,
} from "@esri/calcite-components-react";
import "@esri/calcite-components/dist/components/calcite-block";
import "@esri/calcite-components/dist/components/calcite-input-number";
import "@esri/calcite-components/dist/components/calcite-label";
import React, { useState } from "react";
import { blockStyles, labelStyles } from "./lib/styles";
import { ObjectSymbol3DLayerAnchorOption } from "./lib/types";

interface Props {
  layerIndex: number;
  handleObjectSymbol3DLayerAnchorPositionXChange: (
    layerIndex: number,
    value: ObjectSymbol3DLayerAnchorOption
  ) => void;
  handleObjectSymbol3DLayerAnchorPositionYChange: (
    layerIndex: number,
    value: string
  ) => void;
  handleObjectSymbol3DLayerAnchorPositionZChange: (
    layerIndex: number,
    value: string
  ) => void;
}

const ObjectSymbol3DLayerAnchorPositionForm = ({
  layerIndex,
  handleObjectSymbol3DLayerAnchorPositionXChange,
  handleObjectSymbol3DLayerAnchorPositionYChange,
  handleObjectSymbol3DLayerAnchorPositionZChange,
}: Props) => {
  const [anchorPosition, setAnchorPosition] = useState({
    x: "0",
    y: "0",
    z: "0",
  });

  return (
    <React.Fragment>
      <CalciteBlock style={blockStyles} collapsible heading={"anchorPosition"}>
        <CalciteLabel layout="default" style={labelStyles}>
          x
          <CalciteInputNumber
            label={"anchor position x"}
            onCalciteInputNumberChange={(event) => {
              setAnchorPosition({ ...anchorPosition, x: event.target.value });
              handleObjectSymbol3DLayerAnchorPositionXChange(
                layerIndex,
                event.target.value as ObjectSymbol3DLayerAnchorOption
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
              handleObjectSymbol3DLayerAnchorPositionYChange(
                layerIndex,
                event.target.value
              );
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
              handleObjectSymbol3DLayerAnchorPositionZChange(
                layerIndex,
                event.target.value
              );
            }}
            value={anchorPosition.z}
          ></CalciteInputNumber>
        </CalciteLabel>
      </CalciteBlock>
    </React.Fragment>
  );
};

export default ObjectSymbol3DLayerAnchorPositionForm;
