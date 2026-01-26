import esriRequest from "@arcgis/core/request.js";
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
import { useState } from "react";
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
  handleNameChange: (value: string) => void;
  handleStyleNameChange: (value: string) => void;
  handleCustomStyleChange: (
    styleUrl: string,
    name: string,
    itemType: ItemType,
  ) => void;
}

function WebStyleSymbolForm({
  handleNameChange,
  handleStyleNameChange,
  handleCustomStyleChange,
}: Props): React.ReactElement {
  const [name, setName] = useState("Accessibility");
  const [names, setNames] = useState(esriIconsStyleNameOptions);
  const [pointWebStyleSymbolItems, setPointWebStyleSymbolItems] = useState<
    WebStyleSymbolItem[]
  >([]);
  const [styleName, setStyleName] = useState("EsriIconsStyle");
  const [styleUrl, setStyleUrl] = useState("");

  async function getStyleItemDataFromUrl(url: string): Promise<void> {
    const response = await esriRequest(url, {
      responseType: "json",
    });
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
    if (tabNav.selectedTitle.tab === "standard") {
      setName("Accessibility");
      setStyleName("EsriIconsStyle");
      handleStyleNameChange(styleName);
    } else {
      setName("");
      setStyleUrl(
        "https://www.arcgis.com/sharing/rest/content/items/9b8e84d1c01349f28d57502af601e37f/data",
      );
      await getStyleItemDataFromUrl(
        "https://www.arcgis.com/sharing/rest/content/items/9b8e84d1c01349f28d57502af601e37f/data",
      );
    }
  };

  const updateNames = (styleName: string): void => {
    switch (styleName) {
      case "EsriIconsStyle":
        setNames(esriIconsStyleNameOptions);
        setName(esriIconsStyleNameOptions[0]);
        break;

      case "EsriInfrastructureStyle":
        setNames(esriInfrastructureStyleNameOptions);
        setName(esriInfrastructureStyleNameOptions[0]);
        break;

      case "EsriRealisticSignsandSignalsStyle":
        setNames(esriRealisticSignsAndSignalsStyleNameOptions);
        setName(esriRealisticSignsAndSignalsStyleNameOptions[0]);
        break;

      case "EsriRealisticStreetSceneStyle":
        setNames(esriRealisticStreetSceneStyleNameOptions);
        setName(esriRealisticStreetSceneStyleNameOptions[0]);
        break;

      case "EsriRealisticTransportationStyle":
        setNames(esriRealisticTransportationStyleNameOptions);
        setName(esriRealisticTransportationStyleNameOptions[0]);
        break;

      case "EsriRealisticTreesStyle":
        setNames(esriRealisticTreesStyleNameOptions);
        setName(esriRealisticTreesStyleNameOptions[0]);
        break;

      case "EsriRecreationStyle":
        setNames(esriRecreationStyleNameOptions);
        setName(esriRecreationStyleNameOptions[0]);
        break;

      case "EsriThematicShapesStyle":
        setNames(esriThematicShapesStyleNameOptions);
        setName(esriThematicShapesStyleNameOptions[0]);
        break;

      case "EsriThematicTreesStyle":
        setNames(esriThematicTreesStyleNameOptions);
        setName(esriThematicTreesStyleNameOptions[0]);
        break;

      default:
        setNames(esriIconsStyleNameOptions);
        setName(esriIconsStyleNameOptions[0]);
    }
  };

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
                setName(event.target.value);
                handleNameChange(event.target.value);
              }}
              value={name}
            >
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
                setStyleName(event.target.value);
                handleStyleNameChange(event.target.value);
                updateNames(event.target.value);
              }}
              value={styleName}
            >
              {webStyleSymbols3DStyleOptions.map((option, index) => (
                <calcite-option key={index}>{option}</calcite-option>
              ))}
            </calcite-select>
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
                      onClick={(event) => {
                        const newName =
                          (event.target as HTMLCalciteListItemElement).label ===
                          undefined
                            ? (event.target as HTMLImageElement).alt
                            : (event.target as HTMLCalciteListItemElement)
                                .label;
                        handleCustomStyleChange(
                          styleUrl,
                          newName,
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
