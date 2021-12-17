import React, { useState, useEffect } from "react";

import { useContext } from "../../../context/ContextProvider";
import { colors } from "../../../utils/colors";

const SideBar = (props) => {
  const { contextState, setContextState } = useContext();

  return (
    <div
      style={{
        padding: "0",
        backgroundColor:
          contextState.mode === "light"
            ? colors.LightBarBackground
            : colors.DarkBarBackground,
        boxShadow:
          props.side === "left"
            ? `0px 0px 5px 2px ${
                contextState.mode === "light"
                  ? colors.LightShadows
                  : colors.DarkShadows
              }`
            : `-2px 0px 5px 0px ${
                contextState.mode === "light"
                  ? colors.LightShadows
                  : colors.DarkShadows
              }`,
      }}
      className={`uk-width-medium uk-visible@s uk-section chat-list side-bar ${contextState.mode === 'light' ? 'light-scroll' : 'dark-scroll'}`}
    >
      {props.children}
    </div>
  );
};

export default SideBar;
