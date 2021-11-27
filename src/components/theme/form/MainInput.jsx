import React from "react";

import { colors } from "../../../utils/colors";
import { useContext } from "../../../context/ContextProvider";

export const MainInput = (props) => {
  const { contextState, setContextState } = useContext();

  return (
    <input
      id={props.id}
      className="uk-input div-input"
      type={props.type}
      onChange={props.onChange}
      placeholder={props.placeholder}
      autoComplete={props.autoComplete}
      onFocus={props.onFocus}
      onBlur={props.onBlur}
      autoFocus={props.autoFocus}
      style={{
        border: "none",
        height: "50px",
        color:
          contextState.mode === "light"
            ? colors.LightFontColors
            : colors.DarkFontColors,
      }}
    />
  );
};

export default MainInput;
