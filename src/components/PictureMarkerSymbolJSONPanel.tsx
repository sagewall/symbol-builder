import type PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol.js";
import CodeSnippetPanel from "./CodeSnippetPanel";

interface Props {
  pictureMarkerSymbol: PictureMarkerSymbol;
}

function PictureMarkerSymbolJSONPanel({
  pictureMarkerSymbol,
}: Props): React.ReactElement {
  const codeSnippet = `
import PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol.js";

const pictureMarkerSymbol = PictureMarkerSymbol.fromJSON(
${JSON.stringify(pictureMarkerSymbol.toJSON(), null, 2)});`;

  return <CodeSnippetPanel title="JSON" codeSnippet={codeSnippet} />;
}

export default PictureMarkerSymbolJSONPanel;
