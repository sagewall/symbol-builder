import type PolygonSymbol3D from "@arcgis/core/symbols/PolygonSymbol3D.js";
import CodeSnippetPanel from "./CodeSnippetPanel";

interface Props {
  polygonSymbol3D: PolygonSymbol3D;
}

function PolygonSymbol3DJSONPanel({
  polygonSymbol3D,
}: Props): React.ReactElement {
  const codeSnippet = `
import PolygonSymbol3D from "@arcgis/core/symbols/PolygonSymbol3D.js";

const polygonSymbol3D = PolygonSymbol3D.fromJSON(
${JSON.stringify(polygonSymbol3D.toJSON(), null, 2)});`;

  return <CodeSnippetPanel title="JSON" codeSnippet={codeSnippet} />;
}

export default PolygonSymbol3DJSONPanel;
