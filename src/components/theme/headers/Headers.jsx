import React from "react";

import { colors } from "../../../utils/colors";
import { useContext } from "../../../context/ContextProvider";

export const Header3 = (props) => {
  const { contextState, setContextState } = useContext();
  return (
    <h3
      className="uk-card-title"
      style={{
        color:
          contextState.mode === "light"
            ? colors.LightFontColors
            : colors.DarkFontColors,
        margin: props.margin === undefined ? "default" : props.margin,
      }}
    >
      {props.title}
    </h3>
  );
};
