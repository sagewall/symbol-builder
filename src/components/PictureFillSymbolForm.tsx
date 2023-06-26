import type SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol";
import {
  CalciteBlock,
  CalciteInputNumber,
  CalciteInputText,
  CalciteLabel
} from "@esri/calcite-components-react";
import React, { useState } from "react";
import SimpleLineSymbolForm from "./SimpleLineSymbolForm";
import { blockStyles, labelStyles } from "./lib/styles";

interface Props {
  handleHeightChange: (value: string) => void;
  handleOutlineCapChange: (value: InstanceType<typeof SimpleLineSymbol>["cap"]) => void;
  handleOutlineColorChange: (value: string) => void;
  handleOutlineJoinChange: (value: InstanceType<typeof SimpleLineSymbol>["join"]) => void;
  handleOutlineMiterLimitChange: (value: string) => void;
  handleOutlineStyleChange: (value: InstanceType<typeof SimpleLineSymbol>["style"]) => void;
  handleOutlineWidthChange: (value: string) => void;
  handleUrlChange: (value: string) => void;
  handleWidthChange: (value: string) => void;
  handleXOffsetChange: (value: string) => void;
  handleXScaleChange: (value: string) => void;
  handleYOffsetChange: (value: string) => void;
  handleYScaleChange: (value: string) => void;
}

const PictureFillSymbolForm = ({
  handleHeightChange,
  handleOutlineCapChange,
  handleOutlineColorChange,
  handleOutlineJoinChange,
  handleOutlineMiterLimitChange,
  handleOutlineStyleChange,
  handleOutlineWidthChange,
  handleUrlChange,
  handleWidthChange,
  handleXOffsetChange,
  handleXScaleChange,
  handleYOffsetChange,
  handleYScaleChange
}: Props) => {
  const [height, setHeight] = useState("75");
  const [url, setUrl] = useState("https://sagewall.github.io/test-images/globie.png");
  const [width, setWidth] = useState("75");
  const [xoffset, setXoffset] = useState("0");
  const [xscale, setXscale] = useState("1");
  const [yoffset, setYoffset] = useState("0");
  const [yscale, setYscale] = useState("1");

  return (
    <React.Fragment>
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

      <CalciteBlock style={blockStyles} collapsible heading={"outline:"}>
        <SimpleLineSymbolForm
          handleCapChange={handleOutlineCapChange}
          handleColorChange={handleOutlineColorChange}
          handleJoinChange={handleOutlineJoinChange}
          handleMiterLimitChange={handleOutlineMiterLimitChange}
          handleStyleChange={handleOutlineStyleChange}
          handleWidthChange={handleOutlineWidthChange}
          showMarker={false}
          solidOnly={false}
        />
      </CalciteBlock>

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
        xoffset
        <CalciteInputNumber
          label={"xoffset input"}
          onCalciteInputNumberChange={(event) => {
            setXoffset(event.target.value);
            handleXOffsetChange(event.target.value);
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
            handleYOffsetChange(event.target.value);
          }}
          value={yoffset}
        ></CalciteInputNumber>
      </CalciteLabel>

      <CalciteLabel layout="default" style={labelStyles}>
        xscale
        <CalciteInputNumber
          label={"xscale input"}
          min={0}
          onCalciteInputNumberChange={(event) => {
            setXscale(event.target.value);
            handleXScaleChange(event.target.value);
          }}
          value={xscale}
        ></CalciteInputNumber>
      </CalciteLabel>

      <CalciteLabel layout="default" style={labelStyles}>
        yscale
        <CalciteInputNumber
          label={"yscale input"}
          min={0}
          onCalciteInputNumberChange={(event) => {
            setYscale(event.target.value);
            handleYScaleChange(event.target.value);
          }}
          value={yscale}
        ></CalciteInputNumber>
      </CalciteLabel>
    </React.Fragment>
  );
};

export default PictureFillSymbolForm;
