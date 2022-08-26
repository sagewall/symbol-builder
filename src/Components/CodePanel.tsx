import { CalciteAction, CalcitePanel } from "@esri/calcite-components-react";
import "@esri/calcite-components/dist/components/calcite-action";
import "@esri/calcite-components/dist/components/calcite-panel";
import { useRef } from "react";

function CodePanel({ header }: PanelProps) {
  const codeOutputParagraph = useRef(null);

  function handleClick() {
    if (codeOutputParagraph.current) {
      navigator.clipboard.writeText(
        (codeOutputParagraph.current as HTMLPreElement).innerText
      );
    }
  }
  return (
    <CalcitePanel>
      <div slot="header-content">{header}</div>
      <CalciteAction
        icon="copy-to-clipboard"
        label="Copy code to clipboard"
        slot="header-actions-end"
        text="Copy code to clipboard"
        textEnabled
        onClick={() => handleClick()}
      ></CalciteAction>
      <pre ref={codeOutputParagraph} className="code">
        Hello World!
      </pre>
    </CalcitePanel>
  );
}

export default CodePanel;
