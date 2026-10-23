import type SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol.js";
import CodeSnippetPanel from "./CodeSnippetPanel";

interface Props {
  simpleLineSymbol: SimpleLineSymbol;
}

function SimpleLineSymbolESMPanel({
  simpleLineSymbol,
}: Props): React.ReactElement {
  let codeSnippet = ``;

  if (simpleLineSymbol.marker) {
    codeSnippet = `
import Color from "@arcgis/core/Color.js";
import LineSymbolMarker from "@arcgis/core/symbols/LineSymbolMarker.js";
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol.js";

const simpleLineSymbol = new SimpleLineSymbol({
  cap: "${simpleLineSymbol.cap}",
  color: new Color([${simpleLineSymbol.color?.toRgba().toString()}]),
  join: "${simpleLineSymbol.join}",
  marker: new LineSymbolMarker({
    color: new Color([${simpleLineSymbol.marker.color.toRgba().toString()}]),
    placement: "${simpleLineSymbol.marker.placement}",
    style: "${simpleLineSymbol.marker.style}",
  }),
  miterLimit: ${simpleLineSymbol.miterLimit},
  style: "${simpleLineSymbol.style}",
  width: ${simpleLineSymbol.width}
});`;
  } else {
    codeSnippet = `
import Color from "@arcgis/core/Color.js";
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol.js";

const simpleLineSymbol = new SimpleLineSymbol({
  cap: "${simpleLineSymbol.cap}",
  color: new Color([${simpleLineSymbol.color?.toRgba().toString()}]),
  join: "${simpleLineSymbol.join}",
  miterLimit: ${simpleLineSymbol.miterLimit},
  style: "${simpleLineSymbol.style}",
  width: ${simpleLineSymbol.width}
});`;
  }

  return (
    <CodeSnippetPanel title="ESM / TypeScript" codeSnippet={codeSnippet} />
  );
}

export default SimpleLineSymbolESMPanel;
