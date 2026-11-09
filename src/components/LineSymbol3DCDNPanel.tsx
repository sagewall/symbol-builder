import type LineSymbol3D from "@arcgis/core/symbols/LineSymbol3D.js";
import CodeSnippetPanel from "./CodeSnippetPanel";
import { generateLineSymbol3DCDNSnippet } from "./lib/snippets/lineSymbol3D";

interface Props {
  lineSymbol3D: LineSymbol3D;
}

function LineSymbol3DCDNPanel({ lineSymbol3D }: Props): React.ReactElement {
  const codeSnippet = generateLineSymbol3DCDNSnippet(lineSymbol3D);

  return <CodeSnippetPanel title="CDN" codeSnippet={codeSnippet} />;
}

export default LineSymbol3DCDNPanel;
