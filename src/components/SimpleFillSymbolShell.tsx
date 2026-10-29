import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol.js";
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol.js";
import "@esri/calcite-components/dist/components/calcite-label";
import "@esri/calcite-components/dist/components/calcite-panel";
import "@esri/calcite-components/dist/components/calcite-shell";
import "@esri/calcite-components/dist/components/calcite-shell-panel";
import "@esri/calcite-components/dist/components/calcite-switch";
import "@esri/calcite-components/dist/components/calcite-tab";
import "@esri/calcite-components/dist/components/calcite-tab-nav";
import "@esri/calcite-components/dist/components/calcite-tab-title";
import "@esri/calcite-components/dist/components/calcite-tabs";
import { useRef, useState } from "react";
import Map from "./Map";
import Scene from "./Scene";
import SimpleFillSymbolCDNPanel from "./SimpleFillSymbolCDNPanel";
import SimpleFillSymbolESMPanel from "./SimpleFillSymbolESMPanel";
import SimpleFillSymbolForm from "./SimpleFillSymbolForm";
import SimpleFillSymbolJSONPanel from "./SimpleFillSymbolJSONPanel";
import { polygon } from "./lib/geometry";
import { colorWithAlpha } from "./lib/color";
import { useSymbolPreview } from "./lib/useSymbolPreview";
import {
  formStyles,
  shellPanelStyles,
  shellStyles,
  tabNavStyles,
  viewSwitchLabelStyles,
} from "./lib/styles";

function SimpleFillSymbolShell(): React.ReactElement {
  const viewSwitchRef = useRef(null);

  const [simpleFillSymbol, setSimpleFillSymbol] = useState(
    new SimpleFillSymbol({
      color: "#007ac2",
      outline: new SimpleLineSymbol({ color: "#007ac2", miterLimit: 1, width: 1 }),
    }),
  );

  const { graphics, updatePreview } = useSymbolPreview(
    polygon,
    simpleFillSymbol,
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

  const updateGraphics = (newSimpleFillSymbol: SimpleFillSymbol): void => {
    setSimpleFillSymbol(newSimpleFillSymbol);
    updatePreview(newSimpleFillSymbol);
  };

  const updateOutline = (change: (outline: SimpleLineSymbol) => void): void => {
    const next = simpleFillSymbol.clone();
    if (!next.outline) throw new Error("Cannot edit a missing outline.");
    change(next.outline);
    updateGraphics(next);
  };

  const handleColorChange = (currentColor: string): void => {
    const newSimpleFillSymbol = simpleFillSymbol.clone();
    newSimpleFillSymbol.color = colorWithAlpha(
      currentColor,
      newSimpleFillSymbol.color,
    );
    updateGraphics(newSimpleFillSymbol);
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

  const handleStyleChange = (
    currentStyleValue: InstanceType<typeof SimpleFillSymbol>["style"],
  ): void => {
    const newSimpleFillSymbol = simpleFillSymbol.clone();
    newSimpleFillSymbol.style = currentStyleValue;
    updateGraphics(newSimpleFillSymbol);
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
              <SimpleFillSymbolForm
                symbol={simpleFillSymbol}
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
                <SimpleFillSymbolESMPanel
                  simpleFillSymbol={simpleFillSymbol}
                ></SimpleFillSymbolESMPanel>
              </calcite-tab>
              <calcite-tab>
                <SimpleFillSymbolCDNPanel
                  simpleFillSymbol={simpleFillSymbol}
                ></SimpleFillSymbolCDNPanel>
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
    </>
  );
}

export default SimpleFillSymbolShell;
