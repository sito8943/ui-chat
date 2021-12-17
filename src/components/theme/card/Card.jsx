import React from "react";

import { useContext } from "../../../context/ContextProvider";
import { colors } from "../../../utils/colors";

import "./style.scss";

const Card = (props) => {
  const { contextState, setContextState } = useContext();

  return (
    <div
      className={
        props.className === undefined
          ? "uk-card uk-card-default uk-card-body main-card"
          : props.className
      }
      style={{
        backgroundColor:
          contextState.mode === "light"
            ? colors.LightBarBackground
            : colors.DarkBarBackground,
        boxShadow: `3px 3px 3px 3px ${
          contextState.mode === "light"
            ? colors.LightShadows
            : colors.DarkShadows
        }`,
      }}
    >
      {props.children}
    </div>
  );
};

export default Card;
