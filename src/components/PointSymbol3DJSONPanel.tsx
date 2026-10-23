import type PointSymbol3D from "@arcgis/core/symbols/PointSymbol3D.js";
import CodeSnippetPanel from "./CodeSnippetPanel";

interface Props {
  pointSymbol3D: PointSymbol3D;
}

function PointSymbol3DJSONPanel({ pointSymbol3D }: Props): React.ReactElement {
  const codeSnippet = `
import PointSymbol3D from "@arcgis/core/symbols/PointSymbol3D.js";

const pointSymbol3D = PointSymbol3D.fromJSON(
${JSON.stringify(pointSymbol3D.toJSON(), null, 2)});`;

  return <CodeSnippetPanel title="JSON" codeSnippet={codeSnippet} />;
}

export default PointSymbol3DJSONPanel;
