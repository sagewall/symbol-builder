import type PointSymbol3D from "@arcgis/core/symbols/PointSymbol3D.js";
import CodeSnippetPanel from "./CodeSnippetPanel";
import { generatePointSymbol3DCDNSnippet } from "./lib/snippets/pointSymbol3D";

interface Props {
  pointSymbol3D: PointSymbol3D;
}

function PointSymbol3DCDNPanel({ pointSymbol3D }: Props): React.ReactElement {
  const codeSnippet = generatePointSymbol3DCDNSnippet(pointSymbol3D);

  return <CodeSnippetPanel title="CDN" codeSnippet={codeSnippet} />;
}

export default PointSymbol3DCDNPanel;
