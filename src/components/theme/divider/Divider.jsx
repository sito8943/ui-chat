import React from "react";

import { useContext } from "../../../context/ContextProvider";
import { colors } from "../../../utils/colors";

import "./style.scss";

const Divider = (props) => {
  const { contextState, setContextState } = useContext();
  return (
    <hr
      style={{
        margin: props.margin ? props.margin : "auto",
        width: props.width ? props.width : "90%",
        border: `1px solid ${
          contextState.mode === "light"
            ? colors.LightInputBorderColor
            : colors.DarkInputBorderColor
        }`,
      }}
    />
  );
};
export default Divider;
