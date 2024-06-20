import { CalciteButton, CalciteNavigation, CalciteTooltip } from "@esri/calcite-components-react";
import React from "react";
import { headerStyles } from "./lib/styles";

interface Props {
  title: string;
  backButton?: boolean;
}

const Header = ({ title, backButton }: Props) => {
  return (
    <React.Fragment>
      <CalciteNavigation slot="header">
        {backButton && (
          <React.Fragment>
            <CalciteButton
              iconStart="arrow-bold-left"
              id="backButton"
              label="back"
              name="back"
              onClick={() => {
                history.back();
              }}
              slot="content-start"
            ></CalciteButton>
            <CalciteTooltip referenceElement="backButton">Back</CalciteTooltip>
          </React.Fragment>
        )}
        <h3 slot="content-start" style={headerStyles}>
          {title}
        </h3>
      </CalciteNavigation>
    </React.Fragment>
  );
};

export default Header;
