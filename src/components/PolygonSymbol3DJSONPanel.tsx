import type PolygonSymbol3D from "@arcgis/core/symbols/PolygonSymbol3D.js";
import CodeSnippetPanel from "./CodeSnippetPanel";
import { generatePolygonSymbol3DJSONSnippet } from "./lib/snippets/polygonSymbol3D";

interface Props {
  polygonSymbol3D: PolygonSymbol3D;
}

function PolygonSymbol3DJSONPanel({
  polygonSymbol3D,
}: Props): React.ReactElement {
  const codeSnippet = generatePolygonSymbol3DJSONSnippet(polygonSymbol3D);

  return <CodeSnippetPanel title="JSON" codeSnippet={codeSnippet} />;
}

export default PolygonSymbol3DJSONPanel;
