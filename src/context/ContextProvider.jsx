import * as React from "react";

const Context = React.createContext();

const contextReducer = (contextState, action) => {
  switch (action.type) {
    case "showing":
      return {
        user: contextState.user,
        lang: contextState.lang,
        netStatus: contextState.netStatus,
        showingNotification: true,
      };
    case "offline":
      return {
        user: contextState.user,
        lang: contextState.lang,
        netStatus: 0,
        showingNotification: contextState.showingNotification,
      };
    case "online":
      return {
        user: contextState.user,
        lang: contextState.lang,
        netStatus: 1,
        showingNotification: contextState.showingNotification,
      };
    case "checking":
      return {
        user: contextState.user,
        lang: contextState.lang,
        netStatus: 2,
        showingNotification: false,
      };
    case "log-in":
      return { user: action.user };
    case "log-off":
      return { user: "" };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const ContextProvider = ({ children }) => {
  const [contextState, setContextState] = React.useReducer(contextReducer, {
    user: {
      name: "Sito",
      state: "online",
      photo: "/logo192.png",
      link: "/account",
    },
    lang: "",
    netStatus: "",
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
