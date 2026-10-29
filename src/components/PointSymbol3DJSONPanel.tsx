import type PointSymbol3D from "@arcgis/core/symbols/PointSymbol3D.js";
import CodeSnippetPanel from "./CodeSnippetPanel";
import { generatePointSymbol3DJSONSnippet } from "./lib/snippets/pointSymbol3D";

interface Props {
  pointSymbol3D: PointSymbol3D;
}

function PointSymbol3DJSONPanel({ pointSymbol3D }: Props): React.ReactElement {
  const codeSnippet = generatePointSymbol3DJSONSnippet(pointSymbol3D);

  return <CodeSnippetPanel title="JSON" codeSnippet={codeSnippet} />;
}

export default PointSymbol3DJSONPanel;
