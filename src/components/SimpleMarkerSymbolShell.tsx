import Color from "@arcgis/core/Color";
import Graphic from "@arcgis/core/Graphic";
import Collection from "@arcgis/core/core/Collection";
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";
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
import SimpleMarkerSymbolAMDPanel from "./SimpleMarkerSymbolAMDPanel";
import SimpleMarkerSymbolESMPanel from "./SimpleMarkerSymbolESMPanel";
import SimpleMarkerSymbolForm from "./SimpleMarkerSymbolForm";
import SimpleMarkerSymbolJSONPanel from "./SimpleMarkerSymbolJSONPanel";
import { point } from "./lib/geometry";
import { formStyles, shellStyles, viewSwitchLabelStyles } from "./lib/styles";
import { Cap, Join, LineStyle, SimpleMarkerSymbolStyle } from "./lib/types";

const SimpleMarkerSymbolShell = () => {
  const viewSwitchRef = useRef(null);

  const [simpleLineSymbol, setSimpleLineSymbol] = useState(
    new SimpleLineSymbol({ color: "#007ac2", miterLimit: 1, width: 1 })
  );

  const [simpleMarkerSymbol, setSimpleMarkerSymbol] = useState(
    new SimpleMarkerSymbol({
      outline: simpleLineSymbol
    })
  );

  const pointGraphic = new Graphic({
    geometry: point,
    symbol: simpleMarkerSymbol
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

  const updateGraphics = (newSimpleMarkerSymbol: SimpleMarkerSymbol) => {
    setSimpleMarkerSymbol(newSimpleMarkerSymbol);

    const newPointGraphic = graphics.getItemAt(0).clone();
    newPointGraphic.symbol = newSimpleMarkerSymbol;

    const newGraphics = new Collection();
    newGraphics.add(newPointGraphic);
    setGraphics(newGraphics);
  };

  const handleAngleChange = (currentAngle: number) => {
    const newSimpleMarkerSymbol = simpleMarkerSymbol.clone();
    newSimpleMarkerSymbol.angle = Number(currentAngle);
    updateGraphics(newSimpleMarkerSymbol);
  };

  const handleColorChange = (currentColor: string) => {
    const newSimpleMarkerSymbol = simpleMarkerSymbol.clone();
    newSimpleMarkerSymbol.color = new Color(currentColor);
    updateGraphics(newSimpleMarkerSymbol);
  };

  const handleOutlineCapChange = (currentCapValue: Cap) => {
    const newSimpleLineSymbol = simpleLineSymbol.clone();
    newSimpleLineSymbol.cap = currentCapValue;
    setSimpleLineSymbol(newSimpleLineSymbol);

    const newSimpleMarkerSymbol = simpleMarkerSymbol.clone();
    newSimpleMarkerSymbol.outline = newSimpleLineSymbol;
    updateGraphics(newSimpleMarkerSymbol);
  };

  const handleOutlineColorChange = (currentColor: string) => {
    const newSimpleLineSymbol = simpleLineSymbol.clone();
    newSimpleLineSymbol.color = new Color(currentColor);
    setSimpleLineSymbol(newSimpleLineSymbol);

    const newSimpleMarkerSymbol = simpleMarkerSymbol.clone();
    newSimpleMarkerSymbol.outline = newSimpleLineSymbol;
    updateGraphics(newSimpleMarkerSymbol);
  };

  const handleOutlineJoinChange = (currentJoinValue: Join) => {
    const newSimpleLineSymbol = simpleLineSymbol.clone();
    newSimpleLineSymbol.join = currentJoinValue;
    setSimpleLineSymbol(newSimpleLineSymbol);

    const newSimpleMarkerSymbol = simpleMarkerSymbol.clone();
    newSimpleMarkerSymbol.outline = newSimpleLineSymbol;
    updateGraphics(newSimpleMarkerSymbol);
  };

  const handleOutlineMiterLimitChange = (currentMiterLimitValue: string) => {
    const newSimpleLineSymbol = simpleLineSymbol.clone();
    newSimpleLineSymbol.miterLimit = Number(currentMiterLimitValue);
    setSimpleLineSymbol(newSimpleLineSymbol);

    const newSimpleMarkerSymbol = simpleMarkerSymbol.clone();
    newSimpleMarkerSymbol.outline = newSimpleLineSymbol;
    updateGraphics(newSimpleMarkerSymbol);
  };

  const handleOutlineStyleChange = (currentStyleValue: LineStyle) => {
    const newSimpleLineSymbol = simpleLineSymbol.clone();
    newSimpleLineSymbol.style = currentStyleValue;
    setSimpleLineSymbol(newSimpleLineSymbol);

    const newSimpleMarkerSymbol = simpleMarkerSymbol.clone();
    newSimpleMarkerSymbol.outline = newSimpleLineSymbol;
    updateGraphics(newSimpleMarkerSymbol);
  };

  const handleOutlineWidthChange = (currentWidthValue: string) => {
    const newSimpleLineSymbol = simpleLineSymbol.clone();
    newSimpleLineSymbol.width = Number(currentWidthValue);
    setSimpleLineSymbol(newSimpleLineSymbol);

    const newSimpleMarkerSymbol = simpleMarkerSymbol.clone();
    newSimpleMarkerSymbol.outline = newSimpleLineSymbol;
    updateGraphics(newSimpleMarkerSymbol);
  };

  const handlePathChange = (currentPathValue: string) => {
    const newSimpleMarkerSymbol = simpleMarkerSymbol.clone();
    newSimpleMarkerSymbol.path = currentPathValue;
    updateGraphics(newSimpleMarkerSymbol);
  };

  const handleSizeChange = (currentSize: string) => {
    const newSimpleMarkerSymbol = simpleMarkerSymbol.clone();
    newSimpleMarkerSymbol.size = Number(currentSize);
    updateGraphics(newSimpleMarkerSymbol);
  };

  const handleStyleChange = (currentStyleValue: SimpleMarkerSymbolStyle) => {
    const newSimpleMarkerSymbol = simpleMarkerSymbol.clone();
    newSimpleMarkerSymbol.style = currentStyleValue;
    updateGraphics(newSimpleMarkerSymbol);
  };

  const handleXoffsetChange = (currentXOffset: string) => {
    const newSimpleMarkerSymbol = simpleMarkerSymbol.clone();
    newSimpleMarkerSymbol.xoffset = Number(currentXOffset);
    updateGraphics(newSimpleMarkerSymbol);
  };

  const handleYoffsetChange = (currentYOffset: string) => {
    const newSimpleMarkerSymbol = simpleMarkerSymbol.clone();
    newSimpleMarkerSymbol.yoffset = Number(currentYOffset);
    updateGraphics(newSimpleMarkerSymbol);
  };

  return (
    <React.Fragment>
      <CalciteShell style={shellStyles}>
        <Header title="SimpleMarkerSymbol"></Header>
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
              <SimpleMarkerSymbolForm
                handleAngleChange={handleAngleChange}
                handleColorChange={handleColorChange}
                handleOutlineCapChange={handleOutlineCapChange}
                handleOutlineColorChange={handleOutlineColorChange}
                handleOutlineJoinChange={handleOutlineJoinChange}
                handleOutlineMiterLimitChange={handleOutlineMiterLimitChange}
                handleOutlineStyleChange={handleOutlineStyleChange}
                handleOutlineWidthChange={handleOutlineWidthChange}
                handlePathChange={handlePathChange}
                handleSizeChange={handleSizeChange}
                handleStyleChange={handleStyleChange}
                handleXoffsetChange={handleXoffsetChange}
                handleYoffsetChange={handleYoffsetChange}
              />
            </div>
          </CalcitePanel>
        </CalciteShellPanel>

        <CalciteShellPanel slot="panel-end" position="end" resizable widthScale="l">
          <CalciteTabs>
            <CalciteTabNav slot="title-group">
              <CalciteTabTitle>ESM</CalciteTabTitle>
              <CalciteTabTitle>AMD</CalciteTabTitle>
              <CalciteTabTitle>JSON</CalciteTabTitle>
            </CalciteTabNav>
            <CalciteTab>
              <SimpleMarkerSymbolESMPanel simpleMarkerSymbol={simpleMarkerSymbol} />
            </CalciteTab>
            <CalciteTab>
              <SimpleMarkerSymbolAMDPanel simpleMarkerSymbol={simpleMarkerSymbol} />
            </CalciteTab>
            <CalciteTab>
              <SimpleMarkerSymbolJSONPanel simpleMarkerSymbol={simpleMarkerSymbol} />
            </CalciteTab>
          </CalciteTabs>
        </CalciteShellPanel>
        {view}
      </CalciteShell>
    </React.Fragment>
  );
};

export default SimpleMarkerSymbolShell;
