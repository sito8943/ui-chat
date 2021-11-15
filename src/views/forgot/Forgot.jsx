import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Loading from "../../components/loading/Loading";

const Forgot = (props) => {
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");

  const handleInput = (e) => {
    switch (e.target.id) {
      case "name":
        return setName(e.target.value);
    }
  };

  const send = (e) => {
    e.preventDefault();
    const user = {
      name: name,
    };
  };

  const init = () => {};

  useEffect(() => {
    init();
    setLoading(false);
  }, []);

  return (
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
              <h3 className="uk-card-title">{props.texts.Title}</h3>
            </div>
            <p>{props.texts.Paragraph}</p>
            <form onSubmit={send}>
              <fieldset className="uk-fieldset">
                <legend className="uk-legend">{props.texts.Labels.User}</legend>
                <div className="uk-margin">
                  <input
                    id="name"
                    value={name}
                    onChange={handleInput}
                    className="uk-input"
                    type="text"
                    placeholder={props.texts.Placeholders.User}
                    required
                  />
                </div>
              </fieldset>
              <div className="uk-button-group">
                <button className="uk-button uk-button-primary">
                  {props.texts.Buttons.Send}
                </button>
                <button
                  className="uk-button uk-button-default"
                  style={{ marginLeft: "20px" }}
                >
                  <Link style={{ textDecoration: "none" }} to="/">
                    {props.texts.Buttons.Return}
                  </Link>
                </button>
              </div>
            </form>
          </>
        )}
      </div>
      <div className="uk-width-expand"></div>
    </div>
  );
};

export default Forgot;
