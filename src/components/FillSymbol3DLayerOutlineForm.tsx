import {
  CalciteBlock,
  CalciteColorPicker,
  CalciteInputNumber,
  CalciteLabel,
  CalciteOption,
  CalciteSelect
} from "@esri/calcite-components-react";
import React, { createRef, useEffect, useState } from "react";
import { blockStyles, labelStyles } from "./lib/styles";
import {
  FillSymbol3DLayerOutlinePatternCapOption,
  LineStylePattern3DStyleOption
} from "./lib/types";
import LineStylePattern3DForm from "./LineStylePattern3DForm";

interface Props {
  layerIndex: number;
  handleColorChange: (layerIndex: number, value: string) => void;
  handleLineSylePattern3DStyleChange: (
    layerIndex: number,
    value: LineStylePattern3DStyleOption
  ) => void;
  handlePatternCapChange: (
    layerIndex: number,
    value: FillSymbol3DLayerOutlinePatternCapOption
  ) => void;
  handleSizeChange: (layerIndex: number, value: string) => void;
}

const FillSymbol3DLayerOutlineForm = ({
  layerIndex,
  handleColorChange,
  handleLineSylePattern3DStyleChange,
  handlePatternCapChange,
  handleSizeChange
}: Props) => {
  const patternCapOptions = ["round", "butt", "square"];

  const colorRef: React.Ref<HTMLCalciteColorPickerElement> | undefined = createRef();

  const [color, setColor] = useState("#111111");
  const [patternCap, setPatternCap] = useState("round");
  const [size, setSize] = useState("3");

  useEffect(() => {
    if (colorRef.current) {
      colorRef.current.value = "#111111";
    }
  }, []);

  return (
    <React.Fragment>
      <CalciteBlock style={blockStyles} collapsible heading={"color"}>
        <CalciteColorPicker
          onCalciteColorPickerChange={(event) => {
            if (event.target.value) {
              setColor(event.target.value.toString());
            }
            handleColorChange(layerIndex, event.target.value as string);
          }}
          allowEmpty
          hideChannels
          hideSaved
          ref={colorRef}
          scale="s"
          value={color}
        ></CalciteColorPicker>
      </CalciteBlock>

      <LineStylePattern3DForm
        layerIndex={layerIndex}
        handleStyleChange={handleLineSylePattern3DStyleChange}
      />

      <CalciteLabel layout="default" style={labelStyles}>
        patternCap
        <CalciteSelect
          label={"patternCap selection"}
          onCalciteSelectChange={(event) => {
            setPatternCap(event.target.value);
            handlePatternCapChange(
              layerIndex,
              event.target.value as FillSymbol3DLayerOutlinePatternCapOption
            );
          }}
          value={patternCap}
        >
          {patternCapOptions.map((option, index) => (
            <CalciteOption key={index}>{option}</CalciteOption>
          ))}
        </CalciteSelect>
      </CalciteLabel>

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

export default FillSymbol3DLayerOutlineForm;
