import esriRequest from "@arcgis/core/request.js";
import type WebStyleSymbol from "@arcgis/core/symbols/WebStyleSymbol.js";
import "@esri/calcite-components/dist/components/calcite-input-text";
import "@esri/calcite-components/dist/components/calcite-label";
import "@esri/calcite-components/dist/components/calcite-list";
import "@esri/calcite-components/dist/components/calcite-list-item";
import "@esri/calcite-components/dist/components/calcite-option";
import "@esri/calcite-components/dist/components/calcite-select";
import "@esri/calcite-components/dist/components/calcite-tab";
import "@esri/calcite-components/dist/components/calcite-tab-nav";
import "@esri/calcite-components/dist/components/calcite-tab-title";
import "@esri/calcite-components/dist/components/calcite-tabs";
import { useEffect, useRef, useState } from "react";
import {
  esriIconsStyleNameOptions,
  esriInfrastructureStyleNameOptions,
  esriRealisticSignsAndSignalsStyleNameOptions,
  esriRealisticStreetSceneStyleNameOptions,
  esriRealisticTransportationStyleNameOptions,
  esriRealisticTreesStyleNameOptions,
  esriRecreationStyleNameOptions,
  esriThematicShapesStyleNameOptions,
  esriThematicTreesStyleNameOptions,
  webStyleSymbols3DStyleOptions,
} from "./lib/constants";
import { labelStyles } from "./lib/styles";
import type { ItemType, WebStyleSymbolItem } from "./lib/types";

interface Props {
  symbol: WebStyleSymbol;
  handleNameChange: (value: string) => void;
  handleStyleNameChange: (
    value: string,
    portalUrl?: string,
    name?: string,
  ) => void;
  handleCustomStyleChange: (
    styleUrl: string,
    name: string,
    itemType: ItemType,
  ) => void;
}

