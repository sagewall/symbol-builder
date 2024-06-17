import Color from "@arcgis/core/Color";
import Graphic from "@arcgis/core/Graphic";
import Collection from "@arcgis/core/core/Collection";
import LineSymbolMarker from "@arcgis/core/symbols/LineSymbolMarker";
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
import SimpleLineSymbolAMDPanel from "./SimpleLineSymbolAMDPanel";
import SimpleLineSymbolESMPanel from "./SimpleLineSymbolESMPanel";
import SimpleLineSymbolForm from "./SimpleLineSymbolForm";
import SimpleLineSymbolJSONPanel from "./SimpleLineSymbolJSONPanel";
import { polyline } from "./lib/geometry";
import {
  formStyles,
  shellPanelStyles,
  shellStyles,
  tabNavStyles,
  viewSwitchLabelStyles
} from "./lib/styles";

const SimpleLineSymbolShell = () => {
  const viewSwitchRef = useRef(null);

  const [simpleLineSymbol, setSimpleLineSymbol] = useState(
    new SimpleLineSymbol({
      color: "#007ac2",
      miterLimit: 1,
      width: 1
    })
  );

  const [lineSymbolMarker, setLineSymbolMarker] = useState(
    new LineSymbolMarker({
      color: "#007ac2"
    })
  );

  const polylineGraphic = new Graphic({
    geometry: polyline,
    symbol: simpleLineSymbol
  });

  const graphicsCollection = new Collection();
  graphicsCollection.add(polylineGraphic);

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

  const updateGraphics = (newSimpleLineSymbol: SimpleLineSymbol) => {
    setSimpleLineSymbol(newSimpleLineSymbol);

    const newPolylineGraphic = graphics.getItemAt(0).clone();
    newPolylineGraphic.symbol = newSimpleLineSymbol;

    const newGraphics = new Collection();
    newGraphics.add(newPolylineGraphic);
    setGraphics(newGraphics);
  };

  const handleCapChange = (currentCapValue: InstanceType<typeof SimpleLineSymbol>["cap"]) => {
    const newSimpleLineSymbol = simpleLineSymbol.clone();
    newSimpleLineSymbol.cap = currentCapValue;
    updateGraphics(newSimpleLineSymbol);
  };

  const handleColorChange = (currentColor: string) => {
    const newSimpleLineSymbol = simpleLineSymbol.clone();
    newSimpleLineSymbol.color = new Color(currentColor);
    updateGraphics(newSimpleLineSymbol);
  };

  const handleJoinChange = (currentJoinValue: InstanceType<typeof SimpleLineSymbol>["join"]) => {
    const newSimpleLineSymbol = simpleLineSymbol.clone();
    newSimpleLineSymbol.join = currentJoinValue;
    updateGraphics(newSimpleLineSymbol);
  };

  const handleMarkerBlockToggle = (currentMarkerBlock: HTMLCalciteBlockElement) => {
    if (currentMarkerBlock.heading === "marker") {
      const newSimpleLineSymbol = simpleLineSymbol.clone();
      if (currentMarkerBlock.open) {
        newSimpleLineSymbol.marker = lineSymbolMarker;
        setLineSymbolMarker(newSimpleLineSymbol.marker as LineSymbolMarker);
        updateGraphics(newSimpleLineSymbol);
      } else {
        //@ts-expect-error marker symbol can to be null
        newSimpleLineSymbol.marker = null;
        updateGraphics(newSimpleLineSymbol);
      }
    }
  };

  const handleMarkerColorChange = (currentColor: string) => {
    const newSimpleLineSymbol = simpleLineSymbol.clone();
    if (newSimpleLineSymbol.marker) {
      newSimpleLineSymbol.marker.color = new Color(currentColor);
    }

    setLineSymbolMarker(newSimpleLineSymbol.marker as LineSymbolMarker);
    updateGraphics(newSimpleLineSymbol);
  };

  const handleMarkerPlacementChange = (
    currentPlacementValue: InstanceType<typeof LineSymbolMarker>["placement"]
  ) => {
    const newSimpleLineSymbol = simpleLineSymbol.clone();
    if (newSimpleLineSymbol.marker) {
      newSimpleLineSymbol.marker.placement = currentPlacementValue;
    }

    setLineSymbolMarker(newSimpleLineSymbol.marker as LineSymbolMarker);
    updateGraphics(newSimpleLineSymbol);
  };

  const handleMarkerStyleChange = (
    currentMarkerStyle: InstanceType<typeof LineSymbolMarker>["style"]
  ) => {
    const newSimpleLineSymbol = simpleLineSymbol.clone();
    if (newSimpleLineSymbol.marker) {
      newSimpleLineSymbol.marker.style = currentMarkerStyle;
    }

    setLineSymbolMarker(newSimpleLineSymbol.marker as LineSymbolMarker);
    updateGraphics(newSimpleLineSymbol);
  };

  const handleMiterLimitChange = (currentMiterLimitValue: string) => {
    const newSimpleLineSymbol = simpleLineSymbol.clone();
    newSimpleLineSymbol.miterLimit = Number(currentMiterLimitValue);
    updateGraphics(newSimpleLineSymbol);
  };

  const handleStyleChange = (currentStyleValue: InstanceType<typeof SimpleLineSymbol>["style"]) => {
    const newSimpleLineSymbol = simpleLineSymbol.clone();
    newSimpleLineSymbol.style = currentStyleValue;
    updateGraphics(newSimpleLineSymbol);
  };

  const handleWidthChange = (currentWidthValue: string) => {
    const newSimpleLineSymbol = simpleLineSymbol.clone();
    newSimpleLineSymbol.width = Number(currentWidthValue);
    updateGraphics(newSimpleLineSymbol);
  };

  return (
    <React.Fragment>
      <CalciteShell style={shellStyles}>
        <Header title="SimpleLineSymbol" backButton></Header>
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
              <SimpleLineSymbolForm
                handleCapChange={handleCapChange}
                handleColorChange={handleColorChange}
                handleJoinChange={handleJoinChange}
                handleMarkerBlockToggle={handleMarkerBlockToggle}
                handleMarkerColorChange={handleMarkerColorChange}
                handleMarkerPlacementChange={handleMarkerPlacementChange}
                handleMarkerStyleChange={handleMarkerStyleChange}
                handleMiterLimitChange={handleMiterLimitChange}
                handleStyleChange={handleStyleChange}
                handleWidthChange={handleWidthChange}
                showMarker={true}
                solidOnly={false}
              ></SimpleLineSymbolForm>
            </div>
          </CalcitePanel>
        </CalciteShellPanel>

        <CalciteShellPanel slot="panel-end" position="end" resizable style={shellPanelStyles}>
          <CalcitePanel>
            <CalciteTabs>
              <CalciteTabNav slot="title-group" style={tabNavStyles}>
                <CalciteTabTitle>ESM</CalciteTabTitle>
                <CalciteTabTitle>AMD</CalciteTabTitle>
                <CalciteTabTitle>JSON</CalciteTabTitle>
              </CalciteTabNav>
              <CalciteTab>
                <SimpleLineSymbolESMPanel simpleLineSymbol={simpleLineSymbol} />
              </CalciteTab>
              <CalciteTab>
                <SimpleLineSymbolAMDPanel simpleLineSymbol={simpleLineSymbol} />
              </CalciteTab>
              <CalciteTab>
                <SimpleLineSymbolJSONPanel simpleLineSymbol={simpleLineSymbol} />
              </CalciteTab>
            </CalciteTabs>
          </CalcitePanel>
        </CalciteShellPanel>
        {view}
      </CalciteShell>
    </React.Fragment>
  );
};

export default SimpleLineSymbolShell;
