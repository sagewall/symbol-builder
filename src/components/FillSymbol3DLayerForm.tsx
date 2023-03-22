import { CalciteBlock, CalciteLabel, CalciteSwitch } from "@esri/calcite-components-react";
import React, { createRef, useEffect, useState } from "react";
import FillSymbol3DLayerMaterialForm from "./FillSymbol3DLayerMaterialForm";
import { blockStyles, labelStyles } from "./lib/styles";

interface Props {
  layerIndex: number;
  handleCastShadowsChange: (layerIndex: number, value: boolean) => void;
  handleFillSymbol3DLayerMaterialColorChange: (layerIndex: number, value: string) => void;
  handleFillSymbol3DLayerMaterialColorMixModeChange: (layerIndex: number, value: string) => void;
}

const FillSymbol3DLayerForm = ({
  layerIndex,
  handleCastShadowsChange,
  handleFillSymbol3DLayerMaterialColorChange,
  handleFillSymbol3DLayerMaterialColorMixModeChange
}: Props) => {
  const [castShadows, setCastShadows] = useState(true);

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

      <CalciteBlock style={blockStyles} collapsible heading={"material"}>
        <FillSymbol3DLayerMaterialForm
          layerIndex={layerIndex}
          handleColorChange={handleFillSymbol3DLayerMaterialColorChange}
          handleColorMixModeChange={handleFillSymbol3DLayerMaterialColorMixModeChange}
        ></FillSymbol3DLayerMaterialForm>
      </CalciteBlock>
    </React.Fragment>
  );
};

export default FillSymbol3DLayerForm;
