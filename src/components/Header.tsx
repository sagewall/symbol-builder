import React from "react";
import { headerStyles } from "./lib/styles";
import { CalciteButton, CalciteTooltip } from "@esri/calcite-components-react";

interface Props {
  title: string;
  backButton?: boolean;
}

const Header = ({ title, backButton }: Props) => {
  return (
    <React.Fragment>
      <header slot="header" style={headerStyles}>
        {backButton && (
          <React.Fragment>
            <CalciteButton
              appearance="outline"
              iconStart="arrow-bold-left"
              id="backButton"
              label="back"
              name="back"
              onClick={() => {
                history.back();
              }}
            ></CalciteButton>
            <CalciteTooltip referenceElement="backButton">Back</CalciteTooltip>
          </React.Fragment>
        )}
        <h3>{title}</h3>
      </header>
    </React.Fragment>
  );
};

export default Header;
