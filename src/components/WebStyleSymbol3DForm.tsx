import esriRequest from "@arcgis/core/request";
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
  ESRI_ICONS_STYLE_NAME_OPTIONS,
  ESRI_INFRASTRUCTURE_STYLE_NAME_OPTIONS,
  ESRI_REALISTIC_SIGNS_AND_SIGNALS_STYLE_NAME_OPTIONS,
  ESRI_REALISTIC_STREET_SCENE_STYLE_NAME_OPTIONS,
  ESRI_REALISTIC_TRANSPORTATION_STYLE_NAME_OPTIONS,
  ESRI_REALISTIC_TREES_STYLE_NAME_OPTIONS,
  ESRI_RECREATION_STYLE_NAME_OPTIONS,
  ESRI_THEMATIC_SHAPES_STYLE_NAME_OPTIONS,
  ESRI_THEMATIC_TREES_STYLE_NAME_OPTIONS,
  WEB_STYLE_SYMBOLS_3D_STYLE_OPTIONS,
} from "../lib/constants";
import { labelStyles } from "../lib/styles";
import type { ItemType, WebStyleStymbolItem } from "../lib/types";

interface Props {
  handleNameChange: (value: string) => void;
  handleStyleNameChange: (value: string) => void;
  handleCustomStyleChange: (
    styleUrl: string,
    name: string,
    itemType: ItemType
  ) => void;
}

function WebStyleSymbolForm({
  handleNameChange,
  handleStyleNameChange,
  handleCustomStyleChange,
}: Props) {
  const [name, setName] = useState("Accessibility");
  const [names, setNames] = useState(ESRI_ICONS_STYLE_NAME_OPTIONS);
  const [pointWebStyleSymbolItems, setPointWebStyleSymbolItems] = useState<
    WebStyleStymbolItem[]
  >([]);
  const [styleName, setStyleName] = useState("EsriIconsStyle");
  const [styleUrl, setStyleUrl] = useState("");

  async function getStyleItemDataFromUrl(url: string) {
    const response = await esriRequest(url, {
      responseType: "json",
    });
    const items = response.data.items;

    const pointItems = items
      .filter((item: WebStyleStymbolItem) => item.itemType === "pointSymbol")
      .sort((a: WebStyleStymbolItem, b: WebStyleStymbolItem) => {
        return a.name.localeCompare(b.name);
      });

    if (pointItems.length > 0) {
      setPointWebStyleSymbolItems(pointItems);
      handleCustomStyleChange(url, pointItems[0].name, "pointSymbol");
    }
  }

  const handleTabChange = (event: CustomEvent) => {
    const tabNav = event.target as HTMLCalciteTabNavElement;
    if (tabNav.selectedTitle.tab === "standard") {
      setName("Accessibility");
      setStyleName("EsriIconsStyle");
      handleStyleNameChange(styleName);
    } else {
      setName("");
      setStyleUrl(
        "https://www.arcgis.com/sharing/rest/content/items/9b8e84d1c01349f28d57502af601e37f/data"
      );
      getStyleItemDataFromUrl(
        "https://www.arcgis.com/sharing/rest/content/items/9b8e84d1c01349f28d57502af601e37f/data"
      );
    }
  };

  const updateNames = (styleName: string) => {
    switch (styleName) {
      case "EsriIconsStyle":
        setNames(ESRI_ICONS_STYLE_NAME_OPTIONS);
        setName(ESRI_ICONS_STYLE_NAME_OPTIONS[0]);
        break;

      case "EsriInfrastructureStyle":
        setNames(ESRI_INFRASTRUCTURE_STYLE_NAME_OPTIONS);
        setName(ESRI_INFRASTRUCTURE_STYLE_NAME_OPTIONS[0]);
        break;

      case "EsriRealisticSignsandSignalsStyle":
        setNames(ESRI_REALISTIC_SIGNS_AND_SIGNALS_STYLE_NAME_OPTIONS);
        setName(ESRI_REALISTIC_SIGNS_AND_SIGNALS_STYLE_NAME_OPTIONS[0]);
        break;

      case "EsriRealisticStreetSceneStyle":
        setNames(ESRI_REALISTIC_STREET_SCENE_STYLE_NAME_OPTIONS);
        setName(ESRI_REALISTIC_STREET_SCENE_STYLE_NAME_OPTIONS[0]);
        break;

      case "EsriRealisticTransportationStyle":
        setNames(ESRI_REALISTIC_TRANSPORTATION_STYLE_NAME_OPTIONS);
        setName(ESRI_REALISTIC_TRANSPORTATION_STYLE_NAME_OPTIONS[0]);
        break;

      case "EsriRealisticTreesStyle":
        setNames(ESRI_REALISTIC_TREES_STYLE_NAME_OPTIONS);
        setName(ESRI_REALISTIC_TREES_STYLE_NAME_OPTIONS[0]);
        break;

      case "EsriRecreationStyle":
        setNames(ESRI_RECREATION_STYLE_NAME_OPTIONS);
        setName(ESRI_RECREATION_STYLE_NAME_OPTIONS[0]);
        break;

      case "EsriThematicShapesStyle":
        setNames(ESRI_THEMATIC_SHAPES_STYLE_NAME_OPTIONS);
        setName(ESRI_THEMATIC_SHAPES_STYLE_NAME_OPTIONS[0]);
        break;

      case "EsriThematicTreesStyle":
        setNames(ESRI_THEMATIC_TREES_STYLE_NAME_OPTIONS);
        setName(ESRI_THEMATIC_TREES_STYLE_NAME_OPTIONS[0]);
        break;

      default:
        setNames(ESRI_ICONS_STYLE_NAME_OPTIONS);
        setName(ESRI_ICONS_STYLE_NAME_OPTIONS[0]);
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
                setName(event.target.value as string);
                handleNameChange(event.target.value as string);
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
              {WEB_STYLE_SYMBOLS_3D_STYLE_OPTIONS.map((option, index) => (
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
              oncalciteInputTextChange={(event) => {
                setStyleUrl(event.target.value);
                getStyleItemDataFromUrl(event.target.value);
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
                          "pointSymbol"
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
