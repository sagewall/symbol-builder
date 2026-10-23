import type PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol.js";
import CodeSnippetPanel from "./CodeSnippetPanel";

interface Props {
  pictureMarkerSymbol: PictureMarkerSymbol;
}

function PictureMarkerSymbolESMPanel({
  pictureMarkerSymbol,
}: Props): React.ReactElement {
  const codeSnippet = `
import PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol.js";

const pictureMarkerSymbol = new PictureMarkerSymbol({
  angle: ${pictureMarkerSymbol.angle},
  height: ${pictureMarkerSymbol.height},
  url: ${JSON.stringify(pictureMarkerSymbol.url)},
  width: ${pictureMarkerSymbol.width},
  xoffset: ${pictureMarkerSymbol.xoffset},
  yoffset: ${pictureMarkerSymbol.yoffset}
});`;

  return <CodeSnippetPanel title="ESM / TypeScript" codeSnippet={codeSnippet} />;
}

export default PictureMarkerSymbolESMPanel;
