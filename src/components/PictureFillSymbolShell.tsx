import Color from "@arcgis/core/Color";
import Graphic from "@arcgis/core/Graphic";
import Collection from "@arcgis/core/core/Collection";
import PictureFillSymbol from "@arcgis/core/symbols/PictureFillSymbol";
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol";
import React, { useState } from "react";
import Header from "./Header";
import Map from "./Map";
import PictureFillSymbolAMDPanel from "./PictureFillSymbolAMDPanel";
import PictureFillSymbolESMPanel from "./PictureFillSymbolESMPanel";
import PictureFillSymbolForm from "./PictureFillSymbolForm";
import PictureFillSymbolJSONPanel from "./PictureFillSymbolJSONPanel";
import { polygon } from "./lib/geometry";
import { formStyles, shellPanelStyles, shellStyles, tabNavStyles } from "./lib/styles";

const PictureFillSymbolShell = () => {
  const [simpleLineSymbol, setSimpleLineSymbol] = useState(
    new SimpleLineSymbol({
      color: "#007ac2",
      miterLimit: 1,
      width: 1
    })
  );

  const [pictureFillSymbol, setPictureFillSymbol] = useState(
    new PictureFillSymbol({
      height: 75,
      outline: simpleLineSymbol,
      url: "https://sagewall.github.io/test-images/globie.png",
      width: 75
    })
  );

  const polygonGraphic = new Graphic({
    geometry: polygon,
    symbol: pictureFillSymbol
  });

  const graphicsCollection = new Collection();
  graphicsCollection.add(polygonGraphic);

  const [graphics, setGraphics] = useState<Collection<Graphic>>(graphicsCollection);

  const viewElement = <Map graphics={graphics}></Map>;

  const updateGraphics = (newPictureFillSymbol: PictureFillSymbol) => {
    setPictureFillSymbol(newPictureFillSymbol);
    const newPolygonGraphic = graphics.getItemAt(0)?.clone();
    if (newPolygonGraphic) {
      newPolygonGraphic.symbol = newPictureFillSymbol;
    }

    const newGraphics = new Collection();
    newGraphics.add(newPolygonGraphic);
    setGraphics(newGraphics);
  };

  const handleHeightChange = (currentHeight: string) => {
    const newPictureFillSymbol = pictureFillSymbol.clone();
    newPictureFillSymbol.height = Number(currentHeight);
    updateGraphics(newPictureFillSymbol);
  };

  const handleOutlineCapChange = (
    currentCapValue: InstanceType<typeof SimpleLineSymbol>["cap"]
  ) => {
    const newSimpleLineSymbol = simpleLineSymbol.clone();
    newSimpleLineSymbol.cap = currentCapValue;
    setSimpleLineSymbol(newSimpleLineSymbol);

    const newPictureFillSymbol = pictureFillSymbol.clone();
    newPictureFillSymbol.outline = newSimpleLineSymbol;
    updateGraphics(newPictureFillSymbol);
  };

  const handleOutlineColorChange = (currentColor: string) => {
    const newSimpleLineSymbol = simpleLineSymbol.clone();
    newSimpleLineSymbol.color = new Color(currentColor);
    setSimpleLineSymbol(newSimpleLineSymbol);

    const newPictureFillSymbol = pictureFillSymbol.clone();
    newPictureFillSymbol.outline = newSimpleLineSymbol;
    updateGraphics(newPictureFillSymbol);
  };

  const handleOutlineJoinChange = (
    currentJoinValue: InstanceType<typeof SimpleLineSymbol>["join"]
  ) => {
    const newSimpleLineSymbol = simpleLineSymbol.clone();
    newSimpleLineSymbol.join = currentJoinValue;
    setSimpleLineSymbol(newSimpleLineSymbol);

    const newPictureFillSymbol = pictureFillSymbol.clone();
    newPictureFillSymbol.outline = newSimpleLineSymbol;
    updateGraphics(newPictureFillSymbol);
  };

  const handleOutlineMiterLimitChange = (currentMiterLimitValue: string) => {
    const newSimpleLineSymbol = simpleLineSymbol.clone();
    newSimpleLineSymbol.miterLimit = Number(currentMiterLimitValue);
    setSimpleLineSymbol(newSimpleLineSymbol);

    const newPictureFillSymbol = pictureFillSymbol.clone();
    newPictureFillSymbol.outline = newSimpleLineSymbol;
    updateGraphics(newPictureFillSymbol);
  };

  const handleOutlineStyleChange = (
    currentStyleValue: InstanceType<typeof SimpleLineSymbol>["style"]
  ) => {
    const newSimpleLineSymbol = simpleLineSymbol.clone();
    newSimpleLineSymbol.style = currentStyleValue;
    setSimpleLineSymbol(newSimpleLineSymbol);

    const newPictureFillSymbol = pictureFillSymbol.clone();
    newPictureFillSymbol.outline = newSimpleLineSymbol;
    updateGraphics(newPictureFillSymbol);
  };

  const handleOutlineWidthChange = (currentWidthValue: string) => {
    const newSimpleLineSymbol = simpleLineSymbol.clone();
    newSimpleLineSymbol.width = Number(currentWidthValue);
    setSimpleLineSymbol(newSimpleLineSymbol);

    const newPictureFillSymbol = pictureFillSymbol.clone();
    newPictureFillSymbol.outline = newSimpleLineSymbol;
    updateGraphics(newPictureFillSymbol);
  };

  const handleUrlChange = (currentUrlValue: string) => {
    const newPictureFillSymbol = pictureFillSymbol.clone();
    newPictureFillSymbol.url = currentUrlValue;
    updateGraphics(newPictureFillSymbol);
  };

  const handleWidthChange = (currentWidth: string) => {
    const newPictureFillSymbol = pictureFillSymbol.clone();
    newPictureFillSymbol.width = Number(currentWidth);
    updateGraphics(newPictureFillSymbol);
  };

  const handleXOffsetChange = (currentXOffset: string) => {
    const newPictureFillSymbol = pictureFillSymbol.clone();
    newPictureFillSymbol.xoffset = Number(currentXOffset);
    updateGraphics(newPictureFillSymbol);
  };

  const handleXScaleChange = (currentXScale: string) => {
    const newPictureFillSymbol = pictureFillSymbol.clone();
    newPictureFillSymbol.xscale = Number(currentXScale);
    updateGraphics(newPictureFillSymbol);
  };

  const handleYOffsetChange = (currentYOffset: string) => {
    const newPictureFillSymbol = pictureFillSymbol.clone();
    newPictureFillSymbol.yoffset = Number(currentYOffset);
    updateGraphics(newPictureFillSymbol);
  };

  const handleYScaleChange = (currentYScale: string) => {
    const newPictureFillSymbol = pictureFillSymbol.clone();
    newPictureFillSymbol.yscale = Number(currentYScale);
    updateGraphics(newPictureFillSymbol);
  };

  return (
    <React.Fragment>
      <calcite-shell style={shellStyles}>
        <Header title="PictureFillSymbol" backButton></Header>
        <calcite-shell-panel slot="panel-start" position="start" resizable>
          <calcite-panel>
            <div slot="header-content">Properties </div>
            <div style={formStyles}>
              <PictureFillSymbolForm
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

        <calcite-shell-panel slot="panel-end" position="end" resizable style={shellPanelStyles}>
          <calcite-panel>
            <calcite-tabs>
              <calcite-tab-nav slot="title-group" style={tabNavStyles}>
                <calcite-tab-title>ESM</calcite-tab-title>
                <calcite-tab-title>AMD</calcite-tab-title>
                <calcite-tab-title>JSON</calcite-tab-title>
              </calcite-tab-nav>
              <calcite-tab>
                <PictureFillSymbolESMPanel
                  pictureFillSymbol={pictureFillSymbol}
                ></PictureFillSymbolESMPanel>
              </calcite-tab>
              <calcite-tab>
                <PictureFillSymbolAMDPanel
                  pictureFillSymbol={pictureFillSymbol}
                ></PictureFillSymbolAMDPanel>
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
    </React.Fragment>
  );
};

export default PictureFillSymbolShell;
