import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { SYMBOLS } from "../components/lib/constants";
import { cardFooterStyles, cardStyles } from "../components/lib/styles";

const cards = SYMBOLS.map((symbol) => {
  return (
    <calcite-card label={symbol.name} style={cardStyles} key={symbol.name}>
      <span slot="heading">{symbol.name}</span>
      <span slot="description">{symbol.description}</span>
      <div slot="footer-start" style={cardFooterStyles}>
        {symbol.symbolLayers && (
          <React.Fragment>
            <calcite-chip
              id={`${symbol.name}-symbol-layers-chip`}
              label={symbol.name}
              value={symbol.symbolLayers}
              icon="layers"
              scale="s"
            ></calcite-chip>
            <calcite-tooltip reference-element={`${symbol.name}-symbol-layers-chip`}>
              <span>Symbol Layers</span>
            </calcite-tooltip>
          </React.Fragment>
        )}

        {symbol.point && (
          <React.Fragment>
            <calcite-chip
              id={`${symbol.name}-point-chip`}
              label={symbol.name}
              value={symbol.point}
              icon="point"
              scale="s"
            ></calcite-chip>
            <calcite-tooltip reference-element={`${symbol.name}-point-chip`}>
              <span>Point</span>
            </calcite-tooltip>
          </React.Fragment>
        )}

        {symbol.line && (
          <React.Fragment>
            <calcite-chip
              id={`${symbol.name}-line-chip`}
              label={symbol.name}
              value={symbol.line}
              icon="line"
              scale="s"
            ></calcite-chip>
            <calcite-tooltip reference-element={`${symbol.name}-line-chip`}>
              <span>Line</span>
            </calcite-tooltip>
          </React.Fragment>
        )}

        {symbol.polygon && (
          <React.Fragment>
            <calcite-chip
              id={`${symbol.name}-polygon-chip`}
              label={symbol.name}
              value={symbol.polygon}
              icon="polygon"
              scale="s"
            ></calcite-chip>
            <calcite-tooltip reference-element={`${symbol.name}-polygon-chip`}>
              <span>Polygon</span>
            </calcite-tooltip>
          </React.Fragment>
        )}

        {symbol.mesh && (
          <React.Fragment>
            <calcite-chip
              id={`${symbol.name}-mesh-chip`}
              label={symbol.name}
              value={symbol.mesh}
              icon="cube"
              scale="s"
            ></calcite-chip>
            <calcite-tooltip reference-element={`${symbol.name}-mesh-chip`}>
              <span>Mesh</span>
            </calcite-tooltip>
          </React.Fragment>
        )}

        {symbol.map && (
          <React.Fragment>
            <calcite-chip
              id={`${symbol.name}-map-chip`}
              label={symbol.name}
              value="2D"
              icon="map"
              scale="s"
            ></calcite-chip>
            <calcite-tooltip reference-element={`${symbol.name}-map-chip`}>
              <span>2D Map View</span>
            </calcite-tooltip>
          </React.Fragment>
        )}

        {symbol.scene && (
          <React.Fragment>
            <calcite-chip
              id={`${symbol.name}-scene-chip`}
              label={symbol.name}
              value="3D"
              icon="globe"
              scale="s"
            ></calcite-chip>
            <calcite-tooltip reference-element={`${symbol.name}-scene-chip`}>
              <span>3D Scene View</span>
            </calcite-tooltip>
          </React.Fragment>
        )}
      </div>
      <div slot="footer-end">
        <Link to={symbol.link}>{symbol.name} Builder</Link>
      </div>
    </calcite-card>
  );
});

const IndexPage = () => {
  return (
    <React.Fragment>
      <calcite-shell>
        <Header title="Symbol Builder Gallery"></Header>
        <calcite-card-group label="Symbols">{cards}</calcite-card-group>
      </calcite-shell>
    </React.Fragment>
  );
};

export default IndexPage;
