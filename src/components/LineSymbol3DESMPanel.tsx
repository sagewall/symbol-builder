import type LineSymbol3D from "@arcgis/core/symbols/LineSymbol3D.js";
import CodeSnippetPanel from "./CodeSnippetPanel";
import { generateLineSymbol3DESMSnippet } from "./lib/snippets/lineSymbol3D";

interface Props {
  lineSymbol3D: LineSymbol3D;
}

function LineSymbol3DESMPanel({ lineSymbol3D }: Props): React.ReactElement {
  const codeSnippet = generateLineSymbol3DESMSnippet(lineSymbol3D);

  return <CodeSnippetPanel title="ESM / TypeScript" codeSnippet={codeSnippet} />;
}

export default LineSymbol3DESMPanel;
