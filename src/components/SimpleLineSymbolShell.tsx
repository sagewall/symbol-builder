import LineSymbolMarker from "@arcgis/core/symbols/LineSymbolMarker.js";
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol.js";
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
import Scene from "./Scene";
import SimpleLineSymbolCDNPanel from "./SimpleLineSymbolCDNPanel";
import SimpleLineSymbolESMPanel from "./SimpleLineSymbolESMPanel";
import SimpleLineSymbolForm from "./SimpleLineSymbolForm";
import SimpleLineSymbolJSONPanel from "./SimpleLineSymbolJSONPanel";
import { polyline } from "./lib/geometry";
import { colorWithAlpha } from "./lib/color";
import { useSymbolPreview } from "./lib/useSymbolPreview";
import {
  formStyles,
  shellPanelStyles,
  shellStyles,
  tabNavStyles,
  viewSwitchLabelStyles,
} from "./lib/styles";

function SimpleLineSymbolShell(): React.ReactElement {
  const viewSwitchRef = useRef(null);

  const [simpleLineSymbol, setSimpleLineSymbol] = useState(
    new SimpleLineSymbol({
      color: "#007ac2",
      miterLimit: 1,
      width: 1,
    }),
  );

  const [lineSymbolMarker, setLineSymbolMarker] = useState(
    new LineSymbolMarker({
      color: "#007ac2",
    }),
  );

  const { graphics, updatePreview } = useSymbolPreview(
    polyline,
    simpleLineSymbol,
  );

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

  const updateGraphics = (newSimpleLineSymbol: SimpleLineSymbol): void => {
    setSimpleLineSymbol(newSimpleLineSymbol);
    updatePreview(newSimpleLineSymbol);
  };

  const handleCapChange = (
    currentCapValue: InstanceType<typeof SimpleLineSymbol>["cap"],
  ): void => {
    const newSimpleLineSymbol = simpleLineSymbol.clone();
    newSimpleLineSymbol.cap = currentCapValue;
    updateGraphics(newSimpleLineSymbol);
  };

  const handleColorChange = (currentColor: string): void => {
    const newSimpleLineSymbol = simpleLineSymbol.clone();
    newSimpleLineSymbol.color = colorWithAlpha(
      currentColor,
      newSimpleLineSymbol.color,
    );
    updateGraphics(newSimpleLineSymbol);
  };

  const handleJoinChange = (
    currentJoinValue: InstanceType<typeof SimpleLineSymbol>["join"],
  ): void => {
    const newSimpleLineSymbol = simpleLineSymbol.clone();
    newSimpleLineSymbol.join = currentJoinValue;
    updateGraphics(newSimpleLineSymbol);
  };

  const handleMarkerBlockToggle = (
    currentMarkerBlock: HTMLCalciteBlockElement,
  ): void => {
    if (currentMarkerBlock.heading === "marker") {
      const newSimpleLineSymbol = simpleLineSymbol.clone();
      if (currentMarkerBlock.expanded) {
        newSimpleLineSymbol.marker = lineSymbolMarker;
        setLineSymbolMarker(newSimpleLineSymbol.marker);
        updateGraphics(newSimpleLineSymbol);
      } else {
        newSimpleLineSymbol.marker = null;
        updateGraphics(newSimpleLineSymbol);
      }
    }
  };

  const handleMarkerColorChange = (currentColor: string): void => {
    const newSimpleLineSymbol = simpleLineSymbol.clone();
    if (newSimpleLineSymbol.marker) {
      newSimpleLineSymbol.marker.color = colorWithAlpha(
        currentColor,
        newSimpleLineSymbol.marker.color,
      );
    }

    setLineSymbolMarker(newSimpleLineSymbol.marker!);
    updateGraphics(newSimpleLineSymbol);
  };

  const handleMarkerPlacementChange = (
    currentPlacementValue: InstanceType<typeof LineSymbolMarker>["placement"],
  ): void => {
    const newSimpleLineSymbol = simpleLineSymbol.clone();
    if (newSimpleLineSymbol.marker) {
      newSimpleLineSymbol.marker.placement = currentPlacementValue;
    }

    setLineSymbolMarker(newSimpleLineSymbol.marker!);
    updateGraphics(newSimpleLineSymbol);
  };

  const handleMarkerStyleChange = (
    currentMarkerStyle: InstanceType<typeof LineSymbolMarker>["style"],
  ): void => {
    const newSimpleLineSymbol = simpleLineSymbol.clone();
    if (newSimpleLineSymbol.marker) {
      newSimpleLineSymbol.marker.style = currentMarkerStyle;
    }

    setLineSymbolMarker(newSimpleLineSymbol.marker!);
    updateGraphics(newSimpleLineSymbol);
  };

  const handleMiterLimitChange = (currentMiterLimitValue: string): void => {
    const newSimpleLineSymbol = simpleLineSymbol.clone();
    newSimpleLineSymbol.miterLimit = Number(currentMiterLimitValue);
    updateGraphics(newSimpleLineSymbol);
  };

  const handleStyleChange = (
    currentStyleValue: InstanceType<typeof SimpleLineSymbol>["style"],
  ): void => {
    const newSimpleLineSymbol = simpleLineSymbol.clone();
    newSimpleLineSymbol.style = currentStyleValue;
    updateGraphics(newSimpleLineSymbol);
  };

  const handleWidthChange = (currentWidthValue: string): void => {
    const newSimpleLineSymbol = simpleLineSymbol.clone();
    newSimpleLineSymbol.width = Number(currentWidthValue);
    updateGraphics(newSimpleLineSymbol);
  };

  return (
    <>
      <calcite-shell style={shellStyles}>
        <calcite-shell-panel slot="panel-start" resizable>
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
              <SimpleLineSymbolForm
                symbol={simpleLineSymbol}
                marker={lineSymbolMarker}
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
          </calcite-panel>
        </calcite-shell-panel>

        <calcite-shell-panel
          slot="panel-end"
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
                <SimpleLineSymbolESMPanel
                  simpleLineSymbol={simpleLineSymbol}
                ></SimpleLineSymbolESMPanel>
              </calcite-tab>
              <calcite-tab>
                <SimpleLineSymbolCDNPanel
                  simpleLineSymbol={simpleLineSymbol}
                ></SimpleLineSymbolCDNPanel>
              </calcite-tab>
              <calcite-tab>
                <SimpleLineSymbolJSONPanel
                  simpleLineSymbol={simpleLineSymbol}
                ></SimpleLineSymbolJSONPanel>
              </calcite-tab>
            </calcite-tabs>
          </calcite-panel>
        </calcite-shell-panel>
        {viewElement}
      </calcite-shell>
    </>
  );
}

export default SimpleLineSymbolShell;
