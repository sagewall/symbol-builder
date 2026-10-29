import type MeshSymbol3D from "@arcgis/core/symbols/MeshSymbol3D.js";
import CodeSnippetPanel from "./CodeSnippetPanel";
import { generateMeshSymbol3DCDNSnippet } from "./lib/snippets/meshSymbol3D";

interface Props {
  meshSymbol3D: MeshSymbol3D;
}

function MeshSymbol3DCDNPanel({ meshSymbol3D }: Props): React.ReactElement {
  const codeSnippet = generateMeshSymbol3DCDNSnippet(meshSymbol3D);

  return <CodeSnippetPanel title="CDN" codeSnippet={codeSnippet} />;
}

export default MeshSymbol3DCDNPanel;
