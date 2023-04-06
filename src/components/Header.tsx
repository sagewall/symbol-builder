import React from "react";
import { headerStyles } from "./lib/styles";
import { CalciteButton, CalciteTooltip } from "@esri/calcite-components-react";

interface Props {
  title: string;
}

const Header = ({ title }: Props) => {
  return (
    <React.Fragment>
      <header slot="header" style={headerStyles}>
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
        <CalciteTooltip label="back" referenceElement="backButton">
          Back
        </CalciteTooltip>
        <h3>{title}</h3>
      </header>
    </React.Fragment>
  );
};

export default Header;
