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
import { Cap, LineStyle } from "./lib/types";
import { CAP_OPTIONS } from "./lib/constants";
import LineStylePattern3DForm from "./LineStylePattern3DForm";

interface Props {
  layerIndex: number;
  handleColorChange: (layerIndex: number, value: string) => void;
  handleLineSylePattern3DStyleChange: (layerIndex: number, value: LineStyle) => void;
  handlePatternCapChange: (layerIndex: number, value: Cap) => void;
  handleSizeChange: (layerIndex: number, value: string) => void;
}

const FillSymbol3DLayerOutlineForm = ({
  layerIndex,
  handleColorChange,
  handleLineSylePattern3DStyleChange,
  handlePatternCapChange,
  handleSizeChange
}: Props) => {
  const colorRef: React.Ref<HTMLCalciteColorPickerElement> | undefined = createRef();
  const patternCapRef: React.Ref<HTMLCalciteSelectElement> | undefined = createRef();

  const [color, setColor] = useState("#111111");
  const [patternCap, setPatternCap] = useState("butt");
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
            handlePatternCapChange(layerIndex, event.target.value as Cap);
          }}
          ref={patternCapRef}
          value={patternCap}
        >
          {CAP_OPTIONS.map((option, index) => (
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
