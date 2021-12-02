import { base64encode } from "nodejs-base64";
import * as React from "react";
import User from "../models/User";

import { States } from "../components/statesPanel/StatePanel";

const Context = React.createContext();

const contextReducer = (contextState, action) => {
  switch (action.type) {
    case "changeLanguage": {
      return {
        user: contextState.user,
        lang: action.newLang,
        //texts: changeLanguage(action.newLang),
        mode: contextState.mode,
        netStatus: contextState.netStatus,
        showingNotification: contextState.showingNotification,
        showEmojis: contextState.showEmojis,
      };
    }
    case "toggleEmojiPanel": {
      return {
        user: contextState.user,
        lang: contextState.lang,
        texts: contextState.texts,
        mode: contextState.mode,
        netStatus: contextState.netStatus,
        showingNotification: contextState.showingNotification,
        showEmojis: !contextState.showEmojis,
      };
    }
    case "changeState":
      console.log(contextState.user.State);
      console.log(action.state);
      console.log(States);
      return {
        user: new User(
          contextState.user.Id,
          contextState.user.Name,
          action.state,
          contextState.user.Photo
        ),
        lang: contextState.lang,
        texts: contextState.texts,
        mode: contextState.mode,
        newStatus: contextState.newStatus,
        showingNotification: contextState.showingNotification,
        showEmojis: contextState.showEmojis,
      };
    case "changeMode":
      return {
        user: contextState.user,
        lang: contextState.lang,
        texts: contextState.texts,
        mode: action.mode,
        netStatus: contextState.netStatus,
        showingNotification: contextState.showingNotification,
        showEmojis: contextState.showEmojis,
      };
    case "showing":
      return {
        user: contextState.user,
        lang: contextState.lang,
        texts: contextState.texts,
        mode: contextState.mode,
        netStatus: contextState.netStatus,
        showingNotification: true,
        showEmojis: contextState.showEmojis,
      };
    case "offline":
      return {
        user: contextState.user,
        user: new User(
          contextState.user.Id,
          contextState.user.Name,
          States.Offline,
          contextState.user.Photo
        ),
        lang: contextState.lang,
        texts: contextState.texts,
        netStatus: 0,
        mode: contextState.mode,
        showingNotification: contextState.showingNotification,
        showEmojis: contextState.showEmojis,
      };
    case "online":
      return {
        user: new User(
          contextState.user.Id,
          contextState.user.Name,
          States.Online,
          contextState.user.Photo
        ),
        lang: contextState.lang,
        texts: contextState.texts,
        netStatus: 1,
        mode: contextState.mode,
        showingNotification: contextState.showingNotification,
        showEmojis: contextState.showEmojis,
      };
    case "checking":
      return {
        user: contextState.user,
        lang: contextState.lang,
        texts: contextState.texts,
        mode: contextState.mode,
        netStatus: 2,
        showingNotification: false,
        showEmojis: contextState.showEmojis,
      };
    case "log-in":
      return {
        user: action.user,
        lang: contextState.lang,
        texts: contextState.texts,
        mode: contextState.mode,
        netStatus: contextState.netStatus,
        showingNotification: contextState.showingNotification,
        showEmojis: contextState.showEmojis,
      };
    case "log-off":
      return {
        user: {},
        lang: contextState.lang,
        texts: contextState.texts,
        mode: contextState.mode,
        netStatus: contextState.netStatus,
        showingNotification: contextState.showingNotification,
        showEmojis: contextState.showEmojis,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const ContextProvider = ({ children }) => {
  const [contextState, setContextState] = React.useReducer(contextReducer, {
    user: new User(base64encode("Sito"), "Sito", 1, "/logo192.png", "/account"),
    lang: "ES",
    texts: {},
    netStatus: "",
    mode: "dark",
    showingNotification: false,
    showEmojis: false,
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
