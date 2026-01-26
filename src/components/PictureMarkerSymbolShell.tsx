import Graphic from "@arcgis/core/Graphic.js";
import Collection from "@arcgis/core/core/Collection.js";
import PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol.js";
import "@esri/calcite-components/components/calcite-label";
import "@esri/calcite-components/components/calcite-panel";
import "@esri/calcite-components/components/calcite-shell";
import "@esri/calcite-components/components/calcite-shell-panel";
import "@esri/calcite-components/components/calcite-switch";
import "@esri/calcite-components/components/calcite-tab";
import "@esri/calcite-components/components/calcite-tab-nav";
import "@esri/calcite-components/components/calcite-tab-title";
import "@esri/calcite-components/components/calcite-tabs";
import { useRef, useState } from "react";
import Map from "./Map";
import PictureMarkerSymbolCDNPanel from "./PictureMarkerSymbolCDNPanel";
import PictureMarkerSymbolESMPanel from "./PictureMarkerSymbolESMPanel";
import PictureMarkerSymbolForm from "./PictureMarkerSymbolForm";
import PictureMarkerSymbolJSONPanel from "./PictureMarkerSymbolJSONPanel";
import Scene from "./Scene";
import { point } from "./lib/geometry";
import {
  formStyles,
  shellPanelStyles,
  shellStyles,
  tabNavStyles,
  viewSwitchLabelStyles,
} from "./lib/styles";

function PictureMarkerSymbolShell(): React.ReactElement {
  const viewSwitchRef = useRef(null);

  const [pictureMarkerSymbol, setPictureMarkerSymbol] = useState(
    new PictureMarkerSymbol({
      height: 100,
      url: "https://sagewall.github.io/test-images/globie.png",
      width: 100,
    }),
  );

  const pointGraphic = new Graphic({
    geometry: point,
    symbol: pictureMarkerSymbol,
  });

  const graphicsCollection = new Collection();
  graphicsCollection.add(pointGraphic);

  const [graphics, setGraphics] =
    useState<Collection<Graphic>>(graphicsCollection);

  const [scene, setScene] = useState(false);
  let viewElement = <Map graphics={graphics}></Map>;
  if (scene) {
    viewElement = <Scene graphics={graphics}></Scene>;
  }

  const handleSwitchChange = (): void => {
    if (viewSwitchRef.current) {
      setScene((viewSwitchRef.current as HTMLCalciteSwitchElement).checked);
    }
  };

  const updateGraphics = (
    newPictureMarkerSymbol: PictureMarkerSymbol,
  ): void => {
    setPictureMarkerSymbol(newPictureMarkerSymbol);

    const newPointGraphic = graphics.getItemAt(0)?.clone();
    if (newPointGraphic) {
      newPointGraphic.symbol = newPictureMarkerSymbol;
    }

    const newGraphics = new Collection();
    newGraphics.add(newPointGraphic);
    setGraphics(newGraphics);
  };

  const handleAngleChange = (currentAngle: number): void => {
    const newPictureMarkerSymbol = pictureMarkerSymbol.clone();
    newPictureMarkerSymbol.angle = currentAngle;
    updateGraphics(newPictureMarkerSymbol);
  };

  const handleHeightChange = (currentHeight: string): void => {
    const newPictureMarkerSymbol = pictureMarkerSymbol.clone();
    newPictureMarkerSymbol.height = Number(currentHeight);
    updateGraphics(newPictureMarkerSymbol);
  };

  const handleUrlChange = (currentUrlValue: string): void => {
    const newPictureMarkerSymbol = pictureMarkerSymbol.clone();
    newPictureMarkerSymbol.url = currentUrlValue;
    updateGraphics(newPictureMarkerSymbol);
  };

  const handleWidthChange = (currentWidth: string): void => {
    const newPictureMarkerSymbol = pictureMarkerSymbol.clone();
    newPictureMarkerSymbol.width = Number(currentWidth);
    updateGraphics(newPictureMarkerSymbol);
  };

  const handleXoffsetChange = (currentXoffset: string): void => {
    const newPictureMarkerSymbol = pictureMarkerSymbol.clone();
    newPictureMarkerSymbol.xoffset = Number(currentXoffset);
    updateGraphics(newPictureMarkerSymbol);
  };

  const handleYoffsetChange = (currentYoffset: string): void => {
    const newPictureMarkerSymbol = pictureMarkerSymbol.clone();
    newPictureMarkerSymbol.yoffset = Number(currentYoffset);
    updateGraphics(newPictureMarkerSymbol);
  };

  return (
    <>
      <calcite-shell style={shellStyles}>
        <calcite-shell-panel slot="panel-start" position="start" resizable>
          <calcite-panel>
            <div slot="header-content">Properties </div>
            <calcite-label
              slot="header-actions-end"
              layout="inline"
              style={viewSwitchLabelStyles}
            >
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
              ></PictureMarkerSymbolForm>
            </div>
          </calcite-panel>
        </calcite-shell-panel>

        <calcite-shell-panel
          slot="panel-end"
          position="end"
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
                <PictureMarkerSymbolESMPanel
                  pictureMarkerSymbol={pictureMarkerSymbol}
                ></PictureMarkerSymbolESMPanel>
              </calcite-tab>
              <calcite-tab>
                <PictureMarkerSymbolCDNPanel
                  pictureMarkerSymbol={pictureMarkerSymbol}
                ></PictureMarkerSymbolCDNPanel>
              </calcite-tab>
              <calcite-tab>
                <PictureMarkerSymbolJSONPanel
                  pictureMarkerSymbol={pictureMarkerSymbol}
                ></PictureMarkerSymbolJSONPanel>
              </calcite-tab>
            </calcite-tabs>
          </calcite-panel>
        </calcite-shell-panel>
        {viewElement}
      </calcite-shell>
    </>
  );
}

export default PictureMarkerSymbolShell;
