import UIkit from "uikit";

import React, { useState, useEffect } from "react";

import { useContext } from "../../context/ContextProvider";

const Notification = (props) => {
  const { contextState, setContextState } = useContext();

  useEffect(() => {
    if (!contextState.showingNotification) {
      setContextState({ type: "showing" });
      switch (contextState.netState) {
        case 1:
          UIkit.notification({
            message: `${props.texts.Connected}`,
            status: "success",
            pos: "bottom-right",
          });
          break;
        case 2:
          UIkit.notification({
            message: `${props.texts.CheckingConnection}`,
            status: "warning",
            pos: "bottom-right",
          });
          break;
        default:
          UIkit.notification({
            message: `${props.texts.NotConnected}`,
            status: "danger",
            pos: "bottom-right",
          });
          break;
      }
    }
  });

  return <></>;
};

export default Notification;
