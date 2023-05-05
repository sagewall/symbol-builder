import Color from "@arcgis/core/Color";
import Graphic from "@arcgis/core/Graphic";
import Collection from "@arcgis/core/core/Collection";
import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol";
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol";
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
import MapView from "./MapView";
import SceneView from "./SceneView";
import SimpleFillSymbolAMDPanel from "./SimpleFillSymbolAMDPanel";
import SimpleFillSymbolESMPanel from "./SimpleFillSymbolESMPanel";
import SimpleFillSymbolForm from "./SimpleFillSymbolForm";
import SimpleFillSymbolJSONPanel from "./SimpleFillSymbolJSONPanel";
import { polygon } from "./lib/geometry";
import { formStyles, shellStyles, tabsStyles, viewSwitchLabelStyles } from "./lib/styles";

const SimpleFillSymbolShell = () => {
  const viewSwitchRef = useRef(null);

  const [simpleLineSymbol, setSimpleLineSymbol] = useState(
    new SimpleLineSymbol({ miterLimit: 1, width: 1 })
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

  const updateGraphics = (newSimpleFillSymbol: SimpleFillSymbol) => {
    setSimpleFillSymbol(newSimpleFillSymbol);

    const newPolygonGraphic = graphics.getItemAt(0).clone();
    newPolygonGraphic.symbol = newSimpleFillSymbol;

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
      <CalciteShell style={shellStyles}>
        <Header title="SimpleFillSymbol"></Header>
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
              <SimpleFillSymbolForm
                handleColorChange={handleColorChange}
                handleOutlineCapChange={handleOutlineCapChange}
                handleOutlineColorChange={handleOutlineColorChange}
                handleOutlineJoinChange={handleOutlineJoinChange}
                handleOutlineMiterLimitChange={handleOutlineMiterLimitChange}
                handleOutlineStyleChange={handleOutlineStyleChange}
                handleOutlineWidthChange={handleOutlineWidthChange}
                handleStyleChange={handleStyleChange}
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
                <SimpleFillSymbolESMPanel simpleFillSymbol={simpleFillSymbol} />
              </CalciteTab>
              <CalciteTab>
                <SimpleFillSymbolAMDPanel simpleFillSymbol={simpleFillSymbol} />
              </CalciteTab>
              <CalciteTab>
                <SimpleFillSymbolJSONPanel simpleFillSymbol={simpleFillSymbol} />
              </CalciteTab>
            </CalciteTabs>
          </CalcitePanel>
        </CalciteShellPanel>
        {view}
      </CalciteShell>
    </React.Fragment>
  );
};

export default SimpleFillSymbolShell;
