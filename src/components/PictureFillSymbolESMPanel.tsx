import type PictureFillSymbol from "@arcgis/core/symbols/PictureFillSymbol.js";
import CodeSnippetPanel from "./CodeSnippetPanel";
import { generatePictureFillSymbolESMSnippet } from "./lib/snippets/pictureFillSymbol";

interface Props {
  pictureFillSymbol: PictureFillSymbol;
}

function PictureFillSymbolESMPanel({
  pictureFillSymbol,
}: Props): React.ReactElement {
  const codeSnippet = generatePictureFillSymbolESMSnippet(pictureFillSymbol);

  return <CodeSnippetPanel title="ESM / TypeScript" codeSnippet={codeSnippet} />;
}

export default PictureFillSymbolESMPanel;
