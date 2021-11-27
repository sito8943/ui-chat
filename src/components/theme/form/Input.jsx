import React from "react";

import { colors } from "../../../utils/colors";
import { useContext } from "../../../context/ContextProvider";

export const Input = (props) => {
  const { contextState, setContextState } = useContext();
  return (
    <input
      className="uk-input uk-form-width-small"
      type={props.type}
      id={props.id}
      value={props.value}
      placeholder={props.placeholder}
      onChange={props.onChange}
      style={{
        border: `1px solid ${
          contextState.mode === "light"
            ? colors.LightInputBorderColor
            : colors.DarkInputBorderColor
        }`,
        color:
          contextState.mode === "light"
            ? colors.LightFontColors
            : colors.DarkFontColors,
      }}
    ></input>
  );
};

export default Input;
