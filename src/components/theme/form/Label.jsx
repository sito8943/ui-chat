import React from "react";

import { colors } from "../../../utils/colors";
import { useContext } from "../../../context/ContextProvider";

export const Label = (props) => {
    const { contextState, setContextState } = useContext();
    return (
      <legend
        style={{
          color:
            contextState.mode === "light"
              ? colors.LightFontColors
              : colors.DarkFontColors,
        }}
        className="uk-legend"
      >
        {props.text}
      </legend>
    );
  };