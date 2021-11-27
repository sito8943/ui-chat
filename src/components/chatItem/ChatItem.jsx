import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useContext } from "../../context/ContextProvider";
import { colors } from "../../utils/colors";

import StatePanel, {
  PrintStateIcon,
  PrintStateString,
} from "../statesPanel/StatePanel";

const ChatItem = (props) => {
  const { contextState, setContextState } = useContext();
  const [statePanel, setStatePanel] = useState(false);

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
          {PrintStateIcon(props.data.state)}
          <span>{PrintStateString(props.data.state, props.texts)}</span>
        </button>
      </div>
      {statePanel ? <StatePanel /> : <></>}
    </div>
  );
};

export default ChatItem;
