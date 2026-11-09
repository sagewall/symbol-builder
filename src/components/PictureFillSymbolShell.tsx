import PictureFillSymbol from "@arcgis/core/symbols/PictureFillSymbol.js";
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol.js";
import "@esri/calcite-components/components/calcite-panel";
import "@esri/calcite-components/components/calcite-shell";
import "@esri/calcite-components/components/calcite-shell-panel";
import "@esri/calcite-components/components/calcite-tab";
import "@esri/calcite-components/components/calcite-tab-nav";
import "@esri/calcite-components/components/calcite-tab-title";
import "@esri/calcite-components/components/calcite-tabs";
import { useState } from "react";
import Map from "./Map";
import PictureFillSymbolCDNPanel from "./PictureFillSymbolCDNPanel";
import PictureFillSymbolESMPanel from "./PictureFillSymbolESMPanel";
import PictureFillSymbolForm from "./PictureFillSymbolForm";
import PictureFillSymbolJSONPanel from "./PictureFillSymbolJSONPanel";
import { polygon } from "./lib/geometry";
import { colorWithAlpha } from "./lib/color";
import { useSymbolPreview } from "./lib/useSymbolPreview";
import {
  formStyles,
  shellPanelStyles,
  shellStyles,
  tabNavStyles,
} from "./lib/styles";

