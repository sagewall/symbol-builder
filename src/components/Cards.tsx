import "@esri/calcite-components/components/calcite-card";
import "@esri/calcite-components/components/calcite-card-group";
import "@esri/calcite-components/components/calcite-chip";
import "@esri/calcite-components/components/calcite-shell";
import "@esri/calcite-components/components/calcite-tooltip";
import { symbols } from "./lib/constants";
import { cardFooterStyles, cardStyles, cardsStyles, shellStyles } from "./lib/styles";

const cards = symbols.map((symbol) => (
  <calcite-card label={symbol.name} style={cardStyles} key={symbol.name}>
    <span slot="heading">{symbol.name}</span>
    <span slot="description">{symbol.description}</span>
    <div slot="footer-start" style={cardFooterStyles}>
      {symbol.symbolLayers && (
        <>
          <calcite-chip
            id={`${symbol.name}-symbol-layers-chip`}
            label={symbol.name}
            value={symbol.symbolLayers}
            icon="layers"
            scale="s"></calcite-chip>
          <calcite-tooltip reference-element={`${symbol.name}-symbol-layers-chip`}>
            <span>Symbol Layers</span>
          </calcite-tooltip>
        </>
      )}

      {symbol.point && (
        <>
          <calcite-chip
            id={`${symbol.name}-point-chip`}
            label={symbol.name}
            value={symbol.point}
            icon="point"
            scale="s"></calcite-chip>
          <calcite-tooltip reference-element={`${symbol.name}-point-chip`}>
            <span>Point</span>
          </calcite-tooltip>
        </>
      )}

      {symbol.line && (
        <>
          <calcite-chip
            id={`${symbol.name}-line-chip`}
            label={symbol.name}
            value={symbol.line}
            icon="line"
            scale="s"></calcite-chip>
          <calcite-tooltip reference-element={`${symbol.name}-line-chip`}>
            <span>Line</span>
          </calcite-tooltip>
        </>
      )}

      {symbol.polygon && (
        <>
          <calcite-chip
            id={`${symbol.name}-polygon-chip`}
            label={symbol.name}
            value={symbol.polygon}
            icon="polygon"
            scale="s"></calcite-chip>
          <calcite-tooltip reference-element={`${symbol.name}-polygon-chip`}>
            <span>Polygon</span>
          </calcite-tooltip>
        </>
      )}

      {symbol.mesh && (
        <>
          <calcite-chip
            id={`${symbol.name}-mesh-chip`}
            label={symbol.name}
            value={symbol.mesh}
            icon="cube"
            scale="s"></calcite-chip>
          <calcite-tooltip reference-element={`${symbol.name}-mesh-chip`}>
            <span>Mesh</span>
          </calcite-tooltip>
        </>
      )}

      {symbol.map && (
        <>
          <calcite-chip
            id={`${symbol.name}-map-chip`}
            label={symbol.name}
            value="2D"
            icon="map"
            scale="s"></calcite-chip>
          <calcite-tooltip reference-element={`${symbol.name}-map-chip`}>
            <span>2D Map View</span>
          </calcite-tooltip>
        </>
      )}

      {symbol.scene && (
        <>
          <calcite-chip
            id={`${symbol.name}-scene-chip`}
            label={symbol.name}
            value="3D"
            icon="globe"
            scale="s"></calcite-chip>
          <calcite-tooltip reference-element={`${symbol.name}-scene-chip`}>
            <span>3D Scene View</span>
          </calcite-tooltip>
        </>
      )}
    </div>
    <div slot="footer-end">
      <a href={symbol.link}>{symbol.name} Builder</a>
    </div>
  </calcite-card>
));

function Cards(): React.ReactElement {
  return (
    <>
      <calcite-shell style={shellStyles}>
        <calcite-card-group label="Symbols" style={cardsStyles}>
          {cards}
        </calcite-card-group>
      </calcite-shell>
    </>
  );
}

export default Cards;
