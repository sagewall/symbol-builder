import type MeshSymbol3D from "@arcgis/core/symbols/MeshSymbol3D.js";
import CodeSnippetPanel from "./CodeSnippetPanel";
import { generateMeshSymbol3DJSONSnippet } from "./lib/snippets/meshSymbol3D";

interface Props {
  meshSymbol3D: MeshSymbol3D;
}

function MeshSymbol3DJSONPanel({ meshSymbol3D }: Props): React.ReactElement {
  const codeSnippet = generateMeshSymbol3DJSONSnippet(meshSymbol3D);

  return <CodeSnippetPanel title="JSON" codeSnippet={codeSnippet} />;
}

export default MeshSymbol3DJSONPanel;
