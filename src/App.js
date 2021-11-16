import React, { useState, useEffect } from "react";
import { useContext } from "./context/ContextProvider";

import "uikit/dist/css/uikit.min.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import ui from "./lang/ui.json";
import Loading from "./components/loading/Loading";
import Login from "./views/login/Login";
import Main from "./views/main/Main";
import NotMatch from "./views/notmatch/NotMatch";
import SignUp from "./views/signup/SignUp";
import Forgot from "./views/forgot/Forgot";
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
        <Loading />
      ) : (
        <Router>
          <Switch>
            <Route exact path="/">
              {contextState.user == "" ? (
                <Login texts={ {login: ui.ES.Login, notification: ui.ES.Notification }} />
              ) : (
                <Main texts={ui.ES.Main} />
              )}
            </Route>
            <Route exact path="/signup">
              <SignUp texts={ui.ES.SignUp} />
            </Route>
            <Route exact path="/forgot">
              <Forgot texts={ui.ES.Forgot} />
            </Route>
            <Route>
              <NotMatch texts={ui.ES.NotMatch} />
            </Route>
          </Switch>
        </Router>
      )}
    </>
  );
};

export default App;
