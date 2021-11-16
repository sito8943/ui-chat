import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Loading from "../../components/loading/Loading";
import Notification from "../../components/notification/Notification";

import { useContext } from "../../context/ContextProvider";

const Login = (props) => {
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const { contextState, setContextState } = useContext();

  const init = () => {};

  const signIn = (e) => {
    e.preventDefault();
    const user = {
      name: name,
      password: password,
    };
  };

  const handleInput = (e) => {
    switch (e.target.id) {
      case "name":
        return setName(e.target.value);
      case "password":
        return setPassword(e.target.password);
      case "remember":
        return setRemember(!remember);
    }
  };

  useEffect(() => {
    init();
    setLoading(false);
  }, []);

  return (
    <>
      <Notification texts={props.texts.notification} />
      <div data-uk-grid style={{ alignItems: "center", height: "100vh" }}>
        <div className="uk-width-expand"></div>
        <div
          className="uk-card uk-card-default uk-card-body"
          style={{ padding: " 50px 75px" }}
        >
          {loading ? (
            <Loading />
          ) : (
            <>
              <div className="uk-flex">
                <img
                  src="/logo512.png"
                  alt="app-logo"
                  style={{ height: "120px", marginRight: "20px" }}
                />
                <h3 className="uk-card-title">{props.texts.login.Title}</h3>
              </div>
              <p>{props.texts.login.Paragraph}</p>
              <form onSubmit={signIn}>
                <fieldset className="uk-fieldset">
                  <legend className="uk-legend">
                    {props.texts.login.Labels.User}
                  </legend>
                  <div className="uk-margin">
                    <input
                      id="name"
                      value={name}
                      onChange={handleInput}
                      className="uk-input"
                      type="text"
                      placeholder={props.texts.login.Placeholders.User}
                      required
                    />
                  </div>
                </fieldset>
                <fieldset className="uk-fieldset">
                  <legend className="uk-legend">
                    {props.texts.login.Labels.Password}
                  </legend>
                  <div className="uk-margin">
                    <input
                      id="password"
                      value={password}
                      onChange={handleInput}
                      className="uk-input"
                      type="password"
                      placeholder={props.texts.login.Placeholders.Password}
                      required
                    />
                  </div>
                </fieldset>
                <fieldset className="uk-fieldset uk-margin uk-grid-small uk-child-width-auto uk-grid">
                  <label>
                    <input
                      id="remember"
                      value={remember}
                      onClick={handleInput}
                      class="uk-checkbox"
                      type="checkbox"
                    />
                    {props.texts.login.Labels.Remember}
                  </label>
                </fieldset>
                <div className="uk-button-group">
                  <button className="uk-button uk-button-primary">
                    {props.texts.login.Buttons.SignIn}
                  </button>
                  <button
                    className="uk-button uk-button-default"
                    style={{ marginLeft: "20px" }}
                  >
                    <Link style={{ textDecoration: "none" }} to="/signup">
                      {props.texts.login.Buttons.SignUp}
                    </Link>
                  </button>
                </div>
              </form>
              <hr />
              <div className="uk-button-group">
                <Link className="uk-link-muted" to="/forgot">
                  {props.texts.login.Buttons.Forgot}
                </Link>
              </div>
            </>
          )}
        </div>
        <div className="uk-width-expand"></div>
      </div>
    </>
  );
};

export default Login;
