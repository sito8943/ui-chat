import React from "react";

import { colors } from "../../utils/colors";
import { useContext } from "../../context/ContextProvider";

import { Link as RouterLink } from "react-router-dom";

export const Paragraph = (props) => {
  const { contextState, setContextState } = useContext();
  return (
    <p
      style={{
        color:
          contextState.mode === "light"
            ? colors.LightFontColors
            : colors.DarkFontColors,
      }}
    >
      {props.paragraph}
    </p>
  );
};

export const Link = (props) => {};

export const LinkButton = (props) => {
  const { contextState, setContextState } = useContext();
  return (
    <div
      className="uk-button uk-button-default uk-link-muted return-button "
      style={{
        color:
          contextState.mode === "light"
            ? colors.LightFontColors
            : colors.DarkFontColors,
      }}
      
    >
      {props.children}
    </div>
  );
};
