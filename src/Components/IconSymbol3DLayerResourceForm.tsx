import {
  CalciteBlock,
  CalciteInputText,
  CalciteLabel,
  CalciteOption,
  CalciteSelect,
} from "@esri/calcite-components-react";
import "@esri/calcite-components/dist/components/calcite-block";
import "@esri/calcite-components/dist/components/calcite-color-picker";
import "@esri/calcite-components/dist/components/calcite-label";
import { useState } from "react";
import { blockStyles, labelStyles } from "../lib/styles";
import { IconSymbol3DLayerResourcePrimitiveOption } from "../lib/types";

interface Props {
  layerIndex: number;
  handleHrefChange: (layerIndex: number, value: string) => void;
  handlePrimitiveChange: (
    layerIndex: number,
    value: IconSymbol3DLayerResourcePrimitiveOption
  ) => void;
}

const IconSymbol3DLayerResourceForm = ({
  layerIndex,
  handleHrefChange,
  handlePrimitiveChange,
}: Props) => {
  const primitiveOptions = [
    "circle",
    "square",
    "cross",
    "x",
    "kite",
    "triangle",
  ];

  const [href, setHref] = useState("");
  const [primitive, setPrimitive] = useState("circle");

  return (
    <CalciteBlock style={blockStyles} collapsible heading={"resource"}>
      <CalciteLabel layout="default" style={labelStyles}>
        href
        <CalciteInputText
          label={"url input"}
          onCalciteInputTextChange={(event) => {
            setHref(event.target.value);
            handleHrefChange(layerIndex, event.target.value);
          }}
          value={href}
        ></CalciteInputText>
      </CalciteLabel>
      <CalciteLabel layout="default" style={labelStyles}>
        primitive
        <CalciteSelect
          label={"primitive selection"}
          onCalciteSelectChange={(event) => {
            setPrimitive(event.target.value);
            handlePrimitiveChange(
              layerIndex,
              event.target.value as IconSymbol3DLayerResourcePrimitiveOption
            );
          }}
          value={primitive}
        >
          {primitiveOptions.map((option, index) => (
            <CalciteOption key={index}>{option}</CalciteOption>
          ))}
        </CalciteSelect>
      </CalciteLabel>
    </CalciteBlock>
  );
};

export default IconSymbol3DLayerResourceForm;
