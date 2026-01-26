import Color from "@arcgis/core/Color.js";
import Graphic from "@arcgis/core/Graphic.js";
import Collection from "@arcgis/core/core/Collection.js";
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol.js";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol.js";
import "@esri/calcite-components/components/calcite-panel";
import "@esri/calcite-components/components/calcite-shell";
import "@esri/calcite-components/components/calcite-shell-panel";
import "@esri/calcite-components/components/calcite-switch";
import "@esri/calcite-components/components/calcite-tab";
import "@esri/calcite-components/components/calcite-tab-nav";
import "@esri/calcite-components/components/calcite-tab-title";
import "@esri/calcite-components/components/calcite-tabs";
import { useRef, useState } from "react";
import MapElement from "./Map";
import Scene from "./Scene";
import SimpleMarkerSymbolCDNPanel from "./SimpleMarkerSymbolCDNPanel";
import SimpleMarkerSymbolESMPanel from "./SimpleMarkerSymbolESMPanel";
import SimpleMarkerSymbolForm from "./SimpleMarkerSymbolForm";
import SimpleMarkerSymbolJSONPanel from "./SimpleMarkerSymbolJSONPanel";
import { point } from "./lib/geometry";
import {
  formStyles,
  shellPanelStyles,
  shellStyles,
  tabNavStyles,
  viewSwitchLabelStyles,
} from "./lib/styles";

