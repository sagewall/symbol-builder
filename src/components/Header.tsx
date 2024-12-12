import React from "react";
import { headerStyles } from "./lib/styles";

interface Props {
  title: string;
  backButton?: boolean;
}

const Header = ({ title, backButton }: Props) => {
  return (
    <React.Fragment>
      <calcite-navigation slot="header">
        {backButton && (
          <React.Fragment>
            <calcite-button
              iconStart="arrow-bold-left"
              id="backButton"
              label="back"
              name="back"
              onClick={() => {
                history.back();
              }}
              slot="content-start"
            ></calcite-button>
            <calcite-tooltip referenceElement="backButton">Back</calcite-tooltip>
          </React.Fragment>
        )}
        <h3 slot="content-start" style={headerStyles}>
          {title}
        </h3>
      </calcite-navigation>
    </React.Fragment>
  );
};

export default Header;
