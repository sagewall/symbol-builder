import { CalciteBlock, CalciteLabel, CalciteSwitch } from "@esri/calcite-components-react";
import React, { createRef, useEffect, useState } from "react";
import FillSymbol3DLayerMaterialForm from "./FillSymbol3DLayerMaterialForm";
import FillSymbol3DLayerOutlineForm from "./FillSymbol3DLayerOutlineForm";
import { blockStyles, labelStyles } from "./lib/styles";
import {
  FillSymbol3DLayerMaterialColorMixModeOption,
  FillSymbol3DLayerOutlinePatternCapOption,
  LineStylePattern3DStyleOption,
  SylePattern3DOption
} from "./lib/types";
import StylePattern3DForm from "./StylePattern3DForm";

interface Props {
  layerIndex: number;
  handleCastShadowsChange: (layerIndex: number, value: boolean) => void;
  handleFillSymbol3DLayerMaterialColorChange: (layerIndex: number, value: string) => void;
  handleFillSymbol3DLayerMaterialColorMixModeChange: (
    layerIndex: number,
    value: FillSymbol3DLayerMaterialColorMixModeOption
  ) => void;
  handleFillSymbol3DLayerOutlineColorChange: (layerIndex: number, value: string) => void;
  handleFillSymbol3DLayerOutlinePatternStyleChange: (
    layerIndex: number,
    value: LineStylePattern3DStyleOption
  ) => void;
  handleFillSymbol3DLayerOutlinePatternCapChange: (
    layerIndex: number,
    value: FillSymbol3DLayerOutlinePatternCapOption
  ) => void;
  handleFillSymbol3DLayerOutlineSizeChange: (layerIndex: number, value: string) => void;
  handleFillSymbol3DLayerPatternStyleChange: (
    layerIndex: number,
    value: SylePattern3DOption
  ) => void;
}

const FillSymbol3DLayerForm = ({
  layerIndex,
  handleCastShadowsChange,
  handleFillSymbol3DLayerMaterialColorChange,
  handleFillSymbol3DLayerMaterialColorMixModeChange,
  handleFillSymbol3DLayerOutlineColorChange,
  handleFillSymbol3DLayerOutlinePatternStyleChange,
  handleFillSymbol3DLayerOutlinePatternCapChange,
  handleFillSymbol3DLayerOutlineSizeChange,
  handleFillSymbol3DLayerPatternStyleChange
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

      <CalciteBlock style={blockStyles} collapsible heading={"outline"}>
        <FillSymbol3DLayerOutlineForm
          layerIndex={layerIndex}
          handleColorChange={handleFillSymbol3DLayerOutlineColorChange}
          handleLineSylePattern3DStyleChange={handleFillSymbol3DLayerOutlinePatternStyleChange}
          handlePatternCapChange={handleFillSymbol3DLayerOutlinePatternCapChange}
          handleSizeChange={handleFillSymbol3DLayerOutlineSizeChange}
        ></FillSymbol3DLayerOutlineForm>
      </CalciteBlock>

      <CalciteBlock style={blockStyles} collapsible heading={"pattern"}>
        <StylePattern3DForm
          layerIndex={layerIndex}
          handleStyleChange={handleFillSymbol3DLayerPatternStyleChange}
        ></StylePattern3DForm>
      </CalciteBlock>
    </React.Fragment>
  );
};

export default FillSymbol3DLayerForm;
