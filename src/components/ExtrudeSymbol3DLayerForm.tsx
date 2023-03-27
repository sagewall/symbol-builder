import {
  CalciteBlock,
  CalciteInputNumber,
  CalciteLabel,
  CalciteSwitch
} from "@esri/calcite-components-react";
import React, { createRef, useEffect, useState } from "react";
import Edges3DForm from "./Edges3DForm";
import ExtrudeSymbol3DLayerMaterialForm from "./ExtrudeSymbol3DLayerMaterialForm";
import { blockStyles, labelStyles } from "./lib/styles";

interface Props {
  layerIndex: number;
  handleCastShadowsChange: (layerIndex: number, value: boolean) => void;
  handleExtrudeSymbol3DLayerEdgesColorChange: (layerIndex: number, value: string) => void;
  handleExtrudeSymbol3DLayerEdgesExtensionLengthChange: (layerIndex: number, value: string) => void;
  handleExtrudeSymbol3DLayerEdgesSizeChange: (layerIndex: number, value: string) => void;
  handleExtrudeSymbol3DLayerMaterialColorChange: (layerIndex: number, value: string) => void;
  handleSizeChange: (layerIndex: number, value: string) => void;
}

const FillSymbol3DLayerForm = ({
  layerIndex,
  handleCastShadowsChange,
  handleExtrudeSymbol3DLayerEdgesColorChange,
  handleExtrudeSymbol3DLayerEdgesExtensionLengthChange,
  handleExtrudeSymbol3DLayerEdgesSizeChange,
  handleExtrudeSymbol3DLayerMaterialColorChange,
  handleSizeChange
}: Props) => {
  const [castShadows, setCastShadows] = useState(true);
  const [size, setSize] = useState("3000");

  const castShadowsRef: React.Ref<HTMLCalciteSwitchElement> | undefined = createRef();

  useEffect(() => {
    if (castShadowsRef.current) {
      castShadowsRef.current.checked = true;
    }
  }, []);

  return (
    <React.Fragment>
      <CalciteLabel layout="default" style={labelStyles}>
        castShadows
        <CalciteSwitch
          onCalciteSwitchChange={(event) => {
            setCastShadows(event.target.checked);
            handleCastShadowsChange(layerIndex, event.target.checked);
          }}
          ref={castShadowsRef}
          value={castShadows}
        ></CalciteSwitch>
      </CalciteLabel>

      <CalciteBlock style={blockStyles} collapsible heading={"edges"}>
        <Edges3DForm
          layerIndex={layerIndex}
          handleColorChange={handleExtrudeSymbol3DLayerEdgesColorChange}
          handleExtensionLengthChange={handleExtrudeSymbol3DLayerEdgesExtensionLengthChange}
          handleSizeChange={handleExtrudeSymbol3DLayerEdgesSizeChange}
        ></Edges3DForm>
      </CalciteBlock>

      <CalciteBlock style={blockStyles} collapsible heading={"material"}>
        <ExtrudeSymbol3DLayerMaterialForm
          layerIndex={layerIndex}
          handleColorChange={handleExtrudeSymbol3DLayerMaterialColorChange}
        />
      </CalciteBlock>

      <CalciteLabel layout="default" style={labelStyles}>
        size
        <CalciteInputNumber
          label={"size input"}
          min={0}
          onCalciteInputNumberChange={(event) => {
            setSize(event.target.value);
            handleSizeChange(layerIndex, event.target.value);
          }}
          value={size}
        ></CalciteInputNumber>
      </CalciteLabel>
    </React.Fragment>
  );
};

export default FillSymbol3DLayerForm;
