import type LineSymbol3D from "@arcgis/core/symbols/LineSymbol3D.js";
import CodeSnippetPanel from "./CodeSnippetPanel";

interface Props {
  lineSymbol3D: LineSymbol3D;
}

function LineSymbol3DJSONPanel({ lineSymbol3D }: Props): React.ReactElement {
  const codeSnippet = `
import LineSymbol3D from "@arcgis/core/symbols/LineSymbol3D.js";

const lineSymbol3D = LineSymbol3D.fromJSON(
${JSON.stringify(lineSymbol3D.toJSON(), null, 2)});`;

  return <CodeSnippetPanel title="JSON" codeSnippet={codeSnippet} />;
}

export default LineSymbol3DJSONPanel;