function PictureFillSymbolShell(): React.ReactElement {
  const [pictureFillSymbol, setPictureFillSymbol] = useState(
    new PictureFillSymbol({
      height: 75,
      outline: new SimpleLineSymbol({ color: "#007ac2", miterLimit: 1, width: 1 }),
      url: "https://sagewall.github.io/test-images/globie.png",
      width: 75,
    }),
  );

  const { graphics, updatePreview } = useSymbolPreview(
    polygon,
    pictureFillSymbol,
  );

  const viewElement = <Map graphics={graphics}></Map>;

  const updateGraphics = (newPictureFillSymbol: PictureFillSymbol): void => {
    setPictureFillSymbol(newPictureFillSymbol);
    updatePreview(newPictureFillSymbol);
  };

  const updateOutline = (change: (outline: SimpleLineSymbol) => void): void => {
    const next = pictureFillSymbol.clone();
    if (!next.outline) throw new Error("Cannot edit a missing outline.");
    change(next.outline);
    updateGraphics(next);
  };

  const handleHeightChange = (currentHeight: string): void => {
    const newPictureFillSymbol = pictureFillSymbol.clone();
    newPictureFillSymbol.height = Number(currentHeight);
    updateGraphics(newPictureFillSymbol);
  };

  const handleOutlineCapChange = (
    currentCapValue: InstanceType<typeof SimpleLineSymbol>["cap"],
  ): void => {
    updateOutline((outline) => {
      outline.cap = currentCapValue;
    });
  };

  const handleOutlineColorChange = (currentColor: string): void => {
    updateOutline((outline) => {
      outline.color = colorWithAlpha(currentColor, outline.color);
    });
  };

  const handleOutlineJoinChange = (
    currentJoinValue: InstanceType<typeof SimpleLineSymbol>["join"],
  ): void => {
    updateOutline((outline) => {
      outline.join = currentJoinValue;
    });
  };

  const handleOutlineMiterLimitChange = (
    currentMiterLimitValue: string,
  ): void => {
    updateOutline((outline) => {
      outline.miterLimit = Number(currentMiterLimitValue);
    });
  };

  const handleOutlineStyleChange = (
    currentStyleValue: InstanceType<typeof SimpleLineSymbol>["style"],
  ): void => {
    updateOutline((outline) => {
      outline.style = currentStyleValue;
    });
  };

  const handleOutlineWidthChange = (currentWidthValue: string): void => {
    updateOutline((outline) => {
      outline.width = Number(currentWidthValue);
    });
  };

  const handleUrlChange = (currentUrlValue: string): void => {
    const newPictureFillSymbol = pictureFillSymbol.clone();
    newPictureFillSymbol.url = currentUrlValue;
    updateGraphics(newPictureFillSymbol);
  };

  const handleWidthChange = (currentWidth: string): void => {
    const newPictureFillSymbol = pictureFillSymbol.clone();
    newPictureFillSymbol.width = Number(currentWidth);
    updateGraphics(newPictureFillSymbol);
  };

  const handleXOffsetChange = (currentXOffset: string): void => {
    const newPictureFillSymbol = pictureFillSymbol.clone();
    newPictureFillSymbol.xoffset = Number(currentXOffset);
    updateGraphics(newPictureFillSymbol);
  };

  const handleXScaleChange = (currentXScale: string): void => {
    const newPictureFillSymbol = pictureFillSymbol.clone();
    newPictureFillSymbol.xscale = Number(currentXScale);
    updateGraphics(newPictureFillSymbol);
  };

  const handleYOffsetChange = (currentYOffset: string): void => {
    const newPictureFillSymbol = pictureFillSymbol.clone();
    newPictureFillSymbol.yoffset = Number(currentYOffset);
    updateGraphics(newPictureFillSymbol);
  };

  const handleYScaleChange = (currentYScale: string): void => {
    const newPictureFillSymbol = pictureFillSymbol.clone();
    newPictureFillSymbol.yscale = Number(currentYScale);
    updateGraphics(newPictureFillSymbol);
  };

  return (
    <>
      <calcite-shell style={shellStyles}>
        <calcite-shell-panel slot="panel-start" resizable>
          <calcite-panel>
            <div slot="header-content">Properties </div>
            <div style={formStyles}>
              <PictureFillSymbolForm
                symbol={pictureFillSymbol}
                handleHeightChange={handleHeightChange}
                handleOutlineCapChange={handleOutlineCapChange}
                handleOutlineColorChange={handleOutlineColorChange}
                handleOutlineJoinChange={handleOutlineJoinChange}
                handleOutlineMiterLimitChange={handleOutlineMiterLimitChange}
                handleOutlineStyleChange={handleOutlineStyleChange}
                handleOutlineWidthChange={handleOutlineWidthChange}
                handleUrlChange={handleUrlChange}
                handleWidthChange={handleWidthChange}
                handleXOffsetChange={handleXOffsetChange}
                handleXScaleChange={handleXScaleChange}
                handleYOffsetChange={handleYOffsetChange}
                handleYScaleChange={handleYScaleChange}
              ></PictureFillSymbolForm>
            </div>
          </calcite-panel>
        </calcite-shell-panel>

        <calcite-shell-panel
          slot="panel-end"
          resizable
          style={shellPanelStyles}
        >
          <calcite-panel>
            <calcite-tabs>
              <calcite-tab-nav slot="title-group" style={tabNavStyles}>
                <calcite-tab-title>ESM</calcite-tab-title>
                <calcite-tab-title>CDN</calcite-tab-title>
                <calcite-tab-title>JSON</calcite-tab-title>
              </calcite-tab-nav>
              <calcite-tab>
                <PictureFillSymbolESMPanel
                  pictureFillSymbol={pictureFillSymbol}
                ></PictureFillSymbolESMPanel>
              </calcite-tab>
              <calcite-tab>
                <PictureFillSymbolCDNPanel
                  pictureFillSymbol={pictureFillSymbol}
                ></PictureFillSymbolCDNPanel>
              </calcite-tab>
              <calcite-tab>
                <PictureFillSymbolJSONPanel
                  pictureFillSymbol={pictureFillSymbol}
                ></PictureFillSymbolJSONPanel>
              </calcite-tab>
            </calcite-tabs>
          </calcite-panel>
        </calcite-shell-panel>
        {viewElement}
      </calcite-shell>
    </>
  );
}

export default PictureFillSymbolShell;
