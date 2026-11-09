import type PolygonSymbol3D from "@arcgis/core/symbols/PolygonSymbol3D.js";
import CodeSnippetPanel from "./CodeSnippetPanel";
import { generatePolygonSymbol3DESMSnippet } from "./lib/snippets/polygonSymbol3D";

interface Props {
  polygonSymbol3D: PolygonSymbol3D;
}

function PolygonSymbol3DESMPanel({
  polygonSymbol3D,
}: Props): React.ReactElement {
  const codeSnippet = generatePolygonSymbol3DESMSnippet(polygonSymbol3D);

  return <CodeSnippetPanel title="ESM / TypeScript" codeSnippet={codeSnippet} />;
}

export default PolygonSymbol3DESMPanel;
