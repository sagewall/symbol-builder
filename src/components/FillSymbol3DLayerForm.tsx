import type FillSymbol3DLayer from "@arcgis/core/symbols/FillSymbol3DLayer";
import type LineStylePattern3D from "@arcgis/core/symbols/patterns/LineStylePattern3D";
import React, { createRef, useEffect, useState } from "react";
import Edges3DForm from "./Edges3DForm";
import FillSymbol3DLayerMaterialForm from "./FillSymbol3DLayerMaterialForm";
import FillSymbol3DLayerOutlineForm from "./FillSymbol3DLayerOutlineForm";
import StylePattern3DForm from "./StylePattern3DForm";
import { blockStyles, labelStyles } from "./lib/styles";

interface Props {
  layerIndex: number;
  isMeshSymbol3D: boolean;
  handleCastShadowsChange: (layerIndex: number, value: boolean) => void;
  handleFillSymbol3DLayerEdgesColorChange: (layerIndex: number, value: string) => void;
  handleFillSymbol3DLayerEdgesExtensionLengthChange: (layerIndex: number, value: string) => void;
  handleFillSymbol3DLayerEdgesSizeChange: (layerIndex: number, value: string) => void;
  handleFillSymbol3DLayerMaterialColorChange: (layerIndex: number, value: string) => void;
  handleFillSymbol3DLayerMaterialColorMixModeChange: (
    layerIndex: number,
    value: NonNullable<
      NonNullable<InstanceType<typeof FillSymbol3DLayer>["material"]>["colorMixMode"]
    >
  ) => void;
  handleFillSymbol3DLayerOutlineColorChange: (layerIndex: number, value: string) => void;
  handleFillSymbol3DLayerOutlinePatternStyleChange: (
    layerIndex: number,
    value: InstanceType<typeof LineStylePattern3D>["style"]
  ) => void;
  handleFillSymbol3DLayerOutlinePatternCapChange: (
    layerIndex: number,
    value: NonNullable<NonNullable<InstanceType<typeof FillSymbol3DLayer>["outline"]>["patternCap"]>
  ) => void;
  handleFillSymbol3DLayerOutlineSizeChange: (layerIndex: number, value: string) => void;
  handleFillSymbol3DLayerPatternStyleChange: (
    layerIndex: number,
    value: NonNullable<NonNullable<InstanceType<typeof FillSymbol3DLayer>["pattern"]>["style"]>
  ) => void;
}

const FillSymbol3DLayerForm = ({
  layerIndex,
  isMeshSymbol3D,
  handleCastShadowsChange,
  handleFillSymbol3DLayerEdgesColorChange,
  handleFillSymbol3DLayerEdgesExtensionLengthChange,
  handleFillSymbol3DLayerEdgesSizeChange,
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
      {isMeshSymbol3D && (
        <calcite-label layout="default" style={labelStyles}>
          castShadows
          <calcite-switch
            oncalciteSwitchChange={(event) => {
              setCastShadows(event.target.checked);
              handleCastShadowsChange(layerIndex, event.target.checked);
            }}
            ref={castShadowsRef}
            value={castShadows}
          ></calcite-switch>
        </calcite-label>
      )}

      {isMeshSymbol3D && (
        <calcite-block style={blockStyles} collapsible heading={"edges"}>
          <Edges3DForm
            layerIndex={layerIndex}
            handleColorChange={handleFillSymbol3DLayerEdgesColorChange}
            handleExtensionLengthChange={handleFillSymbol3DLayerEdgesExtensionLengthChange}
            handleSizeChange={handleFillSymbol3DLayerEdgesSizeChange}
          ></Edges3DForm>
        </calcite-block>
      )}

      <calcite-block style={blockStyles} collapsible heading={"material"}>
        <FillSymbol3DLayerMaterialForm
          layerIndex={layerIndex}
          handleColorChange={handleFillSymbol3DLayerMaterialColorChange}
          handleColorMixModeChange={handleFillSymbol3DLayerMaterialColorMixModeChange}
        ></FillSymbol3DLayerMaterialForm>
      </calcite-block>

      {!isMeshSymbol3D && (
        <calcite-block style={blockStyles} collapsible heading={"outline"}>
          <FillSymbol3DLayerOutlineForm
            layerIndex={layerIndex}
            handleColorChange={handleFillSymbol3DLayerOutlineColorChange}
            handleLineSylePattern3DStyleChange={handleFillSymbol3DLayerOutlinePatternStyleChange}
            handlePatternCapChange={handleFillSymbol3DLayerOutlinePatternCapChange}
            handleSizeChange={handleFillSymbol3DLayerOutlineSizeChange}
          ></FillSymbol3DLayerOutlineForm>
        </calcite-block>
      )}

      {!isMeshSymbol3D && (
        <calcite-block style={blockStyles} collapsible heading={"pattern"}>
          <StylePattern3DForm
            layerIndex={layerIndex}
            handleStyleChange={handleFillSymbol3DLayerPatternStyleChange}
          ></StylePattern3DForm>
        </calcite-block>
      )}
    </React.Fragment>
  );
};

export default FillSymbol3DLayerForm;
