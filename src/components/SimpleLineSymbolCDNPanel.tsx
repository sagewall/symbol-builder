import type SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol.js";
import CodeSnippetPanel from "./CodeSnippetPanel";

interface Props {
  simpleLineSymbol: SimpleLineSymbol;
}

function SimpleLineSymbolCDNPanel({
  simpleLineSymbol,
}: Props): React.ReactElement {
  let codeSnippet = ``;

  if (simpleLineSymbol.marker) {
    codeSnippet = `
const SimpleLineSymbol = await $arcgis.import("@arcgis/core/symbols/SimpleLineSymbol.js");

const simpleLineSymbol = new SimpleLineSymbol({
  cap: "${simpleLineSymbol.cap}",
  color: [${simpleLineSymbol.color?.toRgba().toString()}],
  join: "${simpleLineSymbol.join}",
  marker: {
    color: [${simpleLineSymbol.marker.color.toRgba().toString()}],
    placement: "${simpleLineSymbol.marker.placement}",
    style: "${simpleLineSymbol.marker.style}",
  },
  miterLimit: ${simpleLineSymbol.miterLimit},
  style: "${simpleLineSymbol.style}",
  width: ${simpleLineSymbol.width}
});`;
  } else {
    codeSnippet = `
const SimpleLineSymbol = await $arcgis.import("@arcgis/core/symbols/SimpleLineSymbol.js");

const simpleLineSymbol = new SimpleLineSymbol({
  cap: "${simpleLineSymbol.cap}",
  color: [${simpleLineSymbol.color?.toRgba().toString()}],
  join: "${simpleLineSymbol.join}",
  miterLimit: ${simpleLineSymbol.miterLimit},
  style: "${simpleLineSymbol.style}",
  width: ${simpleLineSymbol.width}
});`;
  }

  return <CodeSnippetPanel title="CDN" codeSnippet={codeSnippet} />;
}

export default SimpleLineSymbolCDNPanel;
