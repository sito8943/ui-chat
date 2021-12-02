import React from "react";

import { useContext } from "../../../context/ContextProvider";
import { colors } from "../../../utils/colors";

const IconDivider = (props) => {
  const { contextState, setContextState } = useContext();
  return (
    <hr
      className={`uk-divider-icon ${contextState.mode === "light" ? "light-icon-divider" : "dark-icon-divider"}`}
      style={{
        margin: "auto",
        width: "90%",
        border: `1px solid ${
          
            ? colors.LightInputBorderColor
            : colors.DarkInputBorderColor
        }`,
      }}
    />
  );
};

export default IconDivider;
