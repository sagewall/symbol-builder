import Color from "@arcgis/core/Color";
import Collection from "@arcgis/core/core/Collection";
import Point from "@arcgis/core/geometry/Point";
import Graphic from "@arcgis/core/Graphic";
import Font from "@arcgis/core/symbols/Font";
import TextSymbol from "@arcgis/core/symbols/TextSymbol";
import {
  CalciteAction,
  CalciteLabel,
  CalcitePanel,
  CalciteShell,
  CalciteShellPanel,
  CalciteSwitch,
} from "@esri/calcite-components-react";
import React, { useRef, useState } from "react";
import {
  formStyles,
  shellStyles,
  viewSwitchLabelStyles,
} from "../components/lib/styles";
import {
  FontDecoration,
  FontStyle,
  FontWeight,
  HorizontalAlignment,
  VerticalAlignment,
} from "../components/lib/types";
import MapView from "../components/MapView";
import SceneView from "../components/SceneView";
import TextSymbolForm from "../components/TextSymbolForm";

const TextSymbolPage = () => {
  const viewSwitchRef = useRef(null);

  const [font, setFont] = useState(new Font({ family: "serif" }));

  const [textSymbol, setTextSymbol] = useState(
    new TextSymbol({
      font,
      haloColor: "#ffffff",
      haloSize: 0,
      text: "Hello World!",
    })
  );

  const point = new Point({
    latitude: 40.2,
    longitude: -105.1,
  });

  const pointGraphic = new Graphic({
    geometry: point,
    symbol: textSymbol,
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

  const updateGraphics = (newTextSymbol: TextSymbol) => {
    setTextSymbol(newTextSymbol);

    const newPointGraphic = graphics.getItemAt(0).clone();
    newPointGraphic.symbol = newTextSymbol;

    const newGraphics = new Collection();
    newGraphics.add(newPointGraphic);
    setGraphics(newGraphics);
  };

  const handleAngleChange = (currentAngle: number) => {
    const newTextSymbol = textSymbol.clone();
    newTextSymbol.angle = Number(currentAngle);
    updateGraphics(newTextSymbol);
  };

  const handleColorChange = (currentColor: string) => {
    const newTextSymbol = textSymbol.clone();
    newTextSymbol.color = new Color(currentColor);
    updateGraphics(newTextSymbol);
  };

  const handleFontDecorationChange = (
    currentFontDecoration: FontDecoration
  ) => {
    const newTextSymbol = textSymbol.clone();
    newTextSymbol.font.decoration = currentFontDecoration as FontDecoration;
    setFont(newTextSymbol.font);
    updateGraphics(newTextSymbol);
  };

  const handleFontFamilyChange = (currentFontFamily: string) => {
    const newTextSymbol = textSymbol.clone();
    newTextSymbol.font.family = currentFontFamily;
    setFont(newTextSymbol.font);
    updateGraphics(newTextSymbol);
  };

  const handleFontSizeChange = (currentFontSize: string) => {
    const newTextSymbol = textSymbol.clone();
    newTextSymbol.font.size = Number(currentFontSize);
    setFont(newTextSymbol.font);
    updateGraphics(newTextSymbol);
  };

  const handleFontStyleChange = (currentFontStyle: FontStyle) => {
    const newTextSymbol = textSymbol.clone();
    newTextSymbol.font.style = currentFontStyle as FontStyle;
    setFont(newTextSymbol.font);
    updateGraphics(newTextSymbol);
  };

  const handleFontWeightChange = (currentFontWeight: FontWeight) => {
    const newTextSymbol = textSymbol.clone();
    newTextSymbol.font.weight = currentFontWeight as FontWeight;
    setFont(newTextSymbol.font);
    updateGraphics(newTextSymbol);
  };

  const handleHaloColorChange = (currentHaloColor: string) => {
    const newTextSymbol = textSymbol.clone();
    newTextSymbol.haloColor = new Color(currentHaloColor);
    updateGraphics(newTextSymbol);
  };

  const handleHaloSizeChange = (currentHaloSize: string) => {
    const newTextSymbol = textSymbol.clone();
    newTextSymbol.haloSize = Number(currentHaloSize);
    updateGraphics(newTextSymbol);
  };

  const handleHorizontalAlignmentChange = (
    currentHorizontalAlignment: HorizontalAlignment
  ) => {
    const newTextSymbol = textSymbol.clone();
    newTextSymbol.horizontalAlignment =
      currentHorizontalAlignment as HorizontalAlignment;
    updateGraphics(newTextSymbol);
  };

  const handleKerningChange = (currentKerning: boolean) => {
    const newTextSymbol = textSymbol.clone();
    newTextSymbol.kerning = currentKerning;
    updateGraphics(newTextSymbol);
  };

  const handleLineWidthChange = (currentLineWidth: string) => {
    const newTextSymbol = textSymbol.clone();
    newTextSymbol.lineWidth = Number(currentLineWidth);
    updateGraphics(newTextSymbol);
  };

  const handleRotatedChange = (currentRotated: boolean) => {
    const newTextSymbol = textSymbol.clone();
    newTextSymbol.rotated = currentRotated;
    updateGraphics(newTextSymbol);
  };

  const handleTextChange = (currentText: string) => {
    const newTextSymbol = textSymbol.clone();
    newTextSymbol.text = currentText;
    updateGraphics(newTextSymbol);
  };

  const handleVerticalAlignmentChange = (
    currentVerticalAlignment: VerticalAlignment
  ) => {
    const newTextSymbol = textSymbol.clone();
    newTextSymbol.verticalAlignment =
      currentVerticalAlignment as VerticalAlignment;
    updateGraphics(newTextSymbol);
  };

  const handleXOffsetChange = (currentXOffset: string) => {
    const newTextSymbol = textSymbol.clone();
    newTextSymbol.xoffset = Number(currentXOffset);
    updateGraphics(newTextSymbol);
  };

  const handleYOffsetChange = (currentYOffset: string) => {
    const newTextSymbol = textSymbol.clone();
    newTextSymbol.yoffset = Number(currentYOffset);
    updateGraphics(newTextSymbol);
  };

  const handleCopyJSONClick = () => {
    navigator.clipboard.writeText(JSON.stringify(textSymbol.toJSON(), null, 2));
  };

  return (
    <React.Fragment>
      <CalciteShell style={shellStyles}>
        <CalciteShellPanel slot="panel-start" position="start" resizable>
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
              <TextSymbolForm
                handleAngleChange={handleAngleChange}
                handleColorChange={handleColorChange}
                handleFontDecorationChange={handleFontDecorationChange}
                handleFontFamilyChange={handleFontFamilyChange}
                handleFontSizeChange={handleFontSizeChange}
                handleFontStyleChange={handleFontStyleChange}
                handleFontWeightChange={handleFontWeightChange}
                handleHaloColorChange={handleHaloColorChange}
                handleHaloSizeChange={handleHaloSizeChange}
                handleHorizontalAlignmentChange={
                  handleHorizontalAlignmentChange
                }
                handleKerningChange={handleKerningChange}
                handleLineWidthChange={handleLineWidthChange}
                handleRotatedChange={handleRotatedChange}
                handleTextChange={handleTextChange}
                handleVerticalAlignmentChange={handleVerticalAlignmentChange}
                handleXOffsetChange={handleXOffsetChange}
                handleYOffsetChange={handleYOffsetChange}
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
            <pre>{JSON.stringify(textSymbol.toJSON(), null, 2)}</pre>
          </CalcitePanel>
        </CalciteShellPanel>
        {view}
      </CalciteShell>
    </React.Fragment>
  );
};

export default TextSymbolPage;
