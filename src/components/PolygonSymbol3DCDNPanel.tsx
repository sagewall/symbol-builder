import type PolygonSymbol3D from "@arcgis/core/symbols/PolygonSymbol3D.js";
import CodeSnippetPanel from "./CodeSnippetPanel";
import { generatePolygonSymbol3DCDNSnippet } from "./lib/snippets/polygonSymbol3D";

interface Props {
  polygonSymbol3D: PolygonSymbol3D;
}

function PolygonSymbol3DCDNPanel({
  polygonSymbol3D,
}: Props): React.ReactElement {
  const codeSnippet = generatePolygonSymbol3DCDNSnippet(polygonSymbol3D);

  return <CodeSnippetPanel title="CDN" codeSnippet={codeSnippet} />;
}

export default PolygonSymbol3DCDNPanel;
