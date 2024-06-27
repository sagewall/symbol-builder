import {
  CalciteCard,
  CalciteChip,
  CalciteShell,
  CalciteTooltip
} from "@esri/calcite-components-react";
import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { SYMBOLS } from "../components/lib/constants";
import { cardContainerStyles, cardFooterStyles, cardStyles } from "../components/lib/styles";

const cards = SYMBOLS.map((symbol) => {
  return (
    <CalciteCard style={cardStyles} key={symbol.name}>
      <span slot="title">{symbol.name}</span>
      <span slot="subtitle">{symbol.description}</span>
      <div slot="footer-start" style={cardFooterStyles}>
        {symbol.symbolLayers && (
          <React.Fragment>
            <CalciteChip
              id={`${symbol.name}-symbol-layers-chip`}
              value={symbol.symbolLayers}
              icon="layers"
              scale="s"
            />
            <CalciteTooltip reference-element={`${symbol.name}-symbol-layers-chip`}>
              <span>Symbol Layers</span>
            </CalciteTooltip>
          </React.Fragment>
        )}

        {symbol.point && (
          <React.Fragment>
            <CalciteChip
              id={`${symbol.name}-point-chip`}
              value={symbol.point}
              icon="point"
              scale="s"
            />
            <CalciteTooltip reference-element={`${symbol.name}-point-chip`}>
              <span>Point</span>
            </CalciteTooltip>
          </React.Fragment>
        )}

        {symbol.line && (
          <React.Fragment>
            <CalciteChip
              id={`${symbol.name}-line-chip`}
              value={symbol.line}
              icon="line"
              scale="s"
            />
            <CalciteTooltip reference-element={`${symbol.name}-line-chip`}>
              <span>Line</span>
            </CalciteTooltip>
          </React.Fragment>
        )}

        {symbol.polygon && (
          <React.Fragment>
            <CalciteChip
              id={`${symbol.name}-polygon-chip`}
              value={symbol.polygon}
              icon="polygon"
              scale="s"
            />
            <CalciteTooltip reference-element={`${symbol.name}-polygon-chip`}>
              <span>Polygon</span>
            </CalciteTooltip>
          </React.Fragment>
        )}

        {symbol.mesh && (
          <React.Fragment>
            <CalciteChip
              id={`${symbol.name}-mesh-chip`}
              value={symbol.mesh}
              icon="cube"
              scale="s"
            />
            <CalciteTooltip reference-element={`${symbol.name}-mesh-chip`}>
              <span>Mesh</span>
            </CalciteTooltip>
          </React.Fragment>
        )}

        {symbol.mapView && (
          <React.Fragment>
            <CalciteChip id={`${symbol.name}-map-chip`} value="2D" icon="map" scale="s" />
            <CalciteTooltip reference-element={`${symbol.name}-map-chip`}>
              <span>2D Map View</span>
            </CalciteTooltip>
          </React.Fragment>
        )}

        {symbol.sceneView && (
          <React.Fragment>
            <CalciteChip id={`${symbol.name}-scene-chip`} value="3D" icon="globe" scale="s" />
            <CalciteTooltip reference-element={`${symbol.name}-scene-chip`}>
              <span>3D Scene View</span>
            </CalciteTooltip>
          </React.Fragment>
        )}
      </div>
      <div slot="footer-end">
        <Link to={symbol.link}>{symbol.name} Builder</Link>
      </div>
    </CalciteCard>
  );
});

const IndexPage = () => {
  return (
    <React.Fragment>
      <CalciteShell>
        <Header title="Symbol Builder Gallery"></Header>
        <div id="cardContainer" style={cardContainerStyles}>
          {cards}
        </div>
      </CalciteShell>
    </React.Fragment>
  );
};

export default IndexPage;
