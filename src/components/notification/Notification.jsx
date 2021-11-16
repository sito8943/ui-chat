import UIkit from "uikit";

import React, { useState, useEffect } from "react";

import { useContext } from "../../context/ContextProvider";

const Notification = (props) => {
  const { contextState, setContextState } = useContext();

  useEffect(() => {
    if (!contextState.netState) {
      UIkit.notification({
        message: `${props.texts.NotConnected}`,
        status: "danger",
        pos: "bottom-right",
        timeout: 9000
      });
    } else {
      UIkit.notification({
        message: `${props.texts.Connected}`,
        status: "success",
        pos: "bottom-right",
      });
    }
  }, []);

  return <></>;
};

export default Notification;
