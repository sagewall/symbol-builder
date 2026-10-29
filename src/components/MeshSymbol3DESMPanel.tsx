import type MeshSymbol3D from "@arcgis/core/symbols/MeshSymbol3D.js";
import CodeSnippetPanel from "./CodeSnippetPanel";
import { generateMeshSymbol3DESMSnippet } from "./lib/snippets/meshSymbol3D";

interface Props {
  meshSymbol3D: MeshSymbol3D;
}

function MeshSymbol3DESMPanel({ meshSymbol3D }: Props): React.ReactElement {
  const codeSnippet = generateMeshSymbol3DESMSnippet(meshSymbol3D);

  return <CodeSnippetPanel title="ESM / TypeScript" codeSnippet={codeSnippet} />;
}

export default MeshSymbol3DESMPanel;
