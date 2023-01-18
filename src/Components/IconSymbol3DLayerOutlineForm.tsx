import {
  CalciteBlock,
  CalciteColorPicker,
  CalciteInputNumber,
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
  handleSizeChange: (layerIndex: number, value: string) => void;
}

const IconSymbol3DLayerOutlineForm = ({
  layerIndex,
  handleColorChange,
  handleSizeChange,
}: Props) => {
  const [color, setColor] = useState("#ff0000");
  const [size, setSize] = useState("1.5");

  return (
    <CalciteBlock style={blockStyles} collapsible heading={"outline"}>
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
      <CalciteLabel layout="default" style={labelStyles}>
        size
        <CalciteInputNumber
          label={"xoffset anchor position y"}
          onCalciteInputNumberChange={(event) => {
            setSize(event.target.value);
            handleSizeChange(layerIndex, event.target.value);
          }}
          value={size}
        ></CalciteInputNumber>
      </CalciteLabel>
    </CalciteBlock>
  );
};

export default IconSymbol3DLayerOutlineForm;