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
import { colorWithAlpha } from "./lib/color";
import { useSymbolPreview } from "./lib/useSymbolPreview";
import {
  formStyles,
  shellPanelStyles,
  shellStyles,
  tabNavStyles,
  viewSwitchLabelStyles,
} from "./lib/styles";

function SimpleMarkerSymbolShell(): React.ReactElement {
  const viewSwitchRef = useRef(null);

  const [simpleMarkerSymbol, setSimpleMarkerSymbol] = useState(
    new SimpleMarkerSymbol({
      color: "#007ac2",
      outline: new SimpleLineSymbol({ color: "#007ac2", miterLimit: 1, width: 1 }),
    }),
  );

  const { graphics, updatePreview } = useSymbolPreview(
    point,
    simpleMarkerSymbol,
  );

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
    updatePreview(newSimpleMarkerSymbol);
  };

  const updateOutline = (change: (outline: SimpleLineSymbol) => void): void => {
    const next = simpleMarkerSymbol.clone();
    if (!next.outline) throw new Error("Cannot edit a missing outline.");
    change(next.outline);
    updateGraphics(next);
  };

  const handleAngleChange = (currentAngle: number): void => {
    const newSimpleMarkerSymbol = simpleMarkerSymbol.clone();
    newSimpleMarkerSymbol.angle = currentAngle;
    updateGraphics(newSimpleMarkerSymbol);
  };

  const handleColorChange = (currentColor: string): void => {
    const newSimpleMarkerSymbol = simpleMarkerSymbol.clone();
    newSimpleMarkerSymbol.color = colorWithAlpha(
      currentColor,
      newSimpleMarkerSymbol.color,
    );
    updateGraphics(newSimpleMarkerSymbol);
  };

  const handleOutlineCapChange = (
    currentCapValue: InstanceType<typeof SimpleLineSymbol>["cap"],
  ): void => {
    updateOutline((outline) => {
      outline.cap = currentCapValue;
    });
  };

  const handleOutlineColorChange = (currentColor: string): void => {
    updateOutline((outline) => {
      outline.color = colorWithAlpha(currentColor, outline.color);
    });
  };

  const handleOutlineJoinChange = (
    currentJoinValue: InstanceType<typeof SimpleLineSymbol>["join"],
  ): void => {
    updateOutline((outline) => {
      outline.join = currentJoinValue;
    });
  };

  const handleOutlineMiterLimitChange = (
    currentMiterLimitValue: string,
  ): void => {
    updateOutline((outline) => {
      outline.miterLimit = Number(currentMiterLimitValue);
    });
  };

  const handleOutlineStyleChange = (
    currentStyleValue: InstanceType<typeof SimpleLineSymbol>["style"],
  ): void => {
    updateOutline((outline) => {
      outline.style = currentStyleValue;
    });
  };

  const handleOutlineWidthChange = (currentWidthValue: string): void => {
    updateOutline((outline) => {
      outline.width = Number(currentWidthValue);
    });
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
            <SimpleMarkerSymbolForm
              symbol={simpleMarkerSymbol}
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

      <calcite-shell-panel slot="panel-end" resizable style={shellPanelStyles}>
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
