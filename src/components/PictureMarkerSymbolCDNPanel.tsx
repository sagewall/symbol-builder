import type PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol.js";
import CodeSnippetPanel from "./CodeSnippetPanel";
import { generatePictureMarkerSymbolCDNSnippet } from "./lib/snippets/pictureMarkerSymbol";

interface Props {
  pictureMarkerSymbol: PictureMarkerSymbol;
}

function PictureMarkerSymbolCDNPanel({
  pictureMarkerSymbol,
}: Props): React.ReactElement {
  const codeSnippet = generatePictureMarkerSymbolCDNSnippet(pictureMarkerSymbol);

  return <CodeSnippetPanel title="CDN" codeSnippet={codeSnippet} />;
}

export default PictureMarkerSymbolCDNPanel;
