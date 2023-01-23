import {
  CalciteBlock,
  CalciteInputNumber,
  CalciteLabel,
} from "@esri/calcite-components-react";
import React, { useState } from "react";
import { blockStyles, labelStyles } from "./lib/styles";
import { IconSymbol3DLayerAnchorOption } from "./lib/types";

interface Props {
  layerIndex: number;
  handleIconSymbol3DLayerAnchorPositionXChange: (
    layerIndex: number,
    value: IconSymbol3DLayerAnchorOption
  ) => void;
  handleIconSymbol3DLayerAnchorPositionYChange: (
    layerIndex: number,
    value: string
  ) => void;
}

const IconSymbol3DLayerForm = ({
  layerIndex,
  handleIconSymbol3DLayerAnchorPositionXChange,
  handleIconSymbol3DLayerAnchorPositionYChange,
}: Props) => {
  const [anchorPosition, setAnchorPosition] = useState({ x: "0", y: "0" });

  return (
    <React.Fragment>
      <CalciteBlock style={blockStyles} collapsible heading={"anchorPosition"}>
        <CalciteLabel layout="default" style={labelStyles}>
          x
          <CalciteInputNumber
            label={"xoffset anchor position x"}
            onCalciteInputNumberChange={(event) => {
              setAnchorPosition({ ...anchorPosition, x: event.target.value });
              handleIconSymbol3DLayerAnchorPositionXChange(
                layerIndex,
                event.target.value as IconSymbol3DLayerAnchorOption
              );
            }}
            value={anchorPosition.x}
          ></CalciteInputNumber>
        </CalciteLabel>

        <CalciteLabel layout="default" style={labelStyles}>
          y
          <CalciteInputNumber
            label={"xoffset anchor position y"}
            onCalciteInputNumberChange={(event) => {
              setAnchorPosition({ ...anchorPosition, y: event.target.value });
              handleIconSymbol3DLayerAnchorPositionYChange(
                layerIndex,
                event.target.value
              );
            }}
            value={anchorPosition.y}
          ></CalciteInputNumber>
        </CalciteLabel>
      </CalciteBlock>
    </React.Fragment>
  );
};

export default IconSymbol3DLayerForm;
