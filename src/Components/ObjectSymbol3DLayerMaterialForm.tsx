import {
  CalciteBlock,
  CalciteColorPicker,
  CalciteLabel,
} from "@esri/calcite-components-react";
import "@esri/calcite-components/dist/components/calcite-block";
import "@esri/calcite-components/dist/components/calcite-color-picker";
import "@esri/calcite-components/dist/components/calcite-label";
import { useState } from "react";
import { blockStyles, labelStyles } from "../lib/styles";

interface Props {
  layerIndex: number;
  handleColorChange: (layerIndex: number, value: string) => void;
}

const ObjectSymbol3DLayerMaterialForm = ({
  layerIndex,
  handleColorChange,
}: Props) => {
  const [color, setColor] = useState("#ff0000");

  return (
    <CalciteBlock style={blockStyles} collapsible heading={"material"}>
      <CalciteBlock style={blockStyles} collapsible heading={"color"}>
        <CalciteLabel layout="default" style={labelStyles}>
          color
          <CalciteColorPicker
            onCalciteColorPickerChange={(event) => {
              if (event.target.value) {
                setColor(event.target.value.toString());
              }
              handleColorChange(layerIndex, event.target.value as string);
            }}
            value={color}
          ></CalciteColorPicker>
        </CalciteLabel>
      </CalciteBlock>
    </CalciteBlock>
  );
};

export default ObjectSymbol3DLayerMaterialForm;
