import type MeshSymbol3D from "@arcgis/core/symbols/MeshSymbol3D.js";
import CodeSnippetPanel from "./CodeSnippetPanel";

interface Props {
  meshSymbol3D: MeshSymbol3D;
}

function MeshSymbol3DJSONPanel({ meshSymbol3D }: Props): React.ReactElement {
  const codeSnippet = `
import MeshSymbol3D from "@arcgis/core/symbols/MeshSymbol3D.js";

const meshSymbol3D = MeshSymbol3D.fromJSON(
${JSON.stringify(meshSymbol3D.toJSON(), null, 2)});`;

  return <CodeSnippetPanel title="JSON" codeSnippet={codeSnippet} />;
}

export default MeshSymbol3DJSONPanel;
