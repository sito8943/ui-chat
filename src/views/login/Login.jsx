import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useContext } from "../../context/ContextProvider";

const Login = (props) => {
  //const [contextState, setContextState] = useContext();

  return (
    <div data-uk-grid style={{ alignItems: "center", height: "100vh" }}>
      <div className="uk-width-expand"></div>
      <div
        className="uk-card uk-card-default uk-card-body"
        style={{ padding: " 50px 75px" }}
      >
        <div className="uk-flex">
          <img
            src="/logo512.png"
            alt="app-logo"
            style={{ height: "120px", marginRight: "20px" }}
          />
          <h3 className="uk-card-title">{props.texts.Title}</h3>
        </div>
        <p>{props.texts.Paragraph}</p>
        <form>
          <fieldset className="uk-fieldset">
            <legend className="uk-legend">{props.texts.Labels.User}</legend>
            <div className="uk-margin">
              <input
                className="uk-input"
                type="text"
                placeholder={props.texts.Placeholders.User}
                required
              />
            </div>
          </fieldset>
          <fieldset className="uk-fieldset">
            <legend className="uk-legend">{props.texts.Labels.Password}</legend>
            <div className="uk-margin">
              <input
                className="uk-input"
                type="text"
                placeholder={props.texts.Placeholders.Password}
                required
              />
            </div>
          </fieldset>
          <fieldset className="uk-fieldset uk-margin uk-grid-small uk-child-width-auto uk-grid">
            <label>
              <input class="uk-checkbox" type="checkbox" /> {props.texts.Labels.Remember}
            </label>
          </fieldset>
          <div className="uk-button-group">
            <button className="uk-button uk-button-primary">
              {props.texts.Buttons.SignIn}
            </button>
            <button
              className="uk-button uk-button-default"
              style={{ marginLeft: "20px" }}
            >
              <Link style={{ textDecoration: "none" }} to="/signup">
                {props.texts.Buttons.SignUp}
              </Link>
            </button>
          </div>
        </form>
        <hr />
        <div className="uk-button-group">
          <Link className="uk-link-muted" to="/forgot">
            {props.texts.Buttons.Forgot}
          </Link>
        </div>
      </div>
      <div className="uk-width-expand"></div>
    </div>
  );
};

export default Login;
