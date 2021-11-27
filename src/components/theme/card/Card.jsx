import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useContext } from "../../../context/ContextProvider";
import { colors } from "../../../utils/colors";

const Card = ({ children }) => {
  const { contextState, setContextState } = useContext();

  return (
    <div
      className="uk-card uk-card-default uk-card-body main-card"
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
      {children}
    </div>
  );
};

export default Card;
