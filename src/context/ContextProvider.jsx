import * as React from "react";

const Context = React.createContext();

const contextReducer = (contextState, action) => {
  switch (action.type) {
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
    user: "",
    lang: "",
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
