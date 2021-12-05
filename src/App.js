import React, { useState, useEffect } from "react";
import { useContext } from "./context/ContextProvider";
import { ChatContext } from "./context/ChatContext";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { connectionState } from "./services/get";
import { colors } from "./utils/colors";
import { GetTexts } from "./lang/texts";

import Notification from "./components/notification/Notification";
import Loading from "./components/loading/Loading";
import Navbar from "./components/navbar/Navbar";

import Login from "./views/login/Login";
import Main from "./views/main/Main";
import NotMatch from "./views/notmatch/NotMatch";
import SignUp from "./views/signup/SignUp";
import Forgot from "./views/forgot/Forgot";
import Account from "./views/account/Account";

import "uikit/dist/css/uikit.min.css";

const App = () => {
  const [loading, setLoading] = useState(true);
  const { contextState, setContextState } = useContext();

  const init = async () => {
    const netStatus = await connectionState();
    if (netStatus === 200) setContextState({ type: "online" });
    else setContextState({ type: "offline" });
  };

  useEffect(() => {
    init();
    setLoading(false);
  }, []);

  return (
    <div
      id="main-back"
      className="main-background"
      style={{
        backgroundColor:
          contextState.mode === "light"
            ? colors.LightMainBackground
            : colors.DarkMainBackground,
      }}
    >
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Loading />
        </div>
      ) : (
        <Router>
          <Notification texts={GetTexts(contextState.lang, "Notification")} />
          <Routes>
            <Route
              exact
              path="/"
              element={<Navbar texts={GetTexts(contextState.lang, "Navbar")} />}
            >
              <Route
                index
                element={
                  contextState.user.name == "" ? (
                    <Login texts={GetTexts(contextState.lang, "Login")} />
                  ) : (
                    <ChatContext>
                      <Main texts={GetTexts(contextState.lang, "Main")} />
                    </ChatContext>
                  )
                }
              />
            </Route>
            <Route
              path="signup"
              element={<SignUp texts={GetTexts(contextState.lang, "SignUp")} />}
            />
            <Route
              path="account"
              element={
                contextState.user.name == "" ? (
                  <Login texts={GetTexts(contextState.lang, "Login")} />
                ) : (
                  <Account texts={GetTexts(contextState.lang, "Account")} />
                )
              }
            />
            <Route
              path="forgot"
              element={<Forgot texts={GetTexts(contextState.lang, "Forgot")} />}
            />
            <Route
              path="*"
              element={
                <NotMatch texts={GetTexts(contextState.lang, "NotMatch")} />
              }
            />
          </Routes>
        </Router>
      )}
    </div>
  );
};

export default App;