function SimpleMarkerSymbolShell(): React.ReactElement {
  const viewSwitchRef = useRef(null);

  const [simpleLineSymbol, setSimpleLineSymbol] = useState(
    new SimpleLineSymbol({ color: "#007ac2", miterLimit: 1, width: 1 }),
  );

  const [simpleMarkerSymbol, setSimpleMarkerSymbol] = useState(
    new SimpleMarkerSymbol({
      outline: simpleLineSymbol,
    }),
  );

  const pointGraphic = new Graphic({
    geometry: point,
    symbol: simpleMarkerSymbol,
  });

  const graphicsCollection = new Collection();
  graphicsCollection.add(pointGraphic);

  const [graphics, setGraphics] =
    useState<Collection<Graphic>>(graphicsCollection);

  const [scene, setScene] = useState(false);
  let viewElement = <MapElement graphics={graphics}></MapElement>;
  if (scene) {
    viewElement = <Scene graphics={graphics}></Scene>;
  }

  const handleSwitchChange = (): void => {
    if (viewSwitchRef.current) {
      setScene((viewSwitchRef.current as HTMLCalciteSwitchElement).checked);
    }
  };

  const updateGraphics = (newSimpleMarkerSymbol: SimpleMarkerSymbol): void => {
    setSimpleMarkerSymbol(newSimpleMarkerSymbol);

    const newPointGraphic = graphics.getItemAt(0)?.clone();
    if (newPointGraphic) {
      newPointGraphic.symbol = newSimpleMarkerSymbol;
    }
    const newGraphics = new Collection();
    newGraphics.add(newPointGraphic);
    setGraphics(newGraphics);
  };

  const handleAngleChange = (currentAngle: number): void => {
    const newSimpleMarkerSymbol = simpleMarkerSymbol.clone();
    newSimpleMarkerSymbol.angle = currentAngle;
    updateGraphics(newSimpleMarkerSymbol);
  };

  const handleColorChange = (currentColor: string): void => {
    const newSimpleMarkerSymbol = simpleMarkerSymbol.clone();
    newSimpleMarkerSymbol.color = new Color(currentColor);
    updateGraphics(newSimpleMarkerSymbol);
  };

  const handleOutlineCapChange = (
    currentCapValue: InstanceType<typeof SimpleLineSymbol>["cap"],
  ): void => {
    const newSimpleLineSymbol = simpleLineSymbol.clone();
    newSimpleLineSymbol.cap = currentCapValue;
    setSimpleLineSymbol(newSimpleLineSymbol);

    const newSimpleMarkerSymbol = simpleMarkerSymbol.clone();
    newSimpleMarkerSymbol.outline = newSimpleLineSymbol;
    updateGraphics(newSimpleMarkerSymbol);
  };

  const handleOutlineColorChange = (currentColor: string): void => {
    const newSimpleLineSymbol = simpleLineSymbol.clone();
    newSimpleLineSymbol.color = new Color(currentColor);
    setSimpleLineSymbol(newSimpleLineSymbol);

    const newSimpleMarkerSymbol = simpleMarkerSymbol.clone();
    newSimpleMarkerSymbol.outline = newSimpleLineSymbol;
    updateGraphics(newSimpleMarkerSymbol);
  };

  const handleOutlineJoinChange = (
    currentJoinValue: InstanceType<typeof SimpleLineSymbol>["join"],
  ): void => {
    const newSimpleLineSymbol = simpleLineSymbol.clone();
    newSimpleLineSymbol.join = currentJoinValue;
    setSimpleLineSymbol(newSimpleLineSymbol);

    const newSimpleMarkerSymbol = simpleMarkerSymbol.clone();
    newSimpleMarkerSymbol.outline = newSimpleLineSymbol;
    updateGraphics(newSimpleMarkerSymbol);
  };

  const handleOutlineMiterLimitChange = (
    currentMiterLimitValue: string,
  ): void => {
    const newSimpleLineSymbol = simpleLineSymbol.clone();
    newSimpleLineSymbol.miterLimit = Number(currentMiterLimitValue);
    setSimpleLineSymbol(newSimpleLineSymbol);

    const newSimpleMarkerSymbol = simpleMarkerSymbol.clone();
    newSimpleMarkerSymbol.outline = newSimpleLineSymbol;
    updateGraphics(newSimpleMarkerSymbol);
  };

  const handleOutlineStyleChange = (
    currentStyleValue: InstanceType<typeof SimpleLineSymbol>["style"],
  ): void => {
    const newSimpleLineSymbol = simpleLineSymbol.clone();
    newSimpleLineSymbol.style = currentStyleValue;
    setSimpleLineSymbol(newSimpleLineSymbol);

    const newSimpleMarkerSymbol = simpleMarkerSymbol.clone();
    newSimpleMarkerSymbol.outline = newSimpleLineSymbol;
    updateGraphics(newSimpleMarkerSymbol);
  };

  const handleOutlineWidthChange = (currentWidthValue: string): void => {
    const newSimpleLineSymbol = simpleLineSymbol.clone();
    newSimpleLineSymbol.width = Number(currentWidthValue);
    setSimpleLineSymbol(newSimpleLineSymbol);

    const newSimpleMarkerSymbol = simpleMarkerSymbol.clone();
    newSimpleMarkerSymbol.outline = newSimpleLineSymbol;
    updateGraphics(newSimpleMarkerSymbol);
  };

  const handlePathChange = (currentPathValue: string): void => {
    const newSimpleMarkerSymbol = simpleMarkerSymbol.clone();
    newSimpleMarkerSymbol.path = currentPathValue;
    updateGraphics(newSimpleMarkerSymbol);
  };

  const handleSizeChange = (currentSize: string): void => {
    const newSimpleMarkerSymbol = simpleMarkerSymbol.clone();
    newSimpleMarkerSymbol.size = Number(currentSize);
    updateGraphics(newSimpleMarkerSymbol);
  };

  const handleStyleChange = (
    currentStyleValue: InstanceType<typeof SimpleMarkerSymbol>["style"],
  ): void => {
    const newSimpleMarkerSymbol = simpleMarkerSymbol.clone();
    newSimpleMarkerSymbol.style = currentStyleValue;
    updateGraphics(newSimpleMarkerSymbol);
  };

  const handleXoffsetChange = (currentXOffset: string): void => {
    const newSimpleMarkerSymbol = simpleMarkerSymbol.clone();
    newSimpleMarkerSymbol.xoffset = Number(currentXOffset);
    updateGraphics(newSimpleMarkerSymbol);
  };

  const handleYoffsetChange = (currentYOffset: string): void => {
    const newSimpleMarkerSymbol = simpleMarkerSymbol.clone();
    newSimpleMarkerSymbol.yoffset = Number(currentYOffset);
    updateGraphics(newSimpleMarkerSymbol);
  };

  return (
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
              scene={scene}
            ></SimpleMarkerSymbolForm>
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
              <calcite-tab-title selected>ESM</calcite-tab-title>
              <calcite-tab-title>CDN</calcite-tab-title>
              <calcite-tab-title>JSON</calcite-tab-title>
            </calcite-tab-nav>
            <calcite-tab selected>
              <SimpleMarkerSymbolESMPanel
                simpleMarkerSymbol={simpleMarkerSymbol}
              ></SimpleMarkerSymbolESMPanel>
            </calcite-tab>
            <calcite-tab>
              <SimpleMarkerSymbolCDNPanel
                simpleMarkerSymbol={simpleMarkerSymbol}
              ></SimpleMarkerSymbolCDNPanel>
            </calcite-tab>
            <calcite-tab>
              <SimpleMarkerSymbolJSONPanel
                simpleMarkerSymbol={simpleMarkerSymbol}
              ></SimpleMarkerSymbolJSONPanel>
            </calcite-tab>
          </calcite-tabs>
        </calcite-panel>
      </calcite-shell-panel>
      {viewElement}
    </calcite-shell>
  );
}

export default SimpleMarkerSymbolShell;
