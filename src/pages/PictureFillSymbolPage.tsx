import Color from "@arcgis/core/Color";
import Collection from "@arcgis/core/core/Collection";
import Polygon from "@arcgis/core/geometry/Polygon";
import Graphic from "@arcgis/core/Graphic";
import PictureFillSymbol from "@arcgis/core/symbols/PictureFillSymbol";
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol";
import {
  CalciteAction,
  CalciteLabel,
  CalciteLoader,
  CalcitePanel,
  CalciteShell,
  CalciteShellPanel,
  CalciteSwitch,
} from "@esri/calcite-components-react";
import "@esri/calcite-components/dist/components/calcite-action";
import "@esri/calcite-components/dist/components/calcite-label";
import "@esri/calcite-components/dist/components/calcite-loader";
import "@esri/calcite-components/dist/components/calcite-panel";
import "@esri/calcite-components/dist/components/calcite-shell";
import "@esri/calcite-components/dist/components/calcite-shell-panel";
import "@esri/calcite-components/dist/components/calcite-switch";
import React, { lazy, Suspense, useRef, useState } from "react";
import { formStyles, shellStyles, viewSwitchLabelStyles } from "../lib/styles";
import PictureFillSymbolForm from "../components/PictureFillSymbolForm";
import {
  SimpleLineSymbolCapOption,
  SimpleLineSymbolJoinOption,
  SimpleLineSymbolStyleOption,
} from "../lib/types";

const MapView = lazy(() => import("../components/MapView"));
const SceneView = lazy(() => import("../components/SceneView"));

const PictureFillSymbolPage = () => {
  const viewSwitchRef = useRef(null);

  const [simpleLineSymbol, setSimpleLineSymbol] = useState(
    new SimpleLineSymbol()
  );

  const [pictureFillSymbol, setPictureFillSymbol] = useState(
    new PictureFillSymbol({
      outline: simpleLineSymbol,
      url: "https://sagewall.github.io/test-images/check-mark.svg",
    })
  );

  const polygon = new Polygon({
    rings: [
      [
        [-105.0, 40.0],
        [-105.1, 40.2],
        [-105.35, 40.1],
      ],
    ],
  });

  const polygonGraphic = new Graphic({
    geometry: polygon,
    symbol: pictureFillSymbol,
  });

  const graphicsCollection = new Collection();
  graphicsCollection.add(polygonGraphic);

  const [graphics, setGraphics] =
    useState<Collection<Graphic>>(graphicsCollection);

  const [sceneView, setSceneView] = useState(false);
  let view = <MapView graphics={graphics} />;
  if (sceneView) {
    view = <SceneView graphics={graphics} />;
  }

  const handleSwitchChange = () => {
    if (viewSwitchRef.current) {
      setSceneView((viewSwitchRef.current as HTMLCalciteSwitchElement).checked);
    }
  };

  const updateGraphics = (newPictureFillSymbol: PictureFillSymbol) => {
    setPictureFillSymbol(newPictureFillSymbol);
    const newPolygonGraphic = graphics.getItemAt(0).clone();
    newPolygonGraphic.symbol = newPictureFillSymbol;

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
    currentCapValue: SimpleLineSymbolCapOption
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
    currentJoinValue: SimpleLineSymbolJoinOption
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
    currentStyleValue: SimpleLineSymbolStyleOption
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

  const handleCopyJSONClick = () => {
    navigator.clipboard.writeText(
      JSON.stringify(pictureFillSymbol.toJSON(), null, 2)
    );
  };

  return (
    <CalciteShell style={shellStyles}>
      <Suspense
        fallback={
          <CalciteLoader label="loading" text="loading" type="indeterminate" />
        }
      >
        {view}
      </Suspense>
      <CalciteShellPanel
        slot="panel-start"
        position="start"
        resizable
        widthScale="l"
      >
        <CalcitePanel>
          <div slot="header-content">Properties </div>
          <CalciteLabel
            slot="header-actions-end"
            layout="inline"
            style={viewSwitchLabelStyles}
          >
            MapView Only
            <CalciteSwitch
              disabled={true}
              ref={viewSwitchRef}
              onCalciteSwitchChange={handleSwitchChange}
            ></CalciteSwitch>
          </CalciteLabel>

          <form style={formStyles}>
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
            />
          </form>
        </CalcitePanel>

        <CalcitePanel>
          <div slot="header-content">JSON</div>
          <CalciteAction
            icon="copy-to-clipboard"
            label="Copy code to clipboard"
            text="Copy JSON"
            textEnabled
            slot="header-actions-end"
            onClick={handleCopyJSONClick}
          ></CalciteAction>
          <pre>{JSON.stringify(pictureFillSymbol.toJSON(), null, 2)}</pre>
        </CalcitePanel>
      </CalciteShellPanel>
    </CalciteShell>
  );
};

export default PictureFillSymbolPage;
