import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useContext } from "../../context/ContextProvider";
import { GetTexts } from "../../lang/texts";
import { colors } from "../../utils/colors";

import StatePanel, {
  PrintStateIcon,
  PrintStateString,
} from "../statesPanel/StatePanel";

const ChatItem = (props) => {
  const { contextState, setContextState } = useContext();

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
        <a
          href="#"
          style={{
            color:
              contextState.mode === "light"
                ? colors.LightFontColors
                : colors.DarkFontColors,
          }}
          className="user-state-button"
        >
          {PrintStateIcon(props.data.state)}
          <span>
            {PrintStateString(
              props.data.state,
              GetTexts(contextState.lang, "Main")
            )}
          </span>
        </a>
        <StatePanel texts={GetTexts(contextState.lang, "Main")} />
      </div>
    </div>
  );
};

export default ChatItem;
