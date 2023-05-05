import Graphic from "@arcgis/core/Graphic";
import Collection from "@arcgis/core/core/Collection";
import PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol";
import {
  CalciteLabel,
  CalcitePanel,
  CalciteShell,
  CalciteShellPanel,
  CalciteSwitch,
  CalciteTab,
  CalciteTabNav,
  CalciteTabTitle,
  CalciteTabs
} from "@esri/calcite-components-react";
import React, { useRef, useState } from "react";
import Header from "./Header";
import PictureMarkerSymbolAMDPanel from "./PictureMarkerSymbolAMDPanel";
import PictureMarkerSymbolESMPanel from "./PictureMarkerSymbolESMPanel";
import PictureMarkerSymbolForm from "./PictureMarkerSymbolForm";
import PictureMarkerSymbolJSONPanel from "./PictureMarkerSymbolJSONPanel";
import { point } from "./lib/geometry";
import { formStyles, shellStyles, tabsStyles, viewSwitchLabelStyles } from "./lib/styles";

const MapViewLazy = React.lazy(() => import("./MapView"));
const SceneViewLazy = React.lazy(() => import("./SceneView"));

const PictureMarkerSymbolShell = () => {
  const isSSR = typeof window === "undefined";
  const viewSwitchRef = useRef(null);

  const [pictureMarkerSymbol, setPictureMarkerSymbol] = useState(
    new PictureMarkerSymbol({
      height: 100,
      url: "https://sagewall.github.io/test-images/globie.png",
      width: 100
    })
  );

  const pointGraphic = new Graphic({
    geometry: point,
    symbol: pictureMarkerSymbol
  });

  const graphicsCollection = new Collection();
  graphicsCollection.add(pointGraphic);

  const [graphics, setGraphics] = useState<Collection<Graphic>>(graphicsCollection);

  const [sceneView, setSceneView] = useState(false);
  let view = <MapViewLazy graphics={graphics} />;
  if (sceneView) {
    view = <SceneViewLazy graphics={graphics} />;
  }

  const handleSwitchChange = () => {
    if (viewSwitchRef.current) {
      setSceneView((viewSwitchRef.current as HTMLCalciteSwitchElement).checked);
    }
  };

  const updateGraphics = (newPictureMarkerSymbol: PictureMarkerSymbol) => {
    setPictureMarkerSymbol(newPictureMarkerSymbol);

    const newPointGraphic = graphics.getItemAt(0).clone();
    newPointGraphic.symbol = newPictureMarkerSymbol;

    const newGraphics = new Collection();
    newGraphics.add(newPointGraphic);
    setGraphics(newGraphics);
  };

  const handleAngleChange = (currentAngle: number) => {
    const newPictureMarkerSymbol = pictureMarkerSymbol.clone();
    newPictureMarkerSymbol.angle = currentAngle;
    updateGraphics(newPictureMarkerSymbol);
  };

  const handleHeightChange = (currentHeight: string) => {
    const newPictureMarkerSymbol = pictureMarkerSymbol.clone();
    newPictureMarkerSymbol.height = Number(currentHeight);
    updateGraphics(newPictureMarkerSymbol);
  };

  const handleUrlChange = (currentUrlValue: string) => {
    const newPictureMarkerSymbol = pictureMarkerSymbol.clone();
    newPictureMarkerSymbol.url = currentUrlValue;
    updateGraphics(newPictureMarkerSymbol);
  };

  const handleWidthChange = (currentWidth: string) => {
    const newPictureMarkerSymbol = pictureMarkerSymbol.clone();
    newPictureMarkerSymbol.width = Number(currentWidth);
    updateGraphics(newPictureMarkerSymbol);
  };

  const handleXoffsetChange = (currentXoffset: string) => {
    const newPictureMarkerSymbol = pictureMarkerSymbol.clone();
    newPictureMarkerSymbol.xoffset = Number(currentXoffset);
    updateGraphics(newPictureMarkerSymbol);
  };

  const handleYoffsetChange = (currentYoffset: string) => {
    const newPictureMarkerSymbol = pictureMarkerSymbol.clone();
    newPictureMarkerSymbol.yoffset = Number(currentYoffset);
    updateGraphics(newPictureMarkerSymbol);
  };

  return (
    <React.Fragment>
      <CalciteShell style={shellStyles}>
        <Header title="PictureMarkerSymbol"></Header>
        <CalciteShellPanel slot="panel-start" position="start" resizable>
          <CalcitePanel>
            <div slot="header-content">Properties </div>
            <CalciteLabel slot="header-actions-end" layout="inline" style={viewSwitchLabelStyles}>
              2D
              <CalciteSwitch
                ref={viewSwitchRef}
                onCalciteSwitchChange={handleSwitchChange}
              ></CalciteSwitch>
              3D
            </CalciteLabel>

            <div style={formStyles}>
              <PictureMarkerSymbolForm
                handleAngleChange={handleAngleChange}
                handleHeightChange={handleHeightChange}
                handleUrlChange={handleUrlChange}
                handleWidthChange={handleWidthChange}
                handleXoffsetChange={handleXoffsetChange}
                handleYoffsetChange={handleYoffsetChange}
              />
            </div>
          </CalcitePanel>
        </CalciteShellPanel>

        <CalciteShellPanel slot="panel-end" position="end" resizable widthScale="l">
          <CalcitePanel>
            <CalciteTabs style={tabsStyles}>
              <CalciteTabNav slot="title-group">
                <CalciteTabTitle>ESM</CalciteTabTitle>
                <CalciteTabTitle>AMD</CalciteTabTitle>
                <CalciteTabTitle>JSON</CalciteTabTitle>
              </CalciteTabNav>
              <CalciteTab>
                <PictureMarkerSymbolESMPanel pictureMarkerSymbol={pictureMarkerSymbol} />
              </CalciteTab>
              <CalciteTab>
                <PictureMarkerSymbolAMDPanel pictureMarkerSymbol={pictureMarkerSymbol} />
              </CalciteTab>
              <CalciteTab>
                <PictureMarkerSymbolJSONPanel pictureMarkerSymbol={pictureMarkerSymbol} />
              </CalciteTab>
            </CalciteTabs>
          </CalcitePanel>
        </CalciteShellPanel>
        {!isSSR && <React.Suspense fallback={<div />}>{view}</React.Suspense>}
      </CalciteShell>
    </React.Fragment>
  );
};

export default PictureMarkerSymbolShell;
