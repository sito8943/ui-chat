import React from "react";
import { colors } from "../../utils/colors";
import { useContext } from "../../context/ContextProvider";

import { IdleIcon, DotIcon, DontDisturbIcon } from "../../icons/icons";

import "./style.css";

export const States = {
  Offline: 1,
  Idle: 2,
  DontDisturb: 3,
  Online: 4,
};

/**
 *
 * @param {number} state
 */
export const PrintStateIcon = (state) => {
  switch (state) {
    case States.Offline:
      return (
        <span className="offline state-icon">
          <DotIcon />
        </span>
      );
    case States.Idle:
      return (
        <span className="idle state-icon">
          <IdleIcon />
        </span>
      );
    case States.DontDisturb:
      return (
        <span className="dont-disturb state-icon">
          <DontDisturbIcon />
        </span>
      );
    default:
      return (
        <span className="online state-icon">
          <DotIcon />
        </span>
      );
  }
};

/**
 * 
 * @param {number} state 
 * @param {object} texts 
 * @returns 
 */
export const PrintStateString = (state, texts) => {
  switch (state) {
    case States.Offline:
      return texts.States.OfflineState;
    case States.Idle:
      return texts.States.IdleState;
    case States.DontDisturb:
      return texts.States.DontDisturbState;
    default:
      return texts.States.OnlineState;
  }
};

const StatePanel = (props) => {
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
