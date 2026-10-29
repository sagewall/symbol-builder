import type PointSymbol3D from "@arcgis/core/symbols/PointSymbol3D.js";
import CodeSnippetPanel from "./CodeSnippetPanel";
import { generatePointSymbol3DESMSnippet } from "./lib/snippets/pointSymbol3D";

interface Props {
  pointSymbol3D: PointSymbol3D;
}

function PointSymbol3DESMPanel({ pointSymbol3D }: Props): React.ReactElement {
  const codeSnippet = generatePointSymbol3DESMSnippet(pointSymbol3D);

  return <CodeSnippetPanel title="ESM / TypeScript" codeSnippet={codeSnippet} />;
}

export default PointSymbol3DESMPanel;
