import React, { useState, useEffect } from "react";
import { useContext } from "./context/ContextProvider";
import { ChatContext } from "./context/ChatContext";

import "uikit/dist/css/uikit.min.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ui from "./lang/ui.json";

import Notification from "./components/notification/Notification";
import Loading from "./components/loading/Loading";
import Navbar from "./components/navbar/Navbar";

import Login from "./views/login/Login";
import Main from "./views/main/Main";
import NotMatch from "./views/notmatch/NotMatch";
import SignUp from "./views/signup/SignUp";
import Forgot from "./views/forgot/Forgot";
import Account from "./views/account/Account";

import { connectionState } from "./services/get";

const App = () => {
  const [loading, setLoading] = useState(true);
  const { contextState, setContextState } = useContext();

  const init = async () => {
    const netStatus = await connectionState();
    if (netStatus == 200) setContextState({ type: "online" });
    else setContextState({ type: "offline" });
  };

  useEffect(() => {
    init();
    setLoading(false);
  }, []);

  return (
    <>
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
          <Notification texts={ui.ES.Notification} />
          <Routes>
            <Route exact path="/" element={<Navbar texts={ui.ES.Navbar} />}>
              <Route
                index
                element={
                  contextState.user.name == "" ? (
                    <Login texts={ui.ES.Login} />
                  ) : (
                    <ChatContext>
                      <Main texts={ui.ES.Main} />
                    </ChatContext>
                  )
                }
              />
            </Route>
            <Route path="signup" element={<SignUp texts={ui.ES.SignUp} />} />
            <Route
              path="account"
              element={
                contextState.user.name == "" ? (
                  <Login texts={ui.ES.Login} />
                ) : (
                  <Account texts={ui.ES.Account} />
                )
              }
            />
            <Route path="forgot" element={<Forgot texts={ui.ES.Forgot} />} />
            <Route path="*" element={<NotMatch texts={ui.ES.NotMatch} />} />
          </Routes>
        </Router>
      )}
    </>
  );
};

export default App;
