import React from "react";

import { useContext } from "../../context/ContextProvider";
import { colors } from "../../utils/colors";

import "./style.css";

const ChatItemPlaceholder = (props) => {
  const { contextState, setContextState } = useContext();

  return (
    <div className="container loading">
      <div className="img-container">
        <div
          className="img"
          style={{
            backgroundColor:
              contextState.mode === "light"
                ? colors.LightPlaceholder
                : colors.DarkPlaceholder,
          }}
        ></div>
      </div>
      <div className="content">
        <div
          className="stripe small-stripe"
          style={{
            backgroundColor:
              contextState.mode === "light"
                ? colors.LightPlaceholder
                : colors.DarkPlaceholder,
            border: `border: 1px solid ${
              contextState.mode === "light"
                ? colors.LightMainBackground
                : colors.DarkMainBackground
            }`,
          }}
        ></div>
        <div
          className="stripe medium-stripe"
          style={{
            backgroundColor:
              contextState.mode === "light"
                ? colors.LightPlaceholder
                : colors.DarkPlaceholder,
            border: `border: 1px solid ${
              contextState.mode === "light"
                ? colors.LightMainBackground
                : colors.DarkMainBackground
            }`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default ChatItemPlaceholder;
