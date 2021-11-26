import { base64encode } from "nodejs-base64";
import * as React from "react";
import User from "../models/User";

const Context = React.createContext();

const contextReducer = (contextState, action) => {
  switch (action.type) {
    case "changeMode":
      return {
        user: contextState.user,
        lang: contextState.lang,
        mode: action.mode,
        netStatus: contextState.netStatus,
        showingNotification: contextState.showingNotification,
      };
    case "showing":
      return {
        user: contextState.user,
        lang: contextState.lang,
        mode: contextState.mode,
        netStatus: contextState.netStatus,
        showingNotification: true,
      };
    case "offline":
      return {
        user: contextState.user,
        lang: contextState.lang,
        netStatus: 0,
        mode: contextState.mode,
        showingNotification: contextState.showingNotification,
      };
    case "online":
      return {
        user: contextState.user,
        lang: contextState.lang,
        netStatus: 1,
        mode: contextState.mode,
        showingNotification: contextState.showingNotification,
      };
    case "checking":
      return {
        user: contextState.user,
        lang: contextState.lang,
        mode: contextState.mode,
        netStatus: 2,
        showingNotification: false,
      };
    case "log-in":
      return {
        user: action.user,
        lang: contextState.lang,
        mode: contextState.mode,
        netStatus: contextState.netStatus,
        showingNotification: contextState.showingNotification,
      };
    case "log-off":
      return {
        user: {},
        lang: contextState.lang,
        mode: contextState.mode,
        netStatus: contextState.netStatus,
        showingNotification: contextState.showingNotification,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const ContextProvider = ({ children }) => {
  const [contextState, setContextState] = React.useReducer(contextReducer, {
    user: new User(
      base64encode("Sito"),
      "Sito",
      "online",
      "/logo192.png",
      "/account"
    ),
    lang: "",
    netStatus: "",
    mode: "dark",
    showingNotification: false,
  });

  const value = { contextState, setContextState };
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

//hooks
const useContext = () => {
  const context = React.useContext(Context);
  if (context === undefined)
    throw new Error("useContext must be used within a Provider");
  return context;
};

export { ContextProvider, useContext };
