import type PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol.js";
import CodeSnippetPanel from "./CodeSnippetPanel";

interface Props {
  pictureMarkerSymbol: PictureMarkerSymbol;
}

function PictureMarkerSymbolCDNPanel({
  pictureMarkerSymbol,
}: Props): React.ReactElement {
  const codeSnippet = `
const PictureMarkerSymbol = await $arcgis.import("@arcgis/core/symbols/PictureMarkerSymbol.js");

const pictureMarkerSymbol = new PictureMarkerSymbol({
  angle: ${pictureMarkerSymbol.angle},
  height: ${pictureMarkerSymbol.height},
  url: ${JSON.stringify(pictureMarkerSymbol.url)},
  width: ${pictureMarkerSymbol.width},
  xoffset: ${pictureMarkerSymbol.xoffset},
  yoffset: ${pictureMarkerSymbol.yoffset}
});`;

  return <CodeSnippetPanel title="CDN" codeSnippet={codeSnippet} />;
}

export default PictureMarkerSymbolCDNPanel;
