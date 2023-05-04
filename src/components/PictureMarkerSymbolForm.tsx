import {
  CalciteInputNumber,
  CalciteInputText,
  CalciteLabel,
  CalciteSlider
} from "@esri/calcite-components-react";
import React, { useState } from "react";
import { labelStyles } from "./lib/styles";

interface Props {
  handleAngleChange: (value: number) => void;
  handleHeightChange: (value: string) => void;
  handleUrlChange: (value: string) => void;
  handleWidthChange: (value: string) => void;
  handleXoffsetChange: (value: string) => void;
  handleYoffsetChange: (value: string) => void;
}

const PictureMarkerSymbolForm = ({
  handleAngleChange,
  handleHeightChange,
  handleUrlChange,
  handleWidthChange,
  handleXoffsetChange,
  handleYoffsetChange
}: Props) => {
  const [angle, setAngle] = useState(0);
  const [height, setHeight] = useState("100");
  const [url, setUrl] = useState("https://sagewall.github.io/test-images/globie.png");
  const [width, setWidth] = useState("100");
  const [xoffset, setXoffset] = useState("0");
  const [yoffset, setYoffset] = useState("0");

  return (
    <React.Fragment>
      <CalciteLabel layout="default" style={labelStyles}>
        angle
        <CalciteSlider
          labelHandles={true}
          labelTicks={true}
          max={360}
          min={0}
          onCalciteSliderChange={(event) => {
            setAngle(event.target.value as number);
            handleAngleChange(event.target.value as number);
          }}
          step={1}
          ticks={180}
          value={angle}
        ></CalciteSlider>
      </CalciteLabel>

      <CalciteLabel layout="default" style={labelStyles}>
        height
        <CalciteInputNumber
          label={"height input"}
          min={0}
          onCalciteInputNumberChange={(event) => {
            setHeight(event.target.value);
            handleHeightChange(event.target.value);
          }}
          value={height}
        ></CalciteInputNumber>
      </CalciteLabel>

      <CalciteLabel layout="default" style={labelStyles}>
        url
        <CalciteInputText
          label={"url input"}
          onCalciteInputTextChange={(event) => {
            setUrl(event.target.value);
            handleUrlChange(event.target.value);
          }}
          value={url}
        ></CalciteInputText>
      </CalciteLabel>

      <CalciteLabel layout="default" style={labelStyles}>
        width
        <CalciteInputNumber
          label={"width input"}
          min={0}
          onCalciteInputNumberChange={(event) => {
            setWidth(event.target.value);
            handleWidthChange(event.target.value);
          }}
          value={width}
        ></CalciteInputNumber>
      </CalciteLabel>

      <CalciteLabel layout="default" style={labelStyles}>
        xoffset
        <CalciteInputNumber
          label={"xoffset input"}
          onCalciteInputNumberChange={(event) => {
            setXoffset(event.target.value);
            handleXoffsetChange(event.target.value);
          }}
          value={xoffset}
        ></CalciteInputNumber>
      </CalciteLabel>

      <CalciteLabel layout="default" style={labelStyles}>
        yoffset
        <CalciteInputNumber
          label={"yoffset input"}
          onCalciteInputNumberChange={(event) => {
            setYoffset(event.target.value);
            handleYoffsetChange(event.target.value);
          }}
          value={yoffset}
        ></CalciteInputNumber>
      </CalciteLabel>
    </React.Fragment>
  );
};

export default PictureMarkerSymbolForm;
