import Graphic from "@arcgis/core/Graphic";
import Collection from "@arcgis/core/core/Collection";
import PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol";
import React, { useRef, useState } from "react";
import Header from "./Header";
import MapView from "./MapView";
import PictureMarkerSymbolAMDPanel from "./PictureMarkerSymbolAMDPanel";
import PictureMarkerSymbolESMPanel from "./PictureMarkerSymbolESMPanel";
import PictureMarkerSymbolForm from "./PictureMarkerSymbolForm";
import PictureMarkerSymbolJSONPanel from "./PictureMarkerSymbolJSONPanel";
import SceneView from "./SceneView";
import { point } from "./lib/geometry";
import {
  formStyles,
  shellPanelStyles,
  shellStyles,
  tabNavStyles,
  viewSwitchLabelStyles
} from "./lib/styles";

const PictureMarkerSymbolShell = () => {
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

  return (
    <React.Fragment>
      <calcite-shell style={shellStyles}>
        <Header title="PictureMarkerSymbol" backButton></Header>
        <calcite-shell-panel slot="panel-start" position="start" resizable>
          <calcite-panel>
            <div slot="header-content">Properties </div>
            <calcite-label slot="header-actions-end" layout="inline" style={viewSwitchLabelStyles}>
              2D
              <calcite-switch
                ref={viewSwitchRef}
                oncalciteSwitchChange={handleSwitchChange}
              ></calcite-switch>
              3D
            </calcite-label>

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
                <PictureMarkerSymbolESMPanel pictureMarkerSymbol={pictureMarkerSymbol} />
              </calcite-tab>
              <calcite-tab>
                <PictureMarkerSymbolAMDPanel pictureMarkerSymbol={pictureMarkerSymbol} />
              </calcite-tab>
              <calcite-tab>
                <PictureMarkerSymbolJSONPanel pictureMarkerSymbol={pictureMarkerSymbol} />
              </calcite-tab>
            </calcite-tabs>
          </calcite-panel>
        </calcite-shell-panel>
        {view}
      </calcite-shell>
    </React.Fragment>
  );
};

export default PictureMarkerSymbolShell;
