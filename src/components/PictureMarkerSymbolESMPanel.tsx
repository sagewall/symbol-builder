import type PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol.js";
import CodeSnippetPanel from "./CodeSnippetPanel";
import { generatePictureMarkerSymbolESMSnippet } from "./lib/snippets/pictureMarkerSymbol";

interface Props {
  pictureMarkerSymbol: PictureMarkerSymbol;
}

function PictureMarkerSymbolESMPanel({
  pictureMarkerSymbol,
}: Props): React.ReactElement {
  const codeSnippet = generatePictureMarkerSymbolESMSnippet(pictureMarkerSymbol);

  return <CodeSnippetPanel title="ESM / TypeScript" codeSnippet={codeSnippet} />;
}

export default PictureMarkerSymbolESMPanel;
