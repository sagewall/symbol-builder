import type PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol.js";
import CodeSnippetPanel from "./CodeSnippetPanel";
import { generatePictureMarkerSymbolJSONSnippet } from "./lib/snippets/pictureMarkerSymbol";

interface Props {
  pictureMarkerSymbol: PictureMarkerSymbol;
}

function PictureMarkerSymbolJSONPanel({
  pictureMarkerSymbol,
}: Props): React.ReactElement {
  const codeSnippet = generatePictureMarkerSymbolJSONSnippet(pictureMarkerSymbol);

  return <CodeSnippetPanel title="JSON" codeSnippet={codeSnippet} />;
}

export default PictureMarkerSymbolJSONPanel;
