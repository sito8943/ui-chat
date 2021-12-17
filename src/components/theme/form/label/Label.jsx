import React from "react";

import { colors } from "../../../../utils/colors";
import { useContext } from "../../../../context/ContextProvider";

import "./style.scss";

export const Label = (props) => {
  const { contextState, setContextState } = useContext();
  return (
    <legend
      onClick={props.onClick}
      style={{
        color:
          contextState.mode === "light"
            ? colors.LightFontColors
            : colors.DarkFontColors,
      }}
      className="uk-legend"
    >
      {props.children}
    </legend>
  );
};
