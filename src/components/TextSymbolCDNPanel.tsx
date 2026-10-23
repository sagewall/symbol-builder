import type TextSymbol from "@arcgis/core/symbols/TextSymbol.js";
import CodeSnippetPanel from "./CodeSnippetPanel";

interface Props {
  textSymbol: TextSymbol;
}

function TextSymbolCDNPanel({ textSymbol }: Props): React.ReactElement {
  const codeSnippet = `
const TextSymbol = await $arcgis.import("@arcgis/core/symbols/TextSymbol.js");

const textSymbol = new TextSymbol({
  angle: ${textSymbol.angle},
  backgroundColor: [${textSymbol.backgroundColor?.toRgba().toString()}],
  borderLineColor: [${textSymbol.borderLineColor?.toRgba().toString()}],
  borderLineSize: ${textSymbol.borderLineSize},
  color: [${textSymbol.color?.toRgba().toString()}],
  font: {
    decoration: "${textSymbol.font.decoration}",
    family: ${JSON.stringify(textSymbol.font.family)},
    size: ${textSymbol.font.size},
    style: "${textSymbol.font.style}",
    weight: "${textSymbol.font.weight}"
  },
  haloColor: [${textSymbol.haloColor?.toRgba().toString()}],
  haloSize: ${textSymbol.haloSize},
  horizontalAlignment: "${textSymbol.horizontalAlignment}",
  kerning: ${textSymbol.kerning},
  lineWidth: ${textSymbol.lineWidth},
  rotated: ${textSymbol.rotated},
  text: ${JSON.stringify(textSymbol.text)},
  verticalAlignment: "${textSymbol.verticalAlignment}",
  xoffset: ${textSymbol.xoffset},
  yoffset: ${textSymbol.yoffset}
});`;

  return <CodeSnippetPanel title="CDN" codeSnippet={codeSnippet} />;
}

export default TextSymbolCDNPanel;
