import type LineSymbol3D from "@arcgis/core/symbols/LineSymbol3D.js";
import CodeSnippetPanel from "./CodeSnippetPanel";
import { generateLineSymbol3DJSONSnippet } from "./lib/snippets/lineSymbol3D";

interface Props {
  lineSymbol3D: LineSymbol3D;
}

function LineSymbol3DJSONPanel({ lineSymbol3D }: Props): React.ReactElement {
  const codeSnippet = generateLineSymbol3DJSONSnippet(lineSymbol3D);

  return <CodeSnippetPanel title="JSON" codeSnippet={codeSnippet} />;
}

export default LineSymbol3DJSONPanel;
