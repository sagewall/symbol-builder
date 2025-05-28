import Color from "@arcgis/core/Color";
import Graphic from "@arcgis/core/Graphic";
import Collection from "@arcgis/core/core/Collection";
import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol";
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol";
import React, { useRef, useState } from "react";
import Header from "./Header";
import Map from "./Map";
import Scene from "./Scene";
import SimpleFillSymbolAMDPanel from "./SimpleFillSymbolAMDPanel";
import SimpleFillSymbolESMPanel from "./SimpleFillSymbolESMPanel";
import SimpleFillSymbolForm from "./SimpleFillSymbolForm";
import SimpleFillSymbolJSONPanel from "./SimpleFillSymbolJSONPanel";
import { polygon } from "./lib/geometry";
import {
  formStyles,
  shellPanelStyles,
  shellStyles,
  tabNavStyles,
  viewSwitchLabelStyles
} from "./lib/styles";

const SimpleFillSymbolShell = () => {
  const viewSwitchRef = useRef(null);

  const [simpleLineSymbol, setSimpleLineSymbol] = useState(
    new SimpleLineSymbol({ color: "#007ac2", miterLimit: 1, width: 1 })
  );

  const [simpleFillSymbol, setSimpleFillSymbol] = useState(
    new SimpleFillSymbol({
      color: "#007ac2",
      outline: simpleLineSymbol
    })
  );

  const polygonGraphic = new Graphic({
    geometry: polygon,
    symbol: simpleFillSymbol
  });

  const graphicsCollection = new Collection();
  graphicsCollection.add(polygonGraphic);

  const [graphics, setGraphics] = useState<Collection<Graphic>>(graphicsCollection);

  const [scene, setScene] = useState(false);
  let viewElement = <Map graphics={graphics}></Map>;
  if (scene) {
    viewElement = <Scene graphics={graphics}></Scene>;
  }

  const handleSwitchChange = () => {
    if (viewSwitchRef.current) {
      setScene((viewSwitchRef.current as HTMLCalciteSwitchElement).checked);
    }
  };

  const updateGraphics = (newSimpleFillSymbol: SimpleFillSymbol) => {
    setSimpleFillSymbol(newSimpleFillSymbol);

    const newPolygonGraphic = graphics.getItemAt(0)?.clone();
    if (newPolygonGraphic) {
      newPolygonGraphic.symbol = newSimpleFillSymbol;
    }

    const newGraphics = new Collection();
    newGraphics.add(newPolygonGraphic);
    setGraphics(newGraphics);
  };

  const handleColorChange = (currentColor: string) => {
    const newSimpleFillSymbol = simpleFillSymbol.clone();
    newSimpleFillSymbol.color = new Color(currentColor);
    updateGraphics(newSimpleFillSymbol);
  };

  const handleOutlineCapChange = (
    currentCapValue: InstanceType<typeof SimpleLineSymbol>["cap"]
  ) => {
    const newSimpleLineSymbol = simpleLineSymbol.clone();
    newSimpleLineSymbol.cap = currentCapValue;
    setSimpleLineSymbol(newSimpleLineSymbol);

    const newSimpleFillSymbol = simpleFillSymbol.clone();
    newSimpleFillSymbol.outline = newSimpleLineSymbol;
    updateGraphics(newSimpleFillSymbol);
  };

  const handleOutlineColorChange = (currentColor: string) => {
    const newSimpleLineSymbol = simpleLineSymbol.clone();
    newSimpleLineSymbol.color = new Color(currentColor);
    setSimpleLineSymbol(newSimpleLineSymbol);

    const newSimpleFillSymbol = simpleFillSymbol.clone();
    newSimpleFillSymbol.outline = newSimpleLineSymbol;
    updateGraphics(newSimpleFillSymbol);
  };

  const handleOutlineJoinChange = (
    currentJoinValue: InstanceType<typeof SimpleLineSymbol>["join"]
  ) => {
    const newSimpleLineSymbol = simpleLineSymbol.clone();
    newSimpleLineSymbol.join = currentJoinValue;
    setSimpleLineSymbol(newSimpleLineSymbol);

    const newSimpleFillSymbol = simpleFillSymbol.clone();
    newSimpleFillSymbol.outline = newSimpleLineSymbol;
    updateGraphics(newSimpleFillSymbol);
  };

  const handleOutlineMiterLimitChange = (currentMiterLimitValue: string) => {
    const newSimpleLineSymbol = simpleLineSymbol.clone();
    newSimpleLineSymbol.miterLimit = Number(currentMiterLimitValue);
    setSimpleLineSymbol(newSimpleLineSymbol);

    const newSimpleFillSymbol = simpleFillSymbol.clone();
    newSimpleFillSymbol.outline = newSimpleLineSymbol;
    updateGraphics(newSimpleFillSymbol);
  };

  const handleOutlineStyleChange = (
    currentStyleValue: InstanceType<typeof SimpleLineSymbol>["style"]
  ) => {
    const newSimpleLineSymbol = simpleLineSymbol.clone();
    newSimpleLineSymbol.style = currentStyleValue;
    setSimpleLineSymbol(newSimpleLineSymbol);

    const newSimpleFillSymbol = simpleFillSymbol.clone();
    newSimpleFillSymbol.outline = newSimpleLineSymbol;
    updateGraphics(newSimpleFillSymbol);
  };

  const handleOutlineWidthChange = (currentWidthValue: string) => {
    const newSimpleLineSymbol = simpleLineSymbol.clone();
    newSimpleLineSymbol.width = Number(currentWidthValue);
    setSimpleLineSymbol(newSimpleLineSymbol);

    const newSimpleFillSymbol = simpleFillSymbol.clone();
    newSimpleFillSymbol.outline = newSimpleLineSymbol;
    updateGraphics(newSimpleFillSymbol);
  };

  const handleStyleChange = (currentStyleValue: InstanceType<typeof SimpleFillSymbol>["style"]) => {
    const newSimpleFillSymbol = simpleFillSymbol.clone();
    newSimpleFillSymbol.style = currentStyleValue;
    updateGraphics(newSimpleFillSymbol);
  };

  return (
    <React.Fragment>
      <calcite-shell style={shellStyles}>
        <Header title="SimpleFillSymbol" backButton></Header>
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
              <SimpleFillSymbolForm
                handleColorChange={handleColorChange}
                handleOutlineCapChange={handleOutlineCapChange}
                handleOutlineColorChange={handleOutlineColorChange}
                handleOutlineJoinChange={handleOutlineJoinChange}
                handleOutlineMiterLimitChange={handleOutlineMiterLimitChange}
                handleOutlineStyleChange={handleOutlineStyleChange}
                handleOutlineWidthChange={handleOutlineWidthChange}
                handleStyleChange={handleStyleChange}
              ></SimpleFillSymbolForm>
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
                <SimpleFillSymbolESMPanel
                  simpleFillSymbol={simpleFillSymbol}
                ></SimpleFillSymbolESMPanel>
              </calcite-tab>
              <calcite-tab>
                <SimpleFillSymbolAMDPanel
                  simpleFillSymbol={simpleFillSymbol}
                ></SimpleFillSymbolAMDPanel>
              </calcite-tab>
              <calcite-tab>
                <SimpleFillSymbolJSONPanel
                  simpleFillSymbol={simpleFillSymbol}
                ></SimpleFillSymbolJSONPanel>
              </calcite-tab>
            </calcite-tabs>
          </calcite-panel>
        </calcite-shell-panel>
        {viewElement}
      </calcite-shell>
    </React.Fragment>
  );
};

export default SimpleFillSymbolShell;
