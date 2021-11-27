import React from "react";
import { colors } from "../../utils/colors";
import { useContext } from "../../context/ContextProvider";

import "./style.css";

export let States = {
  Offline: 1,
  Idle: 2,
  DontDisturb: 3,
  Online: 4,
};

export const StatePanel = (props) => {
  const { contextState, setContextState } = useContext();
  return (
    <div
      className="state-panel"
      style={{
        backgroundColor:
          contextState.mode === "light"
            ? colors.LightBarBackground
            : colors.DarkBarBackground,
        boxShadow: `2px 2px 2px 2px ${
          contextState.mode === "light"
            ? colors.LightShadows
            : colors.DarkShadows
        }`,
      }}
    >
      <ul>
        <li>
          <button></button>
        </li>
        <li>
          <button></button>
        </li>
        <li>
          <button></button>
        </li>
      </ul>
    </div>
  );
};

export default StatePanel;
