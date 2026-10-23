import type PictureFillSymbol from "@arcgis/core/symbols/PictureFillSymbol.js";
import CodeSnippetPanel from "./CodeSnippetPanel";
import { generatePictureFillSymbolCDNSnippet } from "./lib/snippets/pictureFillSymbol";

interface Props {
  pictureFillSymbol: PictureFillSymbol;
}

function PictureFillSymbolCDNPanel({
  pictureFillSymbol,
}: Props): React.ReactElement {
  const codeSnippet = generatePictureFillSymbolCDNSnippet(pictureFillSymbol);

  return <CodeSnippetPanel title="CDN" codeSnippet={codeSnippet} />;
}

export default PictureFillSymbolCDNPanel;
