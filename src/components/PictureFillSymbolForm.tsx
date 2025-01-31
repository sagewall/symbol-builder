import type SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol";
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

      <calcite-block style={blockStyles} collapsible heading={"outline:"}>
        <SimpleLineSymbolForm
          handleCapChange={handleOutlineCapChange}
          handleColorChange={handleOutlineColorChange}
          handleJoinChange={handleOutlineJoinChange}
          handleMiterLimitChange={handleOutlineMiterLimitChange}
          handleStyleChange={handleOutlineStyleChange}
          handleWidthChange={handleOutlineWidthChange}
          showMarker={false}
          solidOnly={false}
        ></SimpleLineSymbolForm>
      </calcite-block>

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
            handleXOffsetChange(event.target.value);
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
            handleYOffsetChange(event.target.value);
          }}
          value={yoffset}
        ></calcite-input-number>
      </calcite-label>

      <calcite-label layout="default" style={labelStyles}>
        xscale
        <calcite-input-number
          label={"xscale input"}
          min={0}
          oncalciteInputNumberChange={(event) => {
            setXscale(event.target.value);
            handleXScaleChange(event.target.value);
          }}
          value={xscale}
        ></calcite-input-number>
      </calcite-label>

      <calcite-label layout="default" style={labelStyles}>
        yscale
        <calcite-input-number
          label={"yscale input"}
          min={0}
          oncalciteInputNumberChange={(event) => {
            setYscale(event.target.value);
            handleYScaleChange(event.target.value);
          }}
          value={yscale}
        ></calcite-input-number>
      </calcite-label>
    </React.Fragment>
  );
};

export default PictureFillSymbolForm;
