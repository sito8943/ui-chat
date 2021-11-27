import React from "react";

import { useContext } from "../../../context/ContextProvider";
import { colors } from "../../../utils/colors";

const Divider = (props) => {
  const { contextState, setContextState } = useContext();
  return (
    <hr
      style={{
        margin: "auto",
        width: "90%",
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
