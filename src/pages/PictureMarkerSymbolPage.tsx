import Collection from "@arcgis/core/core/Collection";
import Point from "@arcgis/core/geometry/Point";
import Graphic from "@arcgis/core/Graphic";
import PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol";
import {
  CalciteAction,
  CalciteLabel,
  CalciteLoader,
  CalcitePanel,
  CalciteShell,
  CalciteShellPanel,
  CalciteSwitch,
} from "@esri/calcite-components-react";
import React, { lazy, Suspense, useRef, useState } from "react";
import PictureMarkerSymbolForm from "../components//PictureMarkerSymbolForm";
import {
  formStyles,
  shellStyles,
  viewSwitchLabelStyles,
} from "../components/lib/styles";

const MapView = lazy(() => import("../components//MapView"));
const SceneView = lazy(() => import("../components/SceneView"));

const PictureMarkerSymbolPage = () => {
  const viewSwitchRef = useRef(null);

  const [pictureMarkerSymbol, setPictureMarkerSymbol] = useState(
    new PictureMarkerSymbol({
      url: "https://sagewall.github.io/test-images/check-mark.svg",
    })
  );

  const point = new Point({
    latitude: 40.2,
    longitude: -105.1,
  });

  const pointGraphic = new Graphic({
    geometry: point,
    symbol: pictureMarkerSymbol,
  });

  const graphicsCollection = new Collection();
  graphicsCollection.add(pointGraphic);

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

  const handleCopyJSONClick = () => {
    navigator.clipboard.writeText(
      JSON.stringify(pictureMarkerSymbol.toJSON(), null, 2)
    );
  };

  return (
    <React.Fragment>
      <CalciteShell style={shellStyles}>
        <Suspense
          fallback={
            <CalciteLoader
              label="loading"
              text="loading"
              type="indeterminate"
            />
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
              SceneView
              <CalciteSwitch
                ref={viewSwitchRef}
                onCalciteSwitchChange={handleSwitchChange}
              ></CalciteSwitch>
            </CalciteLabel>

            <form style={formStyles}>
              <PictureMarkerSymbolForm
                handleAngleChange={handleAngleChange}
                handleHeightChange={handleHeightChange}
                handleUrlChange={handleUrlChange}
                handleWidthChange={handleWidthChange}
                handleXoffsetChange={handleXoffsetChange}
                handleYoffsetChange={handleYoffsetChange}
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
            <pre>{JSON.stringify(pictureMarkerSymbol.toJSON(), null, 2)}</pre>
          </CalcitePanel>
        </CalciteShellPanel>
      </CalciteShell>
    </React.Fragment>
  );
};

export default PictureMarkerSymbolPage;
