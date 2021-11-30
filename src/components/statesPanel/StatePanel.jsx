import React from "react";
import { colors } from "../../utils/colors";
import { useContext } from "../../context/ContextProvider";

import {
  IdleIcon,
  DotIcon,
  DontDisturbIcon,
  NotSentIcon,
  SentIcon,
  CorrectIcon,
} from "../../icons/icons";

import { MessageStates } from "../../models/ChatMessage";

import "./style.css";

export const States = {
  Offline: 1,
  Idle: 2,
  DontDisturb: 3,
  Online: 4,
};

/**
 *
 * @param {string} state - message's state
 * @param {number} index - message's index
 * @param {object} texts - set of texts
 * @param {function} onClick - action after click the error button
 */
export const ShowStateIcon = (state, index, texts, onClick) => {
  switch (state) {
    case MessageStates.NotSent:
      return <NotSentIcon />;
    case MessageStates.Sent:
      return <SentIcon />;
    case MessageStates.Received:
      return <CorrectIcon />;
    case MessageStates.Seen:
      break;
    // error
    default:
      return (
        <button
          className="error-icon"
          onClick={onClick}
          id={index}
          uk-tooltip={texts.Tooltips.NotConnected}
        >
          x
        </button>
      );
  }
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

export const StatesAsArray = () => {
  const keys = Object.keys(States);
  let states = [];
  keys.forEach((item) => {
    states.push(States[item]);
  });
  return states;
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
      return texts.States.Offline;
    case States.Idle:
      return texts.States.Idle;
    case States.DontDisturb:
      return texts.States.DontDisturb;
    default:
      return texts.States.Online;
  }
};

const StatePanel = (props) => {
  const { contextState, setContextState } = useContext();

  /**
   *
   * @param {number} newState
   */
  const setNewState = (e) => {
    console.log(e.target.id[1]);
    setContextState({ type: "changeState", state: e.target.id[1] });
    if (contextState.showEmojis) setContextState({ type: "toggleEmojiPanel" });
  };

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
      <ul style={{ paddingLeft: "10px", margin: 0 }}>
        {StatesAsArray().map((d, i) => {
          return (
            <li key={i}>
              <button
                style={{
                  color:
                    contextState.mode === "light"
                      ? colors.LightFontColors
                      : colors.DarkFontColors,
                }}
                id={`b${i + 1}`}
                onClick={setNewState}
                className="user-state-button"
              >
                {PrintStateIcon(d)}
                <span id={`s${i + 1}`}>{PrintStateString(d, props.texts)}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default StatePanel;
