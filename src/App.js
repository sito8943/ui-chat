import React, { useState, useEffect } from "react";
import { ContextProvider, useContext } from "./context/ContextProvider";

import "uikit/dist/css/uikit.min.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import ui from "./lang/ui.json";
import Loading from "./components/loading/Loading";

const App = () => {
  const [loading, setLoaging] = useState(true);
  const [contextState, setContextState] = useContext();

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Router>
          <ContextProvider>
            <Switch>
              <Route exact path="/">
                {contextState.user === {} ? <Login /> : <Main />}
              </Route>
              <Route>
                <NotMatch texts={ui} />
              </Route>
            </Switch>
          </ContextProvider>
        </Router>
      )}
    </>
  );
};

export default App;
