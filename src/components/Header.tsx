import "@esri/calcite-components/components/calcite-button";
import "@esri/calcite-components/components/calcite-navigation";
import "@esri/calcite-components/components/calcite-tooltip";
import { headerStyles } from "../lib/styles";

interface Props {
  title: string;
  backButton?: boolean;
}

function Header({ title, backButton }: Props) {
  return (
    <>
      <calcite-navigation slot="header">
        {backButton && (
          <>
            <calcite-button
              icon-end="arrow-bold-left"
              id="backButton"
              label="back"
              name="back"
              onClick={() => {
                history.back();
              }}
              slot="content-start"
            ></calcite-button>
            <calcite-tooltip referenceElement="backButton">
              Back
            </calcite-tooltip>
          </>
        )}
        <h3 slot="content-start" style={headerStyles}>
          {title}
        </h3>
      </calcite-navigation>
    </>
  );
}

export default Header;
