import * as React from "react";

const Context = React.createContext();

const contextReducer = (contextState, action) => {
  switch (action.type) {
    case "addEmoji":
      return {
        message: contextState.message + action.emoji,
      };
    case "modifyText":
      return {
        message: action.newMessage,
      };
    case "init":
      return {
        message: "",
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const ChatContext = ({ children }) => {
  const [contextState, setContextState] = React.useReducer(contextReducer, {
    message: "",
  });

  const value = { contextState, setContextState };
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

//hooks
const useChatContext = () => {
  const context = React.useContext(Context);
  if (context === undefined)
    throw new Error("useContext must be used within a Provider");
  return context;
};

export { ChatContext, useChatContext };