function WebStyleSymbolForm({
  symbol,
  handleNameChange,
  handleStyleNameChange,
  handleCustomStyleChange,
}: Props): React.ReactElement {
  const [pointWebStyleSymbolItems, setPointWebStyleSymbolItems] = useState<
    WebStyleSymbolItem[]
  >([]);
  const [styleUrl, setStyleUrl] = useState(symbol.styleUrl ?? "");
  const requestId = useRef(0);
  const name = symbol.name ?? "";
  const styleName = symbol.styleName ?? "";
  const portalUrl = symbol.portal?.url ?? "";
  const names = getNames(styleName);

  useEffect(
    () => () => {
      requestId.current += 1;
    },
    [],
  );

  async function getStyleItemDataFromUrl(url: string): Promise<void> {
    const currentRequestId = ++requestId.current;
    setPointWebStyleSymbolItems([]);
    const response = await esriRequest(url, {
      responseType: "json",
    });
    if (currentRequestId !== requestId.current) {
      return;
    }
    const data = response.data as { items: WebStyleSymbolItem[] };
    const items = data.items;

    const pointItems = items
      .filter((item: WebStyleSymbolItem) => item.itemType === "pointSymbol")
      .sort((a: WebStyleSymbolItem, b: WebStyleSymbolItem) =>
        a.name.localeCompare(b.name),
      );

    if (pointItems.length > 0) {
      setPointWebStyleSymbolItems(pointItems);
      handleCustomStyleChange(url, pointItems[0].name, "pointSymbol");
    }
  }

  const handleTabChange = async (event: CustomEvent): Promise<void> => {
    const tabNav = event.target as HTMLCalciteTabNavElement;
    const selectedTitle = tabNav.selectedTitle;
    if (!selectedTitle) {
      return;
    }
    if (selectedTitle.tab === "standard") {
      requestId.current += 1;
      handleStyleNameChange("EsriIconsStyle", portalUrl);
    } else {
      setStyleUrl(
        "https://www.arcgis.com/sharing/rest/content/items/9b8e84d1c01349f28d57502af601e37f/data",
      );
      await getStyleItemDataFromUrl(
        "https://www.arcgis.com/sharing/rest/content/items/9b8e84d1c01349f28d57502af601e37f/data",
      );
    }
  };

  function getNames(styleName: string | null | undefined): readonly string[] {
    switch (styleName) {
      case "EsriIconsStyle":
        return esriIconsStyleNameOptions;

      case "EsriInfrastructureStyle":
        return esriInfrastructureStyleNameOptions;

      case "EsriRealisticSignsandSignalsStyle":
        return esriRealisticSignsAndSignalsStyleNameOptions;

      case "EsriRealisticStreetSceneStyle":
        return esriRealisticStreetSceneStyleNameOptions;

      case "EsriRealisticTransportationStyle":
        return esriRealisticTransportationStyleNameOptions;

      case "EsriRealisticTreesStyle":
        return esriRealisticTreesStyleNameOptions;

      case "EsriRecreationStyle":
        return esriRecreationStyleNameOptions;

      case "EsriThematicShapesStyle":
        return esriThematicShapesStyleNameOptions;

      case "EsriThematicTreesStyle":
        return esriThematicTreesStyleNameOptions;

      default:
        return esriIconsStyleNameOptions;
    }
  }

  return (
    <>
      <calcite-tabs>
        <calcite-tab-nav
          slot="title-group"
          oncalciteTabChange={handleTabChange}
        >
          <calcite-tab-title tab="standard">Standard</calcite-tab-title>
          <calcite-tab-title tab="custom">Custom</calcite-tab-title>
        </calcite-tab-nav>
        <calcite-tab tab="standard">
          <calcite-label layout="default" style={labelStyles}>
            name
            <calcite-select
              label={"name selection"}
              oncalciteSelectChange={(event) => {
                handleNameChange(event.target.value);
              }}
              value={name}
            >
              {!names.includes(name) && (
                <calcite-option value={name} disabled>
                  {name}
                </calcite-option>
              )}
              {names.map((option, index) => (
                <calcite-option key={index}>{option}</calcite-option>
              ))}
            </calcite-select>
          </calcite-label>

          <calcite-label layout="default" style={labelStyles}>
            styleName
            <calcite-select
              label={"styleName selection"}
              oncalciteSelectChange={(event) => {
                requestId.current += 1;
                handleStyleNameChange(event.target.value, portalUrl);
              }}
              value={styleName}
            >
              {!styleName && (
                <calcite-option value="" disabled>
                  Custom
                </calcite-option>
              )}
              {webStyleSymbols3DStyleOptions.map((option, index) => (
                <calcite-option key={index}>{option}</calcite-option>
              ))}
            </calcite-select>
          </calcite-label>

          <calcite-label layout="default" style={labelStyles}>
            portal URL (optional)
            <calcite-input-text
              label="Portal URL"
              oncalciteInputTextChange={(event) => {
                requestId.current += 1;
                handleStyleNameChange(
                  styleName || "EsriIconsStyle",
                  event.target.value,
                  name,
                );
              }}
              placeholder="https://www.arcgis.com"
              value={portalUrl}
            ></calcite-input-text>
          </calcite-label>
        </calcite-tab>
        <calcite-tab tab="custom">
          <calcite-label layout="default" style={labelStyles}>
            styleUrl
            <calcite-input-text
              label={"url input"}
              oncalciteInputTextChange={async (event) => {
                setStyleUrl(event.target.value);
                await getStyleItemDataFromUrl(event.target.value);
              }}
              value={styleUrl}
            ></calcite-input-text>
          </calcite-label>
          <calcite-list
            displayMode="nested"
            filter-enabled
            filter-placeholder="Filter symbols"
            label="WebStyleSymbols"
          >
            {pointWebStyleSymbolItems.length > 0 && (
              <calcite-list-item label="Point Symbols" expanded>
                <calcite-list label="Point Symbols">
                  {pointWebStyleSymbolItems.map((item, index) => (
                    <calcite-list-item
                      key={index}
                      label={item.name}
                      onClick={() => {
                        requestId.current += 1;
                        handleCustomStyleChange(
                          styleUrl,
                          item.name,
                          "pointSymbol",
                        );
                      }}
                      value={item.name}
                    >
                      <img
                        alt={item.name}
                        slot="content-start"
                        src={item.thumbnail.href}
                      />
                    </calcite-list-item>
                  ))}
                </calcite-list>
              </calcite-list-item>
            )}
          </calcite-list>
        </calcite-tab>
      </calcite-tabs>
    </>
  );
}

export default WebStyleSymbolForm;
