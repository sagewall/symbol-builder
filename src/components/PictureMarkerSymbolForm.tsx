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
      <calcite-label layout="default" style={labelStyles}>
        angle
        <calcite-slider
          labelHandles={true}
          labelTicks={true}
          max={360}
          min={0}
          oncalciteSliderChange={(event) => {
            setAngle(event.target.value as number);
            handleAngleChange(event.target.value as number);
          }}
          step={1}
          ticks={180}
          value={angle}
        ></calcite-slider>
      </calcite-label>

      <calcite-label layout="default" style={labelStyles}>
        height
        <calcite-input-number
          label={"height input"}
          min={0}
          oncalciteInputNumberChange={(event) => {
            setHeight(event.target.value);
            handleHeightChange(event.target.value);
          }}
          value={height}
        ></calcite-input-number>
      </calcite-label>

      <calcite-label layout="default" style={labelStyles}>
        width
        <calcite-input-number
          label={"width input"}
          min={0}
          oncalciteInputNumberChange={(event) => {
            setWidth(event.target.value);
            handleWidthChange(event.target.value);
          }}
          value={width}
        ></calcite-input-number>
      </calcite-label>

      <calcite-label layout="default" style={labelStyles}>
        url
        <calcite-input-text
          label={"url input"}
          oncalciteInputTextChange={(event) => {
            setUrl(event.target.value);
            handleUrlChange(event.target.value);
          }}
          value={url}
        ></calcite-input-text>
      </calcite-label>

      <calcite-label layout="default" style={labelStyles}>
        xoffset
        <calcite-input-number
          label={"xoffset input"}
          oncalciteInputNumberChange={(event) => {
            setXoffset(event.target.value);
            handleXoffsetChange(event.target.value);
          }}
          value={xoffset}
        ></calcite-input-number>
      </calcite-label>

      <calcite-label layout="default" style={labelStyles}>
        yoffset
        <calcite-input-number
          label={"yoffset input"}
          oncalciteInputNumberChange={(event) => {
            setYoffset(event.target.value);
            handleYoffsetChange(event.target.value);
          }}
          value={yoffset}
        ></calcite-input-number>
      </calcite-label>
    </React.Fragment>
  );
};

export default PictureMarkerSymbolForm;
