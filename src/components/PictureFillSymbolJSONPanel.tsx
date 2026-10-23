import type PictureFillSymbol from "@arcgis/core/symbols/PictureFillSymbol.js";
import CodeSnippetPanel from "./CodeSnippetPanel";

interface Props {
  pictureFillSymbol: PictureFillSymbol;
}

function PictureFillSymbolJSONPanel({
  pictureFillSymbol,
}: Props): React.ReactElement {
  const codeSnippet = `
import PictureFillSymbol from "@arcgis/core/symbols/PictureFillSymbol.js";

const pictureFillSymbol = PictureFillSymbol.fromJSON(
${JSON.stringify(pictureFillSymbol.toJSON(), null, 2)});`;

  return <CodeSnippetPanel title="JSON" codeSnippet={codeSnippet} />;
}

export default PictureFillSymbolJSONPanel;
