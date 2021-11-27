import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useContext } from "../../context/ContextProvider";
import { colors } from "../../utils/colors";

import { IdleIcon, DotIcon, DontDisturbIcon } from "../../icons/icons";

import StatePanel, { States } from "../statesPanel/StatePanel";

const ChatItem = (props) => {
  const { contextState, setContextState } = useContext();
  const [statePanel, setStatePanel] = useState(false);

  const printStateIcon = () => {
    switch (props.data.state) {
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

  const toggleStatePanel = (e) => {
    setStatePanel(!statePanel);
  };

  return (
    <div style={{ padding: "20px" }} className="uk-flex-middle uk-flex">
      <Link to={props.data.link}>
        <img
          className="profile-img chat-photo"
          src={props.data.photo}
          alt={props.data.name + "-photo"}
        />
      </Link>
      <div className="chat-description">
        <span
          style={{
            color:
              contextState.mode === "light"
                ? colors.LightFontColors
                : colors.DarkFontColors,
          }}
        >
          {props.data.name}
        </span>
        <button
          style={{
            color:
              contextState.mode === "light"
                ? colors.LightFontColors
                : colors.DarkFontColors,
          }}
          onClick={toggleStatePanel}
          className="user-state-button"
        >
          {printStateIcon()}
          <span>{props.data.state}</span>
        </button>
      </div>
      {statePanel ? <StatePanel /> : <></>}
    </div>
  );
};

export default ChatItem;
