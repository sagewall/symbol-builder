import type PictureFillSymbol from "@arcgis/core/symbols/PictureFillSymbol.js";
import CodeSnippetPanel from "./CodeSnippetPanel";
import { generatePictureFillSymbolJSONSnippet } from "./lib/snippets/pictureFillSymbol";

interface Props {
  pictureFillSymbol: PictureFillSymbol;
}

function PictureFillSymbolJSONPanel({
  pictureFillSymbol,
}: Props): React.ReactElement {
  const codeSnippet = generatePictureFillSymbolJSONSnippet(pictureFillSymbol);

  return <CodeSnippetPanel title="JSON" codeSnippet={codeSnippet} />;
}

export default PictureFillSymbolJSONPanel;
